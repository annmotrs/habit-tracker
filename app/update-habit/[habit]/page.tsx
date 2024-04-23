'use client';
import Link from 'next/link';
import { updateHabit } from '@/app/actions';
import { useState } from 'react';

export default function UpdateHabit({
  params: { habit },
}: {
  params: { habit: string };
}) {
  const decodedHabit = decodeURI(habit);
  const [newHabit, setNewHabit] = useState(decodedHabit);

  return (
    <main className="container relative flex flex-col gap-8 px-12 pt-16">
      <h1 className="text-4xl text-center font-display dark:text-white">
        Изменение названия:
      </h1>
      <form className="flex flex-col gap-4 mt-4" action={updateHabit}>
        <input
          type="text"
          name="newHabit"
          id="newHabit"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          required
          className="p-2 font-sans text-xl shadow-sm outline-none rounded-md bg-white border border-neutral-200 focus:border-[#FDD47A] dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:focus:border-[#FDD47A]"
        />
        <input type="hidden" name="oldHabit" value={decodedHabit} />
        <div className="flex justify-center items-center gap-4 flex-wrap mt-8">
          <button
            type="submit"
            className="text-neutral-900 bg-green-300 font-display font-regular text-2xl p-2 rounded-md w-40 duration-700 hover:bg-green-400"
          >
            Сохранить
          </button>
          <Link
            href={`/habit/${decodedHabit}`}
            className="inline-block text-center text-neutral-900 bg-red-300 font-display font-regular text-2xl p-2 rounded-md w-40 duration-700 hover:bg-red-400"
          >
            Отмена
          </Link>
        </div>
      </form>
    </main>
  );
}
