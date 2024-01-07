import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

import * as childSchema from "./schemas/Childs";

const dbCredentials = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

export const connection = connect(dbCredentials);

export const db = drizzle(connection, {
  schema: {
    ...childSchema,
  },
});
