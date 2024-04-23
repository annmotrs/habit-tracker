'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function UpdateButton({ habit }: { habit: string }) {
  return (
    <Link
      href={`/update-habit/${habit}`}
      className="bg-[#FDD47A] rounded-md p-1 duration-700 hover:bg-[#ffc547]"
    >
      <Image
        src="/images/edit.svg"
        width={32}
        height={32}
        alt="Icon edit mark"
      />
    </Link>
  );
}
