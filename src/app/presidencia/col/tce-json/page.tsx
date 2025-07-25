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
} from '@/components/shadcn/ui/card'
import {
  InputCurrencyBRL,
  InputNumberPNPC,
  InputNumericWithLabel,
  InputNumeroProcessoLicitatorio,
} from '@/components/tce/input'
import {
  ModalidadeLicitacao,
  NaturezaDoObjeto,
  NaturezaDoProcedimento,
  RegimeExecucaoObra,
  Status,
  TipoDeLicitacao,
} from '@/components/tce/combobox'
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

interface ItemType {
  'num-sequencial-item': string
  'qt-item-solicitado': string
  'unidade-medida': string
  'cod-item-lote': string
  'des-objeto-licitacao': string
  'status-item-licitacao': string
  'dt-homologacao-item': string
  'dt-publicacao-homologacao': string
}

type FormType = ItemType

const valoresIniciais: FormType = {
  'num-sequencial-item': '',
  'qt-item-solicitado': '',
  'unidade-medida': '',
  'cod-item-lote': '',
  'des-objeto-licitacao': '',
  'status-item-licitacao': '',
  'dt-homologacao-item': '',
  'dt-publicacao-homologacao': '',
}

function downloadJson(payload: unknown, nomeBase: string) {
  const now = new Date()
  const pad = (n: number) => n.toString().padStart(2, '0')
  const filename = `${nomeBase}_${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}.json`
  const blob = new Blob([JSON.stringify([payload], null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')

  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()

  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 100)
}

export default function Page() {
  const [codUnidadeOrcamentaria, setCodUnidadeOrcamentaria] = useState('99001')
  const [numProcessoLicitatorio, setNumProcessoLicitatorio] = useState('/AADESAM')
  const [numEditalLicitacao, setNumEditalLicitacao] = useState<string>('/2025')
  const [dtPublicacaoEdital, setDtPublicacaoEdital] = useState<string>('')

  const [codModalidadeLicitacao, setCodModalidadeLicitacao] = useState<string>('')
  const [codNaturezaObjeto, setCodNaturezaObjeto] = useState<string>('')
  const [codNaturezaProcedimento, setCodNaturezaProcedimento] = useState<string>('')
  const [codRegimeObra, setCodRegimeObra] = useState<string>('')

  const [competencia, setCompetencia] = useState<string>('')
  const [dtLimitePropostas, setDtLimitePropostas] = useState<string>('')
  const [numDiarioOficial, setNumDiarioOficial] = useState<string>('')
  const [nomeVeiculoComunicacao, setNomeVeiculoComunicacao] = useState<string>(
    'Diário Oficial do Estado do Amazonas'
  )

  const [desObjetoLicitacao, setDesObjetoLicitacao] = useState<string>('')
  const [vlTotalPrevisto, setVlTotalPrevisto] = useState<string>('')
  const [idContratacaoPNCP, setIdContratacaoPNCP] = useState<string>('')
  const [codTipoLicitacao, setCodTipoLicitacao] = useState<string>('')
  const [tpItemLote, setTpItemLote] = useState<string>('L')

  const [itens, setItens] = useState<ItemType[]>([])
  const [form, setForm] = useState<FormType>(valoresIniciais)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  const formatDateToYYYYMMDD = (date: string) => {
    if (!date.includes('-')) {
      return date
    }
    const [year, month, day] = date.split('-')
    return `${year}${month}${day}`
  }

  function generateAndDownloadLicitacaoJson() {
    const licitacaoPayload = {
      codUnidadeOrcamentaria: codUnidadeOrcamentaria ? Number(codUnidadeOrcamentaria) : null,
      numProcessoLicitatorio: numProcessoLicitatorio || '',
      codModalidadeLicitacao: codModalidadeLicitacao ? Number(codModalidadeLicitacao) : null,
      codTipoLicitacao:
        codTipoLicitacao && Number(codModalidadeLicitacao) !== 4 ? Number(codTipoLicitacao) : null,
      codNaturezaObjeto:
        codNaturezaObjeto && Number(codModalidadeLicitacao) !== 4
          ? Number(codNaturezaObjeto)
          : null,
      codNaturezaProcedimento: codNaturezaProcedimento ? Number(codNaturezaProcedimento) : null,
      desObjetoLicitacao: desObjetoLicitacao || '',
      codRegimeObra: codRegimeObra ? Number(codRegimeObra) : null,
      vlTotalPrevisto: vlTotalPrevisto.replace(/[^\d.,]/g, '').replace(',', '.')
        ? Number(vlTotalPrevisto)
        : null,
      tpItemLote: tpItemLote || '',
      competencia: formatDateToYYYYMMDD(competencia) || '',
      idContratacaoPNCP: idContratacaoPNCP || '',
    }
    downloadJson(licitacaoPayload, 'LICITACAO')
  }

  function generateAndDownloadPublicacaoJson() {
    const publicacaoPayload = {
      numProcessoLicitatorio,
      dtPublicacaoEdital: formatDateToYYYYMMDD(dtPublicacaoEdital),
      nomeVeiculoComunicacao,
    }
    downloadJson(publicacaoPayload, 'PUBLICACAO')
  }

  function generateAndDownloadLicitacaoHistoricoJson() {
    const licitacaoHistoricoPayload = {
      codUnidadeOrcamentaria: codUnidadeOrcamentaria ? Number(codUnidadeOrcamentaria) : null,
      numProcessoLicitatorio: numProcessoLicitatorio || '',
      numEditalLicitacao: numEditalLicitacao || '',
      dtPublicacaoEdital: formatDateToYYYYMMDD(dtPublicacaoEdital) || '',
      numDiarioOficial: numDiarioOficial ? Number(numDiarioOficial) : null,
      dtLimitePropostas: formatDateToYYYYMMDD(dtLimitePropostas) || '',
    }
    downloadJson(licitacaoHistoricoPayload, 'LICITACAOHISTORICO')
  }

  function generateAndDownloadItemLicitacaoJson() {
    const itemsLicitacaoPayload = itens.map(item => ({
      numProcessoLicitatorio,
      numEditalLicitacao,
      dtPublicacaoEdital: formatDateToYYYYMMDD(dtPublicacaoEdital) || '',
      numSequencialItem: Number(item['num-sequencial-item']),
      desItemLicitacao: item['des-objeto-licitacao'],
      qtItemLicitado: Number(item['qt-item-solicitado']),
      dtHomologacaoItem: formatDateToYYYYMMDD(item['dt-homologacao-item']) || '',
      dtPublicacaoHomologacao: formatDateToYYYYMMDD(item['dt-publicacao-homologacao']) || '',
      unidadeMedida: item['unidade-medida'],
      status: Number(item['status-item-licitacao']),
      codItemLote: item['cod-item-lote'],
    }))
    downloadJson(itemsLicitacaoPayload, 'ITEMLICITACAO')
  }

  // Função para lidar com mudança dos campos do formulário dos itens
  function handleChange(e: { target: { id: string; value: string } }) {
    setForm({ ...form, [e.target.id]: e.target.value })
    if (e.target.id === 'dt-homologacao-item' || e.target.id === 'dt-publicacao-homologacao') {
      console.log('Data alterada:', e.target.id, e.target.value)
    }
  }

  // Adicionar ou editar item
  function handleAddOrEdit() {
    if (editIndex !== null) {
      // Editar
      const novosItens = [...itens]
      novosItens[editIndex] = form
      setItens(novosItens)
      setEditIndex(null)
    } else {
      // Adicionar
      setItens([...itens, form])
    }
    setForm(valoresIniciais)
  }

  // Preencher formulário para edição
  function handleEdit(index: number) {
    setForm(itens[index])
    setEditIndex(index)
  }

  // Handler para deletar item
  function handleDelete(index: number) {
    const novosItens = itens.filter((_, i) => i !== index)
    setItens(novosItens)
    if (editIndex === index) {
      setEditIndex(null)
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
              <CardTitle className="text-3xl font-bold">Arquivos de Atos Jurídicos</CardTitle>
              <CardDescription>
                Formulário para geração de arquivos de Atos Jurídicos no formato JSON, a ser enviado
                no Portal e-Contas do Tribunal de Contas do Estado do Amazonas, conforme a versão
                2025.01.01 do layout do Manual de Remessa do TCE.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="grid w-full gap-3">
                  <InputNumericWithLabel
                    label="Código da Unidade Orçamentária"
                    id="cod-unidade-orcamentaria"
                    value={codUnidadeOrcamentaria}
                    onChange={e => setCodUnidadeOrcamentaria(e.target.value)}
                    placeholder="99001"
                    maxLength={6}
                    required
                  />
                </div>
                <div className="grid w-full gap-3">
                  <InputNumeroProcessoLicitatorio
                    id="num-processo-licitatorio"
                    value={numProcessoLicitatorio}
                    onChange={e => setNumProcessoLicitatorio(e.target.value)}
                    required
                  />
                </div>
                <div className="grid w-full gap-3">
                  <NumeroEditalLicitacao
                    label="Número do Edital de Licitação"
                    id="num-edital-licitacao"
                    value={numEditalLicitacao}
                    onChange={e => setNumEditalLicitacao(e.target.value)}
                    required
                  />
                </div>
                <div className="grid w-full gap-3">
                  <CalendarYearMonthDay
                    label="Data de Publicação do Edital"
                    id="dt-publicacao-edital"
                    value={dtPublicacaoEdital}
                    onChange={e => setDtPublicacaoEdital(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>

                <div className="grid w-full gap-3">
                  <ModalidadeLicitacao
                    value={codModalidadeLicitacao}
                    onChange={setCodModalidadeLicitacao}
                  />
                </div>
                <div className="grid w-full gap-3">
                  <NaturezaDoObjeto
                    value={codNaturezaObjeto}
                    onChange={setCodNaturezaObjeto}
                    disabled={codModalidadeLicitacao === '4'}
                  />
                </div>
                <div className="grid w-full gap-3">
                  <NaturezaDoProcedimento
                    value={codNaturezaProcedimento}
                    onChange={setCodNaturezaProcedimento}
                  />
                </div>
                <div className="grid w-full gap-3">
                  <RegimeExecucaoObra value={codRegimeObra} onChange={setCodRegimeObra} />
                </div>
                <div className="grid w-full gap-3">
                  <CalendarYearMonthDay
                    label="Competência"
                    id="dt-competencia"
                    value={competencia}
                    onChange={e => setCompetencia(e.target.value)}
                  />
                </div>
                <div className="grid w-full gap-3">
                  <CalendarYearMonthDay
                    label="Limite para Envio da Proposta"
                    id="dt-limite-propostas"
                    value={dtLimitePropostas}
                    onChange={e => setDtLimitePropostas(e.target.value)}
                  />
                </div>
                <div className="grid w-full gap-3">
                  <InputNumericWithLabel
                    label="Número do Diário Oficial"
                    id="num-diario-oficial"
                    value={numDiarioOficial}
                    onChange={e => setNumDiarioOficial(e.target.value)}
                    placeholder="35454"
                    maxLength={6}
                    required
                  />
                </div>
                <div className="grip w-full gap-3">
                  <InputString
                    label="Veículo de Comunicação"
                    id="nome-veiculo-comunicacao"
                    value={nomeVeiculoComunicacao}
                    onChange={e => setNomeVeiculoComunicacao(e.target.value)}
                    placeholder="Diário Oficial do Estado do Amazonas"
                    maxLength={50}
                    required
                    className="mt-3"
                  />
                </div>
              </div>
            </CardContent>

            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                <div className="grid w-full gap-3">
                  <TextareaWithLabel
                    label="Descrição do Objeto da Licitação"
                    id="des-objeto-licitacao"
                    value={desObjetoLicitacao}
                    onChange={e => setDesObjetoLicitacao(e.target.value)}
                    maxLength={300}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                  <div className="grid w-full gap-3">
                    <InputCurrencyBRL
                      title="Total da Despesa Prevista"
                      id="vl-total-previsto"
                      value={vlTotalPrevisto}
                      onValueChange={setVlTotalPrevisto}
                    />
                  </div>
                  <div className="grid w-full gap-3">
                    <InputNumberPNPC
                      id="id-contratacao-pncp"
                      value={idContratacaoPNCP}
                      onChange={e => setIdContratacaoPNCP(e.target.value)}
                    />
                  </div>
                  <div className="grid w-full gap-3">
                    <TipoDeLicitacao
                      value={codTipoLicitacao}
                      onChange={setCodTipoLicitacao}
                      disabled={codModalidadeLicitacao === '4'}
                    />
                  </div>
                  <div className="grid w-full justify-center gap-3">
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
              <Card id="card-itens-licitacao">
                <CardHeader className="text-2xl font-bold">Itens da Licitação</CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <div className="grid w-full gap-3">
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
                      <div className="grid w-full gap-3">
                        <Status
                          id="status-item-licitacao"
                          value={form['status-item-licitacao']}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid w-full gap-3">
                        <CalendarYearMonthDay
                          label="Homologação do Item"
                          id="dt-homologacao-item"
                          value={form['dt-homologacao-item']}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid w-full gap-3">
                        <CalendarYearMonthDay
                          label="Publicação da Homologação"
                          id="dt-publicacao-homologacao"
                          value={form['dt-publicacao-homologacao']}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1">
                        <div className="grid w-full gap-3">
                          <InputDecimal
                            id="qt-item-solicitado"
                            label="Quantidade"
                            placeholder="152.50"
                            maxLength={16}
                            required
                            value={form['qt-item-solicitado']}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="grid w-full gap-3">
                          <InputString
                            id="unidade-medida"
                            label="Unidade de Medida"
                            placeholder="KG / L / UND / etc."
                            maxLength={30}
                            required
                            value={form['unidade-medida']}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="grid w-full gap-3">
                          <InputString
                            id="cod-item-lote"
                            label="Código do Lote"
                            placeholder="LOTE01"
                            title="Obrigatório se o Tipo de Licitação for igual a LOTE"
                            maxLength={10}
                            required
                            value={form['cod-item-lote']}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="grid w-full gap-3 md:grid-cols-1">
                        <div className="grid w-full gap-3">
                          <TextareaWithLabel
                            id="des-objeto-licitacao"
                            label="Descrição do Objeto da Licitação"
                            className="h-26 w-full"
                            maxLength={300}
                            value={form['des-objeto-licitacao']}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="grid w-full gap-3">
                          <Button
                            id="btn-adicionar-item"
                            onClick={handleAddOrEdit}
                            className="bg-green-900 text-white transition-all duration-150 hover:bg-green-700 hover:text-lg active:scale-95 active:bg-green-600"
                          >
                            {editIndex !== null ? 'SALVAR ALTERAÇÕES' : 'ADICIONAR ITEM'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <Separator />
                <CardContent id="card-content-itens-licitacao">
                  <TableItemLicitacao
                    numEditalLicitacao={numEditalLicitacao}
                    itens={itens}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </CardContent>
              </Card>
            </CardContent>

            <Separator />

            <CardFooter>
              <div className="grid grid-cols-1 justify-center gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button
                  id="btn-gerar-licitacao-json"
                  className="hover:bg-gray-700 active:scale-95 active:bg-green-600"
                  onClick={generateAndDownloadLicitacaoJson}
                >
                  8.5 - LICITACAO.JSON
                </Button>
                <Button
                  id="btn-gerar-itemlicitacao-json"
                  className="hover:bg-gray-700 active:scale-95 active:bg-green-600"
                  onClick={generateAndDownloadItemLicitacaoJson}
                >
                  8.6 - ITEMLICITACAO.JSON
                </Button>
                <Button
                  id="btn-gerar-licitacaohistorico-json"
                  className="hover:bg-gray-700 active:scale-95 active:bg-green-600"
                  onClick={generateAndDownloadLicitacaoHistoricoJson}
                >
                  8.7 - LICITACAOHISTORICO.JSON
                </Button>
                <Button
                  id="btn-gerar-publicacao-json"
                  className="hover:bg-gray-700 active:scale-95 active:bg-green-600"
                  onClick={generateAndDownloadPublicacaoJson}
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
