"use client";

import { useEffect, useState } from "react";

interface khoa {
  MaKhoa: string;
  TenKhoa: string;
}
const inputC =
  "bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400";
const btnAdd =
  "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition";
export default function Khoa() {
  const [department, setDepartment] = useState<khoa[]>([]); // department là khoa
  const [addDepartment, setAddDepartment] = useState({
    MaKhoa: "",
    TenKhoa: "",
  });
  const khoa = async () => {
    try {
      const res = await fetch("/api/admin/danh-sach-khoa");
      const data: khoa[] = await res.json();
      setDepartment(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    khoa();
  }, []);

  const handleClickAdd = async () => {
    try {
      const res = await fetch("/api/admin/danh-sach-khoa", {
        method: "POST",
        body: JSON.stringify(addDepartment),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setAddDepartment({ MaKhoa: "", TenKhoa: "" });
        khoa();
        alert("Thêm Khoa Thành Công");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="flex items-center flex-col">
      {/* FORM THÊM KHOA */}
      <section className="mt-5 flex flex-col items-center gap-5">
        <div className="flex gap-10">
          <div>
            <label className="font-semibold">Tên Khoa : </label>
            <input
              className={inputC}
              onChange={(e) =>
                setAddDepartment({ ...addDepartment, TenKhoa: e.target.value })
              }
              value={addDepartment.TenKhoa}
              placeholder="Nhập tên khoa"
            />
          </div>

          <div>
            <label className="font-semibold">Mã Khoa : </label>
            <input
              className={inputC}
              onChange={(e) =>
                setAddDepartment({ ...addDepartment, MaKhoa: e.target.value })
              }
              value={addDepartment.MaKhoa}
              placeholder="Nhập mã khoa"
            />
          </div>
        </div>

        <div>
          <button className={btnAdd} onClick={handleClickAdd}>
            Thêm Khoa
          </button>
        </div>
      </section>

      {/* DANH SÁCH KHOA */}
      <h1 className="text-2xl m-5">Danh sách khoa</h1>

      <section className="grid grid-cols-3 gap-5">
        {department.map((room) => (
          <div
            key={room.MaKhoa}
            className="border border-gray-300 p-4 rounded-lg"
          >
            <div>Tên Khoa : {room.TenKhoa}</div>
            <div>Mã Khoa : {room.MaKhoa}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
