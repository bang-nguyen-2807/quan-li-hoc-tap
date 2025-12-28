'use client'

import { useEffect, useState } from "react";

interface ds{
    TenGV : string;
    MaLop : string;
    TenLop : string;
    TenMon : string;
    MaSV : number;
    TenSV : string
}
export default function DsSinhVien(){
    const [dsSV , setDsSV] = useState<ds[]>([]);
    const ds = async()=>{
        try{
            const res = await fetch("/api/teacher/danh-sach-sinh-vien")
            const data : ds[] = await res.json();
            setDsSV(data)
        }catch(err){
            console.log("err" , err)
        }
    }
    useEffect(()=>{
        ds()
    },[])
    return (
        <div className="flex items-center flex-col">
          {/* TIÊU ĐỀ */}
          <h1 className="text-2xl m-5">
            Danh sách sinh viên theo lớp & môn học
          </h1>
      
          {/* DANH SÁCH */}
          <section className="grid grid-cols-3 gap-5">
            {dsSV.map((item, index) => (
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
                  <div className="font-medium">Môn học</div>
                  <div className="ml-3 text-sm">{item.TenMon}</div>
                </div>
      
                {/* SINH VIÊN */}
                <div className="mt-3">
                  <div className="font-medium">Sinh viên</div>
                  <div className="ml-3 text-sm">
                    {item.TenSV} (MSV: {item.MaSV})
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      );
      
}