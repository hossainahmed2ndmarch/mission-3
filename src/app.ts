import express, { Application, NextFunction, Request, Response } from 'express'
import { toDosRouter } from './app/todos/todos.route'
import { error } from 'console'

const app: Application = express()

app.use(express.json())
const usersRouter = express.Router()

app.use("/todos", toDosRouter)
app.use("/users", usersRouter)

app.get('/', (req: Request, res: Response, next: NextFunction) => {
 // console.log({
 //  url: req.url,
 //  header: req.header,
 //  method: req.method
 // });
 next()
}
 , (req: Request, res: Response) => {
  // console.log(somthing);
  res.send('Welcome to todos app')
 })

app.get('/error', async (req: Request, res: Response, next: NextFunction) => {
 try {
  // console.log(something);
  res.send("Welcome to ERROR WORLD");
 } catch (error) {
  next(error)
 }
})


// Handle Not Found Route
app.use((req: Request, res: Response, next: NextFunction) => {
 res.status(404).json({ message: "Route Not Found" })
})


// Global Error Handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
 if (error) {
  console.log("ERROR:", error);
  res.status(400).json({
   message: 'Something went wrong', error
  })
 }
})


export default app;