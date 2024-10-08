import { useFieldArray } from 'react-hook-form';
import { randomPicture } from '@/lib/utils';
import GroupMemberNameInput from '@/components/group-member-name-input';

type CreateGroupMemberButtonProps = { memberIndex: number };

export default function CreateGroupMemberButton(
  props: Readonly<CreateGroupMemberButtonProps>
) {
  const { append } = useFieldArray({ name: 'members' });

  function handleGroupMemberAdd(value: string) {
    append({ name: value, avatar: randomPicture() }, {});
  }

  return (
    <GroupMemberNameInput
      sheetTitle={`成員${props.memberIndex + 1}`}
      sheetTrigger='新增成員'
      value={`成員${props.memberIndex + 1}`}
      onSave={handleGroupMemberAdd}
    />
  );
}
