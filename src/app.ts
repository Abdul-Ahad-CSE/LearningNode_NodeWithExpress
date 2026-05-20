import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { pool } from "./db";
import { userRouter } from "./module/user/user.route";
import { profileRouter } from "./module/profile/profile.route";

const app: Application = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  //res.send("Hello World!");
  res.status(200).json({
    message: "Express Server",
    author: "Next Level",
  });
});

app.use("/api/users", userRouter);
app.use("/api/profile", profileRouter);

export default app;
