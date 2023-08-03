import { Tienne } from 'next/font/google'
import { HomePage } from '@haveyouseen-org/ui/src/components/templates/Home'

const inter = Tienne({ weight: ['400', '700', '900'], subsets: ['latin'] })

export default function Search() {
  return (
    <main className={` ${inter.className}`}>
      <HomePage />
    </main>
  )
}
