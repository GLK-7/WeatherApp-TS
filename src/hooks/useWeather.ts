import { useState, useCallback } from 'react';
import axios from 'axios';
import { CurrentWeather, ForecastResponse, AirQuality, DailyForecast } from '../types/weather';

const API_KEY = import.meta.env.VITE_API_KEY || '';
const BASE_URL = 'https://api.openweathermap.org';

const groupForecastByDay = (list: ForecastResponse['list']): DailyForecast[] => {
  const groups: Record<string, ForecastResponse['list']> = {};

  list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!groups[date]) groups[date] = [];
    groups[date].push(item);
  });

  return Object.entries(groups)
    .slice(0, 5)
    .map(([date, items]) => {
      const temps = items.map((i) => i.main.temp);
      const midday = items.find((i) => i.dt_txt.includes('12:00')) ?? items[Math.floor(items.length / 2)];
      return {
        date,
        items,
        tempMin: Math.round(Math.min(...temps)),
        tempMax: Math.round(Math.max(...temps)),
        icon: midday.weather[0].icon,
        description: midday.weather[0].description,
        pop: Math.max(...items.map((i) => i.pop)) * 100,
      };
    });
};

export const useWeather = () => {
  const [cidade, setCidade] = useState('');
  const [clima, setClima] = useState<CurrentWeather | null>(null);
  const [previsao, setPrevisao] = useState<ForecastResponse['list']>([]);
  const [previsaoDiaria, setPrevisaoDiaria] = useState<DailyForecast[]>([]);
  const [qualidadeAr, setQualidadeAr] = useState<AirQuality | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = useCallback(async (lat: number, lon: number, cityName?: string) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherRes, forecastRes, airRes] = await Promise.all([
        axios.get<CurrentWeather>(
          `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`
        ),
        axios.get<ForecastResponse>(
          `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`
        ),
        axios.get<AirQuality>(
          `${BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        ),
      ]);

      setClima(weatherRes.data);
      setCidade(cityName ?? weatherRes.data.name);
      setPrevisao(forecastRes.data.list.slice(0, 8));
      setPrevisaoDiaria(groupForecastByDay(forecastRes.data.list));
      setQualidadeAr(airRes.data);
    } catch {
      setError('Não foi possível obter os dados climáticos.');
    } finally {
      setLoading(false);
    }
  }, []);

  const buscarPorCidade = useCallback(async (nomeCidade: string) => {
    if (!nomeCidade.trim()) return;
    setLoading(true);
    setError(null);
    try {
      // Primeiro busca coordenadas pela cidade
      const geoRes = await axios.get(
        `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(nomeCidade)}&limit=1&appid=${API_KEY}`
      );
      if (!geoRes.data.length) {
        setError('Cidade não encontrada. Tente outro nome.');
        setLoading(false);
        return;
      }
      const { lat, lon, name } = geoRes.data[0];
      await fetchAllData(lat, lon, name);
    } catch {
      setError('Erro ao buscar dados. Verifique o nome da cidade.');
      setLoading(false);
    }
  }, [fetchAllData]);

  const buscarPorGeolocalizacao = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocalização não suportada neste navegador.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchAllData(pos.coords.latitude, pos.coords.longitude),
      () => setError('Permissão de localização negada.')
    );
  }, [fetchAllData]);

  return {
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
  };
};
