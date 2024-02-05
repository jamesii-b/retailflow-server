# Retailflow-Server

A Nodejs-Express App

## Environment Variables 💻
```
MONGO_URI==your_mongoDB_URI
ADMIN_EMAIL==admin_email_to_recieve_mail
EMAIL==your_email_to_send_mail
PASSWORD==your_email_password
PORT==port_number
apolloPort==port_number
```

### Tips 📝
- Generate node-mailer login Password. You can do that [here](https://myaccount.google.com/apppasswords)
- If you are using Docker in windows, create a file called `.wslconfig` in your current user home directory and add the following content:
 ```
[wsl2]
memory=8GB // your memory
processors=8 // your processor cores
```
Else, the docker will make your pc unusable due to excessive memory,cpu usage.

### Run 🏃‍♂️
- `git clone https://jamesii-b/retaiflow-server.git`
- `cd retailflow-server`
- `docker-compose build`
- `docker-compose up`