import express from "express";
import connectDB from "./lib/connectDB.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webhookRouter from "./routes/webhook.route.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config({ path: './.env' }); // Load environment variables from the .env file

const app = express();

app.use(cors(process.env.CLIENT_URL));
app.use(clerkMiddleware()); // checks client session token on each req
app.use("/webhooks", webhookRouter); // /webhook endpoint uses bodyparser so need to be above app.use(express.json());
app.use(express.json()); // Using express.json for below endpoints /users, /posts, /comments

// allow cross-origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// Error Handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack, // If you are not in Production, you can show your stack
  });
});
console.log(process.env.test);

app.listen(3000, () => {
  connectDB();
  console.log("Server is running!");
});



// app.get("/test",(req,res)=>{
//   res.status(200).send("it works!")
// })

// app.get("/auth-state", (req, res) => {
//   const authState = req.auth;
//   res.json(authState);
// });
/* http://localhost:3000/auth-state
  - if signed out, everything should be null
*/

// app.get("/protect", (req, res) => {
//   const {userId} = req.auth;
//   if(!userId){
//     return res.status(401).json("not authenticated")
//   }
//   res.status(200).json("content authenticated")
// });

// app.get("/protect2", requireAuth(), (req, res) => {
//   res.status(200).json("content")
// });