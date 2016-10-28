"use strict";
const express = require("express");
const router = express.Router();

router.route("/*")
    .get(function(req, res) {
        res.render("../views/contact");
    });

module.exports = router;
