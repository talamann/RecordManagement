User management app done using React & GO & SQLite for my internship applications at FillLabs


1 - Packages used
For the api Gin and github.com/mattn/go-sqlite3 were used respectively for routing and handling the database.

For the data grid https://github.com/adazzle/react-data-grid.

2- Endpoints

<your-host-url>/users to get a list of all the users and to create a new user. GET and POST methods should be specified inside the headers.

<your-host-url>/users/id to get the user with the selected id, delete the user and also edit the users data. The method should be specified inside the header.

3- Using the api

Inside the api.go folder change the route name and the endpoint names if you want. Just be sure to set them correctly inside the React files.

4- The UI

A basic CSS was preferred. For the data grid https://github.com/adazzle/react-data-grid was used which is a typescript written component to 

list data and render additional columns like a checkbox,button etc.




