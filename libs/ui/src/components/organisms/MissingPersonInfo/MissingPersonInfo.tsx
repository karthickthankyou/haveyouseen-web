import { formatDistance, formatDistanceToNow } from 'date-fns'
import { CaseQuery } from '@haveyouseen-org/network/src/generated'
import { KeyValue } from '../../atoms/KeyValue'
import Image from 'next/image'

export interface IMissingPersonInfoProps {
  missingPerson?: NonNullable<CaseQuery['case']>['missingPerson']
}

export const MissingPersonInfo = ({
  missingPerson,
}: IMissingPersonInfoProps) => {
  if (!missingPerson) return null
  return (
    <div className="space-y-4">
      <Image
        alt={missingPerson.displayName}
        fill
        className="relative object-cover w-full h-full aspect-square"
        src={missingPerson?.images ? missingPerson?.images[0] : ''}
      />
      <KeyValue title="Name">{missingPerson.displayName}</KeyValue>
      <KeyValue title="Description">{missingPerson.description}</KeyValue>
      <div className="grid justify-between grid-cols-2 gap-1">
        <KeyValue title="Gender">{missingPerson.gender}</KeyValue>
        <KeyValue title="Age">
          <div>
            {formatDistance(new Date(missingPerson.dob), new Date(), {
              addSuffix: false,
            })}
          </div>
        </KeyValue>
      </div>

      <div className="grid grid-cols-2 gap-1">
        <KeyValue title="Height">{missingPerson.height}</KeyValue>
        <KeyValue title="Weight">{missingPerson.weight}</KeyValue>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {missingPerson.missingSince ? (
          <KeyValue title="Missing since">
            {formatDistanceToNow(new Date(missingPerson.missingSince), {
              addSuffix: true,
            })}
          </KeyValue>
        ) : null}
      </div>
      <div className="pt-6" />
    </div>
  )
}
