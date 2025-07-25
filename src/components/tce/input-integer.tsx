'use client'

import { Input } from '@/components/shadcn/ui/input'
import { Label } from '@/components/shadcn/ui/label'

interface InputIntegerProps extends React.ComponentProps<'input'> {
  label: string
  maxLength?: number
}

export function InputInteger({
  id,
  label,
  className,
  maxLength,
  onChange,
  ...props
}: InputIntegerProps) {
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
      <Label htmlFor={id} className="">
        {label}
        {props.required && <span className="ml-1 text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={maxLength}
        placeholder={props.placeholder}
        required
        className={`[MozAppearance:textfield] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${className ?? ''}`}
        onChange={handleChange}
        {...props}
      />
    </>
  )
}
