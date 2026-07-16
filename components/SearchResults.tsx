import { SearchIcon } from "lucide-react";
import { GroupedSearchResults, SearchResultItem } from "@/data/search";
import SearchCard from "./SearchCard";

type SearchResultsProps = {
  query: string;
  results: GroupedSearchResults;
};

function ResultGroup({
  title,
  items,
}: {
  title: string;
  items: SearchResultItem[];
}) {
  if (items.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-5">
        {title}{" "}
        <span className="text-sm font-medium text-gray-400">
          ({items.length})
        </span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <SearchCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function NoResults({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-50 mb-6">
        <SearchIcon className="w-9 h-9 text-[#E41F26]" aria-hidden="true" />
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
        No results found
      </h2>
      <p className="text-sm md:text-base text-gray-500 max-w-md mb-1">
        We couldn&apos;t find anything matching{" "}
        <span className="font-semibold text-gray-700">
          &ldquo;{query}&rdquo;
        </span>
        .
      </p>
      <p className="text-sm text-gray-500 max-w-md">
        Try checking your spelling, using fewer or more general keywords, or
        browsing our categories and blog directly.
      </p>
    </div>
  );
}

export default function SearchResults({ query, results }: SearchResultsProps) {
  if (!query.trim()) {
    return (
      <div className="text-center py-20 px-4">
        <p className="text-sm md:text-base text-gray-500">
          Type a keyword in the search bar to find products, categories, and
          articles.
        </p>
      </div>
    );
  }

  if (results.total === 0) {
    return <NoResults query={query} />;
  }

  return (
    <div>
      <ResultGroup title="Products" items={results.products} />
      <ResultGroup title="Categories" items={results.categories} />
      <ResultGroup title="Blogs" items={results.blogs} />
    </div>
  );
}
