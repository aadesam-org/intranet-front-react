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

export function TableItemLicitacao() {

	return (
		<>
			<Table>
				<TableCaption>Items adicionados no Edital de Licitação 006/2025</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">No.</TableHead>
						<TableHead>QTD</TableHead>
						<TableHead>Medida</TableHead>
						<TableHead>Lote</TableHead>
						<TableHead>Descrição</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Homologação</TableHead>
						<TableHead>Publicação</TableHead>
						<TableHead className="text-right">Ações</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell className="font-medium">1</TableCell>
						<TableCell>20</TableCell>
						<TableCell>KG</TableCell>
						<TableCell>LOTE01</TableCell>
						<TableCell>Descrição do Item Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, qui, laboriosam libero dolores temporibus quo nobis harum id quidem amet nulla. At iste nobis cum repellendus eaque ipsam porro assumenda.</TableCell>
						<TableCell>Homologação</TableCell>
						<TableCell>2025-01-01</TableCell>
						<TableCell>2025-01-01</TableCell>
						<TableCell className="text-right">
							<Button className="bg-red-900 text-white hover:bg-red-700 hover:text-lg active:bg-red-600 active:scale-95 transition-all duration-150">
								<Trash2 />
							</Button>
							<Button className="bg-blue-900 text-white hover:bg-blue-700 hover:text-lg active:bg-blue-600 active:scale-95 transition-all duration-150">
								<Pencil />
							</Button>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</>
	)
}
