import { useEffect, useState } from 'react';

export default function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const total = Math.max(0, Math.floor((target - now) / 1000));
  const units = [
    ['Days', Math.floor(total / 86400)],
    ['Hours', Math.floor(total / 3600) % 24],
    ['Minutes', Math.floor(total / 60) % 60],
    ['Seconds', total % 60],
  ].map(([label, value]) => ({ label, value: String(value).padStart(2, '0') }));

  return { done: total === 0, units };
}
