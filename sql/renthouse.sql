create database renthouse;

use renthouse;

create table house(
	idHouse int not null primary key auto_increment,
    nameHouse varchar(60),
    typeRoom varchar(60),
    addressHouse varchar(255),
    amountBedroom int not null,    
    amountBathroom int not null,
    description varchar(255),
    pricePerDay int not null,
    image text,
    statusHouse varchar(20),
    countCustomer int not null
);

create table customer (
	idCustomer int not null primary key auto_increment,
    nameCustomer varchar(60),
    yearOfBirth year(4) not null,
    addressCustomer varchar(255),
    phoneNumber varchar(10) not null,    
    email varchar(255),
    userName varchar(255) not null,
    passWord varchar(255) not null,
    avatar text
);

create table ordermanager(
	idOrder int not null primary key auto_increment,
    checkIn date not null,
    checkOut date not null,
    timeRent int not null,
    totalMoney int not null,
    idHouse int not null,
    idCustomer int not null,
    statusOrder varchar(45) not null
);

insert into house (nameHouse, typeRoom, addressHouse, amountBedroom, amountBathroom, description, pricePerDay, statusHouse) values ('Nhà A', 'Phòng VIP', 'Hoàn Kiếm', 3, 3, 'Sạch, đẹp', 70, 'Còn trống');
insert into house (nameHouse, typeRoom, addressHouse, amountBedroom, amountBathroom, description, pricePerDay, statusHouse) values ('Nhà B', 'Phòng đơn', 'Hoàn Kiếm', 6, 4, 'Sạch, đẹp', 50, 'Còn trống');
insert into house (nameHouse, typeRoom, addressHouse, amountBedroom, amountBathroom, description, pricePerDay, statusHouse) values ('Nhà C', 'Phòng đôi', 'Hoàn Kiếm', 5, 4, 'Sạch, đẹp', 55, 'Còn trống');
insert into house (nameHouse, typeRoom, addressHouse, amountBedroom, amountBathroom, description, pricePerDay, statusHouse) values ('Nhà D', 'Phòng Luxury', 'Hoàn Kiếm', 4, 3, 'Sạch, đẹp', 100, 'Còn trống');
insert into house (nameHouse, typeRoom, addressHouse, amountBedroom, amountBathroom, description, pricePerDay, statusHouse) values ('Nhà E', 'Phòng Tổng Thống', 'Hoàn Kiếm', 3, 3, 'Sạch, đẹp', 200, 'Còn trống');

insert into customer (nameCustomer, yearOfBirth, addressCustomer, phoneNumber, email, userName, passWord) values ('Alex', 1990, 'Cầu Giấy', 0123456789, 'alex@gmail.com', 'alex1990', 'alex123');
insert into customer (nameCustomer, yearOfBirth, addressCustomer, phoneNumber, email, userName, passWord) values ('Barry', 1993, 'Hai Bà Trưng', 0987654321, 'barry@gmail.com', 'barry1993', 'barry123');
insert into customer (nameCustomer, yearOfBirth, addressCustomer, phoneNumber, email, userName, passWord) values ('Clark', 1992, 'Hoàng Mai', 0135792468, 'clark@gmail.com', 'clark1992', 'clark123');

UPDATE house SET image = 'a.jpg' WHERE idHouse = 1;
UPDATE house SET image = '1.jpg' WHERE idHouse = 2;
UPDATE house SET image = 'a.jpg' WHERE idHouse = 3;
UPDATE house SET image = '1.jpg' WHERE idHouse = 4;
UPDATE house SET image = 'a.jpg' WHERE idHouse = 5;


UPDATE customer SET avatar = '1.jpg' WHERE idCustomer = 1;
UPDATE customer SET avatar = 'a.jpg' WHERE idCustomer = 2;
UPDATE customer SET avatar = '1.jpg' WHERE idCustomer = 3;

ALTER TABLE `renthouse`.`house` 
ADD COLUMN `countCustomer` INT NOT NULL AFTER `statusHouse`;

DELETE  FROM ordermanager WHERE idOrder = 10;