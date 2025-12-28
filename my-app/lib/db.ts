import * as sql from "mssql";

const config: sql.config = {
  user: "sa",
  password: "12345678",
  server: "localhost",
  port: 1433,
  database: "QLTruongHoc",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool: sql.ConnectionPool | null = null;
export async function connnectDB() {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
}
export default sql;
