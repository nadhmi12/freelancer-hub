import { Router } from "express";

import { getAllClients, getClientById, updateClient, createClient, deleteClient} from "../controllers/client.controller.js";


const clientRouter = Router()

clientRouter.get("/", getAllClients)
clientRouter.get("/:id", getClientById)
clientRouter.post("/", createClient)
clientRouter.patch("/:id", updateClient)
clientRouter.delete("/:id", deleteClient)

export default clientRouter