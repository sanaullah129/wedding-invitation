import { motion } from 'motion/react';
import { easeOut, fadeUp, stagger } from './variants';

export default function Reveal({ as = 'div', delay = 0, y = 24, amount = 0.4, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: easeOut }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function RevealGroup({ as = 'div', interval = 0.15, delay = 0, amount = 0.25, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag initial="hidden" whileInView="visible" viewport={{ once: true, amount }} variants={stagger(interval, delay)} {...rest}>
      {children}
    </Tag>
  );
}

export function RevealItem({ as = 'div', children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag variants={fadeUp} {...rest}>
      {children}
    </Tag>
  );
}
