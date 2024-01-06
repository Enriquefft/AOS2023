import { db } from "@/libs/db";
import { childs } from "@/libs/schemas/Childs";
import data from "./day-one.json";

await db.insert(childs).values(data);
