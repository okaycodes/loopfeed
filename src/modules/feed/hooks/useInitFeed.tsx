import { format } from "date-fns";

import { useFeed } from "@/modules/feed/hooks/useFeed";
import { FetchFeedFilterOptions } from "@/modules/feed/types";
import { useForm, useWatch } from "react-hook-form";

export default function useInitFeed() {
  const userPreferences = localStorage.getItem("loopFeedPreferences");

  const methods = useForm<FetchFeedFilterOptions>({
    defaultValues: {
      sources: [],
      categories: [],
      authors: [],
      ...JSON.parse(userPreferences ?? "{}"),
      date: {
        from: format(new Date(), "yyyy-MM-dd"),
        to: format(new Date(), "yyyy-MM-dd"),
      },
    },
  });

  const [sources, categories, searchQuery, date, authors] = useWatch({
    name: ["sources", "categories", "searchQuery", "date", "authors"],
    control: methods.control,
  });

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useFeed({
    sources,
    categories,
    searchQuery,
    date,
    authors,
  });

  return { methods, authors, data, hasNextPage, isFetchingNextPage, fetchNextPage };
}
