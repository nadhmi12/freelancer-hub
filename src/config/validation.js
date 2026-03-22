import { z } from "zod"

export const clientSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.email()
})

export const updateClientSchema = z.object({
    name: z.string().min(3).max(10).optional(),
    email: z.email().optional()
})
