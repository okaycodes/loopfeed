import { useEffect, useState } from "react";
import FilterIcon from "@/assets/icons/filter.icon";
import DateFilter from "@/modules/feed/components/DateFilter";
import FeedFilter from "@/modules/feed/components/FeedFilter";
import NewsList from "@/modules/feed/components/NewsList";
import { FormProvider } from "react-hook-form";
import UserGreeting from "@/modules/feed/components/UserGreeting";
import { useInView } from "react-intersection-observer";
import useInitFeed from "@/modules/feed/hooks/useInitFeed";
import MobileNav from "@/modules/common/components/MobileNav";

export default function FeedPage() {
  const [ref, inView] = useInView();
  const [currentPage, setCurrentPage] = useState(0);

  const [showFilter, setShowFilter] = useState(false);
  const handleToggleFilter = () => setShowFilter((prev) => !prev);

  const { methods, authors, data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInitFeed();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <section className="relative">
      <FormProvider {...methods}>
        <MobileNav filterResults={data?.pages.flatMap((p) => p.data) ?? []} />
        <section className="fixed">
          <FeedFilter
            showFilter={showFilter}
            handleCloseFilter={() => setShowFilter(false)}
            filterResults={data?.pages.flatMap((p) => p.data) ?? []}
          />
        </section>
      </FormProvider>
      <section className="md:pl-dashboard py-6 md:py-12">
        <UserGreeting />

        <div className="flex w-full justify-end my-5 gap-3">
          <DateFilter methods={methods} />
          <FilterIcon
            className="hidden md:block w-8 h-8 cursor-pointer text-gray-500"
            onClick={handleToggleFilter}
          />
        </div>

        <NewsList data={data?.pages.flatMap((p) => p.data) ?? []} authors={authors} />

        <div className="w-full flex justify-center">
          <button
            className=""
            ref={ref}
            disabled={!hasNextPage || isFetchingNextPage}
            onClick={() => {
              // The next page has not yet been populated
              if (data && data.pages?.length <= currentPage + 1) {
                fetchNextPage();
              }
              setCurrentPage(currentPage + 1);
            }}
          >
            {isFetchingNextPage ? "Loading Next page..." : "Loading..."}
          </button>
        </div>
      </section>
    </section>
  );
}
