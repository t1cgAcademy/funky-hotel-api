# funky-hotel-api

## Getting Started (TODO)

- Install and setup mongo, node, and git
- Clone repo
- seed DB
- npm install
- npm run server

---

## REST API

A REST API is an API that uses HTTP requests to GET, PUT, POST, and DELETE data. It simply allows the client to make a call to the server and receive data back from the HTTP protocol.

## Examples

### Room

<div style="background-color:#ffd3e4 ">
Definition - Test Endpoint

```
GET http://54.85.179.245/api/rest/room/test
```

Example Request

```
curl http://54.85.179.245/api/rest/room/test
```

Example Response

```
{
    "msg": "Test works"
}
```

## </div>

<div style="background-color:lightblue">
Definition - Get ALL Rooms

```
GET http://54.85.179.245/api/rest/room
```

Example Request

```
curl http://54.85.179.245/api/rest/room
```

Example Response

```
[
    {
        "_id": "5bfc7a014338f3ef0b720680",
        "price": 1000,
        "name": "Penthouse",
        "number": "999",
        "bed": "3 Bed",
        "bathtub": true,
        "kitchen": true,
        "__v": 0
    },
    {
        "_id": "5bfc7a9c4338f3ef0b720681",
        "price": 50,
        "name": "Basement",
        "number": "001",
        "bed": "1 Bed",
        "bathtub": false,
        "kitchen": false,
        "__v": 0
    }
]
```

## </div>

<div style="background-color:#ffd3e4 ">
Definition - Get room by id

```
GET http://54.85.179.245/api/rest/room/:id
```

Example Request

```
curl http://54.85.179.245/api/rest/room/5bfc7a014338f3ef0b720680
```

Example Response

```
{
    "_id": "5bfc7a014338f3ef0b720680",
    "price": 1000,
    "name": "Penthouse",
    "number": "999",
    "bed": "3 Bed",
    "bathtub": true,
    "kitchen": true,
    "__v": 0
}
```

## </div>

<div style="background-color:lightblue ">
Definition - Get room by number

```
GET http://54.85.179.245/api/rest/room/number/:num
```

Example Request

```
curl http://54.85.179.245/api/rest/room/number/001
```

Example Response

```
{
    "_id": "5bfc7a014338f3ef0b720680",
    "price": 1000,
    "name": "Penthouse",
    "number": "999",
    "bed": "3 Bed",
    "bathtub": true,
    "kitchen": true,
    "__v": 0
}
```

## </div>

<div style="background-color:#ffd3e4 ">
Definition - Post room

```
POST http://54.85.179.245/api/rest/room
```

Example Request

```
curl http://54.85.179.245/api/rest/room \
-d price=500 \
-d name="Test Room" \
-d number="410" \
-d bed="2 Bed" \
-d bathtub=true \
-d kitchen=false
```

Example Response

```
{
    "room": {
        "_id": "5c12ecbf1b2611937558d81d",
        "price": 500,
        "name": "Test Room",
        "number": "410",
        "bed": "2 Bed",
        "bathtub": true,
        "kitchen": false,
        "__v": 0
    },
    "msg": "Success"
}
```

## </div>

<div style="background-color:lightblue ">
Definition - Delete room by id

```
DELETE http://54.85.179.245/api/rest/room/:id
```

Example Request

```
curl http://54.85.179.245/api/rest/room/5c12ecbf1b2611937558d81d \
-X DELETE
```

Example Response

```
{
"success": true
}
```

## </div>

---

<div style="background-color:#ffd3e4 ">
Definition - Delete room by number

```
DELETE http://54.85.179.245/api/rest/room/:num
```

Example Request

```
curl http://54.85.179.245/api/rest/room/number/410 \
-X DELETE
```

Example Response

```
{
"success": true
}
```

## </div>

### Reservation

<div style="background-color:lightgreen ">
Definition - Test Endpoint

```
GET http://54.85.179.245/api/rest/reservation/test
```

Example Request

```
curl http://54.85.179.245/api/rest/reservation/test
```

Example Response

```
{
    "msg": "Test works"
}
```

## </div>

<div style="background-color:lightyellow">
Definition - Get ALL Reservations

```
GET http://54.85.179.245/api/rest/reservation
```

Example Request

```
curl http://54.85.179.245/api/rest/reservation
```

Example Response

```
[
    {
        "_id": "5bfc7bb9749406f13dc945d9",
        "reserver": "John Doe",
        "checkIn": "2019-01-02T05:00:00.000Z",
        "checkOut": "2019-01-10T05:00:00.000Z",
        "roomReserving": "5bfc7a9c4338f3ef0b720681",
        "__v": 0
    },
    {
        "_id": "5bfc7beb749406f13dc945da",
        "reserver": "Bobby Bee",
        "checkIn": "2019-02-02T05:00:00.000Z",
        "checkOut": "2019-02-03T05:00:00.000Z",
        "roomReserving": "5bfc7a014338f3ef0b720680",
        "__v": 0
    }
]
```

## </div>

<div style="background-color:lightgreen ">
Definition - Get reservation by id

```
GET http://54.85.179.245/api/rest/reservation/:id
```

Example Request

```
curl http://54.85.179.245/api/rest/reservation/5bfc7bb9749406f13dc945d9
```

Example Response

```
{
    "_id": "5bfc7a014338f3ef0b720680",
    "price": 1000,
    "name": "Penthouse",
    "number": "999",
    "bed": "3 Bed",
    "bathtub": true,
    "kitchen": true,
    "__v": 0
}
```

</div>

---

<div style="background-color:lightyellow ">
Definition - Post reservation

```
POST http://54.85.179.245/api/rest/reservation
```

Example Request

```
curl http://54.85.179.245/api/rest/reservation \
-d reserver="Walter White" \
-d checkIn="10/11/2020" \
-d checkOut="12/05/2020" \
-d roomReserving="777"
```

Example Response

```
{
    "reservation": {
        "_id": "5c13e5572580025ba68f583b",
        "reserver": "Walter White",
        "checkIn": "2020-10-11T00:00:00.000Z",
        "checkOut": "2020-12-05T00:00:00.000Z",
        "roomReserving": {
            "_id": "5c12bf252580025ba68f5837",
            "price": 199,
            "name": "Funky Room",
            "number": "777",
            "bed": "2 bed",
            "bathtub": true,
            "kitchen": true,
            "__v": 0
        },
        "__v": 0
    },
    "msg": "Success"
}
```

## </div>

<div style="background-color:lightgreen ">
Definition - Delete reservation by id

```
DELETE http://54.85.179.245/api/rest/reservation/:id
```

Example Request

```
curl http://54.85.179.245/api/rest/reservation/5c12ecbf1b2611937558d81d \
-X DELETE
```

Example Response

```
{
"success": true
}
```

## </div>

## GraphQL

GraphQL is a query language for requesting resources from back end APIs. You can think of it as an alternative to the RESTful routes available on this project. This project uses Apollo Server for its GraphQL implementation. To get started, checkout the main GraphQL and Apollo Server resources:

- [GraphQL](https://graphql.org/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)

All of the GraphQL code in this project is kept in the `graphql` directory. The code is heavily annotated, so be sure to check out the comments.

The best way to get practice writing GraphQL queries and mutations is to use the GraphQL Playground that comes provided with Apollo Server. Once you have this project's server up and running, open a web browser and goto [http://localhost:7001/graphql](http://localhost:7001/graphql). On the left side of the screen, you can write GraphQL queries. On the right side, you'll see the results of those queries when you run them.

One of the most important features of the Playground is the tab to the far right that says `SCHEMA`. Clicking that tab opens up the documentation for the GraphQL server. It gives the names, arguments, and descriptions of all the queries and mutations the server allows. Its best to start there by exploring the schema documention, then practicing running some queries.

Note that the text editor on the left side of the screen has a lot of great features. It provides text completion and also provides warning highlighting and messages about missing arguments and subfields. If you are having trouble executing a query or mutation, make sure you read the warning messages!

Once you feel comforatable writing GraphQL queries and mutations, you can start using them in your client-side code to fetch data from this server. There are many different ways to make client-side GraphQL queries. Checkout [this article](https://medium.com/open-graphql/exploring-different-graphql-clients-d1bc69de305f) for just a few examples. And of course you can always just make a [basic fetch request](https://gist.githubusercontent.com/stubailo/8bd3b0ef9c1dcb1459bf0076e3d612af/raw/caafc26da2449421de00287ec7b55b09099ea4fc/fetch-graphql.js) as well.
