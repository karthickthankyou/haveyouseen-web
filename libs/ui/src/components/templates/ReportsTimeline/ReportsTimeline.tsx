import { format } from 'date-fns'
import Link from 'next/link'
import { useFormApproveReport } from '@haveyouseen-org/forms/src/approveReport'
import { SetStateAction, useMemo, useState } from 'react'
import { useMap } from 'react-map-gl'
import { Button } from '../../atoms/Button'
import { Timeline, TimelineItem } from '../../molecules/TimelineItem'
import { CaseReport } from '../Home/Home'
import {
  namedOperations,
  useCreateApprovedReportMutation,
  useCreateCommentMutation,
} from '@haveyouseen-org/network/src/generated'
import { PlainButton } from '../../atoms/PlainButton'
import { Dialog } from '../../atoms/Dialog'
import { Form } from '../../atoms/Form'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { IconPin } from '@tabler/icons-react'
import Accordion from '../../molecules/Accordion'
import { useAppSelector } from '@haveyouseen-org/store'
import { selectUid } from '@haveyouseen-org/store/user'

export interface IReportsTimelineProps {
  reports?: CaseReport[]
}

export const ReportsTimeline = ({ reports }: IReportsTimelineProps) => {
  let groupedReports = useMemo(
    () =>
      reports?.reduce<{ [date: string]: CaseReport[] }>((acc, report) => {
        let date: string = report.time.split('T')[0]
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(report)
        return acc
      }, {}),
    [reports],
  )

  const { current: map } = useMap()

  return (
    <>
      {Object.entries(groupedReports || {}).map(([date, reports]) => (
        <div key={date} className="pt-3">
          <div className="text-center text-black ">
            {format(new Date(date), 'PP')}
          </div>
          <Timeline className="text-black">
            {reports?.map((report) => (
              <TimelineItem key={report.id} type={report.type}>
                <div>
                  <div className="text-lg">
                    {format(new Date(report.time), 'p')}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {report.approvedReport?.id ? (
                    <>
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div>{report.description}</div>
                          <div className="text-xs text-gray">
                            {report.witness?.name}
                          </div>
                        </div>
                        {report.location?.latitude ? (
                          <PlainButton
                            className="flex items-center justify-center w-6 h-6 gap-2 border rounded-full hover:shadow-lg"
                            onClick={() => {
                              map?.flyTo({
                                center: [
                                  report.location?.longitude || 0,
                                  report.location?.latitude || 0,
                                ],
                                essential: true,
                              })
                            }}
                          >
                            <IconPin className="w-5 h-5" />
                          </PlainButton>
                        ) : null}
                      </div>

                      <div>
                        <div>{report.approvedReport?.description}</div>
                        <div className="text-xs text-gray">Officer report</div>
                      </div>
                      <div>
                        {report.audio ? (
                          <audio src={report.audio} controls />
                        ) : null}
                      </div>
                      <Accordion
                        title={`Comments (${report.comments?.length})`}
                      >
                        {report.comments?.map((comment) => (
                          <div key={comment.id} className="mb-4">
                            <div>{comment.content}</div>
                            <div className="text-xs text-gray">
                              {comment.witness?.name}
                            </div>
                            <div className="text-xs text-gray">
                              {format(new Date(comment.createdAt), 'PPp')}
                            </div>
                          </div>
                        ))}
                        <AddComment report={report} />
                      </Accordion>
                    </>
                  ) : (
                    <div>
                      <div>{report.description}</div>
                      <ApproveReport report={report} />
                    </div>
                  )}
                </div>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      ))}
    </>
  )
}

export const ApproveReport = ({ report }: { report: CaseReport }) => {
  const [open, setOpen] = useState(false)
  const [approve, { data, loading }] = useCreateApprovedReportMutation()

  const { register, handleSubmit } = useFormApproveReport()
  return (
    <div className="py-1">
      <PlainButton
        className="underline underline-offset-4"
        onClick={() => setOpen(true)}
      >
        Approve
      </PlainButton>
      <Dialog open={open} setOpen={setOpen} title={'Approve'}>
        <div className="space-y-2">
          <div>{format(new Date(report.time), 'PPp')}</div>
          <div>{report.description}</div>
        </div>
        <Form
          onSubmit={handleSubmit(async ({ description }) => {
            await approve({
              variables: {
                createApprovedReportInput: { description, id: report.id },
              },
              awaitRefetchQueries: true,
              refetchQueries: [namedOperations.Query.case],
            })
          })}
        >
          <HtmlLabel title="Description">
            <HtmlInput
              placeholder="Description..."
              {...register('description')}
            />
          </HtmlLabel>
          <Button isLoading={loading} type="submit">
            Approve
          </Button>
        </Form>
      </Dialog>
    </div>
  )
}

export const AddComment = ({ report }: { report: CaseReport }) => {
  const [createComment, { data, loading }] = useCreateCommentMutation()
  const [comment, setComment] = useState<string>()
  const uid = useAppSelector(selectUid)
  if (!uid) {
    return (
      <Link className="inline-block my-2" href="/login">
        Login to add comment.
      </Link>
    )
  }
  return (
    <div className="mt-4 space-y-2">
      <HtmlInput
        placeholder="Add comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {comment ? (
        <Button
          onClick={async () => {
            await createComment({
              variables: {
                createCommentInput: {
                  content: comment,
                  reportId: report.id,
                },
              },
              awaitRefetchQueries: true,
              refetchQueries: [namedOperations.Query.case],
            })
          }}
          isLoading={loading}
        >
          Add comment
        </Button>
      ) : null}
    </div>
  )
}
