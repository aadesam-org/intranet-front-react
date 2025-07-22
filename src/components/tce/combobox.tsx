'use client';

import { Label } from '@/components/shadcn/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/ui/select';

type ComboboxProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function ModalidadeLicitacao({ value, onChange, disabled }: ComboboxProps) {
  return (
    <div>
      <Label>Modalidade da Licitação</Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione a modalidade" />
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
    </div>
  );
}

export function TipoDeLicitacao({ value, onChange, disabled }: ComboboxProps) {
  return (
    <div>
      <Label>Tipo de Licitação</Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o tipo" />
        </SelectTrigger>
        <SelectContent>
					<SelectItem value="null">00 - Não se aplica</SelectItem>
					<SelectItem value="1">01 - Menor Preço</SelectItem>
					<SelectItem value="2">02 - Melhor Técnica</SelectItem>
					<SelectItem value="3">03 - Técnica e Preço</SelectItem>
					<SelectItem value="4">04 - Maior Lance ou Oferta</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function NaturezaDoObjeto({ value, onChange, disabled }: ComboboxProps) {
  return (
    <div>
      <Label>Natureza do Objeto</Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione a natureza" />
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
    </div>
  );
}

export function NaturezaDoProcedimento({ value, onChange, disabled }: ComboboxProps) {
  return (
    <div>
      <Label>Natureza do Procedimento</Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione a natureza" />
        </SelectTrigger>
        <SelectContent>
					<SelectItem value="1">01 - Normal</SelectItem>
					<SelectItem value="2">02 - Registro de Preços</SelectItem>
					<SelectItem value="3">03 - Credenciamento / Chamada Pública</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function RegimeExecucaoObra({ value, onChange, disabled }: ComboboxProps) {
  return (
    <div>
      <Label>Regime de Execução da Obra</Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o regime" />
        </SelectTrigger>
        <SelectContent>
					<SelectItem value="1">01 - Empreitada por Preço Global</SelectItem>
					<SelectItem value="2">02 - Empreitada por Preço Unitário</SelectItem>
					<SelectItem value="3">03 - Empreitada Integral</SelectItem>
					<SelectItem value="4">04 - Tarefa</SelectItem>
					<SelectItem value="5">05 - Execução Direta</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function Status({ id, value, onChange }: { id: string, value?: string, onChange?: (e: any) => void }) {

	const statusLabels: Record<string, string> = {
		"1": "Homologação",
		"2": "Cancelado",
		"3": "Anulado",
		"4": "Revogado",
		"5": "Deserto",
		"6": "Fracassado",
	};

	return (
		<>
			<Label htmlFor={id}>Status<span className="text-red-500 ml-1">*</span></Label>
			<Select value={value} onValueChange={val => onChange && onChange({ target: { id, value: val } })}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Selecione o status" />
				</SelectTrigger>
				<SelectContent id={id}>
					<SelectItem value="1">01 - Homologação</SelectItem>
					<SelectItem value="2">02 - Cancelado</SelectItem>
					<SelectItem value="3">03 - Anulado</SelectItem>
					<SelectItem value="4">04 - Revogado</SelectItem>
					<SelectItem value="5">05 - Deserto</SelectItem>
					<SelectItem value="6">06 - Fracassado</SelectItem>
				</SelectContent>
			</Select>
		</>
	)
}
