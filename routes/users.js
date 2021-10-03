const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const axios = require("axios");
const pool = require('../ddbb/poolDatabase');

// Route [GET] All Users
router.get('/all', async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM usuarios');
        console.log("Response", users);
        res.send({ status: 200, data: users });
    } catch (error) {
        console.log(error);
    }
});

// Route [GET] User by ID
router.get("/:id", async(req, res, next) => {
    const id = req.params.id;
    try {
        const oneUser = await pool.query(`
            SELECT *
            FROM usuarios
            WHERE id= ${id};
        `);
    res.send({ status: 200, data: oneUser });
    }catch (error) { 
      console.log("Error getting user by ID: ", error);
    }
});

// Route [POST] Create user
router.post("/create", async(req, res, next) => {
    const {name, apellidos, edad, sexo, direccion, telefono, email, profesion} = req.body;
    try {
        const createUser = await pool.query(`
            INSERT INTO usuarios
            (name, apellidos,edad, sexo, direccion, telefono, email, profesion)
            VALUES
            ('${name}', '${apellidos}', '${edad}', '${sexo}', '${direccion}', '${telefono}', '${email}', '${profesion}');
        `);
        res.send({ status: 200, data: createUser });       
    } catch (error) {
        console.log("Error creating user: ", error);
    }
});

// Route [POST] Update user
router.post("/update/:id", async(req, res, next) => {
    const id = req.params.id;
    const {name, apellidos, edad, sexo, direccion, telefono, email, profesion} = req.body;
    try {
        const updated = await pool.query('UPDATE usuarios SET ? WHERE ?', [{ name: name, apellidos: apellidos,
            edad: edad, sexo: sexo, telefono: telefono, direccion: direccion,
            email: email, profesion: profesion }, { id: id }]);
        res.send({ status: 200, affectedRows: updated.affectedRows, message: updated.message });
    } catch (error) {
        console.log("Error when updating user: ", error);
    }
});

// Route [PUT] Delete user
router.post('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await pool.query(`DELETE FROM usuarios WHERE ID = ${id}`);
        res.send({ status: 200, data: deleted });
    } catch (error) {
        console.log("Error eliminando usuario: ", error);
    }
});

module.exports = router;