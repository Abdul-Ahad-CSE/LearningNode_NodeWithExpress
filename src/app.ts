import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();

import { pool } from "./db";
import { userRouter } from "./module/user/user.route";

app.use(express.json());

app.use('/api/users',userRouter);

app.get("/api/users", userRouter);

app.get("/api/users", userRouter);

app.put("/api/users",  userRouter);

app.delete("/api/users",  userRouter); 

export default app;
