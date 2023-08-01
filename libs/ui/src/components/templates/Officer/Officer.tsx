import Link from 'next/link'
import { memo } from 'react'

import { Button } from '../../atoms/Button'
import { Form } from '../../atoms/Form'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import {
  namedOperations,
  useCreateOfficerMutation,
  useOfficerMeQuery,
  useUnapprovedReportsQuery,
} from '@haveyouseen-org/network/src/generated'
import { useAppDispatch, useAppSelector } from '@haveyouseen-org/store'
import { useFormCreateOfficer } from '@haveyouseen-org/forms/src/createOfficer'
import { selectUser } from '@haveyouseen-org/store/user'

export interface IOfficerProps {}

export const Officer = ({}: IOfficerProps) => {
  const user = useAppSelector(selectUser)
  const { data, error } = useOfficerMeQuery()

  if (!user.uid)
    return (
      <div>
        <Link href="/login">Login</Link>
      </div>
    )

  if (!data?.officerMe) return <CreateOfficer uid={user.uid} />
  return <OfficerTemplate />
}

export const CreateOfficer = memo(({ uid }: { uid: string }) => {
  const [createOfficerMutation, { loading, data }] = useCreateOfficerMutation()
  const dispatch = useAppDispatch()

  const { register, handleSubmit } = useFormCreateOfficer()
  return (
    <Form
      onSubmit={handleSubmit(async (data) => {
        await createOfficerMutation({
          variables: {
            createOfficerInput: { uid, name: data.name },
          },
          awaitRefetchQueries: true,
          refetchQueries: [namedOperations.Query.officerMe],
        })
      })}
    >
      <HtmlLabel title="Name">
        <HtmlInput {...register('name')} />
      </HtmlLabel>
      <Button isLoading={loading} type="submit">
        Create officer
      </Button>
    </Form>
  )
})

CreateOfficer.displayName = 'CreateOfficer'

export const OfficerTemplate = () => {
  const { data, loading } = useUnapprovedReportsQuery({
    variables: {
      where: { approvedReport: { is: null }, caseId: { equals: 32 } },
    },
  })
  return (
    <div>
      {data?.reports.map((rep) => <div key={rep.id}>{rep.caseId}</div>)}
    </div>
  )
}
