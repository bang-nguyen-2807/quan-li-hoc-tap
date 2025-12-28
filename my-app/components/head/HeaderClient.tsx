"use client";

import { useRouter } from "next/navigation";

type Props = {
  role: string;
};

export default function HeaderClient({ role }: Props) {
  const route = useRouter();

  return (
    <>
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1e293b] text-gray-300 flex flex-col shadow-xl">
        <div className="p-6 text-white border-b border-gray-700 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-md"></div>
          <span className="font-bold text-lg uppercase">
            UED Admin
          </span>
        </div>

        <div className="flex flex-col p-4 space-y-2">

          {/* ===== ADMIN ===== */}
          {role === "ADMIN" && (
            <>
              <h2 onClick={() => route.push("/admin/khoa")} className="menu">Khoa</h2>
              <h2 onClick={() => route.push("/admin/giao-vien")} className="menu">Giáo viên</h2>
              <h2 onClick={() => route.push("/admin/lop-hoc")} className="menu">Lớp</h2>
              <h2 onClick={() => route.push("/admin/mon-hoc")} className="menu">Học phần</h2>
              <h2 onClick={() => route.push("/admin/sinh-vien")} className="menu">Sinh viên</h2>
              <h2 onClick={() => route.push("/admin/ket-qua")} className="menu">Kết quả</h2>
            </>
          )}

          {/* ===== TEACHER ===== */}
          {role === "TEACHER" && (
            <>
              <h2 onClick={() => route.push("/teach/danh-sach-lop")} className="menu">
                Danh sách lớp
              </h2>
            </>
          )}

          {/* ===== STUDENT ===== */}
          {role === "STUDENT" && (
            <>
              <h2 onClick={() => route.push("/student/thong-tin-sinh-vien")} className="menu">
                Thông tin sinh viên
              </h2>
            </>
          )}

        </div>
      </aside>

      {/* HEADER TOP */}
      <header className="ml-64 bg-white border-b h-20 flex items-center px-8 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">
          Quản Lí Trường Học
        </h1>
      </header>
    </>
  );
}
