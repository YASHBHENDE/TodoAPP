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
const Todo = require('../db/index');
const userAuthentication = require('../auth/middleware');
router.delete('/todos/:id', userAuthentication, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    console.log(id);
    let deletes = yield Todo.findByIdAndDelete(id);
    if (!deletes) {
        res.send({ "msg": "not deleted" });
    }
    res.status(200).send({ "msg": "deleted successfully" });
}));
module.exports = router;
