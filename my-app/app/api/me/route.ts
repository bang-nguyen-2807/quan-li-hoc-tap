import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { connnectDB } from "@/lib/db";
import * as sql from "mssql";

export async function GET() {
  // 🔴 Next 15+ / 16: cookies() PHẢI await
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;

  if (!role) {
    return NextResponse.json(null, { status: 401 });
  }

  /* ================= ADMIN ================= */
  if (role === "ADMIN") {
    return NextResponse.json({
      role: "ADMIN",
      name: "Quản trị viên",
    });
  }

  const pool = await connnectDB();

  /* ================= TEACHER ================= */
  if (role === "TEACH") {
    const maGV = cookieStore.get("MaGV")?.value; // "?." dùng để tránh lỗi khi giá trị là null hoặc undefined

    if (!maGV) {
      return NextResponse.json(null, { status: 401 });
    }

    const result = await pool
      .request()
      .input("MaGV", sql.Char, maGV)
      .query(`
        SELECT TenGV
        FROM GiaoVien
        WHERE MaGV = @MaGV
      `);

    return NextResponse.json({
      role: "TEACH",
      name: result.recordset[0]?.TenGV ?? "", // recordset : mảng trả kết quả về sql . [0] là dòng đầu tiên
                                            // "?." nếu recordset tồn tại thì lấy TenGV còn k thì trả về undefined
    });
  }

  /* ================= STUDENT ================= */
  if (role === "STUDENT") {
    const maSV = cookieStore.get("MaSV")?.value;

    if (!maSV) {
      return NextResponse.json(null, { status: 401 });
    }

    const result = await pool
      .request()
      .input("MaSV", sql.Int, Number(maSV))
      .query(`
        SELECT TenSV
        FROM SinhVien
        WHERE MaSV = @MaSV
      `);

    return NextResponse.json({
      role: "STUDENT",
      name: result.recordset[0]?.TenSV ?? "",
    });
  }

  return NextResponse.json(null, { status: 401 });
}
