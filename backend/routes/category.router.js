const express = require("express")
const Category = require("../models/category")
const router = express.Router()
const { v4: uuidv4 } = require('uuid')


router.post('/add', async (req, res) => {
    try {
        const { name } = req.body;

        const checkName = await Category.findOne({ name: name })
        if (checkName != null) {
            res.status(403).json({ message: "This name used" })
        } else {
            const category = new Category({
                _id: uuidv4(),
                name: name
            })

            await category.save()
            res.json({ message: "Category created successfuly" })
        }


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/removeById', async (req, res) => {
    try {
        const { _id } = req.body;
        await Category.findByIdAndDelete(_id)
        res.json({ message: "Category successfuly delete" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/update', async (req, res) => {
    try {
        const { _id, name } = req.body;
        const category = await Category.findOne({ _id: _id })

        if (category.name != name) {
            const checkName = await Category.findOne({ name: name })
            if (checkName != null) {
                res.status(403).json({ message: "This name has been alredy" })
            } else {
                category.name = name
                await Category.findByIdAndUpdate(_id, category)
                res.json({ message: "Category successfuly updated" })
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 })
        res.json(categories)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router