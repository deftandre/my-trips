import client from '@/graphql/client'
import HomeTemplate from './templates/Home'
import { GET_PLACES } from '@/graphql/queries'
import { GetPlacesQuery } from '@/graphql/generated/graphql'
import { Metadata } from 'next'

const getPlaces = async () => {
  const { places } = await client.request<GetPlacesQuery>(GET_PLACES)

  return places
}

export const metadata: Metadata = {
  title: 'My Trips',
  description:
    'A simple project to show in a map the places that I went and show more information and photos when clicked.',
  openGraph: {
    url: 'https://my-trips-deftandre.vercel.app',
    title: 'My Trips',
    description:
      'A simple project to show in a map the places that I went and show more information and photos when clicked.',
    images: [
      {
        url: 'https://my-trips-deftandre.vercel.app/img/cover.png',
        width: 1280,
        height: 720,
        alt: 'My Trips'
      }
    ],
    siteName: 'My Trips'
  }
}

export default async function Home() {
  const places = await getPlaces()

  return <HomeTemplate places={places} />
}
