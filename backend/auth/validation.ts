import {z} from 'zod'

export const UserValidation = z.object({
    username:z.string().min(5).max(50),
    password:z.string().min(5).max(15),
    email:z.string()    
})

export const SigninValidation = z.object({
    email:z.string(),
    password:z.string()
})

export const TodoValidation = z.object({
    title:z.string().min(1),
    description:z.string().min(1),
    completed:z.boolean()
})