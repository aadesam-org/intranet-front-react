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
					<TableRow>
						<TableCell className="w-[10px] font-medium text-center">1</TableCell>
						<TableCell className="w-[10px] text-center">20</TableCell>
						<TableCell className="w-[10px] text-center">KG</TableCell>
						<TableCell className="w-[50px] text-center">LOTE100</TableCell>
						<TableCell className="max-w-[50px] overflow-auto">Descrição do Item Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, qui, laboriosam libero dolores temporibus quo nobis harum id quidem amet nulla. At iste nobis cum repellendus eaque ipsam porro assumenda.</TableCell>
						<TableCell className="w-[10px] text-center">Homologação</TableCell>
						<TableCell className="w-[10px] text-center">2025-01-01</TableCell>
						<TableCell className="w-[10px] text-center">2025-01-01</TableCell>
						<TableCell className="w-[10px] text-center">
						<Button className="bg-blue-900 text-white hover:bg-blue-700 hover:text-lg active:bg-blue-600 active:scale-95 transition-all duration-150">
								<Pencil />
							</Button>
							<Button className="bg-red-900 text-white hover:bg-red-700 hover:text-lg active:bg-red-600 active:scale-95 transition-all duration-150">
								<Trash2 />
							</Button>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="w-[10px] font-medium text-center">2</TableCell>
						<TableCell className="w-[10px] text-center">300</TableCell>
						<TableCell className="w-[10px] text-center">KG</TableCell>
						<TableCell className="w-[50px] text-center">LOTE100</TableCell>
						<TableCell className="max-w-[50px] overflow-auto">Descrição do Item Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, qui, laboriosam libero dolores temporibus quo nobis harum id quidem amet nulla. At iste nobis cum repellendus eaque ipsam porro assumenda.</TableCell>
						<TableCell className="w-[10px] text-center">Homologação</TableCell>
						<TableCell className="w-[10px] text-center">2025-01-01</TableCell>
						<TableCell className="w-[10px] text-center">2025-01-01</TableCell>
						<TableCell className="w-[10px] text-center">
						<Button className="bg-blue-900 text-white hover:bg-blue-700 hover:text-lg active:bg-blue-600 active:scale-95 transition-all duration-150">
								<Pencil />
							</Button>
							<Button className="bg-red-900 text-white hover:bg-red-700 hover:text-lg active:bg-red-600 active:scale-95 transition-all duration-150">
								<Trash2 />
							</Button>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</>
	)
}
