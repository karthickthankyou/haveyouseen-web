/* eslint-disable react/jsx-props-no-spreading */
import MuiTooltip, { TooltipProps } from '@mui/material/Tooltip'
export type AllColors =
  | 'primary'
  | 'black'
  | 'white'
  | 'red'
  | 'green'
  | 'yellow'
  | 'gray'

export type ITooltipProps = {
  bg?: AllColors
  text?: AllColors
} & TooltipProps

const Tooltip = ({
  bg = 'white',
  text = 'black',
  children,
  title,
  ...props
}: ITooltipProps) => (
  <MuiTooltip
    classes={{
      tooltip: ` bg-white text-sm  text-black shadow-lg shadow/black/30 `,
      arrow: `text-white`,
    }}
    // TransitionComponent={Fade}
    TransitionProps={{ timeout: 0 }}
    title={title}
    {...props}
  >
    {children}
  </MuiTooltip>
)

export default Tooltip
