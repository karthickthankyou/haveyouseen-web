import { LinearProgress, LinearProgressProps } from '@mui/material'

export const ProgressBar = (props: LinearProgressProps) => {
  return (
    <LinearProgress
      classes={{
        // bar: 'bg-black/10',
        colorPrimary: 'bg-black/30',
        bar1Determinate: 'bg-black/80',
      }}
      {...props}
    />
  )
}
