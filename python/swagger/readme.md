## This project based on Seans Python3 Flask Rest Boilerplate

Aim to connect diverse databases, like MySQL, MangoDB, and .json files, to fulfill the expanding function via setting Environment Variables.

Before run app.py, kindly ensure that your client has already installed the MySQL database (like mysql-installer-web-community editoin) or MangoDB properly, and you have done with the initialization process.

### MIT License
Rememeber, No guarantees, or even fit for a particular purpose.

This project will be updated slowly as required, so stay tuned.

If you have a suggestion, or you want to contribute some code, you are free to make a pull request.

Your contributions will be visible since this project is public.

### To Setup and Start
```bash
pip install -r requirements.txt 
python app.py
```

### Get All Request Records
```bash
curl -X GET http://127.0.0.1:5000/request
```

### Get One Request Record
```bash
curl -X GET http://127.0.0.1:5000/request/04cfc704-acb2-40af-a8d3-4611fab54ada
```

### Add A New Record
```bash
curl -X POST http://127.0.0.1:5000/request -H 'Content-Type: application/json' -d '{"title":"Good & Bad Book", "email": "testuser3@test.com"}'
```

### Edit An Existing Record
```bash
curl -X PUT http://127.0.0.1:5000/request -H 'Content-Type: application/json' -d '{"title":"edited Good & Bad Book", "email": "testuser4@test.com"}'
```

### Delete A Record
```bash
curl -X DELETE http://127.0.0.1:5000/request/04cfc704-acb2-40af-a8d3-4611fab54ada
```

Thanks,

WayneW

