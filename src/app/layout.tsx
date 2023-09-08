import type { Metadata } from 'next'

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
      </head>
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
