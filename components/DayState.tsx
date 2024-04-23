export default function DayState({
  status,
  day,
}: {
  status: boolean | undefined;
  day: number;
}) {
  return (
    <div className="flex items-center justify-center h-9">
      <div
        className={`flex relative justify-center items-center w-8 h-8 rounded-full ${
          status === true
            ? 'bg-green-300'
            : status === false
            ? 'bg-red-300'
            : 'bg-gray-100'
        }`}
      >
        {day}
        {status === false && (
          <div className="absolute w-4 h-4 bg-red-300 rounded-full bottom-5 left-5 before:content-[''] before:absolute before:h-3 before:w-0.5 before:bg-white before:top-0.5 before:left-2 before:-translate-x-1/2 before:-rotate-45 before:rounded-lg after:content-[''] after:absolute after:h-3 after:w-0.5 after:bg-white after:top-0.5 after:left-2 after:-translate-x-1/2 after:rotate-45 after:rounded-lg"></div>
        )}
        {status === true && (
          <div className="absolute w-4 h-4 bg-green-300 rounded-full bottom-5 left-5 text-xs flex justify-center items-center text-white">
            ✔
          </div>
        )}
      </div>
    </div>
  );
}
