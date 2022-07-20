const express = require('express');

const router = express.Router();
const DocumentService = require('../services/service');
const appoinmentValidator = require('../validators/appoinment');
const service = new DocumentService('appoinment');

const { find, findOne, insertOne, updateOne } = require('./utils');

module.exports = router;

router.post('/',
    appoinmentValidator('create'),
    async (req, res) => { insertOne(req, res, 'appoinment', service) }
);

router.get('/',
    async (req, res) => { find(req, res, service) }
);

router.get('/:appoinmentId',
    appoinmentValidator('get'),
    async (req, res) => { findOne(req, res, 'appoinmentId', 'appoinment', service) }
);

router.patch('/:appoinmentId',
    appoinmentValidator('update'),
    async (req, res) => { updateOne(req, res, 'appoinmentId', 'appoinment', service) }
);
