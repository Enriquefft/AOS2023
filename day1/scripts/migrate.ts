import { db } from "@/libs/db";
import { migrate } from "drizzle-orm/planetscale-serverless/migrator";

await migrate(db, {
  migrationsFolder: "drizzle",
});
