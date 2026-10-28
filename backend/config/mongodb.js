import mongoose from "mongoose";
import variables from "./ENV_VARIABLES";

export default async function connect_to_db() {
  await mongoose.connect(variables.MONGODB_URI);
  console.log(`mongodb is connected`);
}
