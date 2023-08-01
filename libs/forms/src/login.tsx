import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { signUpFormSchema } from './signUp'

export const loginFormSchema = signUpFormSchema.pick({
  email: true,
  password: true,
})

export type FormTypeLogin = z.infer<typeof loginFormSchema>

export const useFormLogin = () =>
  useForm<FormTypeLogin>({
    resolver: zodResolver(loginFormSchema),
  })
