
use employee_db;


create table employee(id int auto_increment primary key, first_name varchar(20), last_name varchar(20), contact int, email varchar(40), dob date, address varchar(50)) auto_increment=1;

INSERT INTO employee (first_name, last_name, contact, email, dob, address) VALUES ('John', 'Doe', 1234567890, 'john@example.com', '1990-01-15', '123 Main St');
ALTER TABLE employee MODIFY contact BIGINT;
select * from employee;

-- drop table employee;