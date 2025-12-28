CREATE DATABASE QLTruongHoc;
GO
USE QLTruongHoc;
GO

CREATE TABLE Khoa(
	MaKhoa char(10) Primary key,
	TenKhoa NVARCHAR(25) NOT NULL , 
)
CREATE TABLE GiaoVien(
	MaGV char(10) Primary key not null ,
	TenGV NVARCHAR(70) not null,
	MaKhoa char(10),
	foreign key (Makhoa) references Khoa(MaKhoa)
)
CREATE TABLE Class(
	MaLop char(10) PRIMARY KEY,
	TenLop NVARCHAR(50)NOT NULL ,
	MaKhoa char(10), 
	MaGVCN char(10),
	FOREIGN KEY (MaKhoa) REFERENCES Khoa(Makhoa),
	foreign key (MaGVCN) REFERENCES GiaoVien(MaGV)
)
CREATE TABLE MonHoc(
	MaMon CHAR(20) PRIMARY KEY,
	TenMon Nvarchar(100) not null,
	MaKhoa char(10),
	MaGV char(10),
	foreign key (MaKhoa) references Khoa(MaKhoa),
	foreign key (MaGV) references GiaoVien(MaGV)
)
CREATE TABLE SinhVien(
	MaSV INT IDENTITY(1,1) PRIMARY KEY,
	TenSV nvarchar(70) NOT NULL,
	NgaySinh Date, -- nam - thang - ngay	
	MaLop char(10),
	FOREIGN KEY (MaLop) REFERENCES Class(Malop)
)
-- 6. Bảng Kết quả/Đăng ký (Để sinh viên học được nhiều môn)
CREATE TABLE KetQua(
    MaSV INT,
    MaMon CHAR(20),
    Diem FLOAT,
    PRIMARY KEY (MaSV, MaMon),
    FOREIGN KEY (MaSV) REFERENCES SinhVien(MaSV),
    FOREIGN KEY (MaMon) REFERENCES MonHoc(MaMon)
);

-- 7 : bảng phân công giáo viên 
CREATE TABLE PhanCong (
    MaGV CHAR(10),
    MaMon CHAR(20),
    MaLop CHAR(10),
    PRIMARY KEY (MaGV, MaMon, MaLop),
    FOREIGN KEY (MaGV) REFERENCES GiaoVien(MaGV),
    FOREIGN KEY (MaMon) REFERENCES MonHoc(MaMon),
    FOREIGN KEY (MaLop) REFERENCES Class(MaLop)
);

ALTER TABLE GiaoVien
ADD MatKhau NVARCHAR(50) NOT NULL;
INSERT INTO Khoa VALUES
('CNTT', N'Công nghệ thông tin'),
('KT',   N'Kinh tế'),
('NN',   N'Ngoại ngữ');
GO

INSERT INTO GiaoVien VALUES
('GV01', N'Nguyễn Văn An', 'CNTT'),
('GV02', N'Trần Thị Bình', 'CNTT'),
('GV03', N'Lê Hoàng Minh', 'KT'),
('GV04', N'Phạm Thu Hà',   'NN');


go

INSERT INTO Class VALUES
('CT01', N'Công nghệ thông tin 01', 'CNTT', 'GV01'),
('CT02', N'Công nghệ thông tin 02', 'CNTT', 'GV02'),
('KT01', N'Kinh tế 01',             'KT',   'GV03'),
('NN01', N'Ngoại ngữ 01',           'NN',   'GV04');

go

INSERT INTO MonHoc VALUES
('MH01', N'Cơ sở dữ liệu',        'CNTT', 'GV01'),
('MH02', N'Lập trình Web',        'CNTT', 'GV02'),
('MH03', N'Kinh tế vi mô',        'KT',   'GV03'),
('MH04', N'Tiếng Anh chuyên ngành','NN',  'GV04');

go

INSERT INTO SinhVien (TenSV, NgaySinh, MaLop) VALUES
(N'Nguyễn Minh Tuấn', '2003-05-12', 'CT01'),
(N'Trần Thị Lan',    '2003-09-20', 'CT01'),
(N'Lê Quốc Huy',     '2003-02-18', 'CT02'),
(N'Phạm Ngọc Mai',   '2003-11-30', 'KT01'),
(N'Võ Thanh Tâm',    '2003-07-07', 'NN01');

go

INSERT INTO KetQua VALUES
(1, 'MH01', 8.5),
(1, 'MH02', 7.8),
(2, 'MH01', 9.0),
(3, 'MH02', 6.5),
(4, 'MH03', 8.0),
(5, 'MH04', 8.7);

-- hãy in ra dữ liệu . giáo viên nào dạy sinh viên nào 
SELECT 
    gv.TenGV AS [Giáo Viên Chủ Nhiệm],
    cl.TenLop AS [Tên Lớp],
    sv.TenSV AS [Tên Sinh Viên]
FROM GiaoVien gv
JOIN Class cl ON gv.MaGV = cl.MaGVCN  -- Nối giáo viên với lớp qua cột GVCN
JOIN SinhVien sv ON cl.MaLop = sv.MaLop; -- Nối lớp với sinh viên qua MaLop

-- LẤY DỮ LIỆU GIÁO VIÊN DẠY MÔN NÀO , LỚP NÀO , SINH VIÊN NÀO HỌC LỚP ĐÓ
SELECT 
    GV.TenGV  AS TenGV,
    CL.MaLop  AS MaLop,
    CL.TenLop AS TenLop,
    SV.TenSV  AS TenSV
FROM GiaoVien GV
JOIN Class CL ON GV.MaGV = CL.MaGVCN
JOIN SinhVien SV ON CL.MaLop = SV.MaLop

-- LẤY DỮ LIỆU GIÁO VIÊN DẠY MÔN NÀO CHO LỚP NÀO
SELECT 
    GV.TenGV AS N'Tên Giáo Viên',
    CL.MaLop  AS N'Mã Lớp',
    CL.TenLop AS N'Tên Lớp',
    MH.TenMon AS N'Tên Môn'
FROM Class CL
JOIN GiaoVien GV ON CL.MaGVCN = GV.MaGV
JOIN MonHoc MH ON GV.MaGV = MH.MaGV;

-- thêm mật khẩu vào bảng giáo viên
ALTER TABLE GiaoVien
ADD MatKhau NVARCHAR(50) NULL;

UPDATE GiaoVien
SET MatKhau = '123456'
WHERE MatKhau IS NULL;

ALTER TABLE GiaoVien
ALTER COLUMN MatKhau NVARCHAR(50) NOT NULL;

INSERT INTO GiaoVien (MaGV, TenGV, MaKhoa, MatKhau)
VALUES (
    'GV1000',
    N'Nguyễn Văn P',
    'CNTT',
    '1234567'
);

ALTER TABLE SinhVien
ADD MatKhau NVARCHAR(50) NULL;

UPDATE SinhVien
SET MatKhau = '123456'
WHERE MatKhau IS NULL;

ALTER TABLE SinhVien
ALTER COLUMN MatKhau NVARCHAR(50) NOT NULL;

INSERT INTO SinhVien (TenSV, NgaySinh, MaLop, MatKhau)
VALUES (
    N'Nguyễn Văn B',
    '2004-05-12',
    'KT01',
    '123456'
);

