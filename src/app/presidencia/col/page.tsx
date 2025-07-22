'use client';

import { useState } from 'react';
import { Button } from '@/components/shadcn/ui/button';
import { Input } from '@/components/shadcn/ui/input';
import { Label } from '@/components/shadcn/ui/label';
import { gerarEbaixarJsonLicitacao } from '@/lib/jsonGenerator';
import { ModalidadeLicitacao, TipoDeLicitacao, NaturezaDoObjeto, NaturezaDoProcedimento, RegimeExecucaoObra } from '@/components/tce/combobox';

export default function LicitacaoPage() {
  const [modalidade, setModalidade] = useState('');
  const [tipoLicitacao, setTipoLicitacao] = useState('');
  const [naturezaObjeto, setNaturezaObjeto] = useState('');
  const [naturezaProcedimento, setNaturezaProcedimento] = useState('');
  const [regimeObra, setRegimeObra] = useState('');

  const handleGerarJson = () => {
    const codUnidadeOrcamentaria = (document.getElementById('cod-unidade-orcamentaria') as HTMLInputElement)?.value;
    const numProcessoLicitatorio = (document.getElementById('num-processo-licitatorio') as HTMLInputElement)?.value;
    const desObjetoLicitacao = (document.getElementById('des-objeto-licitacao') as HTMLTextAreaElement)?.value;
    const vlTotalPrevisto = (document.getElementById('valor-estimado') as HTMLInputElement)?.value;
    const tpItemLote = (document.getElementById('tp-item-lote') as HTMLInputElement)?.value;
    const competencia = (document.getElementById('dt-competencia') as HTMLInputElement)?.value;
    const idContratacaoPNCP = (document.getElementById('id-contratacao-pncp') as HTMLInputElement)?.value;

    const dados = {
      codUnidadeOrcamentaria: parseInt(codUnidadeOrcamentaria),
      numProcessoLicitatorio,
      codModalidadeLicitacao: modalidade === 'null' ? null : parseInt(modalidade),
      codTipoLicitacao: modalidade === '4' || tipoLicitacao === 'null' ? null : parseInt(tipoLicitacao),
      codNaturezaObjeto: naturezaObjeto === 'null' ? null : parseInt(naturezaObjeto),
      codNaturezaProcedimento: parseInt(naturezaProcedimento),
      desObjetoLicitacao,
      codRegimeObra: regimeObra ? parseInt(regimeObra) : null,
      vlTotalPrevisto: parseFloat(vlTotalPrevisto),
      tpItemLote,
      competencia: parseInt(competencia),
      idContratacaoPNCP
    };

    gerarEbaixarJsonLicitacao(dados);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Licitação</h1>

      <div className="grid gap-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cod-unidade-orcamentaria">Código da Unidade Orçamentária</Label>
            <Input id="cod-unidade-orcamentaria" placeholder="99001" />
          </div>
          <div>
            <Label htmlFor="num-processo-licitatorio">Número do Processo Licitatório</Label>
            <Input id="num-processo-licitatorio" placeholder="2024006806/AADESAM" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <ModalidadeLicitacao value={modalidade} onChange={setModalidade} />
          </div>
          <div>
            <TipoDeLicitacao value={tipoLicitacao} onChange={setTipoLicitacao} disabled={modalidade === '4'} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <NaturezaDoObjeto value={naturezaObjeto} onChange={setNaturezaObjeto} disabled={modalidade === '4'} />
          </div>
          <div>
            <NaturezaDoProcedimento value={naturezaProcedimento} onChange={setNaturezaProcedimento} />
          </div>
        </div>

        <div>
          <Label htmlFor="des-objeto-licitacao">Descrição do Objeto</Label>
          <textarea
            id="des-objeto-licitacao"
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <RegimeExecucaoObra value={regimeObra} onChange={setRegimeObra} />
          </div>
          <div>
            <Label htmlFor="valor-estimado">Valor Total Previsto</Label>
            <Input
              id="valor-estimado"
              type="number"
              step="0.01"
              placeholder="457691.82"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tp-item-lote">Tipo Item/Lote</Label>
            <Input id="tp-item-lote" placeholder="L" maxLength={1} />
          </div>
          <div>
            <Label htmlFor="dt-competencia">Competência</Label>
            <Input
              id="dt-competencia"
              placeholder="202505"
              maxLength={6}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="id-contratacao-pncp">ID Contratação PNCP</Label>
          <Input
            id="id-contratacao-pncp"
            placeholder="13272780000170-1-000006/2025"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          id="btn-gerar-licitacao-json"
          onClick={handleGerarJson}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Gerar LICITACAO.JSON
        </Button>
      </div>
    </div>
  );
}
