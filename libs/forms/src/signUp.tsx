import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const registerFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().optional(),
  photoURL: z.string().optional(),
  rememberMe: z.boolean().optional(),
})

export type FormTypeRegister = z.infer<typeof registerFormSchema>

export const useFormRegister = () =>
  useForm<FormTypeRegister>({
    resolver: zodResolver(registerFormSchema),
  })
