import express from "express";
import authRoutes from "./src/routes/auth.route.js"; // make sure the path is correct
import messageRoutes from "./src/routes/message.route.js"; // make sure the path is correct
import  cors from "cors"
import dotenv from "dotenv"
import { connectDb} from "./src/lib/db.js"
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const port=process.env.PORT

app.use(express.json()); 
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(port, () => {
  console.log("server is running on port", port);
  connectDb();
});
