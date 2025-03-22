import { httpClient } from "@/lib/http/httpClient";
import { FeedApiData, FetchFeedFilterOptions } from "../types";
import { DEFUALT_PAGE_SIZE } from "../constants";
import textFormatter from "@/utils/text-formatter";
import { format } from "date-fns";

export const fetchNewsAPI = async ({
  pageParam = 1,
  sources,
  searchQuery,
  categories = [],
  date,
}: FetchFeedFilterOptions): Promise<FeedApiData[]> => {
  let sourceDomains = ["bbc.com", "techcrunch.com", "washingtonpost.com"];

  if (sources && sources.length > 0) {
    sourceDomains = sources.filter((s) => !["nytimes.com", "theguardian.com"].includes(s));
  }

  if (sourceDomains.length < 1) return [];

  const params = new URLSearchParams({
    apiKey: import.meta.env.VITE_NEWS_API_KEY,
    articlesPage: pageParam.toString(),
    articlesCount: DEFUALT_PAGE_SIZE.toString(),
    lang: "eng",
    isDuplicateFilter: "skipDuplicates",
  });

  if (searchQuery) params.append("keyword", searchQuery);

  if (date) {
    params.append("dateStart", format(date.from, "yyyy-MM-dd"));
    params.append("dateEnd", format(date.to, "yyyy-MM-dd"));
  }

  for (const i of sourceDomains) {
    params.append("sourceUri", i);
  }

  for (const i of categories ?? []) {
    params.append("categoryUri", `dmoz/${textFormatter.capitalizeText(i)}`);
    params.append("categoryUri", `news/${textFormatter.capitalizeText(i)}`);
  }

  const response = await httpClient.get("https://eventregistry.org/api/v1/article/getArticles", {
    params,
  });

  // ensure failure doesn't prevent loading
  if (response.status !== 200) return [];

  return response.data.articles.results.map((article: any) => ({
    title: article.title,
    url: article.url,
    source: article.source.title,
    apiSource: "newsApi",
    publishedAt: article.dateTimePub,
    description: article.body,
    authors: article.authors?.map((a: any) => ({ name: a.name, domain: a.uri })),
    imgUrl: article.image,
  }));
};

export const fetchGuardianAPI = async ({
  pageParam = 1,
  searchQuery,
  categories,
  sources,
  date,
}: FetchFeedFilterOptions): Promise<FeedApiData[]> => {
  if (sources && sources?.length > 0 && !sources?.includes("theguardian.com")) return [];

  const params = {
    q: searchQuery,
    section: categories ? categories[0] : undefined,
    "api-key": import.meta.env.VITE_GUARDIAN_API_KEY,
    "show-fields": "headline,trailText,webUrl,thumbnail",
    "show-references": "author",
    page: pageParam,
    "page-size": DEFUALT_PAGE_SIZE,
    "from-date": date ? format(date.from, "yyyy-MM-dd") : undefined,
    "to-date": date ? format(date.to, "yyyy-MM-dd") : undefined,
  };

  const response = await httpClient.get("https://content.guardianapis.com/search", { params });

  if (response.status !== 200) {
    return [];
  }

  return response.data.response.results.map((article: any) => ({
    title: article.fields.headline,
    url: article.webUrl,
    source: "The Guardian",
    apiSource: "theGuardian",
    publishedAt: article.webPublicationDate,
    description: article.fields.trailText,
    authors: article.author || "Unknown Author",
    imgUrl: article.fields?.thumbnail,
  }));
};

export const fetchNYTAPI = async ({
  pageParam,
  searchQuery,
  sources,
  categories,
  date,
}: FetchFeedFilterOptions): Promise<FeedApiData[]> => {
  if (sources && sources?.length > 0 && !sources?.includes("nytimes.com")) return [];

  const catFilter = categories?.length
    ? `news_desk:(${categories.map((i) => `\"${i}\"`).join(",")})`
    : undefined;

  const params = {
    "api-key": import.meta.env.VITE_NYT_API_KEY,
    q: searchQuery,
    fq: catFilter,
    page: pageParam,
    begin_date: date?.from ? format(new Date(date?.from), "yyyyMMdd") : undefined,
    end_date: date?.to ? format(new Date(date.to), "yyyyMMdd") : undefined,
  };

  const response = await httpClient.get(
    "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    { params }
  );

  if (response.status !== 200) {
    return [];
  }

  return response.data.response.docs.map((article: any) => ({
    title: article.headline.main,
    url: article.web_url,
    source: "New York Times",
    apiSource: "newYorkTimes",
    publishedAt: article.pub_date,
    description: article.abstract || "No description available",
    authors:
      article.byline.person.map((p: any) => ({ name: `${p.firstname} ${p.lastname}` })) ||
      "Unknown Author",
    imgUrl: article.multimedia?.[0]?.url
      ? "https://static01.nyt.com/" + article.multimedia?.[0].url
      : undefined,
  }));
};
