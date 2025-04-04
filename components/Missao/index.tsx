// components/Missao.tsx
import React from 'react';
import styles from '../../styles/Home.module.css';

interface MissaoProps {
  index: number;
  item: any;
  dia: number;
  menusDay: number;
  atualizarDados: (index: number, item: number, xp: number, pontos: number, forca: number, def: number, vel: number, int: number, log: number, pow: number, hax: number, con: number) => void;
  incrementarTarefa: () => void;
}

const Missao: React.FC<MissaoProps> = ({ index, item, dia, menusDay, atualizarDados, incrementarTarefa }) => {
  return (
    item.ok === 'n' && (
      <div className={styles.mission}>
        <h3>{(item.qtd + (item.plus * (dia - menusDay))).toFixed(1)} {item.tarefa}</h3>
        <img className={styles.img} src={item.img} alt="" />
        <div>Xp: +{item.xp + 4 * (dia - menusDay)}</div>
        <div>Pontos: +{item.pontos + 7 * (dia - menusDay)}</div>

        {item.for > 0 && <div className={styles.inclement}>For: +{((item.for + 2 * (dia - menusDay)) * item.for).toFixed(1)}</div>}
        {item.def > 0 && <div className={styles.inclement}>Def: +{((item.def + 2 * (dia - menusDay)) * item.def).toFixed(1)}</div>}
        {item.vel > 0 && <div className={styles.inclement}>Vel: +{(item.vel + 6 + 1 * (dia - menusDay)) * item.vel}</div>}
        {item.con > 0 && <div className={styles.inclement}>Con: +{(item.con + 1 * (dia - menusDay)) * item.vel}</div>}
        {item.int > 0 && <div className={styles.inclement}>Int: +{(item.int * (dia - menusDay)).toFixed(0)}</div>}
        {item.log > 0 && <div className={styles.inclement}>Log: +{item.log + 1 * (dia - menusDay)}</div>}
        {item.pow > 0 && <div className={styles.inclement}>Pow: +{item.pow + 2 * (dia - menusDay)}</div>}
        {item.hax > 0 && <div className={styles.inclement}>Hax: +{(item.hax + 0.00001 * (dia - menusDay)).toFixed(5)}</div>}

        <button
          className={styles.button2}
          onClick={() => {
            atualizarDados(
              0,
              index,
              item.xp + 5 * (dia - menusDay),
              item.pontos + 8 * (dia - menusDay),
              (item.for + 2 * (dia - menusDay)) * item.for,
              (item.def + 2 * (dia - menusDay)) * item.def,
              (item.vel + 6 + 1 * (dia - menusDay)) * item.vel,
              item.int + 0.00001 * (dia - menusDay),
              (item.log + 1 * (dia - menusDay)) * item.log,
              (item.pow + 2 * (dia - menusDay)) * item.pow,
              item.hax + 0.00001 * (dia - menusDay),
              item.con
            );
            incrementarTarefa();
          }}
        >
          Finalizado
        </button>
        <button className={styles.button2} onClick={() => alert(item.gloria)}>
          Gloria a Deus
        </button>
      </div>
    )
  );
};

export default Missao;
