import getConnection from "../config/db.js";

export async function Post(name, email, password, age) {
  const connection = await getConnection();
  const sql = "INSERT INTO user(name,email,password,age) VALUES (?,?,?,?)";
  const [result] = await connection.execute(sql, [name, email, password, age]);
  await connection.end();
  return result;
}

export async function Get(email) {
  const connection = await getConnection();
  const sql = "SELECT * FROM user WHERE email = ?";
  const [row] = await connection.execute(sql, [email]);
  return row;
}

export async function GetAll() {
  const connection = await getConnection();
  const sql = "SELECT * FROM user";
  const [row] = await connection.execute(sql);
  return row;
}
