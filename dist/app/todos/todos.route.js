"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDosRouter = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongodb_1 = require("../../config/mongodb");
const mongodb_2 = require("mongodb");
exports.toDosRouter = express_1.default.Router();
// toDosRouter.use(express.json());
const filePath = path_1.default.join(__dirname, "../../../db/todo.json");
// Get All ToDos 
exports.toDosRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mongodb_1.client.db('todosDB');
    const collection = yield db.collection('todos');
    const cursor = collection.find({});
    const todos = yield cursor.toArray();
    res.send(todos);
}));
// Create A todo
exports.toDosRouter.post('/create-todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, priority, completed, category } = req.body;
    const db = yield mongodb_1.client.db('todosDB');
    const collection = yield db.collection('todos');
    yield collection.insertOne({
        title: title,
        description: description,
        priority: priority,
        completed: completed,
        category: category,
        time: new Date().toISOString()
    });
    const cursor = collection.find({});
    const todos = yield cursor.toArray();
    res.send(todos);
}));
// Get Single ToDo
exports.toDosRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongodb_1.client.db('todosDB');
    const collection = yield db.collection('todos');
    const todo = yield collection.findOne({ _id: new mongodb_2.ObjectId(id) });
    res.json(todo);
}));
// Update A ToDo
exports.toDosRouter.put('/update-todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongodb_1.client.db('todosDB');
    const collection = yield db.collection('todos');
    const { title, description, priority, completed, category } = req.body;
    const filter = { _id: new mongodb_2.ObjectId(id) };
    const updatedToDo = yield collection.updateOne(filter, { $set: { title, description, priority, completed, category } }, { upsert: true });
    res.send(updatedToDo);
}));
// Delete A ToDo
exports.toDosRouter.delete('/delete-todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongodb_1.client.db('todosDB');
    const collection = yield db.collection('todos');
    const deleteToDo = yield collection.deleteOne({ _id: new mongodb_2.ObjectId(id) });
    res.send(deleteToDo);
}));
