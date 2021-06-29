const { model, Schema } = require('mongoose');

const imageSchema = new Schema({
    title: { type: String },
    description: { type: String },
    originalfile: { type: String },
    mimetype: { type: String },
    size: { type: Number },
    created_at: { type: Date, default: Date.now() }
});
module.exports = model('Image', imageSchema);