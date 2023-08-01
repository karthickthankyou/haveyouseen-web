import { Inter } from 'next/font/google'
import { HomePage } from '@haveyouseen-org/ui/src/components/templates/Home'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={` ${inter.className}`}>
      <HomePage />
    </main>
  )
}
