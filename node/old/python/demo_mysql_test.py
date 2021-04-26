import mysql.connector
# h: "localhost",u:"root",pw:"group6db",db:"g6DB",
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="group6db",
  database="g6DB"
)

print(mydb)

mycursor = mydb.cursor()
 

mycursor.execute("SHOW TABLES")

for x in mycursor:
  print(x)