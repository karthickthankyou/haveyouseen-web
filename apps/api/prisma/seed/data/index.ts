interface MissingPerson {
  id: number
  displayName: string
  images: string[]
  dob: string
  gender: string
  description: string
  missingSince: string
  height: number
  weight: number
  bodyType: string
}

interface Case {
  id: number
  missingPersonId: number
  status: string
  contact: string[]
}

interface Location {
  id: number
  latitude: number
  longitude: number
  address: string
}

interface Report {
  id: number
  time: string
  description: string
  locationId: number
  type: string
  witnessId: string
}

interface Witness {
  uid: string
  name: string
}

const missingPersonSample: MissingPerson = {
  id: 1,
  displayName: "Sarah O'Connor",
  images: ['sarah_1.jpg', 'sarah_2.jpg'],
  dob: '1990-05-12',
  gender: 'FEMALE',
  description: 'Brunette, has a butterfly tattoo on the right shoulder',
  missingSince: '2023-06-15',
  height: 5.6,
  weight: 140,
  bodyType: 'AVERAGE',
}

const caseSample: Case = {
  id: 1,
  missingPersonId: 1,
  status: 'MISSING',
  contact: ['John O’Connor (Brother) - +1234567890'],
}

const locationSamples: Location[] = [
  {
    id: 1,
    latitude: 40.73061,
    longitude: -73.935242,
    address: 'Local Grocery Store',
  },
  {
    id: 2,
    latitude: 40.785091,
    longitude: -73.968285,
    address: 'Central Park',
  },
]

const reportSamples: Report[] = [
  {
    id: 1,
    time: '2023-06-15 09:00:00',
    description: 'Sighted at the local grocery store.',
    locationId: 1,
    type: 'SIGHTING',
    witnessId: 'john-doe',
  },
  {
    id: 2,
    time: '2023-06-16 18:30:00',
    description: 'Was seen walking her dog near Central Park.',
    locationId: 2,
    type: 'SIGHTING',
    witnessId: 'jane-smith',
  },
  {
    id: 3,
    time: '2023-06-16 21:15:00',
    description: 'A personal item belonging to Sarah was found near a cafe.',
    locationId: 1,
    type: 'LEAD',
    witnessId: 'john-doe',
  },
]

const witnessSamples: Witness[] = [
  {
    uid: 'john-doe',
    name: 'John Doe',
  },
  {
    uid: 'jane-smith',
    name: 'Jane Smith',
  },
]

export const getSampleData = () => {
  return {
    missingPersonSample,
    caseSample,
    locationSamples,
    reportSamples,
    witnessSamples,
  }
}
