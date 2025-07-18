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
import { Calendar22 } from '@/components/shadcn/ui/select-date'
import { Button } from '@/components/shadcn/ui/button'
import { NumeroEditalLicitacao } from '@/components/tce/input-num-edital-licitacao'
import { CalendarYearMonthDay } from '@/components/shadcn/ui/select-calendar'
import { InputString } from '@/components/tce/input-string'
import { InputDecimal } from '@/components/tce/input-decimal'
import { InputInteger } from '@/components/tce/input-integer'
import { Table } from '@/components/shadcn/ui/table'

export default function Page() {
  const [modalidade, setModalidade] = useState<string | undefined>(undefined);

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
									<CalendarYearMonthDay label="Data de Publicação do Edital" id="dt-publicacao-edital" required className="w-full" />
								</div>
								<div className="grid gap-3 w-full">
									<ModalidadeLicitacao value={modalidade} onChange={setModalidade} />
                </div>
								<div className="grid gap-3 w-full">
									<NaturezaDoObjeto disabled={modalidade === "4" } />
                </div>
								<div className="grid gap-3 w-full">
									<NaturezaDoProcedimento />
								</div>
								<div className="grid gap-3 w-full">
									<RegimeExecucaoObra />
								</div>
								<div className="grid gap-3 w-full">
									<Calendar22 label="Competência" />
								</div>
								<div className="grid gap-3 w-full">
									<CalendarYearMonthDay label="Limite para Envio da Proposta" id="dt-limite-propostas"/>
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
										<InputCurrencyBRL
											id="valor-estimado"
											title="Total da Despesa Prevista"
											onValueChange={(valorDecimal) => {
												console.log(valorDecimal);
											}}
										/>
									</div>
									<div className="grid gap-3 w-full">
										<InputNumberPNPC />
									</div>
									<div className="grid gap-3 w-full">
										<TipoDeLicitacao disabled={modalidade === "4" } />
									</div>
									<div className="grid gap-3 w-full justify-center">
											<RadioGroup id="tp-item-lote" defaultValue="L">
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
							<Card>
								<CardHeader className='text-2xl font-bold'>Itens da Licitação</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 md:grid-cols-1 gap-4">

										<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
											<div className="grid gap-3 w-full">
												<InputInteger id="num-sequencial-item" label="No." maxLength={5} placeholder="1" required />
											</div>
											<div className='grid gap-3 w-full'>
												<Status />
											</div>
											<div className="grid gap-3 w-full">
												<CalendarYearMonthDay label='Homologação do Item' id='dt-homologacao-item' />
											</div>
											<div className="grid gap-3 w-full">
												<CalendarYearMonthDay label='Publicação da Homologação' id='dt-publicacao-homologacao' />
											</div>
										</div>

										<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
											<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4'>
												<div className="grid gap-3 w-full">
													<InputDecimal id="qt-item-solicitado" label='Quantidade' placeholder='152.50' maxLength={16} required />
												</div>
												<div className="grid gap-3 w-full">
													<InputString id='unidade-medida' label='Unidade de Medida' placeholder='KG / L / UND / etc.' maxLength={30} required />
												</div>
												<div className="grid gap-3 w-full">
													<InputString id='cod-item-lote' label='Código do Lote' placeholder='LOTE01' title='Obrigatório se o Tipo de Licitação for igual a LOTE' maxLength={10} required />
												</div>
											</div>

											<div className='grid md:grid-cols-1 gap-3 w-full'>
												<div className="grid gap-3 w-full">
													<TextareaWithLabel id="des-objeto-licitacao" label="Descrição do Objeto da Licitação" className="w-full h-26" maxLength={300} />
												</div>
												<div className="grid gap-3 w-full">
													<Button className='bg-green-900 text-white hover:bg-green-700 hover:text-lg active:bg-green-600 active:scale-95 transition-all duration-150'>ADICIONAR ITEM</Button>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
								<Separator />
								<CardContent>
									<Table />
								</CardContent>
							</Card>

						</CardContent>

						<Separator />

						<CardFooter>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
								<Button>8.5 - LICITACAO.JSON</Button>
								<Button>8.6 - ITEMLICITACAO.JSON</Button>
								<Button>8.7 - LICITACAOHISTORICO.JSON</Button>
								<Button>8.15 - PUBLICACAO.JSON</Button>
							</div>
						</CardFooter>
					</Card>
				</div>

      </SidebarInset>
    </SidebarProvider>
  )
}
