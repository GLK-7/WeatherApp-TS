import { toTitleCase } from '../utils/textFormat';

interface Weather {
  icon: string;
  description: string;
}

interface Main {
  temp: number;
}

interface PrevisaoProps {
  dt: number; // Timestamp em segundos
  main: Main;
  weather: Weather[];
}

interface Props {
  previsoes: PrevisaoProps[];
}

const Previsao = ({ previsoes }: Props) => {
  const dataHora = (timestamp: any) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours(); // Pega a hora
    return `${hours}h`; // Retorna a hora no formato "14h"
  };

  return (
    <div className="py-2 flex flex-col items-center mt-4 w-full text-gray-800">
      <h4 className="text-white text-xl mb-4">
        Previsão para as próximas horas
      </h4>
      <ul className="flex flex-col items-center w-full">
        {previsoes.map((previsao, index) => (
          <li
            key={index}
            className="text-white w-full flex flex-col items-center"
          >
            <div className="flex items-center bg-white bg-opacity-10 w-full sm:w-1/2 my-2 rounded px-6 py-2 gap-4">
              <img
                src={`http://openweathermap.org/img/wn/${previsao.weather[0].icon}.png`}
                alt={previsao.weather[0].description}
              />
              {dataHora(previsao.dt)}{' '}
              <span className="font-bold text-gray-800">
                {Math.round(previsao.main.temp)}°C{' '}
              </span>
              <span className="text-sm">
                {toTitleCase(previsao.weather[0].description)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Previsao;
