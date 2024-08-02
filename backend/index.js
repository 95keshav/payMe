const express = require("express");
const cors = require("cors");
const apiRouter = require("./Routes/index");
const port = process.env.PORT;

const app = express();

// MIDDLEWARE
app.use(cors());
//using body-parser
app.use(express.json());

//api route
app.use("/api/v1", apiRouter);

app.listen(port, () => {
  console.log("Backend is runing   at 3000");
});
