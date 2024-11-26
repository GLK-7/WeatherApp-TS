import { MapPinArea } from '@phosphor-icons/react';
import { toTitleCase } from '../utils/textFormat';

import WindInfo from '../components/WindInfo';

interface Props {
  clima: {
    name: string;
    weather: [{ description: string; icon: string }];
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
      pressure: number;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
    };
  };
}

const ClimaAtual = ({ clima }: Props) => {
  const now = new Date();
  const formattedTime = now.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedClimaDescription = toTitleCase(clima.weather[0].description);

  return (
    <>
      <div className="flex gap-1">
        <MapPinArea
          size={18}
          className="text-gray-800 mt-[2.1px]"
          weight="fill"
        />
        <h3>{clima.name}</h3>
      </div>
      <div className="bg-white bg-opacity-10 p-6 rounded flex flex-col text-gray-800 mt-2 w-full sm:w-1/2">
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Clima atual</span>
          <span className="text-xs">{formattedTime}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center h-20">
            <img
              src={`http://openweathermap.org/img/wn/${clima.weather[0].icon}.png`}
              alt={clima.weather[0].description}
            />
            <span className="font-bold text-2xl">
              {Math.round(clima.main.temp)}°C
            </span>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-600">
              Min{' '}
              <span className="text-gray-800 font-semibold">
                {Math.round(clima.main.temp_min)}°C
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Máx{' '}
              <span className="text-gray-800 font-semibold">
                {Math.round(clima.main.temp_max)}°C
              </span>
            </p>
          </div>
        </div>
        <p>{formattedClimaDescription}</p>
        <p className="text-gray-700 text-sm">
          Sensação térmica{' '}
          <span className="text-gray-800 font-semibold">
            {Math.round(clima.main.feels_like)}°C
          </span>
        </p>
        <div className="flex gap-4 mt-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-700">Umidade</span>
            <span className="text-sm">{clima.main.humidity}%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-700">Pressão</span>
            <span className="text-sm">{clima.main.pressure} mb</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-700">Visibilidade</span>
            <span className="text-sm">{clima.visibility / 1000} km</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-700">Vento</span>
            <WindInfo speed={clima.wind.speed} deg={clima.wind.deg} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClimaAtual;
