import * as Form from '@radix-ui/react-form';
import * as RadixSelect from '@radix-ui/react-select';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, memo } from 'react';
import { FaCheck, FaChevronDown } from 'react-icons/fa';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

interface SelectProps {
  name: string;
  label: string;
  placeholder: string;
  options: SelectOption[] | SelectOptionGroup[];
  value: string;
  onChange: (value: string) => void;
}

function Select({
  name,
  label,
  placeholder,
  options,
  value,
  onChange,
}: SelectProps) {
  return (
    <Form.Field name={name} className="grid mb-2">
      <div className="flex items-baseline justify-between">
        <Form.Label className="font-medium leading-8">{label}</Form.Label>
      </div>
      <RadixSelect.Root value={value} onValueChange={onChange}>
        <RadixSelect.Trigger
          className="flex items-center justify-center rounded px-4 py-2 bg-neutral-200 dark:bg-zinc-600 outline-none"
          aria-label={label}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className="ml-2">
            <FaChevronDown />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Content
          position="popper"
          sideOffset={10}
          className="overflow-hidden rounded-md bg-neutral-200 dark:bg-zinc-600 w-[--radix-select-trigger-width]"
        >
          <RadixSelect.Viewport className="p-[5px]">
            {options.map((optionOrGroup, index) => {
              if ('options' in optionOrGroup) {
                return (
                  <>
                    <RadixSelect.Group key={optionOrGroup.label}>
                      <RadixSelect.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                        {optionOrGroup.label}
                      </RadixSelect.Label>
                      {optionOrGroup.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </RadixSelect.Group>
                    {index !== options.length - 1 && (
                      <RadixSelect.Separator className="border-t border-mauve4" />
                    )}
                  </>
                );
              } else {
                return (
                  <SelectItem
                    key={optionOrGroup.value}
                    value={optionOrGroup.value}
                  >
                    {optionOrGroup.label}
                  </SelectItem>
                );
              }
            })}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Root>
    </Form.Field>
  );
}

interface SelectItemProps extends RadixSelect.SelectItemProps {}

const SelectItem = forwardRef(
  (
    { children, className, ...props }: SelectItemProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <RadixSelect.Item
        className={clsx(
          'text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1',
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
        <RadixSelect.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <FaCheck />
        </RadixSelect.ItemIndicator>
      </RadixSelect.Item>
    );
  },
);

export default memo(Select);
