drop database bamazon;
create database bamazon;
use bamazon;

create table products2(
  id INT AUTO_INCREMENT NOT NULL,
  product VARCHAR(45) NOT NULL,
  department VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT(10) NOT NULL,
  primary key(id)
);
INSERT INTO products2 (product, department, price, stock)
VALUES ("socks", "clothes", 5.50, 5);
INSERT INTO products2 (product, department, price, stock)
VALUES ("shirts", "clothes", 10.50, 25);
INSERT INTO products2 (product, department, price, stock)
VALUES ("hats", "clothes", 12.50, 14);
INSERT INTO products2 (product, department, price, stock)
VALUES ("skateboard", "sports", 100.50, 15);
INSERT INTO products2 (product, department, price, stock)
VALUES ("basketball", "sports", 9.50, 20);
INSERT INTO products2 (product, department, price, stock)
VALUES ("baseball", "sports", 2.50, 35);
INSERT INTO products2 (product, department, price, stock)
VALUES ("apple", "food", .50, 25);
INSERT INTO products2 (product, department, price, stock)
VALUES ("milk", "food", 2.50, 14);
INSERT INTO products2 (product, department, price, stock)
VALUES ("cake", "food", 10.50, 25);
INSERT INTO products2 (product, department, price, stock)
VALUES ("fish", "food", 9.50, 20);
INSERT INTO products2 (product, department, price, stock)
VALUES ("candy", "food", 2.50, 35);