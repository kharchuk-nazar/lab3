import express from 'express';
import Item from "../models/Item.js";

const router = express.Router();

router.route('/item')
    .get(async (req, res) => {
        try {
            const items = await Item.find({})
            res.status(200).json(items)
        } catch (e) {
            res.status(500).send('Something went wrong')
        }
    })
    .post(async (req, res) => {
        try {
            const { name, description, price, isActiveInput } = req.body
            const item = await Item.create({ name,  description, price, isActiveInput })
            res.status(201).json(item)
        } catch (e) {
            res.status(500).send('Something went wrong')
        }
    })

router.route('/item/:id')
    .delete(async (req, res) => {
        try {
            await Item.findOneAndDelete({ _id: req.params.id })
            res.status(204).end()
        } catch (e) {
            res.status(500).send('Something went wrong')
        }
    })
    .put(async (req, res) => {
        try {
            const item = await Item.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            res.status(200).json(item)
        } catch (e) {
            res.status(500).send('Something went wrong')
        }
    })
export default router;