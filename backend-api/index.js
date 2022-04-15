require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const morgan = require("morgan")

const app = express();

const home = require("./routes/home");
const login = require("./routes/login");
const user = require("./routes/user")

const connectToDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_DB_URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  } catch (error) {
    console.log({ error });
    throw new Error(error);
  }
};

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization")

    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json()
    }
    next()
})

app.use(passport.initialize());
app.use(passport.session());

app.use("/", home);
app.use("/auth", login);
app.use("/api/users", user);

app.use((req, res, next) => {
  const error = new Error("Not Found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
});

const port = process.env.PORT || 3264;
app.listen(port, async()=> {
  await connectToDB();
  console.log(`Server started on ${port}`);
});
