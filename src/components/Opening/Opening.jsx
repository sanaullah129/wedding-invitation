import { useState } from 'react';
import { motion, useAnimate, useReducedMotion } from 'motion/react';
import { easeOut } from '../motion';
import { couple } from '../../data/invitation';
import './Opening.css';

const sparkles = Array.from({ length: 18 }, (_, index) => ({
  left: `${(index * 37 + 7) % 100}%`,
  top: `${(index * 53 + 11) % 100}%`,
  size: 2 + (index % 3),
  delay: (index % 6) * 0.6,
}));

export default function Opening({ onOpen }) {
  const [scope, animate] = useAnimate();
  const [opening, setOpening] = useState(false);
  const reduceMotion = useReducedMotion();

  async function handleOpen() {
    if (opening) return;
    setOpening(true);
    if (!reduceMotion) {
      await animate([
        ['.opening-copy', { opacity: 0, y: -14 }, { duration: 0.5 }],
        ['.opening-prompt', { opacity: 0 }, { duration: 0.3, at: 0 }],
        ['.wax-seal', { scale: [1, 1.18, 0], rotate: [0, 0, -30], opacity: [1, 1, 0] }, { duration: 0.65, at: 0.1 }],
        ['.envelope-flap', { rotateX: 180 }, { duration: 0.9, ease: [0.65, 0, 0.35, 1] }],
        // The opened flap must sit behind the rising letter.
        ['.envelope-flap', { zIndex: 1 }, { duration: 0.01, at: '-0.45' }],
        ['.invitation-letter', { y: '-62%' }, { duration: 1.1, ease: easeOut, at: '-0.2' }],
        ['.envelope', { scale: 1.06 }, { duration: 1.2, ease: easeOut, at: '<' }],
      ]);
    }
    onOpen();
  }

  return (
    <motion.div
      ref={scope}
      className="opening"
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation"
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)', transition: { duration: 0.9, ease: 'easeInOut' } }}
    >
      {sparkles.map((sparkle, index) => (
        <motion.span
          key={index}
          className="opening-sparkle"
          aria-hidden="true"
          style={{ left: sparkle.left, top: sparkle.top, width: sparkle.size, height: sparkle.size }}
          animate={{ opacity: [0, 0.9, 0], y: [0, -24] }}
          transition={{ duration: 4, delay: sparkle.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <motion.div
        className="opening-copy"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: easeOut }}
      >
        <span className="eyebrow">You are cordially invited</span>
        <p className="opening-names">{couple.groom} <span>&amp;</span> {couple.bride}</p>
      </motion.div>

      <motion.button
        className="envelope-button"
        type="button"
        onClick={handleOpen}
        disabled={opening}
        autoFocus
        aria-label={`Open ${couple.groom} and ${couple.bride}'s invitation`}
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.45, ease: easeOut }}
        whileHover={opening ? undefined : { scale: 1.02 }}
        whileTap={opening ? undefined : { scale: 0.98 }}
      >
        <motion.span
          className="envelope"
          aria-hidden="true"
          animate={{ y: opening ? 0 : [0, -8, 0] }}
          transition={opening ? { duration: 0.4 } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="envelope-back" />
          <span className="invitation-letter">
            <span className="letter-kicker">Together with our families</span>
            <span className="letter-names">{couple.groom} &amp; {couple.bride}</span>
            <span className="letter-date">{couple.month}</span>
          </span>
          <span className="envelope-pocket" />
          <span className="envelope-flap" />
          <span className="wax-seal">{couple.monogram}</span>
        </motion.span>
        <motion.span
          className="opening-prompt"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          Tap to open
        </motion.span>
      </motion.button>
    </motion.div>
  );
}
