"use client";

import Image from "next/image";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";
import { useDebounce } from "use-debounce";

const Search = () => {
  const [query, setQuery] = useState("");
  const searchQuery = searchParams.get("query") || "";
  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  const router = useRouter();
  const pathname = usePathname();

  const handleClickItem = (file: Models.Document) => {
    setOpen(false);
    setResults([]);

    router.push(
      `/${
        file.type === "video" || file.type === "audio"
          ? "media"
          : file.type + "s"
      }?query=${query}`,
    );
  };

  useEffect(() => {
    const fetchFiles = async () => {
      if (!debouncedQuery) {
        setResults([]);
        setOpen(false);
        return;
      }
      const files = await getFiles();
      setResults(files.documents);
      setOpen(true);
    };

    fetchFiles();
  }, [debouncedQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  return (
    <div>
      <div>
        <Image src="placeholder" alt="placeholder" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      {open && (
        <ul>
          {results.length > 0 ? (
            results.map((file) => (
              <li key={file.$id} onClick={() => handleClickItem()}>
                <div>
                  <Thumbnail />
                  <p>{file.name}</p>
                </div>
                <FormattedDateTime />
              </li>
            ))
          ) : (
            <p>No Files Found</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
