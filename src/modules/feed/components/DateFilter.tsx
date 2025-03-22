import CalendarIcon from "@/assets/icons/calendar.icon";
import ChevronDownIcon from "@/assets/icons/chevron.icon";
import { addDays, differenceInDays, format } from "date-fns";
import { useState, useRef, useEffect } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";

export default function DateFilter({ methods }: { methods: UseFormReturn<any> }) {
  const [isOpened, setIsOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selectedRange = useWatch({ control: methods.control, name: "date" });

  useEffect(() => {
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  function onClick(e: MouseEvent) {
    // This is a hack to get the latest state
    if (!ref || !ref.current) return;
    const isOpened = (ref.current as any).getAttribute("data-state");

    if (!isOpened) return;

    const isWithin = (e.target as any).closest("#sortbydate-selector");

    if (!isWithin) {
      setIsOpened(false);
    }
  }

  const DATES = [
    { from: addDays(new Date(), 0), name: "Today", to: new Date() },
    { from: addDays(new Date(), -7), name: "One Week", to: new Date() },
    { from: addDays(new Date(), -30), name: "One Month", to: new Date() },
    { from: addDays(new Date(), -90), name: "One Quarter", to: new Date() },
    { from: addDays(new Date(), -365), name: "One Year", to: new Date() },
  ];

  function toggleDatePanel() {
    setIsOpened(!isOpened);
  }

  function setDate(from: Date, to: Date) {
    methods.setValue("date", {
      from: format(from, "yyyy-MM-dd"),
      to: format(to, "yyyy-MM-dd"),
    });
  }

  const currentDate = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="relative min-w-46" ref={ref} id="sortbydate-selector" data-state={isOpened}>
      <button
        onClick={toggleDatePanel}
        className="border w-full border-gray-300 rounded-md text-sm px-4 py-2 bg-white flex justify-between items-center gap-3"
      >
        <CalendarIcon className="h-5 w-5" />
        <DateName methods={methods} />
        <ChevronDownIcon className="h-5 w-5" />
      </button>

      {isOpened && (
        <section className="flex flex-col absolute text-sm z-50 bg-white text-gray-500 top-11 w-full shadow-lg">
          {DATES.map((d) => (
            <button
              key={d.name}
              type="button"
              className="border-b py-2 hover:bg-gray-200  cursor-pointer"
              onClick={() => {
                setDate(d.from, d.to);
                setIsOpened(false);
              }}
            >
              {d.name}
            </button>
          ))}

          <button type="button" className="border-b py-2  hover:bg-gray-200 cursor-pointer">
            Custom Range
          </button>

          <section className="bg-white shadow-md p-5 z-50 space-y-4">
            <div>
              <label className="block">From</label>
              <input
                type="date"
                max={selectedRange?.to ?? currentDate}
                {...methods.register("date.from")}
                placeholder="From"
                className="py-2 px-4 text-gray-700 border"
              />
            </div>

            <div>
              <label className="block">To</label>
              <input
                type="date"
                min={selectedRange?.from ?? ""}
                max={currentDate}
                {...methods.register("date.to")}
                placeholder="From"
                className="py-2 px-4 text-gray-700 border"
              />
            </div>
          </section>
        </section>
      )}
    </div>
  );
}

function DateName({ methods }: { methods: UseFormReturn<any> }) {
  const [date] = useWatch({ control: methods.control, name: ["date"] });
  const difference = differenceInDays(new Date(date.to), new Date(date.from));

  switch (difference) {
    case 0:
      return "Today";

    case 7:
      return "One Week";

    case 30:
      return "One Month";

    case 90:
      return "One Quarter";

    case 365:
      return "One Year";

    default:
      return (
        <span>
          {date.from} - {date.to}
        </span>
      );
  }
}
