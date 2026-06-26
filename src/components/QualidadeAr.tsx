import { motion } from 'framer-motion';
import { Wind } from '@phosphor-icons/react';
import { AirQuality } from '../types/weather';
import { getAqiLabel } from '../utils/textFormat';

interface Props {
  qualidadeAr: AirQuality;
}

const QualidadeAr = ({ qualidadeAr }: Props) => {
  const aqi = qualidadeAr.list[0];
  const { label, color } = getAqiLabel(aqi.main.aqi);
  const components = aqi.components;

  const pollutants = [
    { label: 'PM2.5', value: components.pm2_5.toFixed(1), unit: 'μg/m³' },
    { label: 'PM10', value: components.pm10.toFixed(1), unit: 'μg/m³' },
    { label: 'O₃', value: components.o3.toFixed(1), unit: 'μg/m³' },
    { label: 'NO₂', value: components.no2.toFixed(1), unit: 'μg/m³' },
    { label: 'CO', value: (components.co / 1000).toFixed(2), unit: 'mg/m³' },
    { label: 'SO₂', value: components.so2.toFixed(1), unit: 'μg/m³' },
  ];

  // AQI bar percentage (1-5 → 0-100%)
  const aqiPercent = ((aqi.main.aqi - 1) / 4) * 100;

  return (
    <motion.div
      className="w-full max-w-2xl mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="glass p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wind size={18} className="text-white/70" weight="fill" />
            <span className="text-white font-semibold text-sm">Qualidade do Ar</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
            <span className="text-sm font-bold" style={{ color }}>
              {label}
            </span>
          </div>
        </div>

        {/* AQI bar */}
        <div className="mb-4">
          <div className="h-2 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-500 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-start">
              <motion.div
                className="w-3 h-3 rounded-full bg-white border-2 border-white/50 shadow-lg -translate-y-0 ml-[-6px]"
                style={{ marginLeft: `calc(${aqiPercent}% - 6px)` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              />
            </div>
          </div>
          <div className="flex justify-between mt-1 text-white/40 text-[10px]">
            <span>Boa</span>
            <span>Razoável</span>
            <span>Moderada</span>
            <span>Ruim</span>
            <span>Muito Ruim</span>
          </div>
        </div>

        {/* Pollutants grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {pollutants.map((p, i) => (
            <motion.div
              key={p.label}
              className="flex flex-col items-center bg-white/10 rounded-xl p-2 gap-0.5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 + i * 0.05 }}
            >
              <span className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">{p.label}</span>
              <span className="text-white font-bold text-xs">{p.value}</span>
              <span className="text-white/40 text-[9px]">{p.unit}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QualidadeAr;
