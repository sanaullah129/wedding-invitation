import { motion } from 'motion/react';

const icons = {
  crescent: [
    'M38 10 A22 22 0 1 0 54 42 A18 18 0 0 1 38 10 Z',
    'M50 18 L52 23 L57 25 L52 27 L50 32 L48 27 L43 25 L48 23 Z',
  ],
  rings: [
    'M38 40 A12 12 0 1 1 14 40 A12 12 0 1 1 38 40 Z',
    'M50 40 A12 12 0 1 1 26 40 A12 12 0 1 1 50 40 Z',
    'M32 8 L37 14 L32 21 L27 14 Z',
  ],
};

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (index) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { delay: 0.3 + index * 0.3, duration: 1.4, ease: 'easeInOut' }, opacity: { delay: 0.3 + index * 0.3, duration: 0.2 } },
  }),
};

export default function EventIcon({ type }) {
  return (
    <motion.svg className="event-icon" viewBox="0 0 64 64" aria-hidden="true" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.8 }}>
      {icons[type].map((d, index) => (
        <motion.path key={d} d={d} custom={index} variants={draw} />
      ))}
    </motion.svg>
  );
}
