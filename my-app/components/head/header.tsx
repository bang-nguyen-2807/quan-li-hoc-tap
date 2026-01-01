"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Role = "ADMIN" | "TEACH" | "STUDENT" | "";
type User = {
  role: "ADMIN" | "TEACH" | "STUDENT";
  name: string;
};
export default function Header() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("");
  const [user, setUser] = useState<User | null>(null);

  // ===== LẤY ROLE TỪ COOKIE (CLIENT ONLY – KHÔNG LỖI) =====
  useEffect(() => {
    const roleCookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("role="))
      ?.split("=")[1];

    if (
      roleCookie === "ADMIN" ||
      roleCookie === "TEACH" ||
      roleCookie === "STUDENT"
    ) {
      setRole(roleCookie);
    }
  }, []);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data));
  }, []);

  const go = (path: string) => router.push(path);

  // ❗ tránh trắng màn khi cookie chưa load
  if (!role) return null;

  return (
    <>
      {/* ===== SIDEBAR ===== */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1e293b] text-gray-300 flex flex-col shadow-xl">
        {/* LOGO */}
        <div className="p-6 text-white border-b border-gray-700 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-md"></div>
          <span className="font-bold text-lg tracking-wider uppercase">
            UED ADMIN
          </span>
        </div>

        {/* MENU */}
        <div className="flex flex-col p-4 space-y-2">
          {/* ================= ADMIN ================= */}
          {role === "ADMIN" && (
            <>
              <Menu label="Khoa" onClick={() => go("/admin/khoa")} />
              <Menu label="Giáo viên" onClick={() => go("/admin/giao-vien")} />
              <Menu label="Lớp" onClick={() => go("/admin/Lop-Hoc")} />
              <Menu label="Học phần" onClick={() => go("/admin/mon-hoc")} />
              <Menu label="Sinh viên" onClick={() => go("/admin/sinh-vien")} />
              <Menu
                label="Kết quả học tập"
                onClick={() => go("/admin/ket-qua")}
              />
            </>
          )}

          {/* ================= TEACH ================= */}
          {role === "TEACH" && (
            <>
              <Menu
                label="Danh sách lớp"
                onClick={() => go("/teach/danh-sach-lop")}
              />
              <Menu
                label="Danh sách sinh viên"
                onClick={() => go("/teach/danh-sach-sinh-vien")}
              />
              <Menu
                label="Môn học"
                onClick={() => go("/teach/danh-sach-mon")}
              />
              <Menu label="Nhập điểm" onClick={() => go("/teach/nhap-diem")} />
            </>
          )}

          {/* ================= STUDENT ================= */}
          {role === "STUDENT" && (
            <>
              <Menu
                label="Thông tin sinh viên"
                onClick={() => go("/student/thong-tin-sinh-vien")}
              />
              <Menu
                label="Học phần học tập"
                onClick={() => go("/student/hoc-phan")}
              />
            </>
          )}
        </div>
      </aside>

      {/* ===== HEADER TOP ===== */}
      <header className="ml-64 bg-white border-b border-gray-200 h-20 flex items-center px-8 shadow-sm">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl font-bold text-gray-800">
            Quản Lí Trường Học
          </h1>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <h2 className="text-sm font-bold text-gray-700">
                {role === "ADMIN" && <span>{user?.name}</span>}
                {role === "TEACH" && <span>{user?.name}</span>}
                {role === "STUDENT" && <span>{user?.name}</span>}
              </h2>
              <p className="text-xs text-blue-500 font-semibold">
                ROLE: {role}
              </p>
            </div>

            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
              AVATAR
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

/* ===== MENU ITEM – GIỮ STYLE GỐC ===== */
function Menu({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <h2
      onClick={onClick}
      className="p-3 hover:bg-gray-800 hover:text-white rounded-lg transition-all cursor-pointer font-medium"
    >
      {label}
    </h2>
  );
}
