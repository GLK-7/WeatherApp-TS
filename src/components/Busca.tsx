import { useState, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlass, MapPin, X } from '@phosphor-icons/react';

interface Props {
  cidade: string;
  setCidade: React.Dispatch<React.SetStateAction<string>>;
  buscarClima: (cidade: string) => void;
  buscarGeolocalizacao: () => void;
  loading?: boolean;
}

const Busca = ({ cidade, setCidade, buscarClima, buscarGeolocalizacao, loading }: Props) => {
  const [focused, setFocused] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') buscarClima(cidade);
  };

  const handleClear = () => {
    setCidade('');
  };

  return (
    <motion.div
      className="flex items-center gap-2 w-full max-w-lg"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Search input */}
      <div
        className={`flex items-center flex-1 rounded-2xl px-4 py-3 gap-3 transition-all duration-300 ${
          focused
            ? 'bg-white/25 border border-white/50 shadow-lg shadow-white/10'
            : 'bg-white/15 border border-white/20'
        }`}
      >
        <MagnifyingGlass size={18} className="text-white/70 flex-shrink-0" weight="bold" />
        <input
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Buscar cidade..."
          className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm font-medium"
          disabled={loading}
        />
        {cidade && (
          <button
            onClick={handleClear}
            className="text-white/50 hover:text-white transition-colors"
          >
            <X size={14} weight="bold" />
          </button>
        )}
      </div>

      {/* Search button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => buscarClima(cidade)}
        disabled={loading || !cidade.trim()}
        className="bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
      >
        Buscar
      </motion.button>

      {/* Geolocation button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={buscarGeolocalizacao}
        disabled={loading}
        title="Usar minha localização"
        className="bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-2xl p-3 transition-all duration-200 disabled:opacity-50"
      >
        <MapPin size={18} weight="fill" />
      </motion.button>
    </motion.div>
  );
};

export default Busca;
