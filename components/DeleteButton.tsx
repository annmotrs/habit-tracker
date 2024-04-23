'use client';
import { deleteHabit } from '@/app/actions';
import Image from 'next/image';

export default function DeleteButton({ habit }: { habit: string }) {
  return (
    <button
      onClick={() => deleteHabit(habit)}
      className="flex items-center justify-center bg-[#FDD47A] rounded-md p-1 duration-700 hover:bg-[#ffc547] w-10 h-10"
    >
      <Image
        src="/images/delete.svg"
        width={24}
        height={24}
        alt="Icon delete mark"
      />
    </button>
  );
}
