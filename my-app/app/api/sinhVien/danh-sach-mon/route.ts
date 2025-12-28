import { connnectDB } from "@/lib/db";
import * as sql from "mssql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pool = await connnectDB();
    const result = await pool.request().query(
      `
                SELECT 
                SV.MaSV,
                SV.TenSV,
                MH.MaMon,
                MH.TenMon
            FROM SinhVien SV
            JOIN KetQua KQ ON SV.MaSV = KQ.MaSV
            JOIN MonHoc MH ON KQ.MaMon = MH.MaMon;
            `
    );
    return NextResponse.json(result.recordset);
  } catch (error) {
    console.log("err", error);
    return NextResponse.json({ message: "lỗi lấy dữ liệu" }, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { MaSV, MaMon, Diem } = body;

    // validate
    if (!MaSV || !MaMon) {
      return NextResponse.json(
        { message: "Thiếu MaSV hoặc MaMon" },
        { status: 400 }
      );
    }

    const pool = await connnectDB();

    await pool
      .request()
      .input("MaSV", sql.Int, MaSV)
      .input("MaMon", sql.Char, MaMon)
      .input("Diem", sql.Float, Diem ?? null).query(`
          INSERT INTO KetQua (MaSV, MaMon, Diem)
          VALUES (@MaSV, @MaMon, @Diem)
        `);

    return NextResponse.json(
      { message: "Thêm môn học cho sinh viên thành công" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ message: "Lỗi thêm dữ liệu" }, { status: 500 });
  }
}
