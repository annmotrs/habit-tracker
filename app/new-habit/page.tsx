import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function NewHabit() {
  async function newHabit(formData: FormData) {
    'use server';
    const habit = formData.get('habit');
    await kv.hset('habits', { [habit as string]: {} });
    revalidatePath('/');
    redirect('/');
  }

  return (
    <main className="container relative flex flex-col gap-8 px-12 pt-16">
      <h1 className="text-4xl text-center font-display dark:text-white">
        Новая привычка:
      </h1>
      <form className="flex flex-col gap-4 mt-4" action={newHabit}>
        <input
          type="text"
          name="habit"
          id="habit"
          required
          placeholder="Введите привычку"
          className="p-2 font-sans text-xl shadow-sm outline-none rounded-md bg-white border border-neutral-200 focus:border-[#FDD47A] dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:focus:border-[#FDD47A]"
        />
        <div className="flex justify-center items-center gap-4 flex-wrap mt-8">
          <button
            type="submit"
            className="text-neutral-900 bg-green-300 font-display font-regular text-2xl p-2 rounded-md w-40 duration-700 hover:bg-green-400"
          >
            Сохранить
          </button>
          <Link
            href="/"
            className="inline-block text-center text-neutral-900 bg-red-300 font-display font-regular text-2xl p-2 rounded-md w-40 duration-700 hover:bg-red-400"
          >
            Отмена
          </Link>
        </div>
      </form>
    </main>
  );
}
