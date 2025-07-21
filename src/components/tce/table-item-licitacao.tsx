'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ui/table"
import { Button } from "../shadcn/ui/button"
import { Pencil, Trash2 } from "lucide-react"

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

type TableItemLicitacaoProps = {
  itens: ItemType[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const statusLabels: Record<string, string> = {
  "1": "01 - Homologação",
  "2": "02 - Cancelado",
  "3": "03 - Anulado",
  "4": "04 - Revogado",
  "5": "05 - Deserto",
  "6": "06 - Fracassado",
};

export function TableItemLicitacao({ itens, onEdit, onDelete }: TableItemLicitacaoProps) {
  return (
    <>
      <Table>
        <TableCaption>Items adicionados no Edital de Licitação 006/2025</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">No.</TableHead>
            <TableHead className="text-center">QTD</TableHead>
            <TableHead className="text-center">Medida</TableHead>
            <TableHead className="text-center">Lote</TableHead>
            <TableHead className="text-center">Descrição</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Homologação</TableHead>
            <TableHead className="text-center">Publicação</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {itens.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center">Nenhum item adicionado.</TableCell>
            </TableRow>
          ) : (
            itens.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="w-[10px] font-medium text-center">{item['num-sequencial-item']}</TableCell>
                <TableCell className="w-[10px] text-center">{item['qt-item-solicitado']}</TableCell>
                <TableCell className="w-[10px] text-center">{item['unidade-medida']}</TableCell>
                <TableCell className="w-[50px] text-center">{item['cod-item-lote']}</TableCell>
                <TableCell className="max-w-[50px] overflow-auto">{item['des-objeto-licitacao']}</TableCell>
                <TableCell className="w-[10px] text-center">{statusLabels[item['status-item-licitacao']] || item['status-item-licitacao']}</TableCell>
                <TableCell className="w-[10px] text-center">{item['dt-homologacao-item']}</TableCell>
                <TableCell className="w-[10px] text-center">{item['dt-publicacao-homologacao']}</TableCell>
                <TableCell className="w-[10px] text-center">
                  <Button id="btn-editar-item" className="bg-blue-900 text-white hover:bg-blue-700 hover:text-lg active:bg-blue-600 active:scale-95 transition-all duration-150" onClick={() => onEdit(idx)}>
                    <Pencil />
                  </Button>
                  <Button id="btn-excluir-item" className="bg-red-900 text-white hover:bg-red-700 hover:text-lg active:bg-red-600 active:scale-95 transition-all duration-150" onClick={() => onDelete(idx)}>
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  )
}
