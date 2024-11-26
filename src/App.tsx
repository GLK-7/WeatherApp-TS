// React
import { useState, useEffect } from 'react';

// Modules
import axios from 'axios';

// Icons
import { CloudSun } from '@phosphor-icons/react';

// Components
import Navbar from './components/Navbar';
import Busca from './components/Busca';
import ClimaAtual from './components/ClimaAtual';
import Previsao from './components/Previsao';

function App() {
  const [cidade, setCidade] = useState<string>('');
  const [clima, setClima] = useState(null);
  const [previsao, setPrevisao] = useState([]);

  const ApiKey = import.meta.env.VITE_API_KEY || '';

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}&units=metric&lang=pt_br`
      );
      const cidade = response.data.name;

      const prevResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${ApiKey}&units=metric&lang=pt_br`
      );
      console.log('Prev: ', prevResponse);
      console.log('Clima: ', response);

      setCidade(cidade);
      setClima(response.data);
      setPrevisao(
        prevResponse.data.list
          .sort((a: any, b: any) => a.dt - b.dt) // Ordena por 'dt' em ordem crescente
          .slice(0, 6) // Pega os primeiros 5 elementos
      );
    });
  }, [ApiKey]);

  const buscarClima = async () => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${ApiKey}&units=metric&lang=pt_br`
      );
      const prevResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${ApiKey}&units=metric&lang=pt_br`
      );
      setClima(weatherResponse.data);
      setPrevisao(prevResponse.data.list.slice(0, 5));

      console.log(clima);
      console.log(previsao);
    } catch (e) {
      console.log('Erro ao buscar clima: ', e);
    }
  };

  return (
    <>
      <Navbar>
        <div className="flex flex-col items-center py-2 flex-wrap w-full">
        <h2 className="sm:text-xl text-base text-white font-semibold flex gap-2 ml-2">
            Weather App TS
            <CloudSun
              color="#fff"
              weight="fill"
              className="text-xl sm:text-2xl"
            />
          </h2>
          <Busca
            cidade={cidade}
            setCidade={setCidade}
            buscarClima={buscarClima}
          />
          
          
          
        </div>
      </Navbar>
      <div className="px-4 pt-8 bg-gradient-to-b from-[#89cff0] to-[#005c99] min-h-screen justify-top flex flex-col items-center">
        {clima && <ClimaAtual clima={clima} />}

        {previsao.length > 0 && <Previsao previsoes={previsao} />}
      </div>
    </>
  );
}

export default App;
