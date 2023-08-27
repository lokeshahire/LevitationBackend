const express = require("express");

const cors = require("cors");
const { dbConnection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { formRouter } = require("./routes/form.route");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/users", userRouter);
app.use("/form", formRouter);

app.listen(8080, async () => {
  try {
    await dbConnection;
    console.log("Connected to db");
  } catch (e) {
    console.log(e.message);
  }
  console.log("listening on port 8080");
});
