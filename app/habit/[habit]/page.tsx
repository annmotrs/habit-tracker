import { kv } from '@vercel/kv';
import Link from 'next/link';
import Calendar from '../../../components/Сalendar';
import DeleteButton from '../../../components/DeleteButton';
import UpdateButton from '../../../components/UpdateButton';

export default async function Habit({
  params: { habit },
}: {
  params: { habit: string };
}) {
  const decodedHabit = decodeURI(habit);
  const habitTime: Record<string, boolean> | null = await kv.hget(
    'habits',
    decodedHabit
  );

  function sortDates(habitTime: Record<string, boolean>) {
    let datesOfActivity: string[] = [];
    for (let [date, status] of Object.entries(habitTime)) {
      if (status === true) {
        datesOfActivity.push(date);
      }
    }
    return datesOfActivity.sort((a, b) => (new Date(a) > new Date(b) ? 1 : -1));
  }

  function findMaxStreak(habitTime: Record<string, boolean> | null) {
    if (habitTime === null) {
      return null;
    }
    const datesOfActivity = sortDates(habitTime);
    if (datesOfActivity.length === 0) {
      return 0;
    }
    let maxStreak = 1;
    let currentStreak = 1;
    for (let i = 0; i < datesOfActivity.length - 1; i++) {
      const nextData = new Date(datesOfActivity[i + 1]);
      if (
        nextData.setDate(nextData.getDate() - 1) ===
        +new Date(datesOfActivity[i])
      ) {
        currentStreak += 1;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }

    return maxStreak;
  }

  function findCurrentStreak(habitTime: Record<string, boolean> | null) {
    if (habitTime === null) {
      return null;
    }
    const datesOfActivity = sortDates(habitTime);
    if (datesOfActivity.length === 0) {
      return 0;
    }

    let today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const lastDate: number = +new Date(
      datesOfActivity[datesOfActivity.length - 1]
    );
    if (
      lastDate !== +today &&
      lastDate !== today.setDate(today.getDate() - 1)
    ) {
      return 0;
    }

    let currentStreak = 1;
    for (let i = datesOfActivity.length - 1; i > 0; i--) {
      const nextData = new Date(datesOfActivity[i - 1]);
      if (
        nextData.setDate(nextData.getDate() + 1) ===
        +new Date(datesOfActivity[i])
      ) {
        currentStreak += 1;
      } else {
        break;
      }
    }

    return currentStreak;
  }

  return (
    <main className="container relative flex flex-col gap-8 px-12 pt-16">
      <div className="flex items-start justify-between">
        <Link
          href="/"
          className="font-sans text-lg text-[#FDD47A] font-medium underline"
        >
          Назад
        </Link>
        <div className="flex gap-4">
          <UpdateButton habit={habit} />
          <DeleteButton habit={decodedHabit} />
        </div>
      </div>
      <h1 className="text-2xl text-center font-display font-medium dark:text-white">
        {decodedHabit}
      </h1>
      <Calendar habit={decodedHabit} habitTime={habitTime} />
      <div className="mb-6 font-medium">
        <div className="text-lg text-orange-400">
          Кол-во дней без перерыва 🔥
        </div>
        <div className="text-xl dark:text-white">
          Максимальное:{' '}
          <span className="font-bold text-orange-400">
            {findMaxStreak(habitTime)}
          </span>
        </div>
        <div className="text-xl dark:text-white">
          Текущее:{' '}
          <span className="font-bold text-orange-400">
            {findCurrentStreak(habitTime)}
          </span>
        </div>
      </div>
    </main>
  );
}
