import { connnectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import * as sql from "mssql";

type Role = "ADMIN" | "TEACH" | "STUDENT";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  /* ================= ADMIN ================= */
  if (username === "admin") {
    if (password !== "123") {
      return NextResponse.json(
        { message: "Sai mật khẩu admin" },
        { status: 401 }
      );
    }

    const res = NextResponse.json<{ role: Role }>({ role: "ADMIN" });
    res.cookies.set("role", "ADMIN", { path: "/" });
    return res;
  }

  const pool = await connnectDB();

  /* ================= TEACHER ================= */
  const teacherResult = await pool
    .request()
    .input("MaGV", sql.Char, username)
    .input("MatKhau", sql.NVarChar, password)
    .query(`
      SELECT MaGV
      FROM GiaoVien
      WHERE MaGV = @MaGV
        AND MatKhau = @MatKhau
    `);

  if (teacherResult.recordset.length > 0) {
    const res = NextResponse.json<{ role: Role }>({ role: "TEACH" });
    res.cookies.set("role", "TEACH", { path: "/" });
    res.cookies.set("MaGV", username, { path: "/" });
    return res;
  }

  /* ================= STUDENT ================= */
  const studentResult = await pool
    .request()
    .input("MaSV", sql.Int, Number(username))
    .input("MatKhau", sql.NVarChar, password)
    .query(`
      SELECT MaSV
      FROM SinhVien
      WHERE MaSV = @MaSV
        AND MatKhau = @MatKhau
    `);

  if (studentResult.recordset.length > 0) {
    const res = NextResponse.json<{ role: Role }>({ role: "STUDENT" });
    res.cookies.set("role", "STUDENT", { path: "/" });
    res.cookies.set("MaSV", username, { path: "/" });
    return res;
  }


  /* ================= FAIL ================= */
  return NextResponse.json(
    { message: "Sai tài khoản hoặc mật khẩu" },
    { status: 401 }
  );
}
