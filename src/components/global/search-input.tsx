"use client";
import { Input } from "@/components/ui";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import React, { useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";

type Props = {};

const SearchInput: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useDebounceValue("", 500);

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          search: searchValue,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, [searchValue, router]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="w-full relative">
      <Search
        className="
            absolute
            top-1/2 left-3 
            transform
            -translate-y-1/2
            text-muted-foreground
            h-4 w-4"
      />
      <Input className="w-full max-w-[516px] pl-9" placeholder="Search boards" onChange={handleSearchChange} />
    </div>
  );
};

export default SearchInput;
