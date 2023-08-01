import { Layer, Source } from 'react-map-gl'

export const MapLines = ({
  coordinates,
}: {
  coordinates?: [number, number][]
}) => {
  const dataOne = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates,
    },
  }
  return (
    <Source type="geojson" data={dataOne}>
      <Layer
        id="lineLayer"
        type="line"
        source="my-data"
        paint={{
          'line-color': 'rgb(0,0,0)',
          'line-width': 2,
        }}
      />
    </Source>
  )
}
