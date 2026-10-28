import app from "./app.js";
import variables from "./config/ENV_VARIABLES.js";
import connect_to_db from "./config/mongodb.js";

try {
  connect_to_db();
  Bun.serve({
    port: variables.PORT,
    fetch: app.fetch,
  });
  console.log(`Bun server is running on port ${variables.PORT}`);
} catch (error) {
  console.log(`server is faild due to : ${error}`);
  process.exit(1);
}
