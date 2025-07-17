'use client'

import { Label } from "../shadcn/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/ui/select"

export function ModalidadeLicitacao({ value, onChange }: {
	value?: string,
	onChange?: (value: string) => void
}) {
	return (
		<>
			<Label htmlFor="modalidade-licitacao">Modalidade de Licitação</Label>
			<Select value={value} onValueChange={onChange}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Selecione uma modalidade" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="null">00 - Não se aplica</SelectItem>
					<SelectItem value="1">01 - Convite</SelectItem>
					<SelectItem value="2">02 - Tomada de Preços</SelectItem>
					<SelectItem value="3">03 - Concorrência</SelectItem>
					<SelectItem value="4">04 - Concurso</SelectItem>
					<SelectItem value="5">05 - Pregão Presencial</SelectItem>
					<SelectItem value="6">06 - Pregão Eletrônico</SelectItem>
					<SelectItem value="7">07 - Leilão</SelectItem>
				</SelectContent>
			</Select>
		</>
	)
}

export function TipoDeLicitacao({ disabled }: {
	disabled?: boolean
}) {
	return (
		<>
			<Label htmlFor="cod-tipo-licitacao">Tipo de Licitação<span className="text-red-500 ml-1">*</span></Label>
			<Select disabled={disabled}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Selecione o tipo de licitação" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="null">00 - Não se aplica</SelectItem>
					<SelectItem value="1">01 - Menor Preço</SelectItem>
					<SelectItem value="2">02 - Melhor Técnica</SelectItem>
					<SelectItem value="3">03 - Técnica e Preço</SelectItem>
					<SelectItem value="4">04 - Maior Lance ou Oferta</SelectItem>
				</SelectContent>
			</Select>
		</>
	)
}

export function NaturezaDoObjeto({ disabled }: {
	disabled?: boolean
}) {
	return (
		<>
			<Label htmlFor="cod-natureza-objeto">Natureza do Objeto<span className="text-red-500 ml-1">*</span></Label>
			<Select disabled={disabled}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Selecione a natureza do objeto" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="null">00 - Não se aplica</SelectItem>
					<SelectItem value="1">01 - Obras e Serviços de Engenharia</SelectItem>
					<SelectItem value="2">02 - Comparas e Outros Serviços</SelectItem>
					<SelectItem value="3">03 - Locação de Imóveis</SelectItem>
					<SelectItem value="4">04 - Concessão</SelectItem>
					<SelectItem value="5">05 - Aquisição de Bens</SelectItem>
					<SelectItem value="6">05 - Permissão</SelectItem>
					<SelectItem value="7">06 - Alienação de Bens</SelectItem>
				</SelectContent>
			</Select>
		</>
	)
}

export function NaturezaDoProcedimento() {
	return (
		<>
			<Label htmlFor="cod-natureza-procedimento">Natureza do Procedimento<span className="text-red-500 ml-1">*</span></Label>
			<Select>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Selecione o procedimento" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="1">01 - Normal</SelectItem>
					<SelectItem value="2">02 - Registro de Preços</SelectItem>
					<SelectItem value="3">03 - Credenciamento / Chamada Pública</SelectItem>
				</SelectContent>
			</Select>
		</>
	)
}

export function RegimeExecucaoObra() {
	return (
		<>
			<Label htmlFor="cod-natureza-procedimento">Regime de Execução de Engenharia</Label>
			<Select>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Selecione o regime de obra" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="1">01 - Empreitada por Preço Global</SelectItem>
					<SelectItem value="2">02 - Empreitada por Preço Unitário</SelectItem>
					<SelectItem value="3">03 - Empreitada Integral</SelectItem>
					<SelectItem value="4">04 - Tarefa</SelectItem>
					<SelectItem value="5">05 - Execução Direta</SelectItem>
				</SelectContent>
			</Select>
		</>
	)
}
