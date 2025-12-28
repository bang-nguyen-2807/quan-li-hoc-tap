import { connnectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import * as sql from "mssql"
export async function GET(){
    try{
        const pool = await connnectDB();
        const result = await pool.request().query("SELECT * FROM Khoa");
        return NextResponse.json(result.recordset);
    }catch(error){
        console.log("error" , error)
        return NextResponse.json(
            {message : "Lỗi lấy dữ liệu"},
            {status : 500}
        )
    }
} 
export async function POST(request : Request){
    try{
        const body = await request.json(); // gởi dữ liệu body về json
        const {MaKhoa , TenKhoa} = body;
        const pool = await connnectDB();
        if(!MaKhoa || !TenKhoa){
            return NextResponse.json(
                {message : "Lỗi Thiếu Dữ Liệu"} , 
                {status : 400}
            )
        }
        const result = await pool
            .request()
            .input("MaKhoa" , sql.Char , MaKhoa)
            .input("TenKhoa" , sql.NVarChar , TenKhoa)
            .query(
                `
                    INSERT INTO Khoa(MaKhoa , TenKhoa)
                    VALUES (@MaKhoa , @TenKhoa)
                `
            )
        return NextResponse.json(
            {message : "Thêm Khoa Thành Công" , data: result},
            {status : 201}
        )
    }catch(error){
        console.log("error" , error);
        return NextResponse.json(
            {message : "Lỗi Thêm Khoa"},
            {status : 500}
        )
    }
}