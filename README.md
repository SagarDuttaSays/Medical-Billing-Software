
# NodeJs: Online Billing System


# Problem Statement
An online billing system is essential for businesses to manage their invoicing, payments,
and financial transactions efficiently. Your task is to develop a Node.js server for a billing
system that provides seamless functionality and a user-friendly experience.


# Run

### Install

```
npm install
```

### Start API

```
npm start
```

# Routes

### Products

```
GET      /api/v1/products
GET      /api/v1/products/:id
POST     /api/v1/products/addOne
POST     /api/v1/products/addMany
PUT      /api/v1/products/:id
DELETE   /api/v1/products/:id
DELETE   /api/v1/products/
```

### Services

```
GET      /api/v1/services
GET      /api/v1/services/:id
POST     /api/v1/services/addOne
POST     /api/v1/services/addMany
PUT      /api/v1/services/:id
DELETE   /api/v1/services/:id
DELETE   /api/v1/services/
```

### User Cart

```
GET      /api/v1/user/cart/:id
GET      /api/v1/user/cart/:id/checkOutCart
POST      /api/v1/user/cart/:id/checkOutCart/placeOrder
PUT      /api/v1/user/cart/:id
DELETE   /api/v1/user/cart/:id/emptyMyCart
```

### Users

```
GET      /api/v1/users/
GET      /api/v1/users/:id
POST     /api/v1/users/
PUT      /api/v1/users/:id
DELETE   /api/v1/users/:id
```

#### Register new user

```
POST     /api/v1/users/register
```

#### Login user

To login the user and get the auth token you can use:

```
POST     /api/v1/users/login
```



