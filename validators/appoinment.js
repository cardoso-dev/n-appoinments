const Joi = require('joi');

const date_hour = Joi.date();
const state = Joi.string().valid(
    'scheduled', 'cancelled_by_creator', 'cancelled_by_client', 'ongoing',
    'done', 'missed_by_creator', 'missed_by_client');
const tag = Joi.string().min(3).max(30).alphanum();
const notes = Joi.string().min(10).max(1000);
const cost = Joi.number().min(0).positive().precision(2);
const paid = Joi.bool();
// TODO validate the client id exists
const client_id = Joi.string().hex().length(24);

const newAppoinment = Joi.object({
    date_hour: date_hour.required(),
    state: state.required(),
    tag: tag.required(),
    cost: cost.required(),
    paid: paid.required(),
    client_id: client_id.required(),
    notes: notes
});

const updateAppoinment = Joi.object({
    date_hour: date_hour,
    state: state,
    tag: tag,
    cost: cost,
    paid: paid,
    notes: notes
});

const getAppoinment = Joi.object({
    appoinmentId: Joi.string().hex().length(24)
});

function appoinmentValidator(action) {
    return (req, res, next) => {
        let validation = {"error": "unknown"};

        if (action === 'create') {
            validation = newAppoinment.validate(req.body, { abortEarly: false });
        } else if (action === 'update') {
            validation = updateAppoinment.validate(req.body, { abortEarly: false });
        } else if (action === 'get') {
            validation = getAppoinment.validate(req.params);
        }

        if (validation['error']) {
            res.status(400).json({"errors": validation['error']['details']});
        } else {
            next();
        }
    }
}

module.exports = appoinmentValidator; 