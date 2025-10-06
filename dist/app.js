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
const express_1 = __importDefault(require("express"));
const todos_route_1 = require("./app/todos/todos.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const usersRouter = express_1.default.Router();
app.use("/todos", todos_route_1.toDosRouter);
app.use("/users", usersRouter);
app.get('/', (req, res, next) => {
    // console.log({
    //  url: req.url,
    //  header: req.header,
    //  method: req.method
    // });
    next();
}, (req, res) => {
    // console.log(somthing);
    res.send('Welcome to todos app');
});
app.get('/error', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(something);
        res.send("Welcome to ERROR WORLD");
    }
    catch (error) {
        next(error);
    }
}));
// Handle Not Found Route
app.use((req, res, next) => {
    res.status(404).json({ message: "Route Not Found" });
});
// Global Error Handler
app.use((error, req, res, next) => {
    if (error) {
        console.log("ERROR:", error);
        res.status(400).json({
            message: 'Something went wrong', error
        });
    }
});
exports.default = app;
