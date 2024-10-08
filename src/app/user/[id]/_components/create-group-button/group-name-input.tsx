import { useFormContext } from 'react-hook-form';

export default function GroupNameInput() {
  const { register } = useFormContext();

  return (
    <div className='flex flex-col top-0 flex-1 justify-between'>
      <label className='text-sm text-brand-neutral-70'>群組名稱</label>
      <input
        className='border-b border-foreground outline-none p-2'
        {...register('name', { pattern: /^(?!\s*$).+/ })}
      />
    </div>
  );
}
