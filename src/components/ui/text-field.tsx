import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

type TextFieldProps = React.ComponentPropsWithoutRef<'input'> &
  VariantProps<typeof textFieldVariants>;

const textFieldVariants = cva('', {
  variants: {
    color: {
      default: 'border-foreground text-foreground',
      primary: 'border-primary-foreground text-primary-foreground',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ color = 'default', className, value, maxLength, ...props }, ref) => {
    return (
      <div
        className={cn(
          textFieldVariants({ color }),
          'relative border-b flex justify-between items-center',
          value !== undefined &&
            maxLength &&
            'after:content-[attr(data-max-length)] after:text-xs after:opacity-50'
        )}
        data-max-length={`(${String(value)?.length}/${maxLength})`}
      >
        <input
          ref={ref}
          type='text'
          className={cn(
            textFieldVariants({ color }),
            'outline-none flex-1 bg-transparent p-2',
            className
          )}
          value={value}
          maxLength={maxLength}
          {...props}
        />
      </div>
    );
  }
);
