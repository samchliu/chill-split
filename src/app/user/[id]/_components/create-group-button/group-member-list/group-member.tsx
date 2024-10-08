import { Trash2Icon } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import Avatar from '@/components/avatar';
import GroupMemberNameInput from '@/components/group-member-name-input';
import { CreateGroupForm } from '../create-group-button';

type GroupMemberProps = {
  member: CreateGroupForm['members'][0];
  memberIndex: number;
};

export default function GroupMember(props: Readonly<GroupMemberProps>) {
  const { member, memberIndex } = props;
  const { update, remove } = useFieldArray({ name: 'members' });
  const sheetTitle = `成員${memberIndex + 2}`;

  function handleMemberNameChange(value: string) {
    update(memberIndex, { ...member, name: value });
  }

  function handleMemberRemove() {
    remove(memberIndex);
  }

  return (
    <>
      <Avatar src={member.avatar} />
      <GroupMemberNameInput
        sheetTitle={sheetTitle}
        sheetTrigger={member.name}
        value={member.name}
        onSave={handleMemberNameChange}
      />
      <Trash2Icon size={18} strokeWidth={1.5} onClick={handleMemberRemove} />
    </>
  );
}
