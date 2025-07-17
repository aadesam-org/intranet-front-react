'use client'

import { Input } from "@/components/shadcn/ui/input"
import { Label } from "@/components/shadcn/ui/label"

interface InputLabelTextProps extends React.ComponentProps<"input"> {
  label: string
  maxLength?: number
}

export function InputLabelText({
  id,
  label,
  className,
  maxLength,
  onChange,
  ...props
}: InputLabelTextProps) {

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
				placeholder={props.placeholder}
				required
        className={`appearance-none ${className ?? ""}`}
        onChange={handleChange}
        {...props}
      />
    </>
  )
}
