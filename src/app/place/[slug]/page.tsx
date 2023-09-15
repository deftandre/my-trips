import { notFound } from 'next/navigation'
import { Metadata } from 'next'

import client from '@/graphql/client'
import { GET_PLACES, GET_PLACE_BY_SLUG } from '@/graphql/queries'
import {
  GetPlaceBySlugQuery,
  GetPlacesQuery
} from '@/graphql/generated/graphql'
import PlacesTemplate from '@/app/templates/Places'

export type ParamsProp = {
  slug: string
}

export type PlaceProps = {
  params: ParamsProp
}

const getPlace = async (params: ParamsProp) => {
  const { place } = await client.request<GetPlaceBySlugQuery>(
    GET_PLACE_BY_SLUG,
    {
      slug: `${params?.slug}`
    }
  )

  return place
}

export async function generateMetadata({
  params
}: PlaceProps): Promise<Metadata> {
  const place = await getPlace(params)

  if (!place) return {}

  return {
    title: `${place.name} - My Trips`,
    description:
      place.description?.text ||
      'A simple project to show in a map the places that I went and show more information and photos when clicked.',
    openGraph: {
      url: 'https://my-trips.deftandre.com.br',
      title: `${place.name} - My Trips`,
      description:
        place.description?.text ||
        'A simple project to show in a map the places that I went and show more information and photos when clicked.',
      images: [
        {
          url: place.gallery[0].url,
          width: place.gallery[0].width ?? 50,
          height: place.gallery[0].height ?? 50,
          alt: `${place.name}`
        }
      ]
    }
  }
}

export default async function Place({ params }: PlaceProps) {
  const place = await getPlace(params)

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
