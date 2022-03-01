import Image from 'next/image';
import { useContext, useRef, useEffect } from 'react';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

import { PlayerContext } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';

export function Player() {
    const audioRef = useRef<HTMLAudioElement>(null);

    const { 
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        togglePlay,
        setIsPlayingState,
        playNext,
        playPrevious,
    } = useContext(PlayerContext)

    useEffect(() => {
        if (!audioRef.current) {
            return;
        } 
        if(isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying])



    const episode = episodeList[currentEpisodeIndex]


    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="a" alt="Tocando agora" />
                <strong> Tocando agora {episode?.title}</strong>
            </header>

            {episode ? (
                <div className={styles.currentEpisode}>
                    <Image
                        width={592}
                        height={592}
                        src={episode.thumbnail}
                        objectFit="cover"
                    />
                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                </div>
            ) : (
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>
            )}

            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        {episode ? (
                            <Slider
                                trackStyle={{ backgroundColor: '#04d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                            />
                        ) : (
                            <div className={styles.emptySlider} />
                        )}
                    </div>

                    <span>00:00</span>
                </div>

                {episode && ( // usando somente IF
                    <audio
                        src={episode.url}
                        ref={ audioRef }
                        autoPlay
                        onPlay={() => setIsPlayingState(true)}
                        onPause={() => setIsPlayingState(false)}

                    />


                )}

                <div className={styles.buttons} >
                    <button type="button" disabled={!episode}>
                        <img src="" alt="Embaralhar" />
                    </button>

                    <button type="button"  onClick={playPrevious}  disabled={!episode}>
                        <img src="" alt="Tocar anterior" />
                    </button>

                    <button
                        type="button"
                        className={styles.playButton}
                        disabled={!episode}
                        onClick={togglePlay}
                    >
                        {isPlaying
                            ? <img src="" alt="pause" />
                            : <img src="" alt="tocar" />}
                    </button>

                    <button type="button" onClick={playNext} disabled={!episode}>
                        <img src="" alt="Tocar próxima" />
                    </button>

                    <button type="button" disabled={!episode}>
                        <img src="" alt="Repetir" />
                    </button>



                </div>
            </footer>
        </div>

    );
}