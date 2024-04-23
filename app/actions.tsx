'use server';

import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type ToggleHabitParams = {
  habit: string;
  habitTime: Record<string, boolean> | null;
  date: string | null;
  done: boolean;
};

export async function toggleHabit({
  habit,
  habitTime,
  date,
  done,
}: ToggleHabitParams) {
  if (!habitTime || !date || new Date(date) > new Date()) {
    return;
  }

  const updatedHabitTime = {
    [habit]: { ...habitTime, [date]: done === undefined ? true : !done },
  };

  await kv.hset('habits', updatedHabitTime);
  revalidatePath('/habit/[habit]', 'page');
  revalidatePath('/');
}

export async function deleteHabit(habit: string) {
  await kv.hdel('habits', habit);
  revalidatePath('/');
  redirect('/');
}

export async function updateHabit(formData: FormData) {
  const newHabit = formData.get('newHabit');
  const oldHabit = formData.get('oldHabit');

  const habitTime: Record<string, boolean> | null = await kv.hget(
    'habits',
    oldHabit as string
  );
  await kv.hdel('habits', oldHabit as string);
  await kv.hset('habits', { [newHabit as string]: { ...habitTime } });
  revalidatePath('/');
  redirect(`/habit/${encodeURI(newHabit as string)}`);
}
