import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(400).json("token not found please have login");
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "this token not found", erro: error });
  }
}
