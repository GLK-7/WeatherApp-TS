import { NavigationArrow } from '@phosphor-icons/react';

type WindInfoProps = {
  speed: number; // Velocidade do vento
  deg: number; // Direção do vento em graus
};

const WindInfo = ({ speed, deg }: WindInfoProps) => {
  // Mapeia direções de vento para os graus correspondentes
  const directions = [
    { label: 'N', range: [337.5, 360] },
    { label: 'N', range: [0, 22.5] },
    { label: 'NE', range: [22.5, 67.5] },
    { label: 'E', range: [67.5, 112.5] },
    { label: 'SE', range: [112.5, 157.5] },
    { label: 'S', range: [157.5, 202.5] },
    { label: 'SW', range: [202.5, 247.5] },
    { label: 'W', range: [247.5, 292.5] },
    { label: 'NW', range: [292.5, 337.5] },
  ];

  // Determina a direção textual
  const direction = directions.find(
    (d) => deg >= d.range[0] && deg < d.range[1]
  )?.label;
  const convertToKmh = (speed: number): number => {
    return speed * 3.6;
  };

  return (
    <div className="flex items-center text-sm gap-1">
      <span>{convertToKmh(Math.round(speed))} km/h</span>
      <div className="flex items-center">
        <NavigationArrow
          size={16}
          weight="fill"
          style={{ transform: `rotate(${deg}deg)` }}
          alt={direction}
        />
      </div>
    </div>
  );
};

export default WindInfo;
