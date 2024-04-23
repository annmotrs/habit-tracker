import DayState from '@/components/DayState';
import Link from 'next/link';
import { kv } from '@vercel/kv';

type HabitSchedule = { [habit: string]: Record<string, boolean> } | null;

export default async function Home() {
  const habits: HabitSchedule = (await kv.hgetall(
    'habits'
  )) as HabitSchedule | null;
  const today = new Date();
  const todayWeekday = today.getDay();
  const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
  const sortedWeekDays = weekDays
    .slice(todayWeekday)
    .concat(weekDays.slice(0, todayWeekday));
  const last7Days = weekDays
    .map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - index);
      return date;
    })
    .reverse();
  const currentDate = new Date().toLocaleDateString('ru', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="container relative flex flex-col gap-8 px-4 pt-16 pb-6">
      <div className="self-start border-2 border-dashed border-[#FDD47A] p-2">
        <div className="text-xl dark:text-white">Сегодня</div>
        <div className="font-medium dark:text-white">{currentDate}</div>
      </div>

      {habits === null ||
        (Object.keys(habits).length === 0 && (
          <h1 className="mt-20 text-4xl font-display text-center dark:text-white">
            Ничего не добавлено
          </h1>
        ))}

      {habits !== null &&
        Object.entries(habits).map(([habit, habitTime]) => (
          <div
            key={habit}
            className="flex flex-col gap-2 bg-white rounded-md shadow-md dark:bg-slate-800"
          >
            <Link href={`habit/${habit}`} className="p-2">
              <span className="text-xl font-medium font-sans dark:text-white">
                {habit}
              </span>

              <section className="grid grid-cols-7 p-2">
                {sortedWeekDays.map((day, index) => (
                  <div key={day} className="flex flex-col gap-1.5">
                    <span className="font-sans text-center text-xs text-gray-900 dark:text-gray-300">
                      {day}
                    </span>
                    <DayState
                      status={
                        habitTime[last7Days[index].toISOString().slice(0, 10)]
                      }
                      day={last7Days[index].getDate()}
                    />
                  </div>
                ))}
              </section>
            </Link>
          </div>
        ))}
      <Link
        href="new-habit"
        className="self-end p-2 text-neutral-900 bg-[#FDD47A] shadow-sm font-display font-regular text-xl rounded-md duration-700 hover:bg-[#ffc547]"
      >
        + Добавить привычку
      </Link>
    </main>
  );
}
