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

interface InputCurrencyBRLProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
  label?: string
  className?: string
  onValueChange?: (rawValue: string) => void // rawValue = valor limpo, ex: 1000000.00
}

function formatCurrencyBRL(value: string): string {
  // Remove tudo que não for número
  const onlyNumbers = value.replace(/\D/g, "");
  if (!onlyNumbers) return "";
  // Limita a 16 dígitos
  const limited = onlyNumbers.slice(0, 16);
  // Converte para centavos
  const number = parseFloat(limited) / 100;
  // Formata para BRL
  return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getRawValue(value: string): string {
  // Remove tudo que não for número
  const onlyNumbers = value.replace(/\D/g, "");
  if (!onlyNumbers) return "";
  // Limita a 16 dígitos
  const limited = onlyNumbers.slice(0, 16);
  // Converte para centavos e retorna no formato 1000000.00
  const number = parseFloat(limited) / 100;
  return number.toFixed(2);
}

export function InputCurrencyBRL({ id, title, required, value, onChange, onValueChange, ...props }: InputCurrencyBRLProps) {
  const [internalValue, setInternalValue] = React.useState("");

  React.useEffect(() => {
    if (typeof value === "string" && value !== internalValue) {
      setInternalValue(formatCurrencyBRL(value));
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Remove tudo que não for número
    const onlyNumbers = inputValue.replace(/\D/g, "");
    // Limita a 16 dígitos
    const limited = onlyNumbers.slice(0, 16);
    // Formata para BRL
    const masked = formatCurrencyBRL(limited);
    setInternalValue(masked);
    if (onValueChange) {
      onValueChange(getRawValue(limited));
    }
    if (onChange) {
      // Cria um novo evento com o valor mascarado
      const event = {
        ...e,
        target: {
          ...e.target,
          value: masked,
        },
      };
      onChange(event as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <>
      <Label htmlFor={id}>
        {title}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type="text"
        placeholder="R$ 1.000.000,00"
        className={props.className}
        required={required}
        maxLength={23} // R$ 9.999.999.999.999,99
        value={internalValue}
        onChange={handleChange}
        inputMode="numeric"
        pattern="[0-9]*"
        {...props}
      />
    </>
  );
}

interface InputNumberPNPCProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
  label?: string
  className?: string
}

function maskPNPC(value: string): string {
  // Remove tudo que não for número
  value = value.replace(/\D/g, "");
  // Aplica a máscara: 99999999999999-1-999999/9999
  let masked = value;
  if (masked.length > 14) masked = masked.slice(0, 14) + '-' + masked.slice(14);
  if (masked.length > 16) masked = masked.slice(0, 16) + '-' + masked.slice(16);
  if (masked.length > 23) masked = masked.slice(0, 23) + '/' + masked.slice(23);
  return masked.slice(0, 28); // Limita ao tamanho máximo da máscara
}

export function InputNumberPNPC({
  id = "id-contratacao-pncp",
  label = "Número do Controle da Contratação no PNCP",
  className,
  required,
  value,
  onChange,
  ...props
}: InputNumberPNPCProps) {
  const [internalValue, setInternalValue] = React.useState("");

  React.useEffect(() => {
    if (typeof value === "string" && value !== internalValue) {
      setInternalValue(maskPNPC(value));
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    const masked = maskPNPC(onlyNumbers);
    setInternalValue(masked);
    if (onChange) {
      // Cria um novo evento com o valor mascarado
      const event = {
        ...e,
        target: {
          ...e.target,
          value: masked,
        },
      };
      onChange(event as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type="text"
        placeholder="99999999999999-1-999999/9999"
        className={className}
        maxLength={28}
        required={required}
        value={internalValue}
        onChange={handleChange}
        inputMode="numeric"
        pattern="[0-9]*"
        {...props}
      />
    </>
  );
}
