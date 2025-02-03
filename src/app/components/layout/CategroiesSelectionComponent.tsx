"use client";

import type React from "react";
import { useState } from "react";
import type { Category } from "../../../../sanity.types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";

type Props = {
  categories: Category[];
  onChange: (categoryId: string | null) => void; // New onChange prop
};

const CategoriesSelectionComponent: React.FC<Props> = ({
  categories,
  onChange,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);

  const handleSelect = (categoryId: string | null) => {
    setValue(categoryId);
    setOpen(false);
    onChange(categoryId); // Notify parent about the category change
  };

  return (
    <div className="w-full max-w-sm z-10 relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open ? "true" : "false"}
            className="w-full justify-between bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 transition-colors duration-200"
          >
            {value
              ? categories.find((category) => category._id === value)?.title
              : "Select a Category"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 bg-white border-gray-200 shadow-md">
          <Command>
            <CommandInput
              placeholder="Search for a category"
              className="h-10 bg-transparent border-b border-gray-200"
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  const selectedCategory = categories.find((category) =>
                    category.title
                      ?.toLowerCase()
                      .includes(e.currentTarget.value.toLowerCase()),
                  );
                  if (selectedCategory) {
                    handleSelect(selectedCategory._id);
                  }
                }
              }}
            />
            <CommandList className="max-h-[300px] overflow-y-auto">
              <CommandEmpty className="py-3 text-center text-gray-500">
                No Categories Found
              </CommandEmpty>
              <CommandGroup>
                {categories?.map((category) => (
                  <CommandItem
                    key={category._id}
                    value={category.title}
                    onSelect={() => handleSelect(category._id)}
                    className="py-2 px-3 hover:bg-gray-100 transition-colors duration-200 flex justify-between"
                  >
                    {category.title}
                    <Check
                      className={cn(
                        "h-4 w-4 text-slate-600",
                        value === category._id ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CategoriesSelectionComponent;
