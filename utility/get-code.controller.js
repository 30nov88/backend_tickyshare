const express = require('express');
const router = express.Router();
const getCodeService = require('./get-code.service');

// routes
router.post('/', getCode);

module.exports = router;

function getCode (req, res, next) {
  console.log('req.body', req.body);

  getCodeService.getCode(req.user.sub, req.body.link)
  // getCodeService.getCode(req.user.sub)
    .then(uniqCode => res.json(uniqCode))
    .catch(err => next(err));
}