import { Fragment } from 'react';
import { motion } from 'motion/react';
import { easeOut, stagger } from './variants';

const word = {
  hidden: { opacity: 0, y: '0.4em', filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: easeOut } },
};

export default function FadeWords({ text, as = 'p', interval = 0.06, delay = 0, amount = 0.6, ...rest }) {
  const Tag = motion[as];
  const words = text.split(' ');

  return (
    <Tag initial="hidden" whileInView="visible" viewport={{ once: true, amount }} variants={stagger(interval, delay)} {...rest}>
      {words.map((value, index) => (
        <Fragment key={index}>
          <motion.span className="fade-word" variants={word}>{value}</motion.span>
          {index < words.length - 1 && ' '}
        </Fragment>
      ))}
    </Tag>
  );
}
