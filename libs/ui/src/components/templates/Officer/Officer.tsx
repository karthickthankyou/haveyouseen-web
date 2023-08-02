import { memo } from 'react'

import { Button } from '../../atoms/Button'
import { Form } from '../../atoms/Form'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import {
  namedOperations,
  useCreateOfficerMutation,
  useUnapprovedReportsQuery,
} from '@haveyouseen-org/network/src/generated'
import { useAppSelector } from '@haveyouseen-org/store'
import { useFormCreateOfficer } from '@haveyouseen-org/forms/src/createOfficer'
import { selectUid } from '@haveyouseen-org/store/user'
import { notification$ } from '@haveyouseen-org/util/subjects'
import { ShowData } from '../../organisms/ShowData'
import { useTakeSkip } from '@haveyouseen-org/util'

export interface IOfficerProps {}

export const CreateOfficer = memo(() => {
  const uid = useAppSelector(selectUid)
  const [createOfficerMutation, { loading, data }] = useCreateOfficerMutation()

  const { register, handleSubmit } = useFormCreateOfficer()
  return (
    <Form
      onSubmit={handleSubmit(async (data) => {
        if (!uid) {
          notification$.next({ message: 'You are not logged in' })
          return
        }
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

export const Officer = () => {
  const { setSkip, setTake, skip, take } = useTakeSkip()
  const { data, loading } = useUnapprovedReportsQuery({
    variables: {
      where: { approvedReport: { is: null }, caseId: { equals: 32 } },
    },
  })
  return (
    <ShowData loading={loading} pagination={{ setSkip, setTake, skip, take }}>
      {data?.reports.map((rep) => (
        <div key={rep.id}>{rep.caseId}</div>
      ))}
    </ShowData>
  )
}
