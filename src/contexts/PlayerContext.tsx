import { createContext, useState, ReactNode, useContext } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index:number) => void;
  setIsPlayingState: (state: boolean) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
};

export const PlayerContext = createContext({

} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode;

}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index:number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);


  }

  function setIsPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const  hasNext = (currentEpisodeIndex + 1) < episodeList.length;

  function playNext() {
    if(hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)

    }
  }

  function playPrevious () {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex -1);
    }
  }

  return (


    <PlayerContext.Provider value={{
      episodeList,
      currentEpisodeIndex,
      play,
      playNext,
      playPrevious,
      isPlaying,
      playList,
      togglePlay,
      setIsPlayingState,
      hasPrevious,
      hasNext,
    }}>

      {children}
    </PlayerContext.Provider>
  )

}


export const usePlayer = () => { 
  return useContext(PlayerContext)
}