export interface FetchFeedFilterOptions {
  pageParam?: number;
  searchQuery?: string;
  categories?: string[];
  sources?: string[];
  authors?: string[];
  date?: {
    from: string;
    to: string;
  };
}

export type ApiSource = "theGuardian" | "newsApi" | "newYorkTimes";

export interface Author {
  name: string;
  domain: string;
}

export interface FeedApiData {
  title: string;
  url: string;
  source: string;
  apiSource: ApiSource;
  publishedAt: string;
  description: string;
  authors: string | Author[];
  imgUrl: string;
}

interface FeedDataCombinedStatusItem {
  page: number;
  pending: FeedApiData[];
}

interface FeedDataCombinedStatus {
  newsApi: FeedDataCombinedStatusItem;
  theGuardian: FeedDataCombinedStatusItem;
  newYorkTimes: FeedDataCombinedStatusItem;
}
