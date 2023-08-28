import * as React from 'react'
import Timeline, { TimelineProps } from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import {
  Icon123,
  IconBulb,
  IconExclamationCircle,
  IconEye,
  IconEyeCheck,
  IconInfoSquareRounded,
} from '@tabler/icons-react'
import { ReportType } from '@haveyouseen-org/network/src/generated'

export type TimelineStepType = {
  children: React.ReactNode
  type?: ReportType
}

const IconType = ({ type }: { type?: ReportType }) => {
  if (type === ReportType.Sighting) return <IconEyeCheck className="w-5 h-5" />
  if (type === ReportType.Lead) return <IconBulb className="w-5 h-5" />
  if (type === ReportType.GeneralInformation)
    return <IconInfoSquareRounded className="w-5 h-5" />

  return <IconExclamationCircle className="w-5 h-5" />
}

const MyTimelineItem = ({ children, type }: TimelineStepType) => {
  return (
    <TimelineItem
      classes={{ missingOppositeContent: 'before:hidden', root: 'p-0' }}
    >
      <TimelineSeparator>
        <IconType type={type} />

        <TimelineConnector className="bg-gray-50" />
      </TimelineSeparator>
      <TimelineContent classes={{ root: 'p-0 pl-1 mb-4' }}>
        {children}
      </TimelineContent>
    </TimelineItem>
  )
}

const MyTimeline = ({ ref, ...props }: TimelineProps) => {
  return <Timeline {...props} classes={{ root: 'p-0' }} />
}

export { MyTimeline as Timeline, MyTimelineItem as TimelineItem }
