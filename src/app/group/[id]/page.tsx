import { getGroupById } from "@/action/group";
import { HomeIcon, SettingIcon, ShareIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import GroupUserList from "./_components/group-user-list";

export default async function GroupPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const group = await getGroupById(params.id);

  return (
    <main className="flex h-full flex-col">
      <div className="flex w-full items-center justify-between bg-primary px-6 py-[18px] font-normal text-primary-foreground">
        <HomeIcon className="stroke-primary-foreground" />
        群組圖片
        <SettingIcon className="stroke-primary-foreground" />
      </div>
      <GroupUserList users={group.users} />
      <div className="border-b"></div>
      <div className="flex-center gap-x-1.5">
        <Button className="w-24 text-sm" size="sm" variant="neutral">
          結餘
        </Button>
        <Button className="w-9" size="sm" variant="neutral">
          <ShareIcon />
        </Button>
        <Button className="w-9" size="sm" variant="neutral">
          <ShareIcon />
        </Button>
      </div>
    </main>
  );
}
