import { motion } from 'motion/react';
import { FadeWords, Ornament, Reveal } from '../motion';
import { couple } from '../../data/invitation';
import './Closing.css';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay) => ({ pathLength: 1, opacity: 1, transition: { pathLength: { delay, duration: 1.8, ease: 'easeInOut' }, opacity: { delay, duration: 0.2 } } }),
};

function Monogram() {
  return (
    <motion.svg className="monogram" viewBox="0 0 120 120" aria-hidden="true" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.8 }}>
      <motion.circle cx="60" cy="60" r="56" custom={0} variants={draw} />
      <motion.circle cx="60" cy="60" r="49" custom={0.3} variants={draw} />
      <motion.text
        x="60"
        y="67"
        textAnchor="middle"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 1, duration: 1 } } }}
      >
        {couple.monogram}
      </motion.text>
    </motion.svg>
  );
}

export default function Closing() {
  return (
    <section className="section closing" aria-labelledby="closing-title">
      <div className="section-inner">
        <Monogram />
        <Reveal as="span" className="eyebrow">With love &amp; duas</Reveal>
        <FadeWords as="h2" id="closing-title" className="section-title" text="Your presence is our joy" interval={0.1} />
        <FadeWords
          className="closing-message"
          text="We look forward to celebrating this special occasion with you and your family."
          delay={0.3}
          interval={0.04}
        />
        <motion.p
          className="closing-signature"
          initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 2, delay: 0.4, ease: 'easeInOut' }}
        >
          The Ansari Family
        </motion.p>
        <Ornament />
      </div>
    </section>
  );
}
