export const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const getWindDirection = (deg: number): string => {
  const directions = ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

export const formatTime = (timestamp: number, timezoneOffset?: number): string => {
  const date = new Date((timestamp + (timezoneOffset ?? 0)) * 1000);
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });
};

export const formatDay = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('pt-BR', { weekday: 'short' });
};

export const formatFullDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
};

export const getAqiLabel = (aqi: number): { label: string; color: string } => {
  const levels: Record<number, { label: string; color: string }> = {
    1: { label: 'Boa', color: '#22c55e' },
    2: { label: 'Razoável', color: '#84cc16' },
    3: { label: 'Moderada', color: '#eab308' },
    4: { label: 'Ruim', color: '#f97316' },
    5: { label: 'Muito Ruim', color: '#ef4444' },
  };
  return levels[aqi] ?? { label: 'N/A', color: '#94a3b8' };
};

export const getWeatherGradient = (weatherId: number, isNight: boolean): string => {
  if (isNight) {
    if (weatherId >= 200 && weatherId < 300) return 'from-[#1a1a2e] via-[#16213e] to-[#0f3460]'; // Tempestade noturna
    if (weatherId >= 300 && weatherId < 600) return 'from-[#243b55] via-[#141e30] to-[#2d3561]'; // Chuva noturna
    if (weatherId >= 600 && weatherId < 700) return 'from-[#1a2a4a] via-[#243b6e] to-[#1c3a6e]'; // Neve noturna
    if (weatherId >= 700 && weatherId < 800) return 'from-[#2d3561] via-[#1a1a2e] to-[#243b55]'; // Neblina noturna
    if (weatherId === 800) return 'from-[#0f0c29] via-[#302b63] to-[#24243e]'; // Céu limpo noturno
    return 'from-[#1a1a2e] via-[#2d3561] to-[#243b55]'; // Nublado noturno
  }

  if (weatherId >= 200 && weatherId < 300) return 'from-[#373b44] via-[#4286f4] to-[#373b44]'; // Tempestade
  if (weatherId >= 300 && weatherId < 600) return 'from-[#4b6cb7] via-[#182848] to-[#4b6cb7]'; // Chuva
  if (weatherId >= 600 && weatherId < 700) return 'from-[#e0eafc] via-[#cfdef3] to-[#89f7fe]'; // Neve
  if (weatherId >= 700 && weatherId < 800) return 'from-[#757f9a] via-[#d7dde8] to-[#757f9a]'; // Névoa
  if (weatherId === 800) return 'from-[#2980B9] via-[#6DD5FA] to-[#FFFFFF]'; // Céu limpo
  if (weatherId === 801) return 'from-[#4facfe] via-[#00f2fe] to-[#4facfe]'; // Poucas nuvens
  return 'from-[#4b79a1] via-[#283e51] to-[#4b79a1]'; // Nublado
};
