import Image from 'next/image';

type AvatarProps = { src: string };

export default function Avatar(props: Readonly<AvatarProps>) {
  return (
    <Image
      className='rounded-full'
      src={props.src}
      width={45}
      height={45}
      alt='avatar'
    />
  );
}
