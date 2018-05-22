drop database bamazon;
create database bamazon;
use bamazon;

create table products2(
  id INT AUTO_INCREMENT NOT NULL,
  product VARCHAR(45) NOT NULL,
  department VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT(10) NOT NULL,
  product_sales INT(100) NOT NULL,
  primary key(id)
);
INSERT INTO products2 (product, department, price, stock, product_sales)
VALUES ("socks", "clothes", 5.50, 5, 5);
INSERT INTO products2 (product, department, price, stock, product_sales)
VALUES ("shirts", "clothes", 10.50, 25, 50);
INSERT INTO products2 (product, department, price, stock, product_sales)
VALUES ("hats", "clothes", 12.50, 14, 25);
INSERT INTO products2 (product, department, price, stock, product_sales)
VALUES ("skateboard", "sports", 100.50, 15, 45);
INSERT INTO products2 (product, department, price, stock, product_sales)
VALUES ("basketball", "sports", 9.50, 20, 55);
INSERT INTO products2 (product, department, price, stock, product_sales)
VALUES ("baseball", "sports", 2.50, 35, 10);
INSERT INTO products2 (product, department, price, stock, product_sales)
VALUES ("apple", "food", .50, 25, 15);
INSERT INTO products2 (product, department, price, stock, product_sales)
VALUES ("milk", "food", 2.50, 14, 12);
INSERT INTO products2 (product, department, price, stock, product_sales)
VALUES ("cake", "food", 10.50, 25, 20);
INSERT INTO products2 (product, department, price, stock, product_sales)
VALUES ("fish", "food", 9.50, 20, 15);
INSERT INTO products2 (product, department, price, stock, product_sales)
VALUES ("candy", "food", 2.50, 35, 15);