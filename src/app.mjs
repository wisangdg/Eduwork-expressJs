import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "randomText",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(routes);

const test = "testing";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

app.get("/", (req, res) => {
  req.session.visited = true;
  res.cookie("hello", "world", { maxAge: 6000 * 60 * 2 });
  res
    .status(201)
    .send(
      "hello, you can change the query to see other data, /api/users or /api/products"
    );
});
