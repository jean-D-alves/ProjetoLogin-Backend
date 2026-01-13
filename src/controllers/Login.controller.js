import {
  createUser,
  getUserByEmail,
  getAllUsers,
} from "../models/Login.model.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class Response {
  constructor(status, statusText, data, method) {
    this.status = status;
    this.method = method;
    this.statusText = statusText;
    this.data = data;
  }

  toJSON() {
    return {
      status: this.status,
      method: this.method,
      statusText: this.statusText,
      data: this.data,
    };
  }
}

export async function CreateUser(req, res) {
  const { name, email, password, age, role } = req.body;

  const hashPassword = await bcrypt.hash(password, 12);

  const creation = await createUser({
    name,
    email,
    password: hashPassword,
    age,
    role,
  });

  if (!creation) {
    const notCreate = new Response(
      400,
      "Bad Request",
      { message: "user not created" },
      "POST"
    );
    return res.status(notCreate.status).json(notCreate.toJSON());
  }

  const response = new Response(201, "Created", creation, "POST");
  res.status(response.status).json(response.toJSON());
}

export async function LoginUser(req, res) {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    const erroOfUser = new Response(
      400,
      "Bad Request",
      { message: "This user does not exist." },
      "POST"
    );
    return res.status(erroOfUser.status).json(erroOfUser.toJSON());
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    const erroOfPassword = new Response(
      400,
      "Bad Request",
      { message: "Invalid password." },
      "POST"
    );
    return res.status(erroOfPassword.status).json(erroOfPassword.toJSON());
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.SECRET_JWT,
    { expiresIn: "1h" }
  );

  const response = new Response(
    200,
    "ok",
    {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    },
    "POST"
  );

  res.status(response.status).json(response.toJSON());
}

export async function ShowAllUser(req, res) {
  const usersArray = await getAllUsers();

  if (!usersArray || usersArray.length === 0) {
    const erroOfUsers = new Response(
      404,
      "Not Found",
      { message: "No users found." },
      "GET"
    );
    return res.status(erroOfUsers.status).json(erroOfUsers.toJSON());
  }

  const safeUsers = usersArray.map(({ password, ...user }) => user);

  const response = new Response(200, "ok", safeUsers, "GET");
  res.status(response.status).json(response.toJSON());
}

export async function ShowUser(req, res) {
  const { email } = req.user;

  const user = await getUserByEmail(email);

  if (!user) {
    const erroOfUser = new Response(
      404,
      "Not Found",
      { message: "This user does not exist." },
      "GET"
    );
    return res.status(erroOfUser.status).json(erroOfUser.toJSON());
  }

  const { password, ...safeUser } = user;

  const response = new Response(200, "ok", { user: safeUser }, "GET");

  res.status(response.status).json(response.toJSON());
}
