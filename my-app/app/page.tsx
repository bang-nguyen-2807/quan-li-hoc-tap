"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // Dữ liệu cho các thẻ thống kê
  const stats = [
    {
      label: "Tổng số Khoa",
      value: "12",
      color: "border-blue-500",
      icon: "🏢",
    },
    {
      label: "Giảng viên",
      value: "150",
      color: "border-green-500",
      icon: "👨‍🏫",
    },
    {
      label: "Sinh viên",
      value: "2,500",
      color: "border-purple-500",
      icon: "🎓",
    },
    { label: "Lớp học", value: "85", color: "border-orange-500", icon: "🏫" },
  ];

  return (
    <main className="ml-5 p-8 bg-[#f8fafc] min-h-screen">
      {/* Tiêu đề trang */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Bảng điều khiển hệ thống
          </h1>
          <p className="text-gray-500 text-sm">
            Chào mừng quay trở lại, đây là tóm tắt dữ liệu hôm nay.
          </p>
        </div>

        {/* ===== NÚT ĐĂNG NHẬP ===== */}
        <button
          onClick={() => router.push("/login")}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold
                     hover:bg-blue-700 transition shadow-sm flex items-center gap-2"
        >
          🔐 Đăng nhập
        </button>
      </div>

      {/* Grid thẻ thống kê nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${item.color} hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {item.label}
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {item.value}
                </p>
              </div>
              <span className="text-2xl">{item.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Phần biểu đồ và thông báo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-700 mb-4">
            Hoạt động đăng ký học phần
          </h3>
          <div className="h-64 w-full bg-gray-50 rounded-lg flex items-end justify-around p-4 gap-2">
            <div className="bg-blue-400 w-12 h-[40%] rounded-t-md"></div>
            <div className="bg-blue-400 w-12 h-[60%] rounded-t-md"></div>
            <div className="bg-blue-600 w-12 h-[85%] rounded-t-md shadow-lg shadow-blue-100"></div>
            <div className="bg-blue-400 w-12 h-[50%] rounded-t-md"></div>
            <div className="bg-blue-400 w-12 h-[70%] rounded-t-md"></div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4 italic">
            Dữ liệu thống kê theo tuần
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-700 mb-4">Thông báo mới</h3>
          <div className="space-y-4">
            <div className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Họp hội đồng khoa CNTT
                </p>
                <p className="text-xs text-gray-500">14:00 - Hôm nay</p>
              </div>
            </div>

            <div className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border-t">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Cập nhật danh sách sinh viên mới
                </p>
                <p className="text-xs text-gray-500">Đã hoàn thành lúc 08:30</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
