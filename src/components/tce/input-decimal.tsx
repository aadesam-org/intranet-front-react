'use client'

import { Input } from "@/components/shadcn/ui/input"
import { Label } from "@/components/shadcn/ui/label"

interface InputDecimalProps extends React.ComponentProps<"input"> {
  label: string
  maxLength?: number
}

export function InputDecimal({
  id,
  label,
  className,
  maxLength,
  onChange,
  ...props
}: InputDecimalProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (/^\d*$/.test(value)) {
      if (!maxLength || value.length <= maxLength) {
        onChange?.(e)
      }
    }
  }

  return (
    <>
      <Label htmlFor={id}>{label}{props.required && <span className="text-red-500 ml-1">*</span>}</Label>
      <Input
        id={id}
        type="number"
        inputMode="decimal"
        pattern="[0-9]*"
        maxLength={maxLength}
				placeholder={props.placeholder}
				required
				className={`appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [MozAppearance:textfield] ${className ?? ""}`}
        onChange={handleChange}
        {...props}
      />
    </>
  )
}
