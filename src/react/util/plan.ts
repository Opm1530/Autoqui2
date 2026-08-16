// Rótulo do nº de lojas de um plano. maxLojas >= 99 é tratado como "ilimitado"
// (usado pelo plano "2 lojas ou mais"). O backend limita fisicamente em 99.
export const ILIMITADO = 99;

export function lojasLabel(maxLojas?: number): string {
  const n = maxLojas ?? 1;
  if (n >= ILIMITADO) return '2 ou mais lojas';
  return `${n} ${n === 1 ? 'loja' : 'lojas'}`;
}
