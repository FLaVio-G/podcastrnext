
import { useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';

export function  Player() {
    const player = useContext(PlayerContext)


    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="a" alt="Tocando agora" />
                <strong> Tocando agora {player}</strong>
            </header>

            <div className={styles.emptyPlayer}>
                <strong>Selecione um podcast para ouvir</strong>
            </div>

            <footer className={styles.empty}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        <div className={styles.emptySlider}></div>
                    </div>

                    <span>00:00</span>
                </div>

                <div className={styles.buttons}>
                    <button type="button">
                        <img src="" alt="Embaralhar" />
                    </button>

                    <button type="button">
                        <img src="" alt="Tocar anterior" />
                    </button>

                    <button type="button" className={styles.playButton}>
                        <img src="" alt="tocar" />
                    </button>

                    <button type="button">
                        <img src="" alt="Tocar próxima" />
                    </button>

                    <button type="button">
                        <img src="" alt="Repetir" />
                    </button>



                </div>
            </footer>
        </div>

    );
}