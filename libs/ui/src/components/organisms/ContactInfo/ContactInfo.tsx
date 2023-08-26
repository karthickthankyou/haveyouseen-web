import { CaseQuery } from '@haveyouseen-org/network/src/generated'

export interface IContactInfoProps {
  contact: NonNullable<CaseQuery['case']>['contact']
}

export const ContactInfo = ({ contact }: IContactInfoProps) => {
  return (
    <>
      <div className="text-2xl font-light">
        Do you have any information regarding this person?
      </div>
      <div>
        <div className="text-lg font-light">Contact</div>
        {contact?.map((contact) => <div key={contact}>{contact}</div>)}
      </div>
    </>
  )
}
