'use client'

import { Input } from '@/components/shadcn/ui/input'
import { Label } from '@/components/shadcn/ui/label'

interface NumeroEditalLicitacaoProps extends React.ComponentProps<'input'> {
  label: string
  maxLength?: number
}

export function NumeroEditalLicitacao({
  id,
  label,
  className,
  maxLength = 16,
  ...props
}: NumeroEditalLicitacaoProps) {
  return (
    <>
      <Label htmlFor={id}>
        {label}
        {props.required && <span className="ml-1 text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        type="text"
        maxLength={maxLength}
        placeholder="006/2025"
        required
        className={`appearance-none ${className ?? ''}`}
        {...props}
      />
    </>
  )
}
