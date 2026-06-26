import { motion } from 'framer-motion';
import {
  MapPinArea,
  Thermometer,
  Drop,
  Wind,
  Eye,
  Gauge,
  Sun,
  Moon,
} from '@phosphor-icons/react';
import { CurrentWeather } from '../types/weather';
import { toTitleCase, formatTime, formatFullDate } from '../utils/textFormat';
import WindInfo from './WindInfo';

interface Props {
  clima: CurrentWeather;
}

const StatCard = ({
  icon,
  label,
  value,
  sub,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  delay: number;
}) => (
  <motion.div
    className="stat-card shadow-sm"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    <div className="text-white/60">{icon}</div>
    <span className="text-white/60 text-[10px] uppercase tracking-wider font-semibold">{label}</span>
    <span className="text-white font-bold text-base leading-tight">{value}</span>
    {sub && <span className="text-white/50 text-[10px]">{sub}</span>}
  </motion.div>
);

const ClimaAtual = ({ clima }: Props) => {
  const now = new Date();
  const isNight = clima.dt > clima.sys.sunset || clima.dt < clima.sys.sunrise;

  const tempRound = Math.round(clima.main.temp);
  const feelsLike = Math.round(clima.main.feels_like);
  const tempMin = Math.round(clima.main.temp_min);
  const tempMax = Math.round(clima.main.temp_max);
  const description = toTitleCase(clima.weather[0].description);
  const iconUrl = `https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`;

  const sunriseTime = formatTime(clima.sys.sunrise, clima.timezone - new Date().getTimezoneOffset() * 60);
  const sunsetTime = formatTime(clima.sys.sunset, clima.timezone - new Date().getTimezoneOffset() * 60);

  // Temp color based on temperature
  const getTempColor = (temp: number) => {
    if (temp <= 0) return 'text-blue-200';
    if (temp <= 10) return 'text-cyan-200';
    if (temp <= 20) return 'text-green-200';
    if (temp <= 30) return 'text-yellow-200';
    return 'text-orange-200';
  };

  return (
    <motion.div
      className="w-full max-w-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Location + date */}
      <motion.div
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center gap-2">
          <MapPinArea size={18} className="text-white/70" weight="fill" />
          <h2 className="text-white font-bold text-xl">
            {clima.name}
            <span className="text-white/60 text-base font-medium ml-2">
              {clima.sys.country}
            </span>
          </h2>
        </div>
        <span className="text-white/50 text-sm hidden sm:block">
          {formatFullDate(Math.floor(now.getTime() / 1000))}
        </span>
      </motion.div>

      {/* Main weather card */}
      <motion.div
        className="glass-strong p-6 shadow-2xl shadow-black/20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Top: temp + icon + description */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <motion.img
              src={iconUrl}
              alt={description}
              className="w-20 h-20 weather-icon-glow"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
            />
            <div>
              <div className={`text-6xl font-black leading-none ${getTempColor(tempRound)}`}>
                {tempRound}°
                <span className="text-3xl font-bold text-white/60">C</span>
              </div>
              <p className="text-white/80 font-medium mt-1">{description}</p>
              <div className="flex items-center gap-1 mt-1">
                <Thermometer size={14} className="text-white/50" />
                <span className="text-white/50 text-xs">Sensação: {feelsLike}°C</span>
              </div>
            </div>
          </div>

          {/* Min/Max + Sunrise/Sunset */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="text-white/50 text-[10px] uppercase tracking-wider">Mín</span>
                <span className="text-blue-200 font-bold">{tempMin}°C</span>
              </div>
              <div className="w-px bg-white/20" />
              <div className="flex flex-col items-center">
                <span className="text-white/50 text-[10px] uppercase tracking-wider">Máx</span>
                <span className="text-orange-200 font-bold">{tempMax}°C</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <Sun size={14} className="text-yellow-300 mb-1" weight="fill" />
                <span className="text-white/50 text-[10px]">Nasce</span>
                <span className="text-white text-xs font-semibold">{sunriseTime}</span>
              </div>
              <div className="w-px bg-white/20" />
              <div className="flex flex-col items-center">
                <Moon size={14} className="text-indigo-300 mb-1" weight="fill" />
                <span className="text-white/50 text-[10px]">Põe</span>
                <span className="text-white text-xs font-semibold">{sunsetTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-5" />

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            icon={<Drop size={18} weight="fill" />}
            label="Umidade"
            value={`${clima.main.humidity}%`}
            delay={0.35}
          />
          <StatCard
            icon={<Gauge size={18} weight="fill" />}
            label="Pressão"
            value={`${clima.main.pressure}`}
            sub="hPa"
            delay={0.4}
          />
          <StatCard
            icon={<Eye size={18} weight="fill" />}
            label="Visibilidade"
            value={`${(clima.visibility / 1000).toFixed(1)} km`}
            delay={0.45}
          />
          <motion.div
            className="stat-card shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Wind size={18} className="text-white/60" weight="fill" />
            <span className="text-white/60 text-[10px] uppercase tracking-wider font-semibold">Vento</span>
            <WindInfo speed={clima.wind.speed} deg={clima.wind.deg} gust={clima.wind.gust} />
          </motion.div>
        </div>

        {/* Cloud coverage bar */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-white/60 text-[10px] uppercase tracking-wider font-semibold">Cobertura de nuvens</span>
            <span className="text-white/80 text-xs font-bold">{clima.clouds.all}%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white/40 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${clima.clouds.all}%` }}
              transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Day/night indicator */}
        <div className="flex items-center gap-2 mt-3">
          <div className={`w-2 h-2 rounded-full ${isNight ? 'bg-indigo-300' : 'bg-yellow-300'} animate-pulse`} />
          <span className="text-white/50 text-xs">{isNight ? 'Período noturno' : 'Período diurno'}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ClimaAtual;
