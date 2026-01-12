import * as LoginController from "../controllers/Login.controller.js";
export default function redirect(req, res, next) {
  const { role } = req.user;
  if (role === "admin") {
    return LoginController.ShowAllUser(req, res);
  }
  if (role === "user") {
    return LoginController.ShowUser(req, res);
  }
  return res.status(403).json({ error: "Access denied" });
}
