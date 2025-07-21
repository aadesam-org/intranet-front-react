import { useState } from "react";
import { Label } from "../shadcn/ui/label"
import { Textarea } from "../shadcn/ui/textarea"

export function TextareaWithLabel({ id, label, value, maxLength, className, onChange, ...props }: {
	id: string,
	label: string,
	value?: string,
	maxLength?: number,
	className?: string,
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
}) {
	// Se value for passado, componente controlado; senão, usa estado interno
	const [text, setText] = useState('');
	const isControlled = value !== undefined;

	function onTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		if (!isControlled) {
			setText(event.target.value);
		}
		if (onChange) {
			onChange(event);
		}
	}

	const displayValue = isControlled ? value : text;

	return (
		<div className="grid grid-cols-1 md:grid-cols-1 gap-4">
			<Label htmlFor={id}>{label}<span className="text-red-500 ml-1">*</span></Label>
			<Textarea
				id={id}
				value={displayValue}
				maxLength={maxLength}
				className={className}
				onChange={onTextChange}
				{...props}
			/>
			<span className="text-sm text-gray-500">
				{displayValue?.length || 0}/{maxLength}
			</span>
		</div>
	)
}
