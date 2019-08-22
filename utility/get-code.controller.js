const express = require('express');
const router = express.Router();
const getCodeService = require('./get-code.service');

// routes
router.get('/', getCode);

module.exports = router;

function getCode (req, res, next) {
  getCodeService.getCode()
    .then(uniqCode => res.json(uniqCode))
    .catch(err => next(err));
}