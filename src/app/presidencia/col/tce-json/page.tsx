'use client'

import React, { useState } from 'react'
import { AppSidebar } from '@/components/shadcn/sidebar/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/shadcn/ui/breadcrumb'
import { Separator } from '@/components/shadcn/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/shadcn/ui/sidebar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card"
import { InputCurrencyBRL, InputNumberPNPC, InputNumericWithLabel, InputNumeroProcessoLicitatorio } from '@/components/tce/input'
import { ModalidadeLicitacao, NaturezaDoObjeto, NaturezaDoProcedimento, RegimeExecucaoObra, Status, TipoDeLicitacao } from '@/components/tce/combobox'
import { TextareaWithLabel } from '@/components/tce/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/shadcn/ui/radio-group'
import { Label } from '@/components/shadcn/ui/label'
import { Button } from '@/components/shadcn/ui/button'
import { NumeroEditalLicitacao } from '@/components/tce/input-num-edital-licitacao'
import { CalendarYearMonthDay } from '@/components/shadcn/ui/select-calendar'
import { InputString } from '@/components/tce/input-string'
import { InputDecimal } from '@/components/tce/input-decimal'
import { InputInteger } from '@/components/tce/input-integer'
import { TableItemLicitacao } from '@/components/tce/table-item-licitacao'
import { gerarEbaixarJsonLicitacao, gerarEbaixarJsonPublicacao, montarObjetoPublicacao, downloadJson } from '@/lib/jsonGenerator';

// Tipos para os itens e formulário
interface ItemType {
  'num-sequencial-item': string;
  'qt-item-solicitado': string;
  'unidade-medida': string;
  'cod-item-lote': string;
  'des-objeto-licitacao': string;
  'status-item-licitacao': string;
  'dt-homologacao-item': string;
  'dt-publicacao-homologacao': string;
}

// Pode ser igual ao ItemType
type FormType = ItemType;

const valoresIniciais: FormType = {
  'num-sequencial-item': '',
  'qt-item-solicitado': '',
  'unidade-medida': '',
  'cod-item-lote': '',
  'des-objeto-licitacao': '',
  'status-item-licitacao': '',
  'dt-homologacao-item': '',
  'dt-publicacao-homologacao': '',
};

const formatDateToYYYYMMDD = (date: string) => {
  if (!date.includes('-')) {
    return date;
  }
  const [year, month, day] = date.split('-');
  return `${year}${month}${day}`;
}

export default function Page() {
  const [modalidade, setModalidade] = useState<string>('');
  const [itens, setItens] = useState<ItemType[]>([]);
  const [form, setForm] = useState<FormType>(valoresIniciais);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [valorEstimado, setValorEstimado] = useState<string>('');
  const [tipoLicitacao, setCodTipoLicitacao] = useState<string>('');
  const [naturezaObjeto, setCodNaturezaObjeto] = useState<string>('');
  const [codNaturezaProcedimento, setCodNaturezaProcedimento] = useState<string>('');
  const [codRegimeObra, setCodRegimeObra] = useState<string>('');
  const [tpItemLote, setTpItemLote] = useState<string>('L');
  const [competencia, setCompetencia] = useState<string>('');
  const [dtPublicacaoEdital, setDtPublicacaoEdital] = useState<string>('');
  const [dtLimitePropostas, setDtLimitePropostas] = useState<string>('');

  const codUnidadeOrcamentaria = (document.getElementById('cod-unidade-orcamentaria') as HTMLInputElement)?.value;
  const numProcessoLicitatorio = (document.getElementById('num-processo-licitatorio') as HTMLInputElement)?.value;
  const codModalidadeLicitacao = modalidade;
  const codTipoLicitacao = tipoLicitacao;
  const codNaturezaObjeto = naturezaObjeto;
  const desObjetoLicitacao = (document.getElementById('des-objeto-licitacao') as HTMLTextAreaElement)?.value;
  const vlTotalPrevisto = valorEstimado?.replace(/[^\d.,]/g, '').replace(',', '.');
  const idContratacaoPNCP = (document.getElementById('id-contratacao-pncp') as HTMLInputElement)?.value;

  const nomeVeiculoComunicacao = (document.getElementById('nome-veiculo-comunicacao') as HTMLInputElement)?.value || '';

  const numEditalLicitacao = (document.getElementById('num-edital-licitacao') as HTMLInputElement)?.value;
  const numDiarioOficial = (document.getElementById('num-diario-oficial') as HTMLInputElement)?.value;

  // Handler do botão de gerar LICITACAO.JSON
  function handleGerarLicitacaoJson() {

    const obj = {
      codUnidadeOrcamentaria: codUnidadeOrcamentaria ? Number(codUnidadeOrcamentaria) : null,
      numProcessoLicitatorio: numProcessoLicitatorio || '',
      codModalidadeLicitacao: codModalidadeLicitacao ? Number(codModalidadeLicitacao) : null,
      codTipoLicitacao: (codTipoLicitacao && Number(codModalidadeLicitacao) !== 4) ? Number(codTipoLicitacao) : null,
      codNaturezaObjeto: (codNaturezaObjeto && Number(codModalidadeLicitacao) !== 4) ? Number(codNaturezaObjeto) : null,
      codNaturezaProcedimento: codNaturezaProcedimento ? Number(codNaturezaProcedimento) : null,
      desObjetoLicitacao: desObjetoLicitacao || '',
      codRegimeObra: codRegimeObra ? Number(codRegimeObra) : null,
      vlTotalPrevisto: vlTotalPrevisto ? Number(vlTotalPrevisto) : null,
      tpItemLote: tpItemLote || '',
      competencia: formatDateToYYYYMMDD(competencia) || '',
      idContratacaoPNCP: idContratacaoPNCP || '',
    };
    gerarEbaixarJsonLicitacao(obj);
  }

  // Função para gerar e baixar o PUBLICACAO.JSON
  function handleGerarPublicacaoJson() {
    const obj = montarObjetoPublicacao({
      numProcessoLicitatorio,
      dtPublicacaoEdital: formatDateToYYYYMMDD(dtPublicacaoEdital),
      nomeVeiculoComunicacao
    });
    gerarEbaixarJsonPublicacao(obj);
  }

  // Função para gerar e baixar de LICITACAOHISTORICO.JSON
  function handleGerarLicitacaoHistoricoJson() {

    const obj = {
      codUnidadeOrcamentaria: codUnidadeOrcamentaria ? Number(codUnidadeOrcamentaria) : null,
      numProcessoLicitatorio: numProcessoLicitatorio || '',
      numEditalLicitacao: numEditalLicitacao || '',
      dtPublicacaoEdital: formatDateToYYYYMMDD(dtPublicacaoEdital) || '',
      numDiarioOficial: numDiarioOficial ? Number(numDiarioOficial) : null,
      dtLimitePropostas: formatDateToYYYYMMDD(dtLimitePropostas) || '',
    };
    downloadJson(obj, 'LICITACAOHISTORICO');
  }

  // Função para gerar e baixar o ITEMLICITACAO.JSON
  function handleGerarItemLicitacaoJson() {

    const dtPublicacaoEditalFormatada = formatDateToYYYYMMDD(dtPublicacaoEdital);

    // Mapeia os itens para o formato solicitado
    const itensJson = itens.map((item) => ({
      numProcessoLicitatorio,
      numEditalLicitacao,
      dtPublicacaoEdital: dtPublicacaoEditalFormatada,
      numSequencialItem: Number(item['num-sequencial-item']),
      desItemLicitacao: item['des-objeto-licitacao'],
      qtItemLicitado: Number(item['qt-item-solicitado']),
      dtHomologacaoItem: formatDateToYYYYMMDD(item['dt-homologacao-item']) || '',
      dtPublicacaoHomologacao: formatDateToYYYYMMDD(item['dt-publicacao-homologacao']) || '',
      unidadeMedida: item['unidade-medida'],
      status: Number(item['status-item-licitacao']),
      codItemLote: item['cod-item-lote'],
    }));

    // Função utilitária para gerar nome do arquivo
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const filename = `ITEMLICITACAO_${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}.json`;
    const blob = new Blob([JSON.stringify(itensJson, null, 2)], { type: 'application/json' });
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

  // Função para lidar com mudança dos campos do formulário dos itens
  function handleChange(e: { target: { id: string, value: string } }) {
    setForm({ ...form, [e.target.id]: e.target.value });
    // Log para depuração
    if (e.target.id === 'dt-homologacao-item' || e.target.id === 'dt-publicacao-homologacao') {
      console.log('Data alterada:', e.target.id, e.target.value);
    }
  }

  // Adicionar ou editar item
  function handleAddOrEdit() {
    if (editIndex !== null) {
      // Editar
      const novosItens = [...itens];
      novosItens[editIndex] = form;
      setItens(novosItens);
      setEditIndex(null);
    } else {
      // Adicionar
      setItens([...itens, form]);
    }
    setForm(valoresIniciais); // Limpa o formulário
  }

  // Preencher formulário para edição
  function handleEdit(index: number) {
    setForm(itens[index]);
    setEditIndex(index);
  }

  // Handler para deletar item
  function handleDelete(index: number) {
    const novosItens = itens.filter((_, i) => i !== index);
    setItens(novosItens);
    if (editIndex === index) {
      setEditIndex(null);
    }
  }

  return (
    <SidebarProvider>
			<AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Presidência</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Comissão Licitação - COL</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>TCE - e-Contas</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					<Card>
						<CardHeader>
							<CardTitle className='text-3xl font-bold'>Arquivos de Atos Jurídicos</CardTitle>
							<CardDescription>Formulário para geração de arquivos de Atos Jurídicos no formato JSON, a ser enviado no Portal e-Contas do Tribunal de Contas do Estado do Amazonas, conforme a versão 2025.01.01 do layout do Manual de Remessa do TCE.</CardDescription>
						</CardHeader>

						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="grid gap-3 w-full">
									<InputNumericWithLabel id="cod-unidade-orcamentaria" label="Código da Unidade Orçamentária" placeholder="99001" defaultValue={99001} maxLength={6} required />
                </div>
                <div className="grid gap-3 w-full">
									<InputNumeroProcessoLicitatorio required />
                </div>
								<div className="grid gap-3 w-full">
									<NumeroEditalLicitacao id="num-edital-licitacao" label="Número do Edital de Licitação" required />
								</div>
								<div className="grid gap-3 w-full">
									<CalendarYearMonthDay label="Data de Publicação do Edital" id="dt-publicacao-edital" value={dtPublicacaoEdital} onChange={e => setDtPublicacaoEdital(e.target.value)} required className="w-full" />
								</div>
								<div className="grid gap-3 w-full">
									<ModalidadeLicitacao value={modalidade} onChange={setModalidade} />
                </div>
								<div className="grid gap-3 w-full">
									<NaturezaDoObjeto value={naturezaObjeto} onChange={setCodNaturezaObjeto} disabled={modalidade === "4"} />
                </div>
								<div className="grid gap-3 w-full">
									<NaturezaDoProcedimento value={codNaturezaProcedimento} onChange={setCodNaturezaProcedimento} />
								</div>
								<div className="grid gap-3 w-full">
									<RegimeExecucaoObra value={codRegimeObra} onChange={setCodRegimeObra} />
								</div>
								<div className="grid gap-3 w-full">
									<CalendarYearMonthDay label="Competência" id="dt-competencia" value={competencia} onChange={e => setCompetencia(e.target.value)}/>
								</div>
								<div className="grid gap-3 w-full">
									<CalendarYearMonthDay label="Limite para Envio da Proposta" id="dt-limite-propostas" value={dtLimitePropostas} onChange={e => setDtLimitePropostas(e.target.value)} />
								</div>
								<div className="grid gap-3 w-full">
									<InputNumericWithLabel id="num-diario-oficial" label="Número do Diário Oficial" placeholder="35454" maxLength={6} required />
                </div>
								<div className="grip gap-3 w-full">
									<InputString id="nome-veiculo-comunicacao" label="Veículo de Comunicação" placeholder="Diário Oficial do Estado do Amazonas" defaultValue={"Diário Oficial do Estado do Amazonas"} maxLength={50} required className='mt-3'/>
								</div>
              </div>
						</CardContent>

						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
								<div className="grid gap-3 w-full">
									<TextareaWithLabel id="des-objeto-licitacao" label="Descrição do Objeto da Licitação" maxLength={300} />
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
									<div className="grid gap-3 w-full">
										<InputCurrencyBRL id="valor-estimado" title="Total da Despesa Prevista" value={valorEstimado} onValueChange={setValorEstimado} />
									</div>
									<div className="grid gap-3 w-full">
										<InputNumberPNPC id='id-contratacao-pncp' />
									</div>
									<div className="grid gap-3 w-full">
										<TipoDeLicitacao value={tipoLicitacao} onChange={setCodTipoLicitacao} disabled={modalidade === "4"} />
									</div>
									<div className="grid gap-3 w-full justify-center">
											<RadioGroup id="tp-item-lote" value={tpItemLote} onValueChange={setTpItemLote}>
												<div className="flex items-center space-x-2">
													<RadioGroupItem value="L" id="tp-lote" defaultChecked />
													<Label htmlFor="tp-lote">Lote</Label>
													<RadioGroupItem value="I" id="tp-item" />
													<Label htmlFor="tp=item">Item</Label>
												</div>
											</RadioGroup>
									</div>
								</div>
							</div>
						</CardContent>

						<CardContent>
							<Card id='card-itens-licitacao'>
								<CardHeader className='text-2xl font-bold'>Itens da Licitação</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 md:grid-cols-1 gap-4">

										<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
											<div className="grid gap-3 w-full">
												<InputInteger
													id="num-sequencial-item"
													label="No."
													maxLength={5}
													placeholder="1"
													required
													value={form['num-sequencial-item']}
													onChange={handleChange}
												/>
											</div>
											<div className='grid gap-3 w-full'>
												<Status
													id='status-item-licitacao'
													value={form['status-item-licitacao']}
													onChange={handleChange}
												/>
											</div>
											<div className="grid gap-3 w-full">
												<CalendarYearMonthDay
													label='Homologação do Item'
													id='dt-homologacao-item'
													value={form['dt-homologacao-item']}
													onChange={handleChange}
												/>
											</div>
											<div className="grid gap-3 w-full">
												<CalendarYearMonthDay
													label='Publicação da Homologação'
													id='dt-publicacao-homologacao'
													value={form['dt-publicacao-homologacao']}
													onChange={handleChange}
												/>
											</div>
										</div>

										<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
											<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4'>
												<div className="grid gap-3 w-full">
													<InputDecimal
														id="qt-item-solicitado"
														label='Quantidade'
														placeholder='152.50'
														maxLength={16}
														required
														value={form['qt-item-solicitado']}
														onChange={handleChange}
													/>
												</div>
												<div className="grid gap-3 w-full">
													<InputString
														id='unidade-medida'
														label='Unidade de Medida'
														placeholder='KG / L / UND / etc.'
														maxLength={30}
														required
														value={form['unidade-medida']}
														onChange={handleChange}
													/>
												</div>
												<div className="grid gap-3 w-full">
													<InputString
														id='cod-item-lote'
														label='Código do Lote'
														placeholder='LOTE01'
														title='Obrigatório se o Tipo de Licitação for igual a LOTE'
														maxLength={10}
														required
														value={form['cod-item-lote']}
														onChange={handleChange}
													/>
												</div>
											</div>

											<div className='grid md:grid-cols-1 gap-3 w-full'>
												<div className="grid gap-3 w-full">
													<TextareaWithLabel
														id="des-objeto-licitacao"
														label="Descrição do Objeto da Licitação"
														className="w-full h-26"
														maxLength={300}
														value={form['des-objeto-licitacao']}
														onChange={handleChange}
													/>
												</div>
												<div className="grid gap-3 w-full">
													<Button id='btn-adicionar-item' onClick={handleAddOrEdit} className='bg-green-900 text-white hover:bg-green-700 hover:text-lg active:bg-green-600 active:scale-95 transition-all duration-150'>
														{editIndex !== null ? 'SALVAR ALTERAÇÕES' : 'ADICIONAR ITEM'}
													</Button>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
								<Separator />
								<CardContent id='card-content-itens-licitacao'>
									<TableItemLicitacao
										itens={itens}
										onEdit={handleEdit}
										onDelete={handleDelete}
									/>
								</CardContent>
							</Card>

						</CardContent>

						<Separator />

						<CardFooter>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
								<Button
									id='btn-gerar-licitacao-json'
									className='hover:bg-gray-700 active:bg-green-600 active:scale-95'
									onClick={handleGerarLicitacaoJson}
								>
									8.5 - LICITACAO.JSON
								</Button>
								<Button
									id='btn-gerar-itemlicitacao-json'
									className='hover:bg-gray-700 active:bg-green-600 active:scale-95'
									onClick={handleGerarItemLicitacaoJson}
								>
									8.6 - ITEMLICITACAO.JSON
								</Button>
								<Button
									id='btn-gerar-licitacaohistorico-json'
									className='hover:bg-gray-700 active:bg-green-600 active:scale-95'
									onClick={handleGerarLicitacaoHistoricoJson}
								>
									8.7 - LICITACAOHISTORICO.JSON
								</Button>
								<Button
									id='btn-gerar-publicacao-json'
									className='hover:bg-gray-700 active:bg-green-600 active:scale-95'
									onClick={handleGerarPublicacaoJson}
								>
									8.15 - PUBLICACAO.JSON
								</Button>
							</div>
						</CardFooter>
					</Card>
				</div>

      </SidebarInset>
    </SidebarProvider>
  )
}
