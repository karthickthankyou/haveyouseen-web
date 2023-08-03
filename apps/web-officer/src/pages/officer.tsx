import { Inter } from 'next/font/google'
import { Officer } from '@haveyouseen-org/ui/src/components/templates/Officer'
import { Container } from '@haveyouseen-org/ui/src/components/atoms/Container'
import { IsLoggedIn } from '@haveyouseen-org/ui/src/components/organisms/IsLoggedIn'
import { IsOfficer } from '@haveyouseen-org/ui/src/components/organisms/IsOfficer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={` ${inter.className}`}>
      <Container>
        <IsLoggedIn>
          <IsOfficer>
            <Officer />
          </IsOfficer>
        </IsLoggedIn>
      </Container>
    </main>
  )
}
