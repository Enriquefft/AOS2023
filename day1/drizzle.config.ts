import type { Config } from "drizzle-kit";

if (process.env.DATABASE_URL === undefined) {
  throw new Error("DATABASE_URL environment variable is required.");
}

export default {
  schema: "./src/libs/schemas/*",
  out: "./lib/db/migrations",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.DATABASE_URL,
  },
} satisfies Config;
