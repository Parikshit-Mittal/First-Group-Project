import mongoose from "mongoose"
import express from "express"
import { Todo } from "./todo.js"
await mongoose.connect("mongodb://localhost:27017/Todo")
const app = express()
app.use(express.json())
const port = 3000






app.get('/api/todos', async (req, res) => {
    const alltask = await Todo.find()
    res.send(alltask)
})
app.post('/api/todos', async (req, res) => {
    const todo = new Todo(req.body)
    await todo.save()

})
app.put('/api/todos/:id', async (req, res) => {
    const { id } = req.params
    const { title, description } = req.body

    if (title != null && description != null) {
        const result = await Todo.findByIdAndUpdate(id, { title, description }, { new: true })
        res.send(result)
    }
})
app.delete('/api/todos/:id', async (req, res) => {
    const { id } = req.params
    await Todo.findByIdAndDelete(id)
})
app.patch('/api/todos/:id/complete', async (req, res) => {
    const { id } = req.params
    await Todo.findByIdAndUpdate(id, { status: true }, { new: true })
})






app.listen(port, () => {
    console.log(`Todo API listening on port ${port}`)
})