const express = require('express');
const router = express.Router();
const getCodeService = require('./get-code.service');

// routes
router.post('/link', getCode);
router.post('/', saveLinkGetCode);
router.get('/', getLink);
router.get('/link', getLinkAndDelete);

module.exports = router;

function getLinkAndDelete (req, res, next) {
  getCodeService.getLinkAndDelete(req.query.code)
    .then(savedLink => res.json(savedLink))
    .catch(err => next(err));
}

function getLink (req, res, next) {
  getCodeService.getLink(req.user.sub, req.query.code)
    .then(savedLink => res.json(savedLink))
    .catch(err => next(err));
}

function saveLinkGetCode (req, res, next) {
  getCodeService.saveLinkGetCode(req.user.sub, req.body.link)
    .then(uniqCode => res.json(uniqCode))
    .catch(err => next(err));
}

function getCode (req, res, next) {
  getCodeService.getCode(req.body.link)
    .then(uniqCode => res.json(uniqCode))
    .catch(err => next(err));
}