'use client'

import { Input } from "@/components/shadcn/ui/input"
import { Label } from "@/components/shadcn/ui/label"

interface NumeroEditalLicitacaoProps extends React.ComponentProps<"input"> {
  label: string
  maxLength?: number
}

export function NumeroEditalLicitacao({
  id,
  label,
  className,
  maxLength = 16,
  onChange,
  ...props
}: NumeroEditalLicitacaoProps) {
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
        type="text"
        maxLength={maxLength}
				placeholder="006/2025"
				required
        className={`appearance-none ${className ?? ""}`}
        onChange={handleChange}
        {...props}
      />
    </>
  )
}
