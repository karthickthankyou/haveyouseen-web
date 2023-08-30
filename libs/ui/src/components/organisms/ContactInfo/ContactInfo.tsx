import { CaseQuery } from '@haveyouseen-org/network/src/generated'

export interface IContactInfoProps {
  contact: NonNullable<CaseQuery['case']>['contact']
}

export const ContactInfo = ({ contact }: IContactInfoProps) => {
  return (
    <div>
      <div className="text-lg">
        Do you have any information regarding this person?
      </div>
      <div>
        <div>Contact</div>
        <div className="text-lg">
          {contact?.map((contact) => <div key={contact}>{contact}</div>)}
        </div>
      </div>
    </div>
  )
}
