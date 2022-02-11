// SPA
//SSR
//SSG

import {GetStaticProps} from 'next'
import { api } from '../services/api'

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
  const {data} = await api.get('episodes',{
    params: {
      _limite: 12,
      _sort: 'published_at',
      _order:'desc'
    }
  })
 
  
  return { 
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}
