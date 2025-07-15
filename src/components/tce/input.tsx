"use client"

import React, { useState } from "react"

import { Input } from "@/components/shadcn/ui/input"
import { Label } from "@/components/shadcn/ui/label"

interface InputNumericWithLabelProps extends React.ComponentProps<"input"> {
  label: string
  maxLength?: number
}

export function InputNumericWithLabel({
  id,
  label,
  className,
  maxLength,
  onChange,
  ...props
}: InputNumericWithLabelProps) {
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
      <Label htmlFor={id}>
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={maxLength}
        className={`appearance-none ${className ?? ""}`}
        onChange={handleChange}
        {...props}
      />
    </>
  )
}

interface InputNumeroProcessoLicitatorioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
  label?: string
  className?: string
}

export function InputNumeroProcessoLicitatorio({
  id = "num-processo-licitatorio",
  label = "Número do Processo Licitatório",
  className,
  required,
  ...props
}: InputNumeroProcessoLicitatorioProps) {
  return (
    <>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type="text"
        placeholder="2024006806/AADESAM"
        className={className}
        required={required}
				maxLength={21}
        {...props}
      />
    </>
  )
}
