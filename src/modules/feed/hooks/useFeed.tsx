import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchGuardianAPI, fetchNewsAPI, fetchNYTAPI } from "../api/feed";
import { FeedApiData, FetchFeedFilterOptions } from "../types";

interface Page {
  data: FeedApiData[];
  previousCursor?: number;
  nextCursor?: number;
}

export const useFeed = ({ searchQuery, categories, sources, date }: FetchFeedFilterOptions) => {
  return useInfiniteQuery({
    queryKey: ["news", searchQuery, categories, sources, date?.from, date?.to],
    queryFn: async ({ pageParam }) => {
      const [newsApiData, guardianApiData, newYorkTimesApiData] = await Promise.all([
        fetchNewsAPI({ pageParam, searchQuery, categories, sources, date }),
        fetchGuardianAPI({ pageParam, searchQuery, categories, sources, date }),
        fetchNYTAPI({ pageParam, searchQuery, categories, sources, date }),
      ]);

      const sorted = sortCombineDataByDate(newsApiData, guardianApiData, newYorkTimesApiData);

      return {
        data: sorted,
        nextCursor: ++pageParam,
      };
    },
    getNextPageParam: (lastPage: Page) => lastPage.nextCursor,
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
};

const sortCombineDataByDate = (
  newsApiData: FeedApiData[],
  guardianApiData: FeedApiData[],
  newYorkTimesApiData: FeedApiData[]
) => {
  const sorted = [...newsApiData, ...guardianApiData, ...newYorkTimesApiData].sort((a, b) => {
    const aTime = new Date(a.publishedAt);
    const bTime = new Date(b.publishedAt);
    return bTime.getTime() - aTime.getTime();
  });

  return sorted;
};
