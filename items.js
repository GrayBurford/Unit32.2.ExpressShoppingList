const express = require("express");
const router = new express.Router();
const ExpressError = require("./expressError.js");
const items = require("./fakeDb.js");


// Sample response:
// [{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]
router.get("/", (request, response) => {
    console.log("You called router.get(/)");
    response.json({items});
})

// Sample response:
// {“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}
router.post("/", (request, response, next) => {
    console.log("You called router.post(/)");
    try {
        if (!request.body.name) throw new ExpressError("Item NAME is required!", 400);
        if (!request.body.price) throw new ExpressError("Item PRICE is required!", 400);
        else {
            const newItem = {
                "name" : request.body.name,
                "price" : request.body.price
            };
            items.push(newItem);
            response.status(201).json({ "NEWITEM" : newItem});
        }
    } catch (error) {
        return next(error);
    }
})

// Sample response:
// {“name”: “popsicle”, “price”: 1.45}
router.get("/:name", (request, response, next) => {
    console.log("You called router.get(/:name)");
    try {
        if (!request.params.name) throw new ExpressError("Missing item name!", 400);
        const item = items.find(item => item.name == request.params.name);
        console.log("ITEM FOUND:", item);
        response.json({item});
    } catch (error) {
        next(error)
    }

})

// Sample response:
// {“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}
router.patch("/:name", (request, response) => {
    console.log("You called router.PATCH(/:name)");
})

// Sample response:
// {message: “Deleted”}
router.delete("/:name", (request, response) => {
    console.log("You called router.DELETE(/:name)");
})

module.exports = router;