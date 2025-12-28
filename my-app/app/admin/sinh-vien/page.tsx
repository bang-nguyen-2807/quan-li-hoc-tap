"use client";

import { useEffect, useState } from "react";
interface sinhVien {
  MaSV: number;
  TenSV: string;
  NgaySinh: string;
  MaLop: string;
  MatKhau: string;
}
const inputC =
  "bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400";
const btnAdd =
  "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition";
export default function SinhVien() {
  const [dataSinhVien, setDataSinhVien] = useState<sinhVien[]>([]);
  const [addSinhVien, setAddSinhVien] = useState({
    TenSV: "",
    NgaySinh: "",
    MaLop: "",
    MatKhau: "",
  });
  const sinhVien = async () => {
    //GET
    try {
      const res = await fetch("/api/admin/danh-Sach-Sinh-Vien");
      const data: sinhVien[] = await res.json();
      setDataSinhVien(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    sinhVien();
  }, []);

  const handleClickAdd = async () => {
    try {
      const res = await fetch("/api/admin/danh-Sach-Sinh-Vien", {
        method: "POST",
        body: JSON.stringify(addSinhVien),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setAddSinhVien({ TenSV: "", NgaySinh: "", MaLop: "", MatKhau: "" });
        await sinhVien(); // gọi lại get để cập nhật dữ liệu ngay lập tức
        alert("Thêm thành công");
      }
    } catch (error) {
      console.log("Thêm chưa thành công", error);
    }
  };
  return (
    <div className="flex items-center flex-col">
      <section className="mt-5 flex flex-col items-center gap-5">
        <div className="flex gap-10">
          <div>
            <label className="font-semibold">Tên Sinh Viên : </label>
            <input
              className={inputC}
              onChange={(e) =>
                setAddSinhVien({ ...addSinhVien, TenSV: e.target.value })
              }
              value={addSinhVien.TenSV}
              placeholder="nhập tên vào đây"
            />
          </div>
          <div>
            <label className="font-semibold">Nhập Ngày Sinh : </label>
            <input
              className={inputC}
              onChange={(e) =>
                setAddSinhVien({ ...addSinhVien, NgaySinh: e.target.value })
              }
              value={addSinhVien.NgaySinh}
              placeholder="nhập ngày sinh vào đây"
              type="date"
            />
          </div>
          <div>
            <label className="font-semibold">Mã Lớp : </label>
            <input
              className={inputC}
              onChange={(e) =>
                setAddSinhVien({ ...addSinhVien, MaLop: e.target.value })
              }
              value={addSinhVien.MaLop}
              placeholder="nhập mã lớp vào đây"
            />
          </div>
          <div>
            <label className="font-semibold">Mật khẩu : </label>
            <input
              className={inputC}
              onChange={(e) =>
                setAddSinhVien({ ...addSinhVien, MatKhau: e.target.value })
              }
              value={addSinhVien.MatKhau}
              placeholder="nhập mật khẩu vào đây"
            />
          </div>
        </div>
        <div>
          <button className={btnAdd} onClick={handleClickAdd}>
            Thêm Sinh Viên
          </button>
        </div>
      </section>
      <h1 className="text-2xl m-5">Danh sách sinh viên </h1>
      <section className="grid grid-cols-3 grid-rows-2 gap-5 ">
        {dataSinhVien.map((item) => (
          <div className="border border-gray-300 p-4" key={item.MaSV}>
            <div>Tên Sinh Viên : {item.TenSV}</div>
            <div>Mã Sinh Viên : {item.MaSV}</div>
            <div>Lớp Học : {item.MaLop}</div>
            <div>Mật Khẩu : {item.MatKhau}</div>
            <div>
              Ngày sinh: {new Date(item.NgaySinh).toLocaleDateString("vi-VN")}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

// divide-x divide-y  : đường kẻ khi dùng grid
