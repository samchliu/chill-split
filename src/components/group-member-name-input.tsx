import { forwardRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { TextField } from '@/components/ui/text-field';

type GroupMemberNameInputProps = React.ComponentPropsWithoutRef<'input'> & {
  sheetTitle: React.ReactNode;
  sheetTrigger: React.ReactNode;
  onSave: (value: string) => void;
};

const GroupMemberNameInput = forwardRef<
  HTMLInputElement,
  GroupMemberNameInputProps
>(({ value, sheetTitle, sheetTrigger, onSave, ...props }, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>(value ? String(value) : '');

  function handleOpenChange(open: boolean) {
    setName(value ? String(value) : '');
    setOpen(open);
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleSave(e: React.MouseEvent<HTMLButtonElement>) {
    // if (/^(?!\s*$).+/.test(name) === false) return;
    onSave(name);
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger className='text-left w-full'>{sheetTrigger}</SheetTrigger>
      <SheetContent className='bg-primary/75'>
        <SheetHeader>
          <SheetTitle>{sheetTitle}</SheetTitle>
          <SheetClose>取消</SheetClose>
        </SheetHeader>
        <div className='p-6 pt-[52px] flex-1 flex flex-col justify-between h-full'>
          <TextField
            {...props}
            ref={ref}
            value={name}
            color='primary'
            maxLength={20}
            placeholder='請輸入成員名稱'
            onChange={handleNameChange}
          />
          <Button
            size='full'
            disabled={/^(?!\s*$).+/.test(name) === false}
            onClick={handleSave}
          >
            儲存
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
});
export default GroupMemberNameInput;
