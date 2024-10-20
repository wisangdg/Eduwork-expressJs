import { Router } from "express";
import { mockProducts } from "../utils/constants.mjs";

const router = Router();

router.get("/api/products", (request, response) => {
  console.log(request.headers.cookie);
  console.log(request.cookies);
  if (request.cookies.hello && request.cookies.hello === "world")
    return response.send(mockProducts);

  return response
    .status(403)
    .send({ msg: "Sorry you need the correct cookies" });
});

export default router;
