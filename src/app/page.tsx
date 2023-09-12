import client from '@/graphql/client'
import HomeTemplate from './templates/Home'
import { GET_PLACES } from '@/graphql/queries'
import { GetPlacesQuery } from '@/graphql/generated/graphql'

const getPlaces = async () => {
  const { places } = await client.request<GetPlacesQuery>(GET_PLACES)

  return places
}

export default async function Home() {
  const places = await getPlaces()

  return <HomeTemplate places={places} />
}
