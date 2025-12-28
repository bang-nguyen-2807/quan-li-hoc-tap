"use client";
import { useEffect, useState } from "react";

interface lophoc {
  TenGV: string;
  TenLop: string;
  TenSV: string;
  MaLop: string;
}
export default function LopHocGV() {
  const [classGV, setClassGV] = useState<lophoc[]>([]);
  const lophoc = async () => {
    try {
      const res = await fetch("/api/teacher/danh-sach-lop");
      const data: lophoc[] = await res.json();
      setClassGV(data);
    } catch (error) {
      console.log(error, "error");
    }
  };
  useEffect(() => {
    lophoc();
  }, []);

  return (
    <div className="flex items-center flex-col">
      {/* TIÊU ĐỀ */}
      <h1 className="text-2xl m-5">Danh sách lớp & sinh viên</h1>

      {/* DANH SÁCH LỚP + SINH VIÊN */}
      <section className="grid grid-cols-3 gap-5">
        {classGV.map((item, index) => (
          <div key={index} className="border border-gray-300 p-4 rounded-lg">
            <div className="font-semibold mb-2">Giáo viên: {item.TenGV}</div>

            <div className="mb-1">Lớp: {item.TenLop}</div>

            <div className="mb-1 text-sm text-gray-600">
              Mã lớp: {item.MaLop}
            </div>

            <div className="mt-3">
              <div className="font-medium">Danh sách sinh viên</div>
              <div className="ml-3 text-sm">{item.TenSV}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
