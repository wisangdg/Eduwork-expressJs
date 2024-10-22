import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import {
  getUserValidationSchema,
  createUserValidationSchema,
} from "../utils/validationSchemas.mjs";
import { mockUsers } from "../utils/constants.mjs";
import { resolveIndexById } from "../utils/middlewares.mjs";

const router = Router();

router.get(
  "/api/users",
  // checkSchema(getUserValidationSchema),
  (request, response) => {
    // request.session.visited = true;
    console.log(request.session);
    console.log(request.session.id);
    const errors = validationResult(request);
    console.log(errors);
    const {
      query: { filter, value },
    } = request;
    // when filter and value are undifined

    if (filter && value) {
      return response.send(
        mockUsers.filter((user) => user[filter].includes(value))
      );
    }
    return response.send(mockUsers);
  }
);

router.get("/api/users/:id", resolveIndexById, (request, response) => {
  const { findUserIndex } = request;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  (request, response) => {
    const errors = validationResult(request);
    console.log(errors);
    if (!errors.isEmpty())
      return response.status(400).send({ errors: errors.array() });

    const data = matchedData(request);
    const newUsers = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
    mockUsers.push(newUsers);
    return response.status(201).send(newUsers);
  }
);

router.put("/api/users", resolveIndexById, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

router.patch("/api/users/:id", resolveIndexById, (request, response) => {
  const { body, findUserIndex } = request;
  if (findUserIndex === -1) return response.sendStatus(404);
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
});

router.delete("/api/users/:id", (request, response) => {
  const userId = parseInt(request.params.id, 10);
  const findUserIndex = mockUsers.findIndex((user) => user.id === userId);

  if (findUserIndex !== -1) {
    mockUsers.splice(findUserIndex, 1);
    return response.status(200).json({ message: "User deleted successfully" });
  } else {
    return response.status(404).json({ message: "User not found" });
  }
});
export default router;
