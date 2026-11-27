import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { easeOut } from '../motion';
import NextButton from '../NextButton';
import { couple, events, heroImage, host } from '../../data/invitation';
import Petals from './Petals';
import './Hero.css';

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.18, delayChildren: 0.35 } } };
const item = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: easeOut } },
};
const ampersand = {
  hidden: { opacity: 0, scale: 0.4, rotate: -20 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1.2, ease: easeOut } },
};

export default function Hero({ revealed }) {
  const ref = useRef(null);
  const ctaRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (revealed) ctaRef.current?.focus({ preventScroll: true });
  }, [revealed]);

  return (
    <header ref={ref} className="hero">
      <motion.div className="hero-image" style={{ y: imageY, scale: imageScale, backgroundImage: `url(${heroImage})` }} aria-hidden="true" />
      <div className="hero-shade" aria-hidden="true" />
      <motion.div
        className="hero-frame"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={revealed ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 1.8, ease: easeOut }}
      />
      {revealed && <Petals />}

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="hero-content-wrap">
        <motion.div className="hero-content" variants={container} initial="hidden" animate={revealed ? 'visible' : 'hidden'}>
          <motion.span className="eyebrow" variants={item}>Together with our families</motion.span>
          <h1 className="hero-names">
            <motion.span className="hero-name" variants={item}>{couple.groom}</motion.span>
            <motion.span className="hero-amp gold-text" variants={ampersand}>&amp;</motion.span>
            <motion.span className="hero-name" variants={item}>{couple.bride}</motion.span>
          </h1>
          <motion.p className="hero-copy" variants={item}>{host.name} &amp; family warmly invite you</motion.p>
          <motion.div className="hero-dates" variants={item}>
            {events.map((event) => (
              <span key={event.id}><strong>{event.label}</strong>{event.date}</span>
            ))}
          </motion.div>
          <NextButton ref={ctaRef} to="verse" className="next-button hero-cta" variants={item}>
            View the invitation
          </NextButton>
        </motion.div>
      </motion.div>
    </header>
  );
}
