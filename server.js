const express = require('express');
const mongoose = require("mongoose");
const URL = 'mongodb://localhost:27017/moviebox';
const PORT = process.env.PORT || 3000;
const Movie = require("./models/Movie");
const app = express();
app.use(express.json()); // ДЛЯ ЧТЕНИЯ ФАЙЛОВ ИЗ ЗАПРОСОВ

// Подключение к базе данных
mongoose
    .connect(URL)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log("Error connecting to DB"));

// Запуск сервера
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Listening on port ${PORT}`);
    }
});

// Получение всех фильмов
app.get("/movies", (req, res) => {
    Movie
        .find()
        .sort({ title: 1 })
        .then(movies => {
            res.status(200).json(movies);
        })
        .catch(err => {
            console.error(err); // Логировать ошибку
            res.status(500).json({ error: "Something goes wrong…" });
        });
});

// Получение фильма по ID
app.get("/movies/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid ObjectId" });
    }

    Movie
        .findById(req.params.id)
        .then(movie => {
            if (movie) {
                res.status(200).json(movie);
            } else {
                res.status(404).json({ error: "Movie not found" });
            }
        })
        .catch(err => {
            console.error(err); // Логировать ошибку
            res.status(500).json({ error: "Something goes wrong…" });
        });
});

// Удаление фильма по ID
app.delete("/movies/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid ObjectId" });
    }

    Movie
        .findByIdAndDelete(req.params.id)
        .then(result => {
            if (result) {
                res.status(200).json({ message: "Movie deleted successfully" });
            } else {
                res.status(404).json({ error: "Movie not found" });
            }
        })
        .catch(err => {
            console.error(err); // Логировать ошибку
            res.status(500).json({ error: "Something goes wrong…" });
        });
});

// Создание нового фильма
app.post("/movies", (req, res) => {
    const movie = new Movie(req.body); // Проверка на поля с модели!!!

    movie
        .save()
        .then(result => {
            res.status(201).json(result); // Возвращаем вставленный документ
        })
        .catch(err => {
            console.error(err); // Логировать ошибку
            res.status(500).json({ error: "Something goes wrong…" });
        });
});