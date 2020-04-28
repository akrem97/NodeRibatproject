const mongoose = require("mongoose");

const actualiteModel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titre: { type: String, required: true },
    contenu: { type: String, required: true },
    image: { type: String, required: true },
    nbvisiteurs: { type: Number, default: 0 },
    dateCreation: { type: Date },
    creePar: { type: String },
    modifiePar: { type: String, default: 'no one' },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'admin' },
    comments: [{ type: mongoose.Schema.Types.ObjectId }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' }
});

module.exports = mongoose.model('actualite', actualiteModel);