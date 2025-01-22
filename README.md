# Next.js Project

This project is built with **Next.js**, **Prisma**, and **Jest** for development and testing. It uses **PostgreSQL** as the database.

## Environment Configuration

Before running the project, make sure to configure the environment variables in a `.env` file. Here is the list of required variables:

```env
# Recommended for most uses
DATABASE_URL=<your-postgresql-connection>
NEXT_PUBLIC_API_URL=<your-local-domain>/api

# For connections without pgbouncer
DATABASE_URL_UNPOOLED=<your-postgresql-unpooled-connection>

# Parameters for constructing a custom connection string
PGHOST=<host>
PGHOST_UNPOOLED=<unpooled-host>
PGUSER=<user>
PGDATABASE=<database-name>
PGPASSWORD=<password>

# Additional parameters for Vercel PostgreSQL templates
POSTGRES_URL=<your-postgresql-connection>
POSTGRES_URL_NON_POOLING=<your-postgresql-non-pooling-connection>
POSTGRES_USER=<user>
POSTGRES_HOST=<host>
POSTGRES_PASSWORD=<password>
POSTGRES_DATABASE=<database-name>
POSTGRES_URL_NO_SSL=<your-postgresql-no-ssl-connection>
POSTGRES_PRISMA_URL=<your-postgresql-prisma-connection>
```

> **Note:** Replace the environment variable values with your actual credentials. For `NEXT_PUBLIC_API_URL`, if running locally, set it to `http://localhost:3000/api`.

---

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/Pablituuu/next-seek.git
   cd next-seek
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Generate the Prisma client:
   ```bash
   npm run generate
   ```

---

## Available Scripts

The following scripts are defined in the `package.json` file:

- **`npm run dev`**: Starts the development server with Turbopack.
- **`npm run build`**: Generates the Prisma client and builds the application for production.
- **`npm start`**: Starts the application in production mode.
- **`npm run lint`**: Runs the linter to check the code.
- **`npm run generate`**: Generates the Prisma client files.
- **`npm run migrate`**: Applies database migrations.
- **`npm run prisma:deploy`**: Deploys migrations in production.
- **`npm run test`**: Runs tests with Jest.
- **`npm run test:watch`**: Runs tests in watch mode.

---

## Technologies Used

- **Next.js**: Framework for modern web applications.
- **Prisma**: ORM for database management.
- **PostgreSQL**: Relational database.
- **Jest**: Testing framework for JavaScript.
- **Tailwind CSS**: CSS framework for styling.

---

## Deployment on Vercel

This project is deployed on **Vercel**. You can access the live version here:

[Live Project](https://next-seek.vercel.app)

### Steps to Deploy

1. Go to [Vercel](https://vercel.com) and log in.
2. Import the repository and configure the environment variables in the **Environment Variables** section.
3. Deploy the project.

---

## Contribution

If you want to contribute to this project:

1. Fork the repository.
2. Create a new branch for your feature or fix.
   ```bash
   git checkout -b feature/new-feature
   ```
3. Make your changes and commit them.
   ```bash
   git commit -m "Description of changes"
   ```
4. Submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).
