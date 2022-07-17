const Joi = require('joi');

const firstName = Joi.string().min(3).max(25);
const lastName = Joi.string().min(3).max(25);
const email = Joi.string().email();

const phones = Joi.array().items(
    Joi.object({
        number: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        type: Joi.string().valid('personal', 'work', 'home').required()
    })
);
const address = Joi.object({
    street: Joi.string().min(4).max(65).required(),
    postalCode: Joi.string().length(5).pattern(/^[0-9]+$/).required(),
    city: Joi.string().min(3).max(65).required()
});


const newClient = Joi.object({
    firstName: firstName.required(),
    lastName: lastName.required(),
    email: email.required(),
    phones: phones.min(1).required(),
    address: address
});

const updateClient = Joi.object({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phones: phones,
    address: address
});

const getClient = Joi.object({
    clientId: Joi.string().hex().length(24)
});

function clientValidator(action) {
    return (req, res, next) => {
        let validation = {"error": "unknown"};

        if (action === 'create') {
            validation = newClient.validate(req.body, { abortEarly: false });
        } else if (action === 'update') {
            console.log("akfakhdlsadlakj");
            validation = updateClient.validate(req.body, { abortEarly: false });
        } else if (action === 'get') {
            validation = getClient.validate(req.params);
        }

        if (validation['error']) {
            res.status(400).json({"errors": validation['error']['details']});
        } else {
            next();
        }
    }
}

module.exports = clientValidator; 