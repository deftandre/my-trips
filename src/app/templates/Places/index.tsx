'use client'

import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'

import LinkWrapper from '@/components/LinkWrapper'
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline'

import * as S from './styles'

type ImageProps = {
  url: string
  height?: number | null
  width?: number | null
}

export type PlacesTemplateProps = {
  place: {
    slug: string
    name: string
    description?:
      | {
          html: string
          text: string
        }
      | null
      | undefined
    gallery: ImageProps[]
  }
}

export default function PlacesTemplate({ place }: PlacesTemplateProps) {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return (
    <>
      <LinkWrapper href="/">
        <CloseOutline size={32} aria-label="Go back to map" />
      </LinkWrapper>

      <S.Wrapper>
        <S.Container>
          <S.Heading>{place.name}</S.Heading>

          <S.Body
            dangerouslySetInnerHTML={{ __html: place.description?.html || '' }}
          />

          <S.Gallery>
            {place.gallery.map((image, index) => (
              <Image
                key={`photo-${index}`}
                src={image.url}
                alt={place.name}
                width={isMobile ? 330 : 1000}
                height={isMobile ? 198 : 600}
                quality={75}
              />
            ))}
          </S.Gallery>
        </S.Container>
      </S.Wrapper>
    </>
  )
}
