import { connnectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pool = await connnectDB();
    const result = await pool.request().query(
    `
                SELECT 
    GV.TenGV      TenGV,
    CL.MaLop      MaLop,
    CL.TenLop     TenLop,
    MH.TenMon     TenMon,
    SV.MaSV       MaSV,
    SV.TenSV      TenSV
FROM Class CL
JOIN GiaoVien GV ON CL.MaGVCN = GV.MaGV
JOIN MonHoc MH ON MH.MaGV = GV.MaGV
JOIN SinhVien SV ON SV.MaLop = CL.MaLop
ORDER BY CL.MaLop, MH.TenMon, SV.TenSV;


    `
    );
    return NextResponse.json(result.recordset);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: "lỗi lấy dữ liệu" }, { status: 500 });
  }
}