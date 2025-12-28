"use client";

import { useEffect, useState } from "react";

interface diem {
  MaSV: number;
  MaMon: string;
  Diem: number;
}
export default function DiemTeacher() {
  const [score, setScore] = useState<diem[]>([]);
  const [addScore, setAddScore] = useState({
    MaSV: "",
    MaMon: "",
    Diem: "",
  });
  const diemAD = async () => {
    try {
      const res = await fetch("/api/teacher/nhap-diem");
      const data: diem[] = await res.json();
      setScore(data);
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    diemAD();
  }, []);
  const handleClickAdd = async () => {
    try {
      const res = await fetch("/api/teacher/nhap-diem", {
        method: "POST",
        body: JSON.stringify(addScore),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setAddScore({ MaSV: "", MaMon: "", Diem: "" });
        diemAD();
        alert("nhập điểm thành công");
      }
    } catch (err) {
      console.log("err", err);
      alert("nhập điểm thất bại");
    }
  };

  return (
    <div className="flex items-center flex-col">
      {/* FORM NHẬP ĐIỂM */}
      <section className="mt-5 flex flex-col items-center gap-5">
        <div className="flex gap-10">
          {/* MÃ SINH VIÊN */}
          <div>
            <label className="font-semibold">Mã Sinh Viên : </label>
            <input
              className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5 
                             focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={addScore.MaSV}
              onChange={(e) =>
                setAddScore({ ...addScore, MaSV: e.target.value })
              }
              placeholder="Nhập mã sinh viên"
            />
          </div>

          {/* MÃ MÔN */}
          <div>
            <label className="font-semibold">Mã Môn : </label>
            <input
              className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5 
                             focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={addScore.MaMon}
              onChange={(e) =>
                setAddScore({ ...addScore, MaMon: e.target.value })
              }
              placeholder="Nhập mã môn"
            />
          </div>

          {/* ĐIỂM */}
          <div>
            <label className="font-semibold">Điểm : </label>
            <input
              type="number"
              step="0.1"
              className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5 
                             focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={addScore.Diem}
              onChange={(e) =>
                setAddScore({ ...addScore, Diem: e.target.value })
              }
              placeholder="Nhập điểm"
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
            Thêm Điểm
          </button>
        </div>
      </section>

      {/* DANH SÁCH ĐIỂM */}
      <h1 className="text-2xl m-5">Danh sách điểm sinh viên</h1>

      <section className="grid grid-cols-3 gap-5">
        {score.map((item, index) => (
          <div key={index} className="border border-gray-300 p-4 rounded-lg">
            <div>Mã Sinh Viên : {item.MaSV}</div>
            <div>Mã Môn : {item.MaMon}</div>
            <div>Điểm : {item.Diem}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
