import { LoaderCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ComponentPropsWithRef<"button"> & {
  size?: "lg" | "sm";
  variant?: "destructive" | "secondary" | "neutral";
  pending?: string;
};

export function Button({
  size,
  variant,
  pending,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button
      {...props}
      className={cn(
        "flex-center h-9 gap-x-2 rounded-full bg-brand-green text-foreground",
        size === "lg" && "h-[54px]",
        size === "sm" && "h-9 text-sm",
        variant === "destructive" && "bg-brand-pink",
        variant === "secondary" && "bg-brand-yellow",
        variant === "neutral" && "bg-brand-neutral-20",
        props.className,
      )}
    >
      {pending ? (
        <>
          <LoaderCircleIcon className="animate-spin stroke-foreground" />
          {pending}
        </>
      ) : (
        props.children
      )}
    </button>
  );
}
