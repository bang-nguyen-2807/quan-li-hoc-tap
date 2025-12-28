"use client";
import { useEffect, useState } from "react";

interface giaovien {
  MaGV: string;
  TenGV: string;
  MaKhoa: string;
  MatKhau : string;
}
const inputC =
  "bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400";
const btnAdd =
  "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition";
export default function GiaoVien() {
  const [teacher, setTeacher] = useState<giaovien[]>([]);
  const [addTeach, setAddTeach] = useState({
    MaGV: "",
    TenGV: "",
    MaKhoa: "",
    MatKhau : ""
  });
  const giaovien = async () => {
    try {
      const res = await fetch("/api/admin/danh-sach-giao-vien");
      const data: giaovien[] = await res.json();
      setTeacher(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    giaovien();
  }, []);

  const handleClickAdd = async () => {
    try {
      const res = await fetch("/api/admin/danh-sach-giao-vien", {
        method: "POST",
        body: JSON.stringify(addTeach),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setAddTeach({ MaGV: "", TenGV: "", MaKhoa: "" , MatKhau : "" });
        await giaovien();
        alert("Thêm Giaó Viên Thành Công");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="flex items-center flex-col">
      {/* FORM THÊM GIÁO VIÊN */}
      <section className="mt-5 flex flex-col items-center gap-5">
        <div className="flex gap-10">
          <div>
            <label className="font-semibold">Tên Giáo Viên : </label>
            <input
              className={inputC}
              onChange={(e) =>
                setAddTeach({ ...addTeach, TenGV: e.target.value })
              }
              value={addTeach.TenGV}
              placeholder="Nhập tên giáo viên"
            />
          </div>

          <div>
            <label className="font-semibold">Mã Giáo Viên : </label>
            <input
              className={inputC}
              onChange={(e) =>
                setAddTeach({ ...addTeach, MaGV: e.target.value })
              }
              value={addTeach.MaGV}
              placeholder="Nhập mã giáo viên"
            />
          </div>

          <div>
            <label className="font-semibold">Mã Khoa : </label>
            <input
              className={inputC}
              onChange={(e) =>
                setAddTeach({ ...addTeach, MaKhoa: e.target.value })
              }
              value={addTeach.MaKhoa}
              placeholder="Nhập mã khoa"
            />
          </div>

          <div>
            <label className="font-semibold">Mật Khẩu : </label>
            <input
              className={inputC}
              onChange={(e) =>
                setAddTeach({ ...addTeach, MatKhau: e.target.value })
              }
              value={addTeach.MatKhau}
              placeholder="Nhập mật khẩu"
            />
          </div>
        </div>

        <div>
          <button className={btnAdd} onClick={handleClickAdd}>
            Thêm Giáo Viên
          </button>
        </div>
      </section>

      {/* DANH SÁCH GIÁO VIÊN */}
      <h1 className="text-2xl m-5">Danh sách giáo viên</h1>

      <section className="grid grid-cols-3 gap-5">
        {teacher.map((teach) => (
          <div
            key={teach.MaGV}
            className="border border-gray-300 p-4 rounded-lg"
          >
            <div>Tên Giáo Viên : {teach.TenGV}</div>
            <div>Mã Giáo Viên : {teach.MaGV}</div>
            <div>Khoa : {teach.MaKhoa}</div>
            <div>Mật khẩu : {teach.MatKhau}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
