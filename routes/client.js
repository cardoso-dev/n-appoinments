const express = require('express');

const router = express.Router()
const ClientService = require('../services/client');
const clientValidator = require('../validators/client');
const service = new ClientService();

module.exports = router;

router.post('/',
    clientValidator('create'),
    async (req, res) => {
        const newClient = await service.create(req);
        if (newClient) {
            res.status(201).json({
                "status": "succeeded",
                "client": newClient
            });
        } else {
            res.status(500).json({
                "status": "failed",
                "error": "Oops! something went wrong..."
            });
        }
});

router.get('/', async (req, res) => {
    const clients = await service.getAll(req);
    if (clients) {
        res.status(200).json(clients);
    } else {
        res.status(500).json({
            "status": "failed",
            "error": error
        });
    }
});

router.get('/:clientId',
    clientValidator('get'),
    async (req, res) => {
        const resp = await service.getOne(req, req.params.clientId);
        if (resp['error']) {
            res.status(500).json();
        } else if (!resp['found']) {
            res.status(404).json();
        } else {
            res.status(200).json(resp['client']);
    }
});

router.patch('/:clientId',
    clientValidator('update'),
    async (req, res) => {
        const resp = await service.updateOne(req, req.params.clientId);
        if (resp['error']) {
            res.status(500).json();
        } else if (!resp['found']) {
            res.status(404).json();
        } else {
            res.status(200).json(resp['client']);
        }
});
