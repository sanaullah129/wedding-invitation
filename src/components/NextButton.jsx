import { motion } from 'motion/react';
import { easeOut } from './motion';

const reveal = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.8 },
  transition: { duration: 0.7, ease: easeOut },
};

export default function NextButton({ to, children, ...rest }) {
  return (
    <motion.button
      type="button"
      className="next-button"
      onClick={() => document.getElementById(to)?.scrollIntoView({ block: 'start' })}
      {...(rest.variants ? {} : reveal)}
      {...rest}
    >
      {children}
      <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" /></svg>
    </motion.button>
  );
}
