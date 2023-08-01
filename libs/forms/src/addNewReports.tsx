import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { newReportFormSchema } from './addNewCase'

export const addNewReportsFormSchema = z.object({
  reports: z.array(newReportFormSchema).min(1, 'Add atleast one report.'),
  caseId: z.string(),
})

export type FormTypeAddNewReports = z.infer<typeof addNewReportsFormSchema>

export const useFormAddNewReports = () =>
  useForm<FormTypeAddNewReports>({
    resolver: zodResolver(addNewReportsFormSchema),
    defaultValues: {
      reports: [],
    },
  })

export const approveReportsFormSchema = z.object({
  description: z.string(),
})

export type FormTypeApproveReports = z.infer<typeof approveReportsFormSchema>

export const useFormApproveReports = () =>
  useForm<FormTypeAddNewReports>({
    resolver: zodResolver(approveReportsFormSchema),
  })
