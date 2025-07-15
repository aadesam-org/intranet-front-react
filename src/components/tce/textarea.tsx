import { useState } from "react";
import { Label } from "../shadcn/ui/label"
import { Textarea } from "../shadcn/ui/textarea"

export function TextareaWithLabel({ id, label, value, maxLength, ...props }: {
	id: string,
	label: string,
	value?: string,
	maxLength?: number,
}) {
	const [text, setText] = useState('');

	function onTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		const text = event.target.value;
		setText(text);
	}

	return (

		<div className="grid grid-cols-1 md:grid-cols-1 gap-4">
		<Label htmlFor={id}>{label}<span className="text-red-500 ml-1">*</span></Label>
			<Textarea
				id={id}
				value={text}
				maxLength={maxLength}
				className="w-full"
				onChange={onTextChange}
				{...props}
			/>
			<span className="text-sm text-gray-500">
				{text.length}/{maxLength}
			</span>
		</div>
	)
}
