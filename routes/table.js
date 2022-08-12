const router = require('express').Router()
const Table = require('../models/Table')

router.post('/', async (req, res)=>{
    const newTable = new Table(req.body)

    try {
        const savedTable = await newTable.save()
        res.status(200).json(savedTable)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.put('/:id', async (req, res) => {
    try {
        const updatedTable = await Table.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedTable)
    } catch (e) {
        res.status(500).json(e);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Table.findByIdAndDelete(req.params.id)
        res.status(200).json('Item has been deleted')
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/find/:id', async (req, res) => {
    try {
        const table = await Table.findById(req.params.id)
        res.status(200).json(table)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/find', async (req, res) => {

    const qNew = req.query.new

    try {
        let table

        if(qNew){
            table = await Table.find().sort({createdAt: -1}).limit(50)
        }  else {
            table = await Table.find();
        }
        
        res.status(200).json(table)
    } catch (e) {
        res.status(500).json(e)
    }
})



module.exports = router