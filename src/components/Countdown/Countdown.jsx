import { AnimatePresence, motion } from 'motion/react';
import { easeOut, Reveal, RevealGroup, RevealItem, SectionHeading } from '../motion';
import { countdownTarget } from '../../data/invitation';
import useCountdown from '../../hooks/useCountdown';
import './Countdown.css';

export default function Countdown() {
  const { done, units } = useCountdown(countdownTarget);

  return (
    <section className="section countdown" aria-labelledby="countdown-title">
      <div className="section-inner">
        <SectionHeading
          id="countdown-title"
          eyebrow="Counting the moments"
          title="Until we celebrate"
          intro="We can't wait to share this evening with you."
        />
        {done ? (
          <Reveal as="p" className="countdown-done">The celebration has begun</Reveal>
        ) : (
          <RevealGroup className="countdown-units" role="timer" aria-label="Time remaining until the reception" interval={0.12}>
            {units.map(({ label, value }) => (
              <RevealItem key={label} className="countdown-unit">
                <span className="countdown-value" aria-hidden="true">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={value}
                      initial={{ y: '-70%', opacity: 0, filter: 'blur(4px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                      exit={{ y: '70%', opacity: 0, filter: 'blur(4px)' }}
                      transition={{ duration: 0.5, ease: easeOut }}
                    >
                      {value}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="countdown-label" aria-hidden="true">{label}</span>
                <span className="sr-only">{value} {label}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </div>
    </section>
  );
}
