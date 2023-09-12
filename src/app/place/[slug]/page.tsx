import { notFound } from 'next/navigation'

import client from '@/graphql/client'
import { GET_PLACES, GET_PLACE_BY_SLUG } from '@/graphql/queries'
import {
  GetPlaceBySlugQuery,
  GetPlacesQuery
} from '@/graphql/generated/graphql'
import PlacesTemplate from '@/app/templates/Places'

export type PlaceProps = {
  params: { slug: string }
}

export default async function Place({ params }: PlaceProps) {
  const { place } = await client.request<GetPlaceBySlugQuery>(
    GET_PLACE_BY_SLUG,
    {
      slug: `${params?.slug}`
    }
  )

  if (!place) return notFound()

  return <PlacesTemplate place={place} />
}

export async function generateStaticParams() {
  const { places } = await client.request<GetPlacesQuery>(GET_PLACES, {
    first: 3
  })

  return places
}

export const dynamicParams = true
