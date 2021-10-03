const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const axios = require("axios");
const pool = require('../ddbb/poolDatabase');

// Router [GET] all Books
router.get("/all", async(req, res, next)=> {
    try {  
        const response = await pool.query('SELECT * FROM books');
        res.send({ status: 200, data:response });
    } catch (error) {
        console.log(error);
    }
});

// Route [GET] book by ID
router.get('/:id', async(req, res, next) => {
    const id = req.params.id;
    try {
        const data = await pool.query(`SELECT * FROM books WHERE id=${id}`);
        res.send(data);
    } catch (error) {
        console.log("Backend error: ", error);
    }
});

// Route [POST] Create books
router.post("/create", async( req, res, next ) => {
    const { book_name, book_description, short_description, author, year, editorial, category, pages } = req.body;
    try {
        const response = await pool.query(`INSERT INTO books 
        (book_name, book_description, short_description, author, year, editorial, category, pages)
        VALUES
        ('${book_name}', '${book_description}', '${short_description}', '${author}', '${year}', '${editorial}', '${category}', '${pages}');`);
        res.send({ status: 200, data: response });
    } catch (error) {
        console.log("Error creating Club. Check your backend", error);
    }
});

// Route [POST] Update book by ID
router.post('/update/:id', async(req, res, next) => {
    const id = req.params.id;
    const {book_name, book_description, short_description, author, year, editorial, category, pages} = req.body;
    try {
        const response = await pool.query('UPDATE books SET ? WHERE ?', [{
            book_name: book_name, 
            book_description: book_description, 
            short_description: short_description, 
            author: author, 
            year: year, 
            editorial: editorial, 
            category: category, 
            pages: pages
            }, 
            {id: id}
        ]);
        res.send({status: 200, response});
    } catch (error) {
        console.log(error);
    }
});

// Route [PUT] Delete book
router.post("/delete/:id", async(req, res, next) => {
    const id = req.params.id;
    try {
        const response = await pool.query(`DELETE FROM books WHERE id= ${id}`);
        res.send({ status: 200, data: response })
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;