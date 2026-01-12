import * as LoginModel from "../models/Login.model.js";
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
  const { name, email, password, age } = req.body;
  const hashPassword = await bcrypt.hash(password, 12);
  const creation = await LoginModel.Post(name, email, hashPassword, age);
  if (!creation) {
    const notCreate = new Response(
      400,
      "Bad Request",
      {
        message: "user not create",
      },
      "GET"
    );
    res.status(notCreate.status).json(notCreate.toJSON());
  }
  const response = new Response(200, "ok", creation, "POST");
  res.status(response.status).json(response.toJSON());
}

export async function LoginUser(req, res) {
  const { email, password } = req.body;
  const users = await LoginModel.Get(email);
  const user = users[0];
  if (!user) {
    const erroOfUser = new Response(
      400,
      "Bad Request",
      {
        message: "This user does not exist.",
      },
      "GET"
    );
    res.status(erroOfUser.status).json(erroOfUser.toJSON());
  }
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    const erroOfUser = new Response(
      400,
      "Bad Request",
      {
        message: "This password invalidates that.",
      },
      "GET"
    );
    return res.status(erroOfUser.status).json(erroOfUser.toJSON());
  }
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
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
      },
      token: token,
    },
    "POST"
  );
  res.status(response.status).json(response.toJSON());
}

export async function ShowAllUser(req, res) {
  const usersArray = await LoginModel.GetAll();
  if (!usersArray) {
    const erroOfUsers = new Response(
      400,
      "Bad Request",
      {
        message: "This password invalidates that.",
      },
      "GET"
    );
    res.status(erroOfUsers.status).json(erroOfUsers.toJSON());
  }
  const userObject = Object.fromEntries(
    usersArray.map((user) => {
      const { password, ...safeUser } = user;
      return [user.id, safeUser];
    })
  );
  const { password, ...semPassword } = userObject;
  const response = new Response(200, "ok", userObject, "POST");
  res.status(response.status).json(response.toJSON());
}

export async function ShowUser(req, res) {
  const { email, password } = req.user;
  const users = await LoginModel.Get(email);
  const user = users[0];
  if (!user) {
    const erroOfUser = new Response(
      400,
      "Bad Request",
      {
        message: "This user does not exist.",
      },
      "GET"
    );
    res.status(erroOfUser.status).json(erroOfUser.toJSON());
  }
  const response = new Response(
    200,
    "ok",
    {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
    "POST"
  );
  res.status(response.status).json(response.toJSON());
}
