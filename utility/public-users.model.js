const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    totalCount: Number,
    savedLinks: [ { } ]
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('PublicUsers', schema);