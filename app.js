const express = require("express");

const mongoose = require("mongoose");

const { Post } = require("./models/post");

const { postRouter } = require("./routes/postRoute");

const { mainRouter } = require("./routes/mainRoute");

const { authRouter } = require("./routes/authRoute");

const { newSession } = require("./middlewares/session");

const bodyParser = require("body-parser");

const dotenv = require("dotenv").config();

const cors = require("cors");

const flash = require("connect-flash");

const { dashRouter } = require("./routes/dashRoute");

const app = express();

const PORT = process.env.PORT || 5500;

// setting the default views
app.set("view engine", "ejs");

//setting up middleware

app.use(newSession);
app.use(cors());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
app.use((req, res, next) => {
  res.locals.successMessage = req.flash("success");
  res.locals.errorMessage = req.flash("error");
  next();
});

dburi = process.env.MONGO_URI ;
mongoose
  .connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Connected to server on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

// everything related to CRUD posts
app.use("/posts", postRouter);
app.use("/auth", authRouter);

app.use("/user", dashRouter);

// everything related to home about and 404
app.use(mainRouter);
