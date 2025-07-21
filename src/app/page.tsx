"use client";

import { Tag, TagGroup, TagList } from "@/components/ui/tag-group";
import { TextField } from "@/components/ui/text-field";
import { useEffect, useState } from "react";

interface Tag {
  id: number;
  name: string;
  available: boolean;
}

export default function Home() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState<Tag>({
    id: 0,
    name: "",
    available: true,
  });
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const tags = localStorage.getItem("tags");
    if (tags) {
      setTags(JSON.parse(tags) as Tag[]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tags", JSON.stringify(tags));
  }, [tags]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 flex items-center justify-center p-4 relative">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl mb-2" style={{ fontFamily: "Darlington" }}>
            Tags Input
          </h1>
        </div>

        <div className="mb-4">
          <TextField
            placeholder="Add a tag"
            value={newTag.name}
            onChange={(e) => setNewTag({
              id: counter + 1,
              name: e,
              available: true,
            })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setTags([...tags, newTag]);
                setCounter(counter + 1);
                setNewTag({
                  id: counter + 1,
                  name: "",
                  available: true,
                });
              }
            }}
          />
        </div>

        <div className="mb-4 justify-center mx-auto relative flex">
          <TagGroup>
            <TagList items={tags}>{(item) => <Tag>{item.name}</Tag>}</TagList>
          </TagGroup>
        </div>
      </div>
    </div>
  );
}
