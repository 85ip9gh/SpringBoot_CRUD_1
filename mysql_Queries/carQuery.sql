create database pesanth;
use pesanth;

select * from cars;
select * from user_details;

insert into user_details(id, name,active, authorities, password, roles) values (125, 'sam', 1,'ROLE_USER', 'man', 'ROLE_USER');


delete from user_details where id=1;

ALTER TABLE user_details DROP COLUMN authorities;

