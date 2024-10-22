import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "randomText",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 60 },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

const test = "testing";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);

  req.session.visited = true;
  res.cookie("hello", "world", { maxAge: 6000 * 60 * 2 });
  res
    .status(201)
    .send(
      "hello, you can change the query to see other data, /api/users or /api/products"
    );
});
