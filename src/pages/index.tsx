// SPA
//SSR
//SSG

import {GetStaticProps} from 'next'

type Episode = {
  id: string;
  title: string;
  members: String;
}

type HomeProps = {
  episodes: Episode[];

  }



export default function Home(props: HomeProps) {

  return (
<h1>index</h1>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('episodes?_limit=12&_sort=published_at&_order=desc')
  const data = await response.json()
  
  return { 
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}
