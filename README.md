
# NodeJs: Medical Billing Software


# Problem Statement
An online billing system is essential for hospitals and healthcare facilities to manage their invoicing, payments,
and financial transactions efficiently. Your task is to develop a Node.js server for a billing
system that provides seamless functionality and a user-friendly experience.

# What is does? 
The server should have endpoints to enable the following functionalities for users:

● Create an account. ✅

● Fetch all products and services information with their prices. ✅

● Add a product or service to the cart. ✅ (NOTE: you need to mention the product/service Object ID and its quantity)

● Remove a product or service from the cart. ✅ (NOTE: there is common path for adding and removing products/services from the cart. If you want to reduce the quantity, mention the new quantity or if you want to remove it entirely, mention 0 in quantity. It will not be added in the final bill.)

● Clear the cart. ✅

● View total bill (should include price, quantity, and tax on each item as well as total 
value of selected items) ✅

● Confirm the order ✅

Additional API for admin to see all the orders. ✅

● Appropriate test cases to simulate practical scenarios that you would want to test
the system for. ✅ (NOTE: I have populated the database with sample admin, users, products and services. Feel free to add/remove.)

Sample Admin:
email: admin@plotline.so
password: 123

Sample User 01:
email: user01@plotline.so
password: 123

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
GET      /api/v1/products       (PUBLIC PATH)
GET      /api/v1/products/:id       (PUBLIC PATH)
POST     /api/v1/products/addOne        (ADMIN PATH)
POST     /api/v1/products/addMany       (ADMIN PATH)
PUT      /api/v1/products/:id       (ADMIN PATH)
DELETE   /api/v1/products/:id       (ADMIN PATH)
DELETE   /api/v1/products/      (ADMIN PATH)
```

### Services

```
GET      /api/v1/services       (PUBLIC PATH)
GET      /api/v1/services/:id       (PUBLIC PATH)
POST     /api/v1/services/addOne        (ADMIN PATH)
POST     /api/v1/services/addMany       (ADMIN PATH)
PUT      /api/v1/services/:id       (ADMIN PATH)
DELETE   /api/v1/services/:id       (ADMIN PATH)
DELETE   /api/v1/services/      (ADMIN PATH)
```

### User Cart

```
GET      /api/v1/user/cart/:id      (PUBLIC PATH)
GET      /api/v1/user/cart/:id/checkOutCart     (PUBLIC PATH)
POST      /api/v1/user/cart/:id/checkOutCart/placeOrder     (PUBLIC PATH)
PUT      /api/v1/user/cart/:id      (PUBLIC PATH)
DELETE   /api/v1/user/cart/:id/emptyMyCart      (PUBLIC PATH)
```

### Users

```
GET      /api/v1/users/     (ADMIN PATH)
GET      /api/v1/users/:id      (ADMIN PATH)
POST     /api/v1/users/     (ADMIN PATH)
PUT      /api/v1/users/:id      (ADMIN PATH)
DELETE   /api/v1/users/:id      (ADMIN PATH)
```

#### Register new user

```
POST     /api/v1/users/register     (PUBLIC PATH)
```

#### Login user

To login the user and get the auth token you can use:

```
POST     /api/v1/users/login        (PUBLIC PATH)
```

# IMPORTANT INSTRUCTIONS

```
At the time of registration (/api/v1/users/register), the structure of input you will pass in the body
{
    "name": "value",
    "email": "value",
    "password": "value",
    "phone": "value",
    "isAdmin": value, //Optional - for Admin registration set it to true, default value is false
    "street": "value",
    "apartment": "value",
    "zip" :"value",
    "city": "value",
    "country": "value"
}

```

```
At the time of login (/api/v1/users/login), the structure of input you will pass in the body
{
    "email": "value",
    "password": "value"
}

    You will receive a token as output in the console. Insert into the header against Authorization (key). Use Bearer keyword before token.
```



