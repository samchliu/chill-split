import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { CameraIcon, ChevronLeftIcon, CheckIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import React from 'react';
import { cn } from '@/lib/utils';

export default function GroupPictureSelect() {
  const { watch, setValue } = useFormContext();
  const selectedPicture = watch('picture');

  function handlePictureSelect(url: string) {
    return (e: React.MouseEvent) => setValue('picture', url);
  }

  return (
    <Sheet>
      <SheetTrigger className='relative'>
        <Image
          className='rounded-[20px]'
          src={selectedPicture}
          alt='group-picture'
          width={72}
          height={72}
        />
        <div className='flex items-center justify-center h-[28px] w-[28px] absolute bg-background rounded-full shadow -right-0.5 -bottom-0.5'>
          <CameraIcon size={15} />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>群組圖片</SheetTitle>
          <SheetClose side='left'>
            <ChevronLeftIcon />
          </SheetClose>
        </SheetHeader>
        <ul className='grid grid-cols-3'>
          {Array(15)
            .fill(null)
            .map((item, index) => {
              const url = `/images/example-${index + 1}.svg`;
              const isSelected = selectedPicture === url;
              return (
                <li key={index} className='flex justify-center items-center'>
                  <Image
                    className={cn(isSelected && 'brightness-50')}
                    src={url}
                    alt={`group-picture-${index + 1}`}
                    width={256}
                    height={256}
                    onClick={handlePictureSelect(url)}
                  />
                  {isSelected && (
                    <CheckIcon
                      className='absolute stroke-primary-foreground'
                      size={36}
                    />
                  )}
                </li>
              );
            })}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
