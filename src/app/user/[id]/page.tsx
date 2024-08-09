import { getUserById } from "@/action/user";
import CreateGroupButton from "./_components/create-group-button";
import GroupCard from "./_components/group-card";

export default async function UserPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const user = await getUserById(params.id);

  return (
    <main className="h-full bg-primary px-6 text-primary-foreground">
      <h1 className="py-7 text-center text-2xl font-semibold">群組列表</h1>
      <CreateGroupButton user={user}/>
      <ul className="flex flex-col gap-4">
        {user.groups.map((group) => (
          <GroupCard key={group.id} {...group} />
        ))}
      </ul>
    </main>
  );
}
