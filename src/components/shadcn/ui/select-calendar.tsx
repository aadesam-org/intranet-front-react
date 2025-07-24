"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"
import { Label } from "@/components/shadcn/ui/label"
import { Calendar } from "@/components/shadcn/ui/calendar"

import { Popover, PopoverTrigger, PopoverContent } from "@/components/shadcn/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export function CalendarYearMonthDay({ label, id, value, onChange, ...props }: {
	label: string,
	id: string,
	className?: string,
	required?: boolean,
	value?: string,
	onChange?: (e: any) => void,
}) {

  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const isControlled = value !== undefined && value !== '';

  // Converter string yyyy-mm-dd para Date
  const getDateFromValue = (val: string | undefined) => {
    if (!val) return undefined;
    const [year, month, day] = val.split('-').map(Number);
    if (!year || !month || !day) return undefined;
    return new Date(year, month - 1, day);
  };

  const displayDate = isControlled ? getDateFromValue(value) : date;

  function handleSelect(d: Date | undefined) {
    if (!isControlled) {
      setDate(d);
    }
    if (onChange && d) {
      // Formatar para yyyy-mm-dd
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      onChange({ target: { id, value: `${yyyy}-${mm}-${dd}` } });
    }
    setOpen(false);
  }

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
            {displayDate ? format(displayDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a Data"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="overflow-hidden p-0 w-full" align="start">
          <Calendar
            id={id}
            mode="single"
            selected={displayDate}
            onSelect={handleSelect}
            captionLayout="dropdown"
            startMonth={new Date(2010, 0, 1)}
            disabled={(d) => d > new Date()}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
