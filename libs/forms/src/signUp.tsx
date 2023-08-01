import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const signUpFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().optional(),
})

export type FormTypeSignUp = z.infer<typeof signUpFormSchema>

export const useFormSignup = () =>
  useForm<FormTypeSignUp>({
    resolver: zodResolver(signUpFormSchema),
  })
