import Image from "next/image";
import { ShareIcon } from "@/components/ui/icons";
import Link from "next/link";

type GroupCardProps = {
  id: string;
  name: string;
  picture: string;
};

export default function GroupCard(props: Readonly<GroupCardProps>) {
  const { id, name, picture } = props;
  return (
    <li className="h-[72px] rounded-[20px] bg-background px-3 text-foreground">
      <Link
        className="flex h-full items-center justify-between gap-4"
        href={`/group/${id}`}
      >
        <Image
          className="rounded-full"
          src={picture}
          width={60}
          height={60}
          alt="group-cover"
        />
        <div className="flex-1 truncate">{name}</div>
        <button className="flex-center h-[30px] w-[30px] rounded-full bg-brand-yellow">
          <ShareIcon width={18} height={18} />
        </button>
      </Link>
    </li>
  );
}
