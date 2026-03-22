import { Router } from "express";


import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from "../controllers/project.controller.js";

const projectRouter = Router({mergeParams: true})



projectRouter.get("/projects", getAllProjects)
projectRouter.get("/projects/:projectId", getProjectById)
projectRouter.post("/projects", createProject)
projectRouter.patch("/projects/:projectId", updateProject)
projectRouter.delete("/projects/:projectId", deleteProject)




export default projectRouter