import { connnectDB } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const pool = await connnectDB();
    const result = await pool.request().query(
      `
                   SELECT 
        GV.TenGV  AS TenGV,
        CL.MaLop  AS MaLop,
        CL.TenLop AS TenLop,
        SV.TenSV  AS TenSV
    FROM GiaoVien GV
    JOIN Class CL ON GV.MaGV = CL.MaGVCN
    JOIN SinhVien SV ON CL.MaLop = SV.MaLop
            `
    );
    return NextResponse.json(result.recordset);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Lỗi Lấy Dữ Liệu" }, { status: 500 });
  }
}
