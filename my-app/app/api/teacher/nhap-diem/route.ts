import { connnectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import * as sql from "mssql"
export async function GET() {
    try{
        const pool = await connnectDB();
        const result = await pool.request().query("SELECT * FROM KetQua");
        return NextResponse.json(result.recordset);
    }catch(err){
        console.log("err" , err)
        return NextResponse.json(
            {message : "lỗi lấy dữ liệu"},
            {status : 500}
        )
    }
    
}

export async function POST(request : Request) {
    try{
        const body = await request.json();
        const {MaSV , MaMon ,Diem} = body;
        const pool = await connnectDB();
        if(!MaSV || !MaMon || !Diem ){
            return NextResponse.json({message : "thiếu dữ liệu bắt buộc"} , {status : 400})
        }
        const result = await pool
            .request()
            .input("MaSV" , sql.Int , MaSV )
            .input("MaMon" , sql.Char  , MaMon)
            .input("Diem" , sql.Float , Diem)
            .query(
                `
                    INSERT INTO KetQua (MaSV , MaMon , Diem)
                    VALUES (@MaSV , @MaMon , @Diem)
                `
            )
        return NextResponse.json(
            {message : 'Thêm dữ liệu thành công' , data : result},
            {status : 201}
        )
    }catch(error){
        console.log("err" , error);
        return NextResponse.json(
            {message : "Lỗi Thêm Diem"},
            {status : 500}
        )
    }
    
}