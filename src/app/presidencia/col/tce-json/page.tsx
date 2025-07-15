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
import { InputNumericWithLabel, InputNumeroProcessoLicitatorio } from '@/components/tce/input'
import { ModalidadeLicitacao, NaturezaDoObjeto, NaturezaDoProcedimento, RegimeExecucaoObra, TipoDeLicitacao } from '@/components/tce/combobox'
import { TextareaWithLabel } from '@/components/tce/textarea'

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
							<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="grid gap-3 w-full">
									<InputNumericWithLabel id="cod-unidade-orcamentaria" label="Código da Unidade Orçamentária" placeholder="99001" defaultValue={99001} maxLength={6} required />
                </div>
                <div className="grid gap-3 w-full">
									<InputNumeroProcessoLicitatorio required />
                </div>
								<div className="grid gap-3 w-full">
									<ModalidadeLicitacao value={modalidade} onChange={setModalidade} />
                </div>
								<div className="grid gap-3 w-full">
									<TipoDeLicitacao disabled={modalidade === "4" } />
                </div>
              </div>
						</CardContent>

						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
								<div className="grid gap-3 w-full">
									<NaturezaDoObjeto disabled={modalidade === "4" } />
                </div>
								<div className="grid gap-3 w-full">
									<NaturezaDoProcedimento />
								</div>
								<div className="grid gap-3 w-full">
									<RegimeExecucaoObra />
								</div>
							</div>
						</CardContent>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<TextareaWithLabel id="des-objeto-licitacao" label="Descrição do Objeto da Licitação" maxLength={300} />
							</div>
						</CardContent>
						<CardFooter>
							<p>Card Footer</p>
						</CardFooter>
					</Card>
				</div>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
