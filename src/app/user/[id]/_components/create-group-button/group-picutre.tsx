import Image from "next/image";
import { ChevronLeftIcon, CheckIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CameraIcon } from "@/components/ui/icons";

type GroupPicutreProps = {
  picture: string;
  onGroupPictureChange: (url: string) => void;
};

export default function GroupPicutre(props: Readonly<GroupPicutreProps>) {
  const { picture, onGroupPictureChange } = props;

  function getUrl(index: number) {
    return `/images/example-${index + 1}.png`;
  }

  function handlePictureClick(index: number) {
    return () => onGroupPictureChange(getUrl(index));
  }

  return (
    <div className="relative h-[72px] w-[72px]">
      <Image src={picture} className="rounded-[20px]" fill alt="group-cover" />
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="flex-center absolute -bottom-1 -right-1 h-[28px] w-[28px] rounded-full bg-background shadow"
            type="button"
          >
            <CameraIcon width={22} />
          </button>
        </SheetTrigger>
        <SheetContent
          className="flex w-screen flex-col gap-0 border-0 p-0"
          aria-describedby={undefined}
        >
          <SheetTitle className="flex-center w-full bg-primary px-6 py-[18px] font-normal text-primary-foreground">
            群組圖片
            <SheetClose className="absolute left-0 px-[inherit]">
              <ChevronLeftIcon />
            </SheetClose>
          </SheetTitle>
          <ul className="grid-row-5 grid h-[166vw] grid-cols-3">
            {new Array(15).fill(null).map((item, index) => (
              <li
                key={index}
                className="relative"
                onClick={handlePictureClick(index)}
              >
                <Image src={getUrl(index)} fill alt="group-cover" />
                {picture === getUrl(index) && (
                  <div className="flex-center absolute h-full w-full bg-primary/50">
                    <CheckIcon
                      className="stroke-primary-foreground"
                      size={36}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
}
