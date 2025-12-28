import { connnectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pool = await connnectDB();
    const result = await pool.request().query(
      `
                SELECT 
                    GV.TenGV AS TenGV,
                    CL.MaLop  AS MaLop,
                    CL.TenLop AS TenLop,
                    MH.TenMon AS TenMon
                FROM Class CL
                JOIN GiaoVien GV ON CL.MaGVCN = GV.MaGV
                JOIN MonHoc MH ON GV.MaGV = MH.MaGV;
            `
    );
    return NextResponse.json(result.recordset);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: "lỗi lấy dữ liệu" }, { status: 500 });
  }
}
