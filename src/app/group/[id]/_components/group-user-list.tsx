import Image from "next/image";

type GroupUserListProps = {
  users: {
    id: string;
    picture: string;
  }[];
};

export default function GroupUserList(props: Readonly<GroupUserListProps>) {
  const { users } = props;

  return (
    <ul className="flex-center gap-x-3">
      {users.map((user) => (
        <li key={user.id}>
          <Image
            className="rounded-full"
            src={user.picture}
            width={45}
            height={45}
            alt="user-avatar"
          />
        </li>
      ))}
    </ul>
  );
}
