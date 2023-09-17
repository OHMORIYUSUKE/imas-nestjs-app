# imas-nestjs-app

<img width="1512" alt="スクリーンショット 2023-09-18 0 16 29" src="https://github.com/OHMORIYUSUKE/imas-nestjs-app/assets/72294945/d0ae96ad-6985-456c-a10f-19a87b7dd70f">


root に`.development.env`を作成し以下の書き込む

```.env
JWT_SECRET_KEY=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NDk2Mjc2NCwiaWF0IjoxNjk0OTYyNzY0fQ.ZmmthyENHFW3nZBBGbvXJDpLD8oe8QEoNQvY60DeIvY
JWT_EXPIRATION=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NDk2Mjc2NCwiaWF0IjoxNjk0OTYyNzY0fQ.wYsrHY7vjPJ0VISKYWKFpngZek-x8OxjLTtP_JeNfCM
JWT_EXPIRATION=60s

MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=imas
MYSQL_USER=test
MYSQL_PASSWORD=test
```

```sh
$ docker compose up -d
$ npm run start
```
