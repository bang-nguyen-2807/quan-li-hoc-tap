import { connnectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import * as sql from "mssql"
export async function GET() {
    try{
        // kết nối db
        const pool = await connnectDB();
        // tạo lệnh query cho sql server
        const result = await pool.request().query("SELECT * FROM GiaoVien");
        // trả về json
        return NextResponse.json(result.recordset)
    }catch(error){
        console.log("lỗi get giáo viên" , error)
        return NextResponse.json(
            {message : "lỗi lấy dữ liệu"} , {status : 500}
        )
    }
    
}
export async function POST(request : Request){
    try{
        const body = await request.json();
        const {MaGV , TenGV , MaKhoa , MatKhau} = body;
        const pool = await connnectDB();
        if(!MaGV || !TenGV){
            return NextResponse.json(
                {message : "thiếu dữ liệu bắt buộc"},
                {status : 400}
            )
        }
        const result = await pool   
            .request()
            .input("MaGV" , sql.Char , MaGV)
            .input("TenGV" , sql.NVarChar , TenGV)
            .input("MaKhoa" , sql.Char , MaKhoa)
            .input("MatKhau" , sql.NVarChar , MatKhau)
            .query(
                `
                    INSERT INTO GiaoVien (MaGV , TenGV , MaKhoa ,MatKhau)
                    VALUES(@MaGV , @TenGV , @MaKhoa , MatKhau)
                
                `
            )
            return NextResponse.json(
                {message :  "thêm giáo viên thành công" , data:result},
                {status : 201}
            )
    }catch(error){
        console.log("error" , error);
        return NextResponse.json(
            {message : "Lỗi Thêm Giaó Viên"},
            {status : 500}
        )
    }
}