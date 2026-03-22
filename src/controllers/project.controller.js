import { AppError } from "../middleware/errorHandler.js";
import prisma from "../config/db.js";
import { projectSchema, updateProjectSchema } from "../config/validation.js";

export const getAllProjects = async (req, res, next) => {
  try {
    const clientId = req.params.clientId;
    if (!clientId) {
      return next(new AppError("client not valid", 400));
    }
    const projects = await prisma.project.findMany({ where: { clientId } });
    return res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const clientId = req.params.clientId;
    if (!clientId) {
      return next(new AppError("client not valid", 400));
    }
    const projectId = req.params.projectId;
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) {
      return next(new AppError("Project not found", 404));
    }
    return res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const result = projectSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        path: issue.path[0],
        message: issue.message,
      }));
      return next(new AppError("Validation failed", 400, errors));
    }
    const clientId = req.params.clientId;
    const { description, status, deadline } = result.data;
    const newProject = await prisma.project.create({
      data: { description, status, deadline, clientId },
    });
    return res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const result = updateProjectSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        path: issue.path[0],
        message: issue.message,
      }));
      return next(new AppError("Validation failed", 400, errors));
    }
    if (Object.keys(result.data).length === 0) {
      return next(
        new AppError("At least one field is required to update", 400),
      );
    }
    const projectId = req.params.projectId;
    const data = result.data;
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data,
    });

    return res.status(200).json(updatedProject);
  } catch (error) {
    if (error.code === "P2025") {
      return next(new AppError("Project not found", 404));
    }
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;
    await prisma.project.delete({ where: { id: projectId } });

    return res.sendStatus(204);
  } catch (error) {
    if (error.code === "P2025") {
      return next(new AppError("Project not found", 404));
    }
    next(error);
  }
};
