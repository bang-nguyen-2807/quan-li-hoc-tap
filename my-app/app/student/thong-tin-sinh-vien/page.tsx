"use client";

import { useEffect, useState } from "react";

interface SinhVien {
  MaSV: number;
  TenSV: string;
  NgaySinh: string;
  MaLop: string;
}

const inputC =
  "bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400";

const btnAdd =
  "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition";

export default function SinhVienPage() {
  const [listSV, setListSV] = useState<SinhVien[]>([]);
  const [addSV, setAddSV] = useState({
    TenSV: "",
    NgaySinh: "",
    MaLop: "",
    MatKhau: "",
  });

  /* =======================
     GET danh sách sinh viên
     ======================= */
  const fetchSV = async () => {
    const res = await fetch("/api/sinhVien/danh-sach-sinh-vien");
    const data = await res.json();
    setListSV(data);
  };

  useEffect(() => {
    fetchSV();
  }, []);

  /* =======================
     POST thêm sinh viên
     ======================= */
  const handleAdd = async () => {
    try {
      const res = await fetch("/api/sinhVien/danh-sach-sinh-vien", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addSV),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message);
        return;
      }

      setAddSV({
        TenSV: "",
        NgaySinh: "",
        MaLop: "",
        MatKhau: "",
      });

      fetchSV();
      alert("Thêm sinh viên thành công");
    } catch (error) {
      console.log(error);
      alert("Lỗi thêm sinh viên");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* FORM */}
      <section className="mt-5 flex flex-col gap-5">
        <div className="flex gap-6">
          <div>
            <label className="font-semibold">Tên sinh viên</label>
            <input
              className={inputC}
              value={addSV.TenSV}
              onChange={(e) => setAddSV({ ...addSV, TenSV: e.target.value })}
              placeholder="Nhập tên"
            />
          </div>

          <div>
            <label className="font-semibold">Ngày sinh</label>
            <input
              type="date"
              className={inputC}
              value={addSV.NgaySinh}
              onChange={(e) => setAddSV({ ...addSV, NgaySinh: e.target.value })}
            />
          </div>

          <div>
            <label className="font-semibold">Mã lớp</label>
            <input
              className={inputC}
              value={addSV.MaLop}
              onChange={(e) => setAddSV({ ...addSV, MaLop: e.target.value })}
              placeholder="VD: CT01"
            />
          </div>

          <div>
            <label className="font-semibold">Mật khẩu</label>
            <input
              type="password"
              className={inputC}
              value={addSV.MatKhau}
              onChange={(e) => setAddSV({ ...addSV, MatKhau: e.target.value })}
              placeholder="******"
            />
          </div>
        </div>

        <button className={btnAdd} onClick={handleAdd}>
          Thêm sinh viên
        </button>
      </section>

      {/* DANH SÁCH */}
      <h1 className="text-2xl m-5">Danh sách sinh viên</h1>

      <section className="grid grid-cols-3 gap-5">
        {listSV.map((sv) => (
          <div key={sv.MaSV} className="border border-gray-300 p-4 rounded-lg">
            <div>Mã SV: {sv.MaSV}</div>
            <div>Tên: {sv.TenSV}</div>
            <div>Lớp: {sv.MaLop}</div>
            <div>
              Ngày sinh:{" "}
              {sv.NgaySinh
                ? new Date(sv.NgaySinh).toLocaleDateString("vi-VN")
                : "—"}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
