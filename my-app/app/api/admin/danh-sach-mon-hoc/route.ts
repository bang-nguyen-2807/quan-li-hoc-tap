import { connnectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import * as sql from "mssql"

export async function GET() {
    try{
        const pool = await connnectDB();
        const result = await pool.request().query("SELECT * FROM MonHoc")
        return NextResponse.json(result.recordset)
    }catch(error){
        console.log("error" , error);
        return NextResponse.json(
            {error : "lỗi lấy dữ liệu"},
            {status : 500}
        )
    }
}
export async function POST(request : Request) {
    try{
        const body = await request.json();
        const {MaMon , TenMon , MaKhoa , MaGV} = body;
        const pool = await connnectDB();
        if(!MaMon || !MaGV || !MaKhoa){
            return NextResponse.json(
                {message : "Thiếu dữ liệu bắt buộc"},
                {status : 400}
            )
        }
        const result = await pool
            .request()
            .input("MaMon" , sql.Char , MaMon)
            .input("TenMon" , sql.NVarChar , TenMon)
            .input("MaKhoa" , sql.Char , MaKhoa)
            .input("MaGV" ,sql.Char , MaGV)
            .query(
                `
                    INSERT INTO MonHoc (MaMon , TenMon , MaKhoa , MaGV)
                    VALUES (@MaMon , @TenMon , @MaKhoa , @MaGV)
                `
            )
        return NextResponse.json(
            {message : "Thêm Môn Thành Công" , data : result},
            {status : 201}
        )
    }catch(error){
        console.log("lỗi thêm môn học" , error)
        return NextResponse.json(
            {message : "Lỗi Thêm Môn Học"},
            {status : 500}
        )
    }
    
}