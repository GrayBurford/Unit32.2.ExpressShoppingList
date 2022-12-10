
// Makes sure we remember to set our environment variable to test -- not development or production
process.env.NODE_ENV = "test";

const app = require('./app.js');
const request = require('supertest');
let items = require('./fakeDb.js')

let monitor = { "name" : "monitor", "price" : 329.99};

beforeEach(function () {
    // items.length = 0;
    items.push(monitor);
})

afterEach(function () {
    // this doesn't redefine items as a new/empty array -- it clears existing array out.
    items.length = 0;
})


describe("Test GET /", function () {
    test("Retrieve all items", async function () {
        const response = await request(app).get("/items");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({items : [    
            {
                "name" : "keyboard",
                "price" : 64.99
            },
            {
                "name" : "mouse",
                "price" : 32.99
            },
            {
                "name" : "monitor", 
                "price" : 329.99
            }
        ]});
    })
})


describe("Test POST /items/", function () {
    test("Test adding an item", async function () {
        const response = await request(app)
            .post('/items')
            .send({
                "name" : "speakers", 
                "price" : "179.99"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({NEWITEM : {
            "name" : "speakers", 
            "price" : "179.99"
        }});
    })
    test("Respond with 400 if name is missing", async function () {
        const response = await request(app).post("/items").send({});
        expect(response.statusCode).toBe(400);
    })
})


describe("Test GET /items/:name", function () {
    test("Retrieve an item by name", async function () {
        const response = await request(app).get(`/items/${monitor.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({"ITEM FOUND" : monitor});
    })
    test("Respond with 400 if name is missing", async function () {
        const response = await request(app).post("/items").send({});
        expect(response.statusCode).toBe(400);
    })
})


describe("Test PATCH /:name", function () {
    test("Edit an item by name", async function () {
        const response = await request(app)
            .patch(`/items/${monitor.name}`)
            .send({
                "name": "SCREEN",
                "price": 333.33
            })

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({"updated" : {
            "name": "SCREEN",
            "price": 333.33
        }});
    })
    test("Respond with 400 if name is missing", async function () {
        const response = await request(app).patch('/items/WRONGNAME');
        expect(response.statusCode).toBe(400);
    })
})


describe("Test DELETE /:name", function () {
    test("Test deleting an item", async function () {
        const response = await request(app).delete(`/items/${monitor.name}`);
        expect(response.statusCode).toBe(202);
        expect(response.body).toEqual({message : "Deleted!"});
    })
    test("Respond with 404 if item name is invalid", async function () {
        const response = await request(app).delete('/items/WRONGNAME');
        expect(response.statusCode).toBe(404);
    })
})