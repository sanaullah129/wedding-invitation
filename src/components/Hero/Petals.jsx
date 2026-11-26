import { motion, useReducedMotion } from 'motion/react';

const petals = Array.from({ length: 16 }, (_, index) => ({
  left: (index * 61 + 13) % 100,
  size: 10 + ((index * 7) % 10),
  duration: 10 + ((index * 5) % 7),
  delay: (index * 1.3) % 9,
  drift: (index % 2 ? 1 : -1) * (30 + ((index * 11) % 50)),
  rotate: 180 + ((index * 47) % 360),
}));

export default function Petals() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div className="petals" aria-hidden="true">
      {petals.map((petal, index) => (
        <motion.span
          key={index}
          className="petal"
          style={{ left: `${petal.left}%`, width: petal.size, height: petal.size * 0.8 }}
          initial={{ y: '-10vh', opacity: 0 }}
          animate={{ y: '110vh', x: [0, petal.drift, 0], rotate: petal.rotate, opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  );
}
