export const toTitleCase = (str: string): string => {
  return str
    .toLowerCase() // Garante que todas as letras começam em minúsculas
    .split(' ') // Divide a string em palavras
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza a primeira letra de cada palavra
    .join(' '); // Junta as palavras com espaços
};
