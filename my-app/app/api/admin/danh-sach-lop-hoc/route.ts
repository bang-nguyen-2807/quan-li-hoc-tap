import { connnectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import * as sql from "mssql"
export async function GET(){
    try{
        const pool = await connnectDB();
        const result = await pool.request().query("SELECT * FROM Class");
        return NextResponse.json(result.recordset);
    }catch(error){
        console.log("error" , error);
        return NextResponse.json(
            {message : "lỗi lấy dữ liệu"},
            {status : 500}
        )
    }
}
export async function POST(request : Request) {
    try{
        const body = await request.json();
        const {MaLop , TenLop , MaKhoa , MaGVCN} = body;
        const pool = await connnectDB();
        if(!MaLop || !MaKhoa || !MaGVCN){
            return NextResponse.json(
                {message : "Thiếu dữ liệu bắt buộc"},
                {status : 400}
            )
        }
        const result = await pool
            .request()
            .input("MaLop" , sql.Char , MaLop)
            .input("TenLop" , sql.NVarChar , TenLop)
            .input("MaKhoa" , sql.Char , MaKhoa)
            .input("MaGVCN" , sql.Char , MaGVCN)
            .query(
                `
                    INSERT INTO Class (MaLop , TenLop , MaKhoa , MaGVCN)
                    VALUES (@MaLop , @TenLop , @MaKhoa , @MaGVCN)
                `
            )
        return NextResponse.json(
            {message : "Thêm Lớp Thành Công" , data : result},
            {status :201}
        )
    }catch(error){
        console.log("error" , error);
        return NextResponse.json(
            {message : "Lỗi thêm lớp"},
            {status : 500}
        )
    }
    
}