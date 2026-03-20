import express from "express"
import { randomUUID } from "crypto"

// local import 
import { ENV } from "./config/env.js"
import {clientSchema, updateClientSchema} from "./config/validation.js"
import { errorHandler, AppError } from "./middleware/errorHandler.js"

const app = express()
app.use(express.json())


const clients = [
    {id: randomUUID(), name: "Alice", email: "alice@gmail.com", createdAt: new Date()},
    {id: randomUUID(), name: "Aline", email: "aline@gmail.com", createdAt: new Date()},
    {id: randomUUID(), name: "Drake", email: "drake@gmail.com", createdAt: new Date()}
]




app.get("/api/clients", (req, res) => {
    res.status(200).json(clients)
})
app.get("/api/clients/:id", (req, res, next) => {
    const clientId = req.params.id
    const client = clients.find((client) => client.id === clientId)
    if(!client) {
        return next(new AppError("Client not found", 404))
    }
    return res.status(200).json(client)
})

app.post("/api/clients", (req,res, next) => {

    const result = clientSchema.safeParse(req.body)
    if(!result.success) {
        const errors = result.error.issues.map(issue => ({
            path: issue.path[0],
            message: issue.message
        })) 
        return next(new AppError("Validation failed", 400, errors))
    }

    const {name, email} = result.data
    const newClient = {
        id: randomUUID(),
        name,
        email,
        createdAt: new Date()
    }
    clients.push(newClient)
    return res.status(201).json(newClient)
})

app.patch("/api/clients/:id", (req, res, next) => {

    const result = updateClientSchema.safeParse(req.body)

    if(!result.success) {
        const errors = result.error.issues.map(issue => ({
            path: issue.path[0],
            message: issue.message
        })) 
        return next(new AppError("Validation failed", 400, errors))
    }

    if (Object.keys(result.data).length === 0) {
        return next(new AppError("At least one field is required to update", 400))
    }

    const clientId = req.params.id
    const data = result.data
    const index = clients.findIndex((client) => client.id === clientId)

    if (index === -1) {
        return next(new AppError("Client not found", 404))
    }
    clients[index] = {
        ...clients[index],
        ...data
    }
    return res.status(200).json(clients[index])
})

app.delete("/api/clients/:id", (req, res, next) => {
    const clientId = req.params.id
    const index = clients.findIndex((client) => client.id === clientId)
    if (index === -1) {
        return next(new AppError("Client not found", 404))
    }
    clients.splice(index,1)
    return res.sendStatus(204)
})


app.get("/health", (req,res) => {
    res.json({status : "ok"})
})


app.use(errorHandler)
app.listen(ENV.PORT, () => {
    console.log(`server is running on http://localhost:${ENV.PORT}`)
})