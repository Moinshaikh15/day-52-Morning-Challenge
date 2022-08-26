const express = require("express");

let PlaceModel = require("../models/places");

let router = express.Router();

//add place 
router.post("/add", async (req, res) => {
    let { name, city, state } = req.body;
    let slug = name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

    let place = new PlaceModel({
        name,
        city,
        state,
        slug
    });

    try {
        let savedPlace = await place.save();
        return res.status(200).send("added new place" + savedPlace);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

//get places by slug
router.get("/:slug", async(req, res) => {
    try {
        let ad = await PlaceModel.find({ slug: req.params.slug });
        return res.status(200).send(ad);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

//filter places by city name
router.get('/city/:cityname', async(req, res) => {
    try {
        let ad = await PlaceModel.find({ city: req.params.cityname });
        return res.status(200).send(ad);
    } catch (e) {
        return res.status(500).send(e.message);
    }
})

//filter places by name
router.get('/name/:name', async(req, res) => {
    try {
        let ad = await Place.find({ name: req.params.name });
        return res.status(200).send(ad);
    } catch (e) {
        return res.status(500).send(e.message);
    }
})

module.exports =router