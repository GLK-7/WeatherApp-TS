import { motion } from 'framer-motion';
import { Drop } from '@phosphor-icons/react';
import { ForecastItem, DailyForecast } from '../types/weather';
import { toTitleCase, formatDay } from '../utils/textFormat';
import { useState } from 'react';

interface Props {
  previsoes: ForecastItem[];
  previsaoDiaria: DailyForecast[];
}

const Previsao = ({ previsoes, previsaoDiaria }: Props) => {
  const [view, setView] = useState<'hourly' | 'daily'>('hourly');

  const getHour = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return `${date.getHours().toString().padStart(2, '0')}h`;
  };

  const getTempBarWidth = (temp: number, min: number, max: number) => {
    if (max === min) return '50%';
    return `${((temp - min) / (max - min)) * 100}%`;
  };

  const allTemps = previsaoDiaria.flatMap((d) => [d.tempMin, d.tempMax]);
  const globalMin = Math.min(...allTemps);
  const globalMax = Math.max(...allTemps);

  return (
    <motion.div
      className="w-full max-w-2xl mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Tab toggles */}
      <div className="flex gap-2 mb-3">
        {(['hourly', 'daily'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setView(tab)}
            className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              view === tab
                ? 'bg-white/30 text-white border border-white/40'
                : 'bg-white/10 text-white/60 hover:bg-white/15 border border-white/10'
            }`}
          >
            {tab === 'hourly' ? 'Próximas horas' : '5 dias'}
          </button>
        ))}
      </div>

      {/* Hourly forecast */}
      {view === 'hourly' && (
        <div className="glass overflow-x-auto">
          <div className="flex gap-3 p-4" style={{ minWidth: 'max-content' }}>
            {previsoes.map((item, i) => (
              <motion.div
                key={item.dt}
                className="flex flex-col items-center gap-1.5 min-w-[70px]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <span className="text-white/60 text-xs font-medium">{getHour(item.dt)}</span>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                  className="w-12 h-12"
                />
                <span className="text-white font-bold text-sm">{Math.round(item.main.temp)}°</span>
                <span className="text-white/50 text-[10px] text-center leading-tight">
                  {toTitleCase(item.weather[0].description)}
                </span>
                {item.pop > 0 && (
                  <div className="flex items-center gap-0.5">
                    <Drop size={10} className="text-blue-300" weight="fill" />
                    <span className="text-blue-300 text-[10px]">{Math.round(item.pop * 100)}%</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Daily forecast */}
      {view === 'daily' && (
        <div className="glass flex flex-col divide-y divide-white/10">
          {previsaoDiaria.map((day, i) => (
            <motion.div
              key={day.date}
              className="flex items-center gap-3 px-5 py-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              {/* Day name */}
              <span className="text-white font-semibold w-12 capitalize text-sm">
                {i === 0 ? 'Hoje' : formatDay(new Date(day.date + 'T12:00:00').getTime() / 1000)}
              </span>

              {/* Icon + description */}
              <div className="flex items-center gap-2 flex-1">
                <img
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.description}
                  className="w-10 h-10"
                />
                <span className="text-white/60 text-xs hidden sm:block">
                  {toTitleCase(day.description)}
                </span>
              </div>

              {/* Precipitation */}
              {day.pop > 0 && (
                <div className="flex items-center gap-1">
                  <Drop size={12} className="text-blue-300" weight="fill" />
                  <span className="text-blue-300 text-xs">{Math.round(day.pop)}%</span>
                </div>
              )}

              {/* Temp range bar */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-blue-200 text-sm font-semibold w-10 text-right">{day.tempMin}°</span>
                <div className="relative h-1.5 rounded-full bg-white/10 w-20 overflow-hidden">
                  <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-blue-400 to-orange-400"
                    style={{
                      left: getTempBarWidth(day.tempMin, globalMin, globalMax),
                      right: `${100 - parseInt(getTempBarWidth(day.tempMax, globalMin, globalMax))}%`,
                    }}
                  />
                </div>
                <span className="text-orange-200 text-sm font-semibold w-10">{day.tempMax}°</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Previsao;
