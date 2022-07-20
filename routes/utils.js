const failedResponse = {
    "status": "failed",
    "error": "Oops! something went wrong..."
}

async function insertOne(req, res, name, service) {
    const newDocument = await service.create(req);
    if (newDocument) {
        res.status(201).json({
            "status": "succeeded",
            name: newDocument
        });
    } else {
        res.status(500).json(failedResponse);
    }
}

async function find(req, res, service) {
    const data = await service.getAll(req);
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(500).json(failedResponse);
    }
}

async function findOne(req, res, nameId, name, service) {
    const resp = await service.getOne(req, req.params[nameId]);
    if (resp['error']) {
        res.status(500).json(failedResponse);
    } else if (!resp['found']) {
        res.status(404).json();
    } else {
        res.status(200).json(resp[name]);
    }
}

async function updateOne(req, res, nameId, name, service) {
    const resp = await service.updateOne(req, req.params[nameId]);
    if (resp['error']) {
        res.status(500).json(failedResponse);
    } else if (!resp['found']) {
        res.status(404).json();
    } else {
        res.status(200).json(resp[name]);
    }
}

module.exports = {
    insertOne: insertOne,
    find: find,
    findOne: findOne,
    updateOne: updateOne
}