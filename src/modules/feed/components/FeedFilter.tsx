import { CATEGORIES_LIST, SOURCE_LIST } from "../constants";
import { useFormContext, UseFormReturn, useWatch } from "react-hook-form";
import SearchPanel from "@/modules/common/components/SearchPanel";
import { Author, FeedApiData, FetchFeedFilterOptions } from "../types";
import { ReactNode, useEffect, useState } from "react";

interface FeedFilterProps {
  showFilter: boolean;
  handleCloseFilter?: VoidFunction;
  filterResults?: FeedApiData[];
}

export default function FeedFilter({ showFilter, filterResults }: FeedFilterProps) {
  const [validAuthors, setValidAuthors] = useState<FieldList[]>([]);
  const methods = useFormContext<FetchFeedFilterOptions>();

  useEffect(() => {
    if (filterResults) {
      const authors = getValidAuthors(filterResults);
      setValidAuthors(authors);
    }
  }, [filterResults]);

  return (
    <section
      id="feed-filter"
      tabIndex={1}
      autoFocus
      className={`${showFilter ? "block" : "hidden"}`}
    >
      <div className="bg h-screen w-80 pt-10 bg-white md:border-r border-gray-200 flex flex-col items-center md:overflow-y-scroll ">
        <div className="px-4">
          <SearchPanel />
        </div>
        <div className="space-y-4">
          <ActionButtons />
          <FilterList
            methods={methods}
            fieldName="sources"
            fieldList={SOURCE_LIST}
            listTitle="Select News Source"
          />
          <FilterList
            methods={methods}
            fieldName="categories"
            fieldList={CATEGORIES_LIST}
            listTitle="Select Categories"
          />
          <FilterList
            methods={methods}
            fieldName="authors"
            fieldList={validAuthors.slice(0, 20)}
            listTitle="Select Authors"
          />
        </div>
      </div>
    </section>
  );
}

interface FieldList {
  name: string;
  code: string;
  icon: ReactNode;
}
interface FilterListProps {
  listTitle: string;
  methods: UseFormReturn<FetchFeedFilterOptions>;
  fieldName: "sources" | "categories" | "authors";
  fieldList: FieldList[];
}
const FilterList = ({ listTitle, methods, fieldName, fieldList }: FilterListProps) => {
  const fieldData = useWatch({ name: fieldName, control: methods.control });
  const handleToggleSource = (code: string) => {
    const isSaved = fieldData?.find((s) => s === code);
    if (isSaved) {
      methods.setValue(
        fieldName,
        fieldData?.filter((s) => s !== code)
      );
    } else {
      methods.setValue(fieldName, [...(fieldData ?? []), code]);
    }
  };

  return (
    <section className="space-y-1 mb-4">
      <h2 className="mb-4 text-xl font-semibold">{listTitle}</h2>
      {fieldList.map((s) => (
        <div
          key={s.code}
          onClick={() => handleToggleSource(s.code)}
          className={`cursor-pointer p-2 rounded-xl flex items-center gap-2 ${
            fieldData?.includes(s.code) ? "bg-primary-light/40" : ""
          }`}
        >
          {s.icon}
          {s.name}
        </div>
      ))}
    </section>
  );
};

const ActionButtons = () => {
  const methods = useFormContext<FetchFeedFilterOptions>();
  const [sources, categories, authors] = useWatch({
    name: ["sources", "categories", "authors"],
    control: methods.control,
  });

  const hasSelection = [...(sources ?? []), ...(categories ?? []), ...(authors ?? [])].length > 0;
  const stringifiedData = JSON.stringify({ authors, categories, sources });
  const savedPreferences = localStorage.getItem("loopFeedPreferences");

  const handleSavePreferences = () => {
    localStorage.setItem("loopFeedPreferences", stringifiedData);
    window.location.reload();
  };

  const handleClearPreferences = () => {
    localStorage.removeItem("loopFeedPreferences");
    window.location.reload();
  };

  const buttonStyle =
    "py-1 cursor-pointer border border-gray-300 w-full rounded-lg hover:bg-primary-light";

  if (!hasSelection) return null;

  return (
    <section className="flex  flex-col items-center w-full gap-2">
      {stringifiedData !== savedPreferences ? (
        <button className={buttonStyle} onClick={handleSavePreferences}>
          Save
        </button>
      ) : null}

      <button className={buttonStyle} onClick={handleClearPreferences}>
        Clear
      </button>
    </section>
  );
};

const getValidAuthors = (data: FeedApiData[]) => {
  const authorMap = data
    .map((s) => s.authors)
    .filter((a) => !!a && (a as string) !== "Unknown Author")
    .flatMap((p) => p as Author[]);

  const uniqueValues = new Set(authorMap.map((p) => p.name));
  return Array.from(uniqueValues).map((n) => ({ name: n, code: n, icon: "" }));
};
