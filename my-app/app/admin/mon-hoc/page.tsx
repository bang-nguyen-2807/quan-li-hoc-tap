"use client";

import { useEffect, useState } from "react";

// tạo interface
interface monHoc {
  MaMon: string;
  TenMon: string;
  MaKhoa: string;
  MaGV: string;
}
const inputC =
  "bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400";
const btnAdd =
  "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition";
export default function MonHoc() {
  const [subject, setSubject] = useState<monHoc[]>([]); // tạo useState để lưu dữ liệu
  const [addSubject, setAddSubject] = useState({
    MaMon: "",
    TenMon: "",
    MaKhoa: "",
    MaGV: "",
  });
  const monHoc = async () => {
    try {
      const res = await fetch("/api/admin/danh-sach-mon-hoc");
      const data: monHoc[] = await res.json();
      setSubject(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    monHoc();
  }, []);
  const handleClickAdd = async () => {
    try {
      const res = await fetch("/api/admin/danh-sach-mon-hoc", {
        method: "POST",
        body: JSON.stringify(addSubject),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setAddSubject({ MaMon: "", TenMon: "", MaKhoa: "", MaGV: "" });
        await monHoc();
        alert("Thêm Thành Công");
      }
    } catch (error) {
      console.log("Thêm Thất Bại", error);
    }
  };
  return (
    <div className="flex items-center flex-col">
      {/* FORM THÊM MÔN HỌC */}
      <section className="mt-5 flex flex-col items-center gap-5">
        <div className="flex gap-10 flex-wrap justify-center">
          <div>
            <label className="font-semibold">Mã Môn : </label>
            <input
              className={inputC}
              onChange={(e) =>
                setAddSubject({ ...addSubject, MaMon: e.target.value })
              }
              value={addSubject.MaMon}
              placeholder="Nhập mã môn"
            />
          </div>

          <div>
            <label className="font-semibold">Tên Môn : </label>
            <input
              className={inputC}
              onChange={(e) =>
                setAddSubject({ ...addSubject, TenMon: e.target.value })
              }
              value={addSubject.TenMon}
              placeholder="Nhập tên môn"
            />
          </div>

          <div>
            <label className="font-semibold">Mã Khoa : </label>
            <input
              className={inputC}
              onChange={(e) =>
                setAddSubject({ ...addSubject, MaKhoa: e.target.value })
              }
              value={addSubject.MaKhoa}
              placeholder="Nhập mã khoa"
            />
          </div>

          <div>
            <label className="font-semibold">Mã Giáo Viên : </label>
            <input
              className={inputC}
              onChange={(e) =>
                setAddSubject({ ...addSubject, MaGV: e.target.value })
              }
              value={addSubject.MaGV}
              placeholder="Nhập mã giáo viên"
            />
          </div>
        </div>

        <div>
          <button className={btnAdd} onClick={handleClickAdd}>
            Thêm Môn Học
          </button>
        </div>
      </section>

      {/* DANH SÁCH MÔN HỌC */}
      <h1 className="text-2xl m-5">Danh sách học phần</h1>

      <section className="grid grid-cols-3 gap-5">
        {subject.map((sub) => (
          <div
            key={sub.MaMon}
            className="border border-gray-300 p-4 rounded-lg"
          >
            <div>Tên Học Phần : {sub.TenMon}</div>
            <div>Mã Học Phần : {sub.MaMon}</div>
            <div>Giảng Viên : {sub.MaGV}</div>
            <div>Khoa : {sub.MaKhoa}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
