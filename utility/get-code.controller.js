const express = require('express');
const router = express.Router();
const getCodeService = require('./get-code.service');

// routes
router.post('/link', getCode);
router.post('/', saveLinkGetCode);


module.exports = router;

function saveLinkGetCode (req, res, next) {
  getCodeService.saveLinkGetCode(req.user.sub, req.body.link)
  // getCodeService.getCode(req.user.sub)
    .then(uniqCode => res.json(uniqCode))
    .catch(err => next(err));
}

function getCode (req, res, next) {
  getCodeService.getCode(req.body.link)
  // getCodeService.getCode(req.user.sub)
    .then(uniqCode => res.json(uniqCode))
    .catch(err => next(err));
}