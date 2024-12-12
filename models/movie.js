const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genres: [String], // Массив жанров
    rating: {
        type: Number,
        min: 0,
        max: 10 // Ограничение рейтинга от 0 до 10
    },
    duration: {
        hours: { type: Number, required: true }, // Исправлено с hour на hours
        minutes: { type: Number, required: true }
    },
    reviews: [{
        name: String,
        text: String,
    }],
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;