"use client";

import { FormEvent } from "react";

type Role = "ADMIN" | "TEACH" | "STUDENT";

export default function Login() {
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      alert("Sai tài khoản hoặc mật khẩu");
      return;
    }

    const data: { role: Role } = await res.json();

    if (data.role === "ADMIN") {
      window.location.href = "/admin/khoa";
    } else if (data.role === "TEACH") {
      window.location.href = "/teach/danh-sach-lop";
    } else if (data.role === "STUDENT") {
      window.location.href = "/student/thong-tin-sinh-vien";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          Đăng nhập hệ thống
        </h1>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Tài khoản</label>
          <input
            name="username"
            placeholder="admin hoặc mã giáo viên"
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Mật khẩu</label>
          <input
            name="password"
            type="password"
            placeholder="Nhập mật khẩu"
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
