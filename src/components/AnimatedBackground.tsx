import { useMemo } from 'react';

interface Props {
  weatherId: number;
  isNight: boolean;
}

const AnimatedBackground = ({ weatherId, isNight }: Props) => {
  const isRain = weatherId >= 300 && weatherId < 600;
  const isSnow = weatherId >= 600 && weatherId < 700;
  const isThunder = weatherId >= 200 && weatherId < 300;
  const isClear = weatherId === 800 || weatherId === 801;

  const rainDrops = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${0.5 + Math.random() * 0.5}s`,
      id: i,
    })), []
  );

  const snowFlakes = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`,
      size: `${4 + Math.random() * 8}px`,
      id: i,
    })), []
  );

  const stars = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      top: `${Math.random() * 70}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 4}s`,
      size: `${1 + Math.random() * 2}px`,
      id: i,
    })), []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Stars for night */}
      {isNight && isClear && stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse-slow"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            opacity: 0.6,
          }}
        />
      ))}

      {/* Rain */}
      {isRain && rainDrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute top-0 w-[1px] bg-gradient-to-b from-transparent via-blue-200/60 to-transparent"
          style={{
            left: drop.left,
            animationName: 'rain-fall',
            animationDuration: drop.duration,
            animationDelay: drop.delay,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
            height: '80px',
          }}
        />
      ))}

      {/* Snow */}
      {isSnow && snowFlakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-0 rounded-full bg-white/70"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            animationName: 'snow-fall',
            animationDuration: flake.duration,
            animationDelay: flake.delay,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          }}
        />
      ))}

      {/* Thunder flash */}
      {isThunder && (
        <div className="absolute inset-0 bg-white/5 animate-pulse-slow" />
      )}

      {/* Orbs for clear sky */}
      {isClear && !isNight && (
        <>
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-yellow-300/20 blur-3xl animate-pulse-slow" />
          <div className="absolute top-[10%] left-[-10%] w-80 h-80 rounded-full bg-sky-300/20 blur-3xl animate-float" />
        </>
      )}

      {/* General ambient orbs */}
      <div
        className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-20 blur-3xl animate-float"
        style={{
          background: isNight ? 'radial-gradient(circle, #4338ca, transparent)' : 'radial-gradient(circle, #3b82f6, transparent)',
          animationDelay: '2s',
        }}
      />
      <div
        className="absolute top-[20%] right-[-15%] w-[400px] h-[400px] rounded-full opacity-15 blur-3xl animate-float"
        style={{
          background: isNight ? 'radial-gradient(circle, #7c3aed, transparent)' : 'radial-gradient(circle, #60a5fa, transparent)',
          animationDelay: '1s',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
