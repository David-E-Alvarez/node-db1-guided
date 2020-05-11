
select * from Emplyees;

select employeeId, (firstName || ' ' || lastName) as Name, birthdate
from employees;

select employeeId, (firstName || ' ' || lastName) as Name, birthdate
from employees
where birthDate > '1965-01-01'; -- use single quotes for dates and strings

/*
multiline
comments
*/

select * from products where price >= 100 and price < 200;

-- the 5 most expensive products on the catalog
select * 
from products 
order by price desc
limit 5;

-- order by multiple columns
select country, city, address, customerName from customers
order by country, city, customerName

-- adding data
insert into categories (categoryName, Description)
values ('Lambda Swag', 'Awesome Lambda Memorabilia');

select * from categories
where categoryName like '%am%da%'; -- partial searches

-- updating data

--select * from categories
update categories
	set categoryName = 'LS Swag', description = 'Lambda Swag'
where categoryId = 9;

-- removing data

--select * from categories
delete from categories
where categoryId = 9;