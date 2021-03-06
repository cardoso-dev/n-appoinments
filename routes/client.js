const express = require('express');

const router = express.Router()
const DocumentService = require('../services/service');
const clientValidator = require('../validators/client');
const service = new DocumentService('client');

const { find, findOne, insertOne, updateOne } = require('./utils');

module.exports = router;

router.post('/',
    clientValidator('create'),
    async (req, res) => { insertOne(req, res, 'client', service) }
);

router.get('/',
    async (req, res) => { find(req, res, service) }
);

router.get('/:clientId',
    clientValidator('get'),
    async (req, res) => { findOne(req, res, 'clientId', 'client', service) }
);

router.patch('/:clientId',
    clientValidator('update'),
    async (req, res) => { updateOne(req, res, 'clientId', 'client', service) }
);
