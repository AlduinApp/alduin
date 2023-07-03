import * as Form from '@radix-ui/react-form';
import { ValidityMatcher } from '@radix-ui/react-form';
import { ChangeEvent, HTMLInputTypeAttribute, memo } from 'react';

interface FieldProps {
  name: string;
  label: string;
  required?: boolean;
  pattern?: string;
  type: HTMLInputTypeAttribute;
  messages: Partial<Record<ValidityMatcher, string>>;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

function Field({
  name,
  label,
  required,
  pattern,
  type,
  messages,
  value,
  onChange,
  disabled = false,
}: FieldProps) {
  return (
    <Form.Field name={name} className="grid mb-2">
      <div className="flex items-baseline justify-between">
        <Form.Label className="font-medium leading-8">{label}</Form.Label>
        {Object.keys(messages).map((key) => (
          <Form.Message
            key={key}
            className="text-xs text-neutral-800 dark:text-zinc-400"
            match={key as ValidityMatcher}
          >
            {messages[key as ValidityMatcher]}
          </Form.Message>
        ))}
      </div>
      <Form.Control
        type={type}
        required={required}
        pattern={pattern}
        value={value}
        onChange={onChange}
        className="bg-neutral-200 dark:bg-zinc-600 rounded px-4 py-2 focus:outline-none disabled:text-neutral-400 dark:disabled:text-zinc-400"
        autoComplete="off"
        disabled={disabled}
      />
    </Form.Field>
  );
}

export default memo(Field);
