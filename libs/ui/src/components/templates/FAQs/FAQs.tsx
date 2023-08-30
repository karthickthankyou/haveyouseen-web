import { Container } from '../../atoms/Container'

export interface IFAQsProps {}

const faqs = [
  {
    question: 'What is the purpose of this application?',
    answer:
      'This application serves as a portfolio project to showcase development skills. It does not contain actual information about missing persons.',
  },
  {
    question: 'Are the data real?',
    answer: 'No. All information is for demo purposes.',
  },
  {
    question: 'Can I create a sample case?',
    answer:
      'Yes. You can register through the officer domain and create a sample case with reports. Please make sure to keep in mind that this application is like a public square. So please be responsible with your case creation.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Since this is a portfolio project, any data entered is for demonstration purposes and should not be considered secure. Do not enter sensitive or real personal information.',
  },
  {
    question: 'How can I contact you?',
    answer:
      'The ideal way to contact me is through linkedin. Link: https://www.linkedin.com/in/iamkarthickr',
  },
]

export const FAQs = ({}: IFAQsProps) => {
  return (
    <Container className="space-y-6">
      {faqs.map((faq) => (
        <div className="max-w-md space-y-2">
          <div className="font-semibold">{faq.question}</div>
          <div>{faq.answer}</div>
        </div>
      ))}
    </Container>
  )
}
