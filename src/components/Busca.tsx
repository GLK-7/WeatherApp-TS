import { MagnifyingGlass } from '@phosphor-icons/react';

interface Props {
  cidade?: string;
  setCidade?: React.Dispatch<React.SetStateAction<string>>;
  buscarClima(): void;
}

const Busca = ({ cidade, setCidade, buscarClima }: Props) => {
  if (!setCidade || !cidade ) {
    return <div className="flex gap-2 my-4">...</div>;
  }
  return (
    <div className="flex gap-2 my-4">
      <input
        type="text"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        placeholder="Pesquisar por local"
        className="rounded px-4 shadow-md bg-white bg-opacity-20 text-white placeholder-white"
      />
      <button
        className="bg-gray-800 rounded text-white px-4 py-2 shadow-md flex items-center gap-2"
        onClick={buscarClima}
      >
        <MagnifyingGlass size={18} color="#fff" weight="bold" />
        Buscar
      </button>
    </div>
  );
};

export default Busca;
