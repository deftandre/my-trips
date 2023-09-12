import { notFound } from 'next/navigation'

import PageTemplate from '../templates/Pages'
import client from '@/graphql/client'
import { GET_PAGES, GET_PAGE_BY_SLUG } from '@/graphql/queries'
import { GetPageBySlugQuery, GetPagesQuery } from '@/graphql/generated/graphql'

export type PageProps = {
  params: { slug: string }
}

export default async function Page({ params }: PageProps) {
  const { page } = await client.request<GetPageBySlugQuery>(GET_PAGE_BY_SLUG, {
    slug: `${params?.slug}`
  })

  if (!page) return notFound()

  const {
    heading,
    body: { html }
  } = page

  return <PageTemplate heading={heading} body={html} />
}

export async function generateStaticParams() {
  const { pages } = await client.request<GetPagesQuery>(GET_PAGES, { first: 3 })

  const params = pages.map(({ slug }) => ({ slug: slug }))

  return params
}

export const dynamicParams = true
