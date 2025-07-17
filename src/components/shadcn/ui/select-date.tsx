"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"
import { Label } from "@/components/shadcn/ui/label"
import { Calendar } from "@/components/shadcn/ui/calendar"

import { Popover, PopoverTrigger, PopoverContent } from "@/components/shadcn/ui/popover"


export function Calendar22({ label }: { label: string }) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  return (
    <div className="flex flex-col gap-3" >
      <Label htmlFor="date" className="px-1">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Ano e Mês"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="overflow-hidden p-0 w-full" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              if (d) {
                setDate(d)
                setOpen(false)
              }
            }}
            captionLayout="dropdown"
            fromYear={2020}
            toYear={new Date().getFullYear()}
            disabled={(d) => d > new Date()}
            classNames={{
              day: "hidden",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
