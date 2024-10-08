'use client';

import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import GroupPictureSelect from './group-picture-select';
import GroupNameInput from './group-name-input';
import GroupMemberList from './group-member-list';
import { randomPicture } from '@/lib/utils';
import { createGroup } from '../../action';

export type CreateGroupForm = {
  name: string;
  picture: string;
  adminId: string;
  members: { name: string; avatar: string }[];
};

type CreateGroupButtonProps = {
  user: { id: string; name: string; avatar: string };
};

export default function CreateGroupButton(
  props: Readonly<CreateGroupButtonProps>
) {
  const methods = useForm<CreateGroupForm>({
    defaultValues: {
      name: '未命名的群組',
      picture: randomPicture(),
      adminId: props.user.id,
      members: [],
    },
  });

  const onSubmit: SubmitHandler<CreateGroupForm> = (data) => {
    createGroup(data);
  };

  return (
    <Sheet>
      <SheetTrigger>新增群組</SheetTrigger>
      <SheetContent aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>建立群組</SheetTitle>
          <SheetClose>取消</SheetClose>
        </SheetHeader>
        <FormProvider {...methods}>
          <form
            className='p-6 flex-1 flex flex-col gap-y-4'
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className='flex gap-x-4'>
              <GroupPictureSelect />
              <GroupNameInput />
            </div>
            <GroupMemberList user={props.user} />
            <Button
              className='mt-[auto]'
              size='full'
              // disabled={/^(?!\s*$).+/.test(name) === false}
              // onClick={handleSave}
            >
              儲存
            </Button>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}
