import pool from "../config/db.js";

export async function createUser({ name, email, password, age, role }) {
  const sql = `
    INSERT INTO users (name, email, password, age, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, age, role
  `;

  const result = await pool.query(sql, [
    name,
    email,
    password,
    age,
    role ?? "user",
  ]);

  return result.rows[0];
}

export async function getUserByEmail(email) {
  const sql = "SELECT * FROM users WHERE email = $1";
  const result = await pool.query(sql, [email]);
  return result.rows[0];
}

export async function getAllUsers() {
  const sql = "SELECT * FROM users";
  const result = await pool.query(sql);
  return result.rows;
}
