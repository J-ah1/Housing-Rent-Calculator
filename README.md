# Housing Rent Calculator for RDE Systems

[Client](https://github.com/JoshAlm/Housing-Rent-Calculator/tree/master/Client) holds the front-end code while [Server](https://github.com/JoshAlm/Housing-Rent-Calculator/tree/master/Server) holds the back-end code

Server files are placed in “cfusion/wwwroot” in your ColdFusion folder

---

For Client Files…

In a terminal, run “npm install” for node modules.

In a terminal, run “npm install react-datepicker --save” for datepicker.

Change api calls accordingly. The current client code calls “http://localhost:8000/db.cfc” for methods.
 
---

For Server Files…

Change the cfheader tag for origin accordingly. The current tag value in db.cfc is 'http://localhost:3000'.
 
---

In ColdFusion Admin…

Make sure session variables are enabled.

Make sure “enable CORS” is unchecked.

Set a new datasource for your database. If necessary, rename the datasource used throughout the server file, db.cfc. The current server code uses “awsMicrosoftSQLServer” as its datasource.
 
--- 
 
In Database…

Run “SQL Queries” for initial database setup.
