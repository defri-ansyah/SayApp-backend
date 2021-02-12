<p align="center">
  <a href="https://github.com/defri-ansyah/SayApp-backend">
    <img src="./logo.png"  width="200px" alt="Logo">
  </a>
</p>

<h3 align="center">SayApp</h3>

[![Node JS](https://img.shields.io/badge/Dependencies-Express%20JS-green)](https://nodejs.org/en/)
![GitHub repo size](https://img.shields.io/github/repo-size/defri-ansyah/SayApp-backend)
![GitHub contributors](https://img.shields.io/github/contributors/defri-ansyah/SayApp-backend)
![GitHub stars](https://img.shields.io/github/stars/defri-ansyah/SayApp-backend)
![GitHub forks](https://img.shields.io/github/forks/defri-ansyah/SayApp-backend)

<p align="center">
  <a href="https://nodejs.org/" target="blank">
    <img src="https://cdn-images-1.medium.com/max/871/1*d2zLEjERsrs1Rzk_95QU9A.png">
  </a>
</p>

## Table of Contents
* [Prerequiste](#Prerequiste)
* [Installation](#Installation)
* [Create Environment Variable](#create-environment-variable)
* [Start Development Server](#Start-Development-Server)
* [Postman Collection](#Postman-Collection)
* [API Endpoint](#API-Endpoint)
* [About Project](#About-Project)
* [Related Project](#Related-Project)
* [Contact](#Contact)


## Prerequiste
- Node.js - Download and Install [Node.js](https://nodejs.org/en/).
- Express.js - Download and Install [Express](https://expressjs.com/)
- Socket.io - Download and Install [Socket.io](https://socket.io/)
- Sequelize.js - Download and Install [Sequelize.js](https://sequelize.org/)


## Installation
### Clone
```
$ git clone https://github.com/defri-ansyah/SayApp-backend.git
$ cd SayApp-backend
$ npm install
```

## Create Environment Variable

```
DB_PORT = YOUR_DB_PORT
BASE_URL = YOUR_BASE_URL
SECRET_KEY = YOUR_SECRET_KEY_FOR_JWT
EMAIL_USERNAME = YOUR_EMAIL
EMAIL_PASSWORD = YOUR_PASSWORD_EMAIL
SOCKET_PORT = YOUR_SOCKET_PORT
```

### Start Development Server
```
$ npm run serve
```
## Link Collection Postman
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/076c71a6e0671ac3aa39)

## API Endpoint
### User Endpoint
| No  | HTTP Method | URI                           | Operation                 |
| --- | ----------- | ----------------------------- | ------------------------- |
| 1   | POST        | /api/user/signup              | Register new user         |
| 2   | POST        | /api/user/login               | Login user                |
| 3   | GET         | /api/user/detail              | Get detail user           |
| 4   | PATCH       | /api/user/update-image        | Update image user         |
| 5   | PATCH       | /api/user/update-map          | Update map user           |

### Room Endpoint
| No  | HTTP Method | URI                          | Operation                  |
| --- | ----------- | ---------------------------- | -------------------------- |
| 1   | GET         | /api/room/list               | Get room list by user      |
| 2   | POST        | /api/chat/send               | Send chat                  |
| 3   | GET         | /api/room/detail/:room_id    | Get detail room chat       |

## About Project
SayAPp is a project inspired by Telegram website version.
It's API made for SayApp using Node Js and Express Js

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project
1. Create your Feature Branch  ```git checkout -b [feature]```
2. Commit your Changes ```git commit -m 'Add some feature'```
3. Push to the Branch ```git push origin [feature]```
4. Open a Pull Request

## Related Project
* [`Frontend SayApp`](https://github.com/defri-ansyah/SayApp-frontend)

## Contact

- Email - defriansyah013@gmail.com
- LinkedIn - [Defri Ansyah](https://linkedin.com/in/defri-ansyah/)

---
Copyright © 2020 [Defri Ansyah](https://github.com/defri-ansyah)