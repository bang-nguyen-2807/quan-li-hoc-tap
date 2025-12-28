import { connnectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import * as sql from "mssql";
export async function GET() {
  try {
    const pool = await connnectDB();
    const result = await pool.request().query("SELECT * FROM SinhVien");
    // trả về kiểu json
    return NextResponse.json(result.recordset);
  } catch(error) {
    console.log("error" , error)
    return NextResponse.json({ error: "lỗi lấy dữ liệu" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // lay du lieu tu client
    const body = await request.json();
    const { TenSV, NgaySinh, MaLop ,MatKhau } = body;

    const pool = await connnectDB();
    // validate cơ bản
    if (!TenSV || !MaLop || !MatKhau) {
      return NextResponse.json(
        { message: "Thiếu dữ liệu bắt buộc" },
        { status: 400 }
      );
    }
    // thuc hien chen du lieu vao sql server
    const result = await pool
      .request()
      .input("TenSV", sql.NVarChar, TenSV)
      .input("NgaySinh", sql.Date, NgaySinh)
      .input("MaLop", sql.Char, MaLop)
      .input("MatKhau" , sql.NVarChar , MatKhau)
      .query(
        `
          INSERT INTO SinhVien (TenSV ,NgaySinh , MaLop ,MatKhau)
          VALUES( @TenSV,@NgaySinh , @MaLop , @MatKhau)
        `
      );
    return NextResponse.json(
      { message: "thêm sinh viên thành công", data: result },
      { status: 201 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "lỗi thêm sinh viên" },
      { status: 500 }
    );
  }
}
