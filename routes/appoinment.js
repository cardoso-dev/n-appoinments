const express = require('express');

const router = express.Router();
const AppoinmentService = require('../services/appoinment');
const appoinmentValidator = require('../validators/appoinment');
const service = new AppoinmentService();

module.exports = router;

router.post('/',
    appoinmentValidator('create'),
    async (req, res) => {
        const newAppoinment = await service.create(req);
        if (newAppoinment) {
            res.status(201).json({
                "status": "succeeded",
                "appoinment": newAppoinment
            });
        } else {
            res.status(500).json({
                "status": "failed",
                "error": "Oops! something went wrong..."
            });
        }
});

router.get('/', async (req, res) => {
    const appoinments = await service.getAll(req);
    if (appoinments) {
        res.status(200).json(appoinments);
    } else {
        res.status(500).json({
            "status": "failed",
            "error": "Oops! something went wrong..."
        });
    }
});

router.get('/:appoinmentId',
    appoinmentValidator('get'),
    async (req, res) => {
        const resp = await service.getOne(req, req.params.appoinmentId);
        if (resp['error']) {
            res.status(500).json();
        } else if (!resp['found']) {
            res.status(404).json();
        } else {
            res.status(200).json(resp['appoinment']);
        }
});

router.patch('/:appoinmentId',
    appoinmentValidator('update'),
    async (req, res) => {
        const resp = await service.updateOne(req, req.params.appoinmentId);
        if (resp['error']) {
            res.status(500).json();
        } else if (!resp['found']) {
            res.status(404).json();
        } else {
            res.status(200).json(resp['appoinment']);
        }
});
