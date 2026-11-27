import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { FadeWords, Ornament, Reveal } from '../motion';
import NextButton from '../NextButton';
import { blessing, host } from '../../data/invitation';
import './Blessing.css';

function Mandala() {
  return (
    <svg viewBox="-100 -100 200 200">
      {Array.from({ length: 12 }, (_, index) => (
        <ellipse key={index} cx="0" cy="-56" rx="14" ry="36" transform={`rotate(${index * 30})`} />
      ))}
      {Array.from({ length: 24 }, (_, index) => (
        <circle key={index} cx="0" cy="-94" r="3" transform={`rotate(${index * 15})`} />
      ))}
      <circle r="18" />
      <circle r="28" />
      <circle r="88" />
    </svg>
  );
}

export default function Blessing() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-45, 45]);

  return (
    <section ref={ref} id="invitation" className="section blessing" aria-labelledby="blessing-title">
      <motion.div className="blessing-mandala" style={{ rotate, x: '-50%', y: '-50%' }} aria-hidden="true">
        <Mandala />
      </motion.div>
      <div className="section-inner">
        <Reveal as="span" id="blessing-title" className="eyebrow">With the blessings of Allah</Reveal>
        <Reveal as="p" className="blessing-arabic" lang="ar" dir="rtl" delay={0.15} y={12}>{blessing.arabic}</Reveal>
        <FadeWords className="blessing-translation" text={blessing.translation} delay={0.4} interval={0.05} />
        <Ornament />
        <FadeWords className="blessing-message" text={blessing.message} interval={0.045} amount={0.4} />
        <Reveal as="span" className="eyebrow blessing-label" delay={0.1}>Invited by</Reveal>
        <Reveal as="p" className="blessing-host" delay={0.25}>{host.name}</Reveal>
        <Reveal as="p" className="blessing-family" delay={0.45}>&amp; {host.family}</Reveal>
        <NextButton to="events">See the celebrations</NextButton>
      </div>
    </section>
  );
}
