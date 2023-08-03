import { format } from 'date-fns'
import { useFormApproveReport } from '@haveyouseen-org/forms/src/approveReport'
import { SetStateAction, useMemo, useState } from 'react'
import { useMap } from 'react-map-gl'
import { Button } from '../../atoms/Button'
import { Timeline, TimelineItem } from '../../molecules/TimelineItem'
import { CaseReport } from '../Home/Home'
import {
  namedOperations,
  useCreateApprovedReportMutation,
} from '@haveyouseen-org/network/src/generated'
import { PlainButton } from '../../atoms/PlainButton'
import { Dialog } from '../../atoms/Dialog'
import { Form } from '../../atoms/Form'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { IconPin } from '@tabler/icons-react'

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

                <div className="flex justify-between gap-2">
                  {report.approvedReport?.id ? (
                    <div>{report.approvedReport?.description}</div>
                  ) : (
                    <div>
                      <div>{report.description}</div>
                      <ApproveReport report={report} />
                    </div>
                  )}
                  {report.location?.latitude ? (
                    <Button
                      onClick={() => {
                        map?.flyTo({
                          center: [
                            report.location?.longitude || 0,
                            report.location?.latitude || 0,
                          ],
                          essential: true,
                        })
                      }}
                      variant="text"
                      size="none"
                    >
                      <IconPin />
                    </Button>
                  ) : null}
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
