import { useWatch } from 'react-hook-form';
import CreateGroupMemberButton from './create-group-member-button';
import { CreateGroupForm } from '../create-group-button';
import Avatar from '@/components/avatar';
import GroupMember from './group-member';

type GroupMemberListProps = { user: { name: string; avatar: string } };

export default function GroupMemberList(props: Readonly<GroupMemberListProps>) {
  const members: CreateGroupForm['members'] = useWatch({ name: 'members' });

  return (
    <div className='space-y-6'>
      <label className='block text-sm text-brand-neutral-70'>群組成員</label>
      <CreateGroupMemberButton memberIndex={members.length + 1}/>
      <div className='grid grid-cols-[max-content_auto_max-content] gap-x-3 gap-y-4 place-items-center'>
        <>
          <Avatar src={props.user.avatar} />
          <div className='w-full'>{props.user.name}</div>
          <div className='text-sm text-brand-neutral-70'>管理員</div>
        </>
        {members.map((member, index) => (
          <GroupMember key={index} member={member} memberIndex={index} />
        ))}
      </div>
    </div>
  );
}
