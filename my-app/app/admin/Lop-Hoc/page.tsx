"use client";

import { useEffect, useState } from "react";

interface lopHoc {
  MaLop: string;
  TenLop: string;
  MaKhoa: string;
  MaGVCN: string;
}
const inputC =
  "bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400";
const btnAdd =
  "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition";
export default function LopHoc() {
  const [lop, setLop] = useState<lopHoc[]>([]);
  const [addLop, setAddLop] = useState({
    MaLop: "",
    TenLop: "",
    MaKhoa: "",
    MaGVCN: "",
  });
  const lopHoc = async () => {
    try {
      const res = await fetch("/api/admin/danh-sach-lop-hoc");
      const data: lopHoc[] = await res.json();
      setLop(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    lopHoc();
  }, []);

  const handleClickAdd = async () => {
    try {
      const res = await fetch("/api/admin/danh-sach-lop-hoc", {
        method: "POST",
        body: JSON.stringify(addLop),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setAddLop({ MaLop: "", TenLop: "", MaKhoa: "", MaGVCN: "" });
        lopHoc();
        alert("Thêm Lớp Thành Công");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="flex items-center flex-col">
      {/* FORM THÊM LỚP */}
      <section className="mt-5 flex flex-col items-center gap-5">
        <div className="flex gap-10 flex-wrap justify-center">
          <div>
            <label className="font-semibold">Tên Lớp : </label>
            <input
              className={inputC}
              onChange={(e) => setAddLop({ ...addLop, TenLop: e.target.value })}
              value={addLop.TenLop}
              placeholder="Nhập tên lớp"
            />
          </div>

          <div>
            <label className="font-semibold">Mã Lớp : </label>
            <input
              className={inputC}
              onChange={(e) => setAddLop({ ...addLop, MaLop: e.target.value })}
              value={addLop.MaLop}
              placeholder="Nhập mã lớp"
            />
          </div>

          <div>
            <label className="font-semibold">Mã Khoa : </label>
            <input
              className={inputC}
              onChange={(e) => setAddLop({ ...addLop, MaKhoa: e.target.value })}
              value={addLop.MaKhoa}
              placeholder="Nhập mã khoa"
            />
          </div>

          <div>
            <label className="font-semibold">Mã GVCN : </label>
            <input
              className={inputC}
              onChange={(e) => setAddLop({ ...addLop, MaGVCN: e.target.value })}
              value={addLop.MaGVCN}
              placeholder="Nhập mã GVCN"
            />
          </div>
        </div>

        <div>
          <button className={btnAdd} onClick={handleClickAdd}>
            Thêm Lớp
          </button>
        </div>
      </section>

      {/* DANH SÁCH LỚP */}
      <h1 className="text-2xl m-5">Danh sách lớp học</h1>

      <section className="grid grid-cols-3 gap-5">
        {lop.map((item) => (
          <div
            key={item.MaLop}
            className="border border-gray-300 p-4 rounded-lg"
          >
            <div>Tên Lớp : {item.TenLop}</div>
            <div>Mã Lớp : {item.MaLop}</div>
            <div>Mã Khoa : {item.MaKhoa}</div>
            <div>Mã GVCN : {item.MaGVCN}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
