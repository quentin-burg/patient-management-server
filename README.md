# Pregnancy Wheel Server

This project aims to help midwife ultrasound technician to manage his patients.
A pregnancy wheel is used to compute key dates in pregnancy like pregnancy term.


This project is a POC so there is still a lot to do and improve.


## Installation

You must have a NodeJS environement to run this project.
First, install dependencies :
```
npm i
```
To run this app in development mode :
```
npm run dev
```

To build app in production mode and launch it in local environment, run :
```
npm run build
npm start
```

For database, I have setup a remote instance (URL is `src/infra/sequelize/index.ts` file). If you encounter any problem, you can setup a local databse and replace Postgresql URI in previous file.


## Architecture

I have implemented this project following the hexagonal architecture. It makes it possible to have a business code to be loosely coupled with infrastructure code.

The architecture is divided as follows :
- `Domain` folder contains :
  - `Entities` are definitions of business entities
  - `Ports` are definitions of contract between business code and infrastructure code. For example, `sequelize` must provides an implemnetation of the `UserPort` interface. Same for testing.
  - `Services` are collections of business rules in our application. They are based on abstraction provided by `ports`.

- `Infra` folder contains:
  - `Middlewares` : contains some useful middlewares
  - `Sequelize` contains implementations of ports interface (DB models and querying) based on Sequelize ORM.
  - `Testing` is a incomplete implementation of ports interface. It is useful for testing in a CI for example.

- `Routes` folder contains definitions of API used by client.


## TODO

- [ ] Setup tests : with Jest library. First, the goal is to test behavior in services.

- [ ] Improve models in sequelize.

- [ ] Define API interfaces

- [ ] Improve CI/CD

- [ ] Develop a service to upload images on S3

- [ ] Develop a service of messaging between patient and a professional with socket.io.



## Author

Quentin Burg