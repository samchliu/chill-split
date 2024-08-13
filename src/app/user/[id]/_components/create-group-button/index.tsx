"use client";

import { useState } from "react";
import { createGroup } from "@/action/group";
import { ChevronLeftIcon } from "lucide-react";
import GroupPicutre from "./group-picutre";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CreateGroupIcon, DeleteIcon } from "@/components/ui/icons";
import Image from "next/image";

type Group = {
  name: string;
  picture: string;
  users: {
    name: string;
    picture: string;
  }[];
};

type CreateGroupButtonProps = {
  user: {
    id: string;
    name: string;
    picture: string;
  };
};

const defaultGroup: Group = {
  name: "",
  picture: "/images/example-1.png",
  users: [],
};

export default function CreateGroupButton(
  props: Readonly<CreateGroupButtonProps>,
) {
  const { user } = props;
  const [group, setGroup] = useState<Group>(defaultGroup);
  const [pending, setPending] = useState<string>();

  function handleOpenChange(open: boolean) {
    if (open) return;

    setGroup(defaultGroup);
    setPending(undefined);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const groupData = {
      ...group,
      creatorId: user.id,
    };
    createGroup(groupData);
    setPending("建立群組中...");
  }

  function onGroupPictureChange(url: string) {
    const newGroup = { ...group };
    newGroup.picture = url;
    setGroup(newGroup);
  }

  function handleGroupNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newGroup = { ...group };
    newGroup.name = e.currentTarget.value;
    setGroup(newGroup);
  }

  function handleUserAdd() {
    const newGroup = { ...group };
    newGroup.users.push({
      name: `成員${newGroup.users.length + 2}`,
      picture: `/images/example-${(newGroup.users.length % 15) + 1}.png`,
    });
    setGroup(newGroup);
  }

  function handleUserRemove(index: number) {
    return () => {
      const newGroup = { ...group };
      newGroup.users.splice(index, 1);
      setGroup(newGroup);
    };
  }

  function handleUserNameChange(index: number) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const newGroup = { ...group };
      newGroup.users[index].name = e.currentTarget.value;
      setGroup(newGroup);
    };
  }

  return (
    <Sheet onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <button className="mb-4 flex items-center gap-2" type="button">
          <CreateGroupIcon className="stroke-primary-foreground" />
          新增群組
        </button>
      </SheetTrigger>
      <SheetContent
        className="flex w-screen flex-col gap-0 border-0 p-0"
        aria-describedby={undefined}
      >
        <SheetTitle className="flex-center w-full bg-primary px-6 py-[18px] font-normal text-primary-foreground">
          建立群組
          <SheetClose className="absolute left-0 px-[inherit]">
            <ChevronLeftIcon />
          </SheetClose>
        </SheetTitle>
        <form
          className="flex flex-1 flex-col gap-y-6 p-6"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-x-4">
            <GroupPicutre
              picture={group.picture}
              onGroupPictureChange={onGroupPictureChange}
            />
            <div className="flex flex-1 flex-col justify-between">
              <label className="text-brand-neutral-70" htmlFor="group-name">
                群組名稱
              </label>
              <input
                className="border-b border-foreground leading-loose outline-none"
                name="group-name"
                type="text"
                onChange={handleGroupNameChange}
              />
            </div>
          </div>
          <div className="text-brand-neutral-70">群組成員</div>
          <button
            className="mx-3 flex items-center gap-x-6"
            type="button"
            onClick={handleUserAdd}
          >
            <CreateGroupIcon className="stroke-foreground" />
            新增成員
          </button>
          <ul className="flex flex-1 flex-col gap-y-3">
            <li className="flex items-center gap-x-4">
              <Image
                className="rounded-full"
                src={user.picture}
                width={45}
                height={45}
                alt="user-avatar"
              />
              <div className="flex-1 truncate">{user.name}</div>
              <div className="text-brand-neutral-70">管理員</div>
            </li>
            {group.users.map((item, index) => (
              <li key={index} className="flex items-center gap-x-3.5">
                <Image
                  className="rounded-full"
                  src={item.picture}
                  width={45}
                  height={45}
                  alt="user-avatar"
                />
                <input
                  className="flex-1 truncate outline-none"
                  name="member-name"
                  value={item.name}
                  type="text"
                  onChange={handleUserNameChange(index)}
                />
                <button
                  className="flex-center w-12"
                  type="button"
                  onClick={handleUserRemove(index)}
                >
                  <DeleteIcon />
                </button>
              </li>
            ))}
          </ul>
          <Button type="submit" size="lg" pending={pending}>
            儲存
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
