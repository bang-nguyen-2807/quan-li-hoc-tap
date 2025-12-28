import { connnectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import * as sql from "mssql";

/* =======================
   GET: LẤY DANH SÁCH SV
   ======================= */
export async function GET() {
  try {
    const pool = await connnectDB();
    const result = await pool.request().query(`
      SELECT 
        MaSV,
        TenSV,
        NgaySinh,
        MaLop
      FROM SinhVien
      ORDER BY MaSV DESC
    `);

    return NextResponse.json(result.recordset);
  } catch (error) {
    console.log("GET SinhVien error:", error);
    return NextResponse.json(
      { message: "Lỗi lấy danh sách sinh viên" },
      { status: 500 }
    );
  }
}

/* =======================
   POST: THÊM SINH VIÊN
   ======================= */
export async function POST(req: Request) {
  try {
    const { TenSV, NgaySinh, MaLop, MatKhau } = await req.json();

    if (!TenSV || !MaLop) {
      return NextResponse.json(
        { message: "Thiếu dữ liệu bắt buộc" },
        { status: 400 }
      );
    }

    const pool = await connnectDB();

    const result = await pool
      .request()
      .input("TenSV", sql.NVarChar, TenSV)
      .input("NgaySinh", sql.Date, NgaySinh || null)
      .input("MaLop", sql.Char, MaLop)
      .input("MatKhau", sql.NVarChar, MatKhau).query(`
        INSERT INTO SinhVien (TenSV, NgaySinh, MaLop , MatKhau)
        OUTPUT INSERTED.MaSV
        VALUES (@TenSV, @NgaySinh, @MaLop , @MatKhau)
      `);

    /* trả về MaSV vừa thêm để dùng tiếp */
    return NextResponse.json({
      message: "Thêm sinh viên thành công",
      MaSV: result.recordset[0].MaSV,
    });
  } catch (error: any) {
    console.log("POST SinhVien error:", error);

    /* lỗi khóa ngoại MaLop */
    if (error.number === 547) {
      return NextResponse.json(
        { message: "Mã lớp không tồn tại" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Lỗi thêm sinh viên" },
      { status: 500 }
    );
  }
}
