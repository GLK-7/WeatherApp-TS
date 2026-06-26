import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Busca from './components/Busca';
import ClimaAtual from './components/ClimaAtual';
import Previsao from './components/Previsao';
import QualidadeAr from './components/QualidadeAr';
import WeatherMap from './components/WeatherMap';
import AnimatedBackground from './components/AnimatedBackground';
import LoadingScreen from './components/LoadingScreen';
import ErrorCard from './components/ErrorCard';

import { useWeather } from './hooks/useWeather';
import { getWeatherGradient } from './utils/textFormat';

function App() {
  const {
    cidade,
    setCidade,
    clima,
    previsao,
    previsaoDiaria,
    qualidadeAr,
    loading,
    error,
    buscarPorCidade,
    buscarPorGeolocalizacao,
  } = useWeather();

  // Auto-busca por geolocalização ao carregar
  useEffect(() => {
    buscarPorGeolocalizacao();
  }, [buscarPorGeolocalizacao]);

  const weatherId = clima?.weather[0].id ?? 800;
  const isNight = clima
    ? clima.dt > clima.sys.sunset || clima.dt < clima.sys.sunrise
    : false;

  const gradient = getWeatherGradient(weatherId, isNight);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradient} transition-all duration-1000 relative`}>
      {/* Animated background effects */}
      <AnimatedBackground weatherId={weatherId} isNight={isNight} />

      {/* Navbar */}
      <Navbar>
        <Busca
          cidade={cidade}
          setCidade={setCidade}
          buscarClima={buscarPorCidade}
          buscarGeolocalizacao={buscarPorGeolocalizacao}
          loading={loading}
        />
      </Navbar>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center px-4 py-6 gap-0 pb-10">
        {/* Error message */}
        <AnimatePresence>
          {error && (
            <ErrorCard
              message={error}
              onDismiss={() => {}}
            />
          )}
        </AnimatePresence>

        {/* Loading */}
        <AnimatePresence>
          {loading && (
            <motion.div
              className="flex items-center justify-center mt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingScreen />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Weather content */}
        <AnimatePresence mode="wait">
          {!loading && clima && (
            <motion.div
              key={clima.name}
              className="flex flex-col items-center w-full gap-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Current weather */}
              <ClimaAtual clima={clima} />

              {/* Forecast tabs */}
              {previsao.length > 0 && previsaoDiaria.length > 0 && (
                <Previsao previsoes={previsao} previsaoDiaria={previsaoDiaria} />
              )}

              {/* Air quality */}
              {qualidadeAr && <QualidadeAr qualidadeAr={qualidadeAr} />}

              {/* Map */}
              <WeatherMap clima={clima} />

              {/* Footer note */}
              <motion.p
                className="text-white/30 text-xs mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Dados fornecidos por OpenWeatherMap
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Welcome screen */}
        {!loading && !clima && !error && (
          <motion.div
            className="flex flex-col items-center justify-center mt-24 gap-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-white/20 text-8xl">🌤️</div>
            <p className="text-white/60 text-lg font-medium">Bem-vindo ao WeatherApp</p>
            <p className="text-white/40 text-sm max-w-xs">
              Permita o acesso à sua localização ou busque uma cidade para ver a previsão do tempo.
            </p>
            <button
              onClick={buscarPorGeolocalizacao}
              className="mt-4 px-6 py-3 bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-2xl font-semibold transition-all"
            >
              Usar minha localização
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default App;
