import { format } from 'date-fns'
import { useMemo } from 'react'
import { useMap } from 'react-map-gl'
import { Button } from '../../atoms/Button'
import { Timeline, TimelineItem } from '../../molecules/TimelineItem'
import { CaseReport } from '../Home/Home'

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
                <div>{report.description}</div>
                {report.location?.latitude ? (
                  <Button
                    onClick={() => {
                      map?.flyTo({
                        center: [
                          report.location?.longitude || 0,
                          report.location?.latitude || 0,
                        ],
                        zoom: 10,
                      })
                    }}
                    variant="text"
                    size="none"
                    className="underline"
                  >
                    location
                  </Button>
                ) : null}
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      ))}
    </>
  )
}
