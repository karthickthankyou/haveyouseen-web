import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { registerFormSchema } from './signUp'

export const loginFormSchema = registerFormSchema.pick({
  email: true,
  password: true,
})

export type FormTypeLogin = z.infer<typeof loginFormSchema>

export const useFormLogin = () =>
  useForm<FormTypeLogin>({
    resolver: zodResolver(loginFormSchema),
  })
