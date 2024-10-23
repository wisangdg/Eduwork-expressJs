import express from "express";
import routes from "../src/routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "../src/strategies/local-strategy.mjs";

const app = express();

app.use(express.static("public"));

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

// app.post("/api/auth", passport.authenticate(local), (req, res) => {});

// app.post("/api/auth", (req, res) => {
//   const {
//     body: { username, password },
//   } = req;
//   const findUser = mockUsers.find((user) => user.username === username);
//   if (!findUser || findUser.password !== password)
//     return res.status(401).send({ msg: "Bad Credentials" });

//   req.session.user = findUser;
//   return res.status(200).send(findUser);
// });

// app.get("/api/auth/status", (req, res) => {
//   req.sessionStore.get(req.sessionID, (err, session) => {
//     console.log(session);
//   });
//   return req.session.user
//     ? res.status(200).send(req.session.user)
//     : res.status(401).send({ msg: "Not Authenticated" });
// });

// app.post("/api/cart", (req, res) => {
//   if (!req.session.user) return res.sendStatus(401);
//   const { body: item } = req;
//   const { cart } = req.session;

//   if (cart) {
//     cart.push(item);
//   } else {
//     req.session.cart = [item];
//   }
//   return res.status(201).send(item);
// });

// app.get("/api/cart", (req, res) => {
//   if (!req.session.user) return res.sendStatus(401);
//   return res.send(req.session.cart ?? []);
// });
