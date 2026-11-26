import FadeWords from './FadeWords';
import Ornament from './Ornament';
import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, id, intro }) {
  return (
    <div className="section-heading">
      <Reveal as="span" className="eyebrow">{eyebrow}</Reveal>
      <FadeWords as="h2" id={id} className="section-title" text={title} interval={0.12} />
      <Ornament />
      {intro && <FadeWords className="section-intro" text={intro} delay={0.3} interval={0.03} />}
    </div>
  );
}
