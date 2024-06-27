var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SEcREAT = "BHENDE";
const User = require('../db/index');
router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { username, password } = req.body;
    let userexists = yield User.findOne({ 'username': username, 'password': password });
    if (userexists) {
        let token = jwt.sign({ 'username': userexists._id }, SEcREAT);
        res.send({ "msg": "logged in successfully", "token": token });
    }
    else {
        res.status(403).send({ "msg": "invalid credentials" });
    }
}));
module.exports = router;
