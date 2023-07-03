import * as Form from '@radix-ui/react-form';
import * as RadixSwitch from '@radix-ui/react-switch';
import { memo } from 'react';

interface SwitchProps {
  name: string;
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

function Switch({ name, label, value, onChange }: SwitchProps) {
  return (
    <Form.Field name={name} className="grid mb-2">
      <div className="flex items-baseline justify-between">
        <Form.Label className="font-medium leading-8">{label}</Form.Label>
      </div>
      <RadixSwitch.Root
        className="w-[42px] h-[25px] bg-black rounded-full relative outline-none cursor-pointer"
        checked={value}
        onCheckedChange={onChange}
      >
        <RadixSwitch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </RadixSwitch.Root>
    </Form.Field>
  );
}

export default memo(Switch);
