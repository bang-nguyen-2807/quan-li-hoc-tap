'use client'
import { useEffect, useState } from "react";

interface monhoc{
    TenGV : string;
    MaLop : string;
    TenLop : string;
    TenMon : string;
}
export default function MonHocGV(){
    const [subjectGV , setSubjectGV] = useState<monhoc[]>([]);
    const monhoc = async ()=>{
        try{
            const res = await fetch("/api/teacher/danh-sach-mon");
            const data : monhoc[] = await res.json();
            setSubjectGV(data);
        }
        catch(error){
            console.log("error" , error)
        }
    }
    useEffect(()=>{
        monhoc()
    } , [])
    
    return (
        <div className="flex items-center flex-col">
          {/* TIÊU ĐỀ */}
          <h1 className="text-2xl m-5">Danh sách môn học giáo viên giảng dạy</h1>
      
          {/* DANH SÁCH MÔN + LỚP */}
          <section className="grid grid-cols-3 gap-5">
            {subjectGV.map((item, index) => (
              <div
                key={index}
                className="border border-gray-300 p-4 rounded-lg"
              >
                {/* GIÁO VIÊN */}
                <div className="font-semibold mb-2">
                  Giáo viên: {item.TenGV}
                </div>
      
                {/* LỚP */}
                <div className="mb-1">Lớp: {item.TenLop}</div>
      
                <div className="mb-1 text-sm text-gray-600">
                  Mã lớp: {item.MaLop}
                </div>
      
                {/* MÔN HỌC */}
                <div className="mt-3">
                  <div className="font-medium">Môn giảng dạy</div>
                  <div className="ml-3 text-sm">{item.TenMon}</div>
                </div>
              </div>
            ))}
          </section>
        </div>
      );
      
}