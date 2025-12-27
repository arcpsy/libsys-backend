<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Backend Setup Documentation

**NestJS + Prisma (v7) + PostgreSQL**

This is a concise documentation of how I set up my backend using **NestJS**, **Prisma v7**, and a **serverless PostgreSQL database managed by Prisma**.

---

## 1. Create the NestJS Project

First, create a new NestJS project:

```bash
nest new libsys-backend
```

Then move into the project directory and open it as the root folder in VS Code:

```bash
cd libsys-backend
code .
```

---

## 2. Install Prisma Dependencies (Prisma v7)

Next, install the required dependencies for Prisma v7.

```bash
npm install prisma @types/node --save-dev
npm install @prisma/client @prisma/adapter-pg pg dotenv
```

These packages are required for Prisma v7, which now uses driver adapters (`@prisma/adapter-pg`) instead of managing the database connection internally.

---

## 3. Initialize Prisma and Create the Database

Initialize Prisma and provision a **serverless PostgreSQL database managed by Prisma**:

```bash
npx prisma@latest init --db
```

During this process:

* You will be asked to authenticate (choose **Yes**).
* You will be redirected to Prisma authentication and can log in using GitHub.
* Select a region (I used **ap-southeast-1 – Asia Pacific (Singapore)**).
* Enter a project name (I used **libsys-db**).

After this step, Prisma will automatically create the database and generate the following files:

* `prisma.config.ts`
* `prisma/schema.prisma`
* `.env`

---

## 4. Configure Prisma Client Output

By default, Prisma generates the client outside the `src` folder.
I prefer keeping generated code inside `src`, so I updated `schema.prisma`:

```prisma
generator client {
  provider     = "prisma-client"
  output       = "../src/generated/prisma"
  moduleFormat = "cjs"
}

datasource db {
  provider = "postgresql"
}
```

The `moduleFormat = "cjs"` option ensures the Prisma client is generated in **CommonJS format**, which avoids compatibility issues with NestJS when using Prisma v7.

After updating the schema, generate the client:

```bash
npx prisma generate
```

---

## 5. Environment Variable Setup

The `.env` file will contain a database URL starting with:

```
postgres+prisma://
```

Replace this value with the **actual connection string printed in the terminal** after running:

```bash
npx prisma@latest init --db
```

This ensures Prisma can connect correctly to the **Prisma-managed serverless PostgreSQL database**.

---

## 6. Define Models and Run Migrations

After defining the initial Prisma models in `schema.prisma`, run the migration:

```bash
npx prisma migrate dev --name init
```

Once the migration completes, you can verify the tables using Prisma Studio:

```bash
npx prisma studio
```

Then regenerate the Prisma client:

```bash
npx prisma generate
```

---

## 7. Create Prisma Module and Service

To integrate Prisma properly with NestJS and use dependency injection, generate the Prisma module and service:

```bash
nest g mo prisma
nest g s prisma
```

### Prisma Service Configuration

Prisma v7 requires `pg` as a peer dependency when using `@prisma/adapter-pg`.
Ensure it is installed:

```bash
npm install pg
npm install -D @types/pg
```

Update `prisma/prisma.service.ts` to the following:

```ts
import 'dotenv/config';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import * as pg from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
    });

    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      Logger.log('Database connection established.');
    } catch (error) {
      Logger.error('Database connection failed.', error);
      throw error;
    }
  }
}
```

This setup allows Prisma to be injected across the application without manually instantiating the client in every file.

### Prisma Module

Update `prisma/prisma.module.ts`:

```ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

---

## 8. Run the Backend

To verify everything works:

```bash
npm run start:dev
```

---

## 9. Enable Frontend Integration (CORS)

To allow a frontend to connect to the backend, update `main.ts`:

```ts
app.setGlobalPrefix('api');
app.enableCors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
});
```

---

## 10. Generate API Modules

Create REST API resources for the application:

```bash
nest g res books
nest g res authors
nest g res author-books
```

Choose **REST API** and **Yes** when prompted to generate CRUD entry points.

After generation, delete the `entities` folder and use DTOs instead.

---

## 11. Enable Validation

Install validation dependencies:

```bash
npm install class-validator class-transformer
```

Enable global validation in `main.ts`:

```ts
import { ValidationPipe } from '@nestjs/common';

app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

---

## 12. Inject Prisma into Services

Finally, inject `PrismaService` into the service files:

```ts
import { PrismaService } from '../prisma/prisma.service';

constructor(private readonly prisma: PrismaService) {}
```

This allows all CRUD operations to interact with the database through Prisma.

This is also where to start creating the Services and Controllers.

---

### Final Note

This backend uses **Prisma v7 with the PostgreSQL driver adapter**, connected to a **Prisma-managed serverless PostgreSQL database**, and follows a modular NestJS architecture that supports clean dependency injection, validation, and frontend integration.
