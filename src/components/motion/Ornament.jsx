import { motion } from 'motion/react';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (index) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: index * 0.15, duration: 1.2, ease: 'easeInOut' },
      opacity: { delay: index * 0.15, duration: 0.2 },
    },
  }),
};

const paths = [
  'M4 14 H66',
  'M176 14 H114',
  'M90 3 C96 9 96 19 90 25 C84 19 84 9 90 3 Z',
  'M90 14 C80 4 70 6 70 14 C70 22 80 24 90 14',
  'M90 14 C100 4 110 6 110 14 C110 22 100 24 90 14',
];

export default function Ornament({ className = '' }) {
  return (
    <motion.svg
      className={`ornament ${className}`}
      viewBox="0 0 180 28"
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      {paths.map((d, index) => (
        <motion.path key={d} d={d} custom={index} variants={draw} />
      ))}
    </motion.svg>
  );
}
