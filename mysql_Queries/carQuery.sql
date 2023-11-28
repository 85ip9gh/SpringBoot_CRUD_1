create database pesanth;
use pesanth;

select * from cars;
select * from user_details;

select * from user_details where id=11;

delete from user_details where id between 5 and 9;

insert into user_details(id, name,active, authorities, password, roles) values (125, 'sam', 1,'ROLE_USER', 'man', 'ROLE_USER');
insert into user_details(id, name, password, roles) values (1, 'Oak', 'man' ,'ROLE_USER');

delete from user_details where id=1;

ALTER TABLE user_details DROP COLUMN authorities;

