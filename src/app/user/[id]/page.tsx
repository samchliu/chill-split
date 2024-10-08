import { fetchUser } from './action';
import CreateGroupButton from './_components/create-group-button';

type UserPageProps = { params: { id: string } };

export default async function UserPage(props: Readonly<UserPageProps>) {
  const user = await fetchUser(props.params.id);
  console.log(user);

  return (
    <main className='h-screen bg-primary px-6 text-primary-foreground'>
      <h1 className='py-7 text-center text-2xl font-semibold'>群組列表</h1>
      <CreateGroupButton user={user}/>
      {/* <CreateGroupButton user={user}/> */}
      <ul className='flex flex-col gap-4'>
        {/* {user.groups.map((group) => (
        <GroupCard key={group.id} {...group} />
      ))} */}
      </ul>
    </main>
  );
}
