import { z } from "zod"

export const clientSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.email()
})

export const updateClientSchema = z.object({
    name: z.string().min(3).max(20).optional(),
    email: z.email().optional()
})

export const projectSchema = z.object({
    description: z.string().min(20).max(400),
    status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED", "DELIVERED"]).optional(),
    deadline: z.iso.datetime()
})

export const updateProjectSchema = z.object({
    description: z.string().min(20).max(400).optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED", "DELIVERED"]).optional(),
    deadline: z.iso.datetime().optional()
})