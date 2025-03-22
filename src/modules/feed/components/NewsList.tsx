import { Link } from "react-router-dom";
import { FeedApiData } from "../types";
import { formatDistanceToNow } from "date-fns";
import { SOURCE_LIST } from "../constants";
import NewsIcon from "@/assets/icons/news.icon";

export default function NewsList({ data, authors }: { data?: FeedApiData[]; authors?: string[] }) {
  if (!data) return null;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-min gap-3">
      {filterDataByAuthor(data, authors).map((d) => (
        <NewsFeed key={d.url} feed={d} />
      ))}
    </section>
  );
}

const NewsFeed = ({ feed }: { feed: FeedApiData }) => {
  return (
    <article className="rounded-xl border border-gray-300 overflow-clip pb-6">
      <Link to={feed.url} className="flex flex-col justify-between h-full">
        {feed.imgUrl ? (
          <img className="w-full block aspect-video object-cover " src={feed.imgUrl} />
        ) : (
          <div className="w-full aspect-video flex items-center justify-center">
            <NewsIcon className="w-24 text-gray-300" />
          </div>
        )}

        <div className="p-4">
          <p className="font-semibold text-sm mb-2">{feed.title}</p>
          <div className="flex gap-1 items-center">
            <div className="border p-1 border-gray-200 rounded-md ">
              {SOURCE_LIST.find((s) => s.name === feed.source)?.icon}
            </div>
            <p className="text-sm">{feed.source}</p>
          </div>
          <p className="text-xs">
            {formatDistanceToNow(new Date(feed.publishedAt), { addSuffix: true })}
          </p>
        </div>
      </Link>
    </article>
  );
};

const filterDataByAuthor = (sortedData: FeedApiData[], authors?: string[]) => {
  if (!authors || authors.length < 1) return sortedData;

  return sortedData.filter(
    (s) => Array.isArray(s.authors) && s.authors.find((a) => authors.includes(a.name))
  );
};
