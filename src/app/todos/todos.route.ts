import express, { Express, Request, Response } from "express";
import fs from "fs"
import path from "path"
import { client } from "../../config/mongodb";
import { ObjectId } from "mongodb";
export const toDosRouter = express.Router()

// toDosRouter.use(express.json());

const filePath = path.join(__dirname, "../../../db/todo.json")


// Get All ToDos 
toDosRouter.get('/', async (req: Request, res: Response) => {

 const db = await client.db('todosDB')
 const collection = await db.collection('todos')

 const cursor = collection.find({})
 const todos = await cursor.toArray()

 res.send(todos)
})


// Create A todo
toDosRouter.post('/create-todo', async (req: Request, res: Response) => {

 const { title, description, priority, completed, category } = req.body

 const db = await client.db('todosDB')
 const collection = await db.collection('todos')
 await collection.insertOne({
  title: title,
  description: description,
  priority: priority,
  completed: completed,
  category: category,
  time: new Date().toISOString()
 })

 const cursor = collection.find({})
 const todos = await cursor.toArray()

 res.send(todos)
})

// Get Single ToDo
toDosRouter.get('/:id', async (req: Request, res: Response) => {
 const id = req.params.id
 const db = await client.db('todosDB')
 const collection = await db.collection('todos')

 const todo = await collection.findOne({ _id: new ObjectId(id) })

 res.json(todo)
})

// Update A ToDo
toDosRouter.put('/update-todo/:id', async (req: Request, res: Response) => {
 const id = req.params.id
 const db = await client.db('todosDB')
 const collection = await db.collection('todos')
 const { title, description, priority, completed, category } = req.body
 const filter = { _id: new ObjectId(id) }

 const updatedToDo = await collection.updateOne(
  filter,
  { $set: { title, description, priority, completed, category } },
  { upsert: true })

 res.send(updatedToDo)
})

// Delete A ToDo
toDosRouter.delete('/delete-todo/:id', async (req: Request, res: Response) => {
 const id = req.params.id
 const db = await client.db('todosDB')
 const collection = await db.collection('todos')

 const deleteToDo = await collection.deleteOne({ _id: new ObjectId(id) })

 res.send(deleteToDo)
})