export function gerarEbaixarJsonLicitacao(dados: any) {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const filename = `LICITACAO_${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}.json`;
  const blob = new Blob([JSON.stringify([dados], null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}
