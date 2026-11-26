import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import Blessing from './components/Blessing/Blessing';
import Closing from './components/Closing/Closing';
import Countdown from './components/Countdown/Countdown';
import Events from './components/Events/Events';
import Hero from './components/Hero/Hero';
import Opening from './components/Opening/Opening';
import ScrollProgress from './components/ScrollProgress';
import { host, verse } from './data/invitation';

export default function App() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('is-locked', !opened);
  }, [opened]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {!opened && (
          <Opening
            key="opening"
            onOpen={() => {
              window.scrollTo({ top: 0, behavior: 'instant' });
              setOpened(true);
            }}
          />
        )}
      </AnimatePresence>
      <div className="page" inert={!opened}>
        <ScrollProgress />
        <Hero revealed={opened} />
        <figure className="verse">
          <blockquote>{verse.text}</blockquote>
          <figcaption>{verse.source}</figcaption>
        </figure>
        <main>
          <Blessing />
          <Events />
          <Countdown />
          <Closing />
        </main>
        <footer className="footer">With warm regards · {host.name} &amp; family</footer>
      </div>
    </MotionConfig>
  );
}
