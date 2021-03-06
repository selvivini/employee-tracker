DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;
CREATE TABLE department(
  id INT AUTO_INCREMENT NOT NULL,
  name (VARCHAR (30)) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE role(
  id INT AUTO_INCREMENT NOT NULL,
  title (VARCHAR (30)),
  SALARY DECIMAL (10, 2),
  department_id INT NOT NULL,
  PRIMARY KEY(id)
);
CREATE TABLE employee(
  id INT AUTO_INCREMENT NOT NULL,
  first_name (VARCHAR (30)) NOT NULL,
  last_name(VARCHAR (30)) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT DEFAULT NULL,
  PRIMARY KEY(id)
);