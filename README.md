# About this App
CarSale app lets you buy cars from other users and sell your own cars!

## Architecture:
- React as front-end
- Java Spring Boot as back-end api
    - REST api
    - Basic Spring Security Authentication 
    - Basic Authorization Token(Will be Updated to JWT Authorization in the future)
    - Authenticates and authorizes users based on user details obtained from mysql database.
    - JPA and hibernate to send SQL queries to database in response to user interaction
    - Datasource setup in application.properties file depending on localhost machine or docker container
- MySQL for relational database
    - Use mySQL CLI or mysql workbench to access database manually and check to see if data entries are being properly implemented

## Features:
- Add car to the site by providing the brand, type, color, and age of said car
- Update car when needed in case you've made a mistake
- List car for sale so that other users can buy it
- Buy cars from other users and grow your list of cars

# Future Features to be Added
- Change password encoder in spring boot api from NoOpPasswordEncoder to BCryptPasswordEncoder and figure out how to implement this given that all user details are stored in mysql database. Need to figure out where and how to decode the password for Spring Security to authenticate and authorize the user.
- Change login page from basic to form login in spring boot so that the user doesn't have access to their information after logging in and logging out in the same session. For example, the user can login, logout, then type in a random username/password and still be granted access to their information based on their first login.
- Add JWT and/or OAuth Authorization for extra security in spring boot.
- Convert the hex color value in the "update-car" page on front-end to show color names using the color hex values stored in the database. Use hex color code to 
  tint the image of car to add individuality.
- Add ADMIN users and give them ADMIN priviledges to see what cars all users have
- Use CSS to make website presentable
- Add money system to add value to cars and simulate real-life car-sale website.

# Updates

### 10/15/2023
- Dockerfile has been created and a snapshot.jar file of the Spring Boot API has also been made so that a docker image can be created.
- Docker image for mysql database and spring boot api has been created. 
- used video for reference: https://www.youtube.com/watch?v=S2s28PCg4M4
- Docker containers using above docker images have been run after numerous attempts and fixes to docker images and were successful. 
- Have checked that an initial user with username: "sam" and password: "man" gets added to the database by going into the docker container for mysql using command "docker exec -it <mysql container name> -uroot -p<Password>", selecting database by using command "use pesanth" and seeing what entries are in the user_details table with "select * from user_details;". Might change 




# Initial Sketches:
![Sketches for Car Sale Website](./images/CRUD_1_Sketches.png?)