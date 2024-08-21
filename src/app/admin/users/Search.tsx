"use client";

import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useEffect, useMemo, useState } from "react";

const searchName = "email";
function Search() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get(searchName) || ""
  );
  const { push } = useRouter();
  const urlSearchparams = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const debouncedPush = useDebouncedCallback((url) => {
    push(url);
  }, 500);

  const handleSearchType: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery) {
      urlSearchparams.set(searchName, searchQuery);
    } else {
      urlSearchparams.delete(searchName);
    }
    debouncedPush(`?${urlSearchparams.toString()}`);
  }, [debouncedPush, searchQuery, urlSearchparams]);

  return (
    <input
      type="search"
      name={searchName}
      placeholder="Search Users"
      onChange={handleSearchType}
      value={searchQuery}
      className="flex-1 bg-transparent outline-none"
    />
  );
}

export default Search;
