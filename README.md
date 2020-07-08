<p align="center">
  <img src="./public/images/bontaki.png" width=160>
</p>

<p align="center">
 <img src="https://img.shields.io/badge/License-MIT-blue.svg">
 <img src="https://travis-ci.com/jackson-elfers/bontaki.svg?branch=master">
</p>

[<img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"
      alt="Download from Google Play"
      height="80">](https://play.google.com/store/apps/details?id=com.jacksonelfersdev.bontaki)

<p align="center">Let's talk about our problems together.</p>

[<img src="./public/images/shot_01.png" width=160>](https://github.com/jackson-elfers/bontaki/blob/master/public/images/shot_01.png)
[<img src="./public/images/shot_02.png" width=160>](https://github.com/jackson-elfers/bontaki/blob/master/public/images/shot_02.png)
[<img src="./public/images/shot_03.png" width=160>](https://github.com/jackson-elfers/bontaki/blob/master/public/images/shot_03.png)
[<img src="./public/images/shot_04.png" width=160>](https://github.com/jackson-elfers/bontaki/blob/master/public/images/shot_04.png)
[<img src="./public/images/shot_05.png" width=160>](https://github.com/jackson-elfers/bontaki/blob/master/public/images/shot_05.png)
[<img src="./public/images/shot_06.png" width=160>](https://github.com/jackson-elfers/bontaki/blob/master/public/images/shot_06.png)
[<img src="./public/images/shot_07.png" width=160>](https://github.com/jackson-elfers/bontaki/blob/master/public/images/shot_07.png)

## Development Installation - linux

1. install/configure mysql

```
sudo apt-get update
sudo apt-get install mysql-server
sudo mysql_secure_installation utility
sudo systemctl start mysql
sudo mysql -u root -p
create database dev;
ALTER DATABASE dev CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
exit
```

2. clone the repo

```
git clone https://github.com/jackson-elfers/bontaki.git
cd bontaki
npm install && cd client && npm install && cd ..
```

3. create dev.env file on path: bontaki/env/dev.env

```
PORT=5000
MYSQL_CONNECTION_LIMIT=100
MYSQL_HOST=localhost
MYSQL_USER=admin
MYSQL_PASSWORD=12345
MYSQL_DATABASE=dev
MYSQL_SSL=false

JWT_SECRET=c6cab76a-9b12-4166-ae52-911ef05adfba
JWT_EXPIRATION=172800

RECAPTCHA_SECRET_KEY=
```

4. set development env for project with npm run script

```
npm run dev.env
```

5. obtain recaptcha credentials from [www.google.com](https://www.google.com/recaptcha/intro/v3.html)

6. start the development server

```
npm run dev
```
