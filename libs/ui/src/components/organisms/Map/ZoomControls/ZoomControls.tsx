import React, { ReactNode } from 'react'

import { IconMinus, IconPlus } from '@tabler/icons-react'
import { useMap } from 'react-map-gl'

export interface IZoomControlsProps {}

const MapControls = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col border border-white divide-y divide-white rounded shadow-lg bg-white/50 backdrop-blur backdrop-filter">
    {children}
  </div>
)

const ZoomIn = () => {
  const { current: map } = useMap()

  return (
    <button
      className="rounded-none hover:bg-white "
      type="button"
      onClick={() => map?.zoomIn()}
    >
      <IconPlus className="w-8 h-8 p-1.5 " />
    </button>
  )
}

const ZoomOut = () => {
  const { current: map } = useMap()
  return (
    <button
      className="rounded-none hover:bg-white "
      type="button"
      onClick={() => map?.zoomOut()}
    >
      <IconMinus className="w-8 h-8 p-1.5 " />
    </button>
  )
}

MapControls.ZoomIn = ZoomIn
MapControls.ZoomOut = ZoomOut

export default MapControls

export const DefaultZoomControls = () => (
  <MapControls>
    <ZoomIn />
    <ZoomOut />
  </MapControls>
)
