import type { Metadata } from 'next'
import NextTopLoader from 'nextjs-toploader'

import StyledComponentsRegistry from '@/lib/registry'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'My Trips',
  description: 'Made with nextjs',
  themeColor: '#06092B'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <Providers>
            <NextTopLoader color="#a112a1" />
            {children}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
