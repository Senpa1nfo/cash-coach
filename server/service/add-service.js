const AddModel = require('../models/add-model');

class AddService {
    async add(user_id, description, value, bool, date, timeAdded) {
        const item =  await AddModel.create({user_id, description, value, bool, date, timeAdded});
        return item;
    }

    async get(user_id) {
        const item =  await AddModel.find({user_id});
        return item;
    }

    async delete(_id, user_id) {
        const item =  await AddModel.findOneAndDelete({_id, user_id});
        return item;
    }

    async edit(_id, user_id, description, value, bool) {
        const filter = {_id, user_id};
        const update = {description, value, bool};
        const item =  await AddModel.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true
        });
        return item;
    }
}

module.exports = new AddService();