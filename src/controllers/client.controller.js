import { clientSchema, updateClientSchema } from "../config/validation.js";
import { AppError } from "../middleware/errorHandler.js";
import prisma from "../config/db.js";

export const getAllClients = async (req, res, next) => {
  try {
    const clients = await prisma.client.findMany();
    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
};

export const getClientById = async (req, res, next) => {
  try {
    const clientId = req.params.id;
    const client = await prisma.client.findUnique({ where: { id: clientId } });
    if (!client) {
      return next(new AppError("Client not found", 404));
    }
    return res.status(200).json(client);
  } catch (error) {
    next(error);
  }
};

export const createClient = async (req, res, next) => {
  try {
    const result = clientSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        path: issue.path[0],
        message: issue.message,
      }));
      return next(new AppError("Validation failed", 400, errors));
    }

    const { name, email } = result.data;
    const newClient = await prisma.client.create({ data: { name, email } });
    return res.status(201).json(newClient);
  } catch (error) {
    next(error);
  }
};

export const updateClient = async (req, res, next) => {
  try {
    const result = updateClientSchema.safeParse(req.body);

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

    const clientId = req.params.id;
    const data = result.data;
    const updatedClient = await prisma.client.update({
      where: { id: clientId },
      data,
    });
    return res.status(200).json(updatedClient);
  } catch (error) {
    if (error.code === "P2025") {
      return next(new AppError("Client not found", 404));
    }
    next(error);
  }
};

export const deleteClient = async (req, res, next) => {
  try {
    const clientId = req.params.id;

    await prisma.client.delete({ where: {id : clientId } });

    return res.sendStatus(204);
  } catch (error) {
    if (error.code === "P2025") {
      return next(new AppError("Client not found", 404));
    }
    next(error);
  }
};
