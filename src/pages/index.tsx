// SPA
//SSR
//SSG

import { GetStaticProps } from 'next';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { api } from '../services/api';
import { convertDurationToTime } from '../utills/convertDurationToTimeString';

import styles from './home.module.scss';

type Episode = {
  id: string;
  title: string;
  members: String;
  published_at: string;
  durationAsString: number;
  duration: number;
  thumbnail: string;
  url: string;
  publishedAt: string;

}

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];


}



export default function Home({ latestEpisodes, allEpisodes}: HomeProps) {

  return (
    <div className={styles.homepage}>
      <section className={styles.latesEpisodes}> 
    <h2>Últimos lançamentos</h2>

    <ul>
    {latestEpisodes.map(episode => { // map precisa de uma key
      return (
        <li key={episode.id}>
         <img src={episode.thumbnail} alt={episode.title} />
         <div className = {styles.episodeDetails}>
           <a href="">{episode.title}</a>
           <p>{episode.members}</p>
           <span>{episode.publishedAt}</span>
           <span>{episode.durationAsString}</span>

         </div>

         <button type="button"></button>
         <img src="" alt="Tocar episódio" />
        </li>
      )
    })}

    </ul>

      </section>
      <section className ={styles.allEpisodes}>


      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limite: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTime(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,

    };
  })

  const latestEpisodes = episodes.slice(0,2)
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  }
}
