import express from "express"
import { randomUUID } from "crypto"

// local import 
import { ENV } from "./config/env.js"

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
app.get("/api/clients/:id", (req, res) => {
    const clientId = req.params.id
    const client = clients.find((client) => client.id === clientId)
    if(!client) {
        return res.status(404).json({error: "Client not found"})
    }
    return res.status(200).json(client)
})

app.post("/api/clients", (req,res) => {
    const {name, email} = req.body
    if (!name || !email) {
        return res.status(400).json({error: "Name and Email are required"})
    }
    const newClient = {
        id: randomUUID(),
        name,
        email,
        createdAt: new Date()
    }
    clients.push(newClient)
    return res.status(201).json(newClient)
})

app.patch("/api/clients/:id", (req, res) => {
    const clientId = req.params.id
    const data = req.body
    const index = clients.findIndex((client) => client.id === clientId)

    if (index === -1) {
        return res.status(404).json({error: "Client not found"})
    }
    clients[index] = {
        ...clients[index],
        ...data
    }
    return res.status(200).json(clients[index])
})

app.delete("/api/clients/:id", (req, res) => {
    const clientId = req.params.id
    const index = clients.findIndex((client) => client.id === clientId)
    if (index === -1) {
        return res.status(404).json({error: "Client not found"})
    }
    clients.splice(index,1)
    return res.sendStatus(204)
})


app.get("/health", (req,res) => {
    res.json({status : "ok"})
})



app.listen(ENV.PORT, () => {
    console.log(`server is running on http://localhost:${ENV.PORT}`)
})