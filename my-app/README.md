# QUẢN LÍ TRƯỜNG HỌC

## Mô tả dự án

Dự án **Quản lí trường học** là một ứng dụng web được phát triển bằng **Next.js** cho phép quản lý các thông tin trong trường học như:

- Quản lý Khoa, Lớp, Sinh viên, Giảng viên.
- Quản lý đăng nhập và phân quyền cho **Admin** và **Giảng viên**.
- Hiển thị các thống kê trực quan về trường học.
- Phân quyền truy cập theo vai trò (Admin/Teacher), tự động đăng xuất khi đăng nhập với vai trò khác.

## Công nghệ sử dụng

- **Frontend & Backend:** Next.js 13 (App Router)
- **Database:** Microsoft SQL Server
- **Ngôn ngữ:** TypeScript
- **Các thư viện hỗ trợ:**
  - `mssql` để kết nối và truy vấn SQL Server
  - Tailwind CSS cho giao diện
  - React Icons / Emoji cho biểu tượng trực quan

## Tính năng chính

1. **Đăng nhập & phân quyền**

   - Hỗ trợ đăng nhập cho Admin và Giảng viên.
   - Phân quyền truy cập từng folder (Admin/Teacher).
   - Khi đăng nhập với vai trò mới, vai trò cũ sẽ tự động đăng xuất.

2. **Quản lý dữ liệu**

   - Thêm, sửa, xóa Khoa, Lớp, Sinh viên, Giảng viên.
   - Lấy dữ liệu từ SQL Server thông qua API.

3. **Thống kê**

   - Hiển thị số lượng Khoa, Lớp, Sinh viên, Giảng viên dưới dạng thẻ thống kê.

4. **Giao diện linh hoạt**
   - Layout thay đổi header tùy theo vai trò người dùng.

## Cài đặt & chạy dự án

1. **tải và cài đặt dự án**
   - vào trang github với đường link : https://github.com/bang-nguyen-2807/quan-li-hoc-tap
   - down dự án về và thực hiện : npx create-next-app@latest
   - sau khi tải về thì chạy lệnh : npm run dev
2. **với đường dẫn là http://localhost:3000**
   - bạn có thể /admin , / teach , /student : để xem phân quyền
   - dùng tài khoản admin - password : 123 để sử dụng vs tư cách admin
   - sau khi vào dc admin bạn có thể tạo tài khoản sinh viên hoặc giảng viên và đăng xuất tài khoản admin để có thể sử dụng
