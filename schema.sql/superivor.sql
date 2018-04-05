use bamazon;

CREATE TABLE departments(
  department_id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  over_head_costs DECIMAL(10,2) NOT NULL,
  primary key(department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("clothes", 200),
  ("sports", 100),
  ("food", 50)