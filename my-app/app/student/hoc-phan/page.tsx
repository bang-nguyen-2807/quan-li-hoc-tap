"use client";

import { useEffect, useState } from "react";

interface monhoc {
  MaSV: number;
  TenSV: string;
  MaMon: string;
  TenMon: string;
}
export default function hocPhan() {
  const [subject, setSubject] = useState<monhoc[]>([]);
  const [addSubject, setAddSubject] = useState({
    TenSV: "",
    MaMon: "",
    TenMon: "",
    MaSV: "",
  });
  const monhoc = async () => {
    try {
      const res = await fetch("/api/sinhVien/danh-sach-mon");
      const data: monhoc[] = await res.json();
      setSubject(data);
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    monhoc();
  }, []);
  const handleClickAdd = async () => {
    try {
      const res = await fetch("/api/sinhVien/danh-sach-mon", {
        method: "POST",
        body: JSON.stringify(addSubject),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setAddSubject({ TenSV: "", MaMon: "", TenMon: "", MaSV: "" });
        monhoc();
        alert("nhập môn học thành công");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex items-center flex-col">
      {/* FORM NHẬP HỌC PHẦN */}
      <section className="mt-5 flex flex-col items-center gap-5">
        <div className="flex gap-10">
          {/* TÊN SINH VIÊN */}
          <div>
            <label className="font-semibold">Tên Sinh Viên : </label>
            <input
              className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5 
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={addSubject.TenSV}
              onChange={(e) =>
                setAddSubject({ ...addSubject, TenSV: e.target.value })
              }
              placeholder="Nhập tên sinh viên"
            />
          </div>

          <div>
            <label className="font-semibold">Mã Sinh Viên : </label>
            <input
              className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5 
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={addSubject.MaSV}
              onChange={(e) =>
                setAddSubject({ ...addSubject, MaSV: e.target.value })
              }
              placeholder="Nhập Mã sinh viên"
            />
          </div>

          {/* MÃ MÔN */}
          <div>
            <label className="font-semibold">Mã Môn : </label>
            <input
              className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5 
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={addSubject.MaMon}
              onChange={(e) =>
                setAddSubject({ ...addSubject, MaMon: e.target.value })
              }
              placeholder="Nhập mã môn"
            />
          </div>

          {/* TÊN MÔN */}
          <div>
            <label className="font-semibold">Tên Môn : </label>
            <input
              className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5 
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={addSubject.TenMon}
              onChange={(e) =>
                setAddSubject({ ...addSubject, TenMon: e.target.value })
              }
              placeholder="Nhập tên môn"
            />
          </div>
        </div>

        {/* BUTTON */}
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg 
                       hover:bg-blue-600 transition"
            onClick={handleClickAdd}
          >
            Thêm Môn Học
          </button>
        </div>
      </section>

      {/* DANH SÁCH HỌC PHẦN */}
      <h1 className="text-2xl m-5">Danh sách môn học sinh viên</h1>

      <section className="grid grid-cols-3 gap-5">
        {subject.map((item, index) => (
          <div key={index} className="border border-gray-300 p-4 rounded-lg">
            <div>Tên Sinh Viên : {item.TenSV}</div>
            <div>Mã Môn : {item.MaMon}</div>
            <div>Tên Môn : {item.TenMon}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
