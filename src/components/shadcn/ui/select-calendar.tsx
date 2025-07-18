"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"
import { Label } from "@/components/shadcn/ui/label"
import { Calendar } from "@/components/shadcn/ui/calendar"

import { Popover, PopoverTrigger, PopoverContent } from "@/components/shadcn/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export function CalendarYearMonthDay({ label, id,...props }: {
	label: string,
	id: string,
	className?: string,
	required?: boolean
}) {

  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <>
      <Label htmlFor={id} className="px-1 w-full">
        {label}{props.required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a Data"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="overflow-hidden p-0 w-full" align="start">
          <Calendar
						id={id}
            mode="single"
            selected={date}
            onSelect={(d) => {
              if (d) {
                setDate(d)
                setOpen(false)
              }
            }}
            captionLayout="dropdown"
            startMonth={new Date(2010, 0, 1)}
            disabled={(d) => d > new Date()}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
