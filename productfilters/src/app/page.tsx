"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Filter } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Product as TypeProduct } from "@/db";
import Product from "@/components/Products/Product";

const SORT_OPTIONS = [
  { name: "None", value: "None" },
  { name: "Price: Low to High", value: "price-asc" },
  { name: "Price: High to Low", value: "price-desc" },
] as const;

export default function Home() {
  const [filiter, setFiliter] = useState({
    sort: "none",
  });
  console.log(filiter);

  //tanstackqueryを使ってデータを読み取る
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.post<TypeProduct[]>(
        "http://localhost:3000/api/products",
        {
          filiter: {
            sort: filiter.sort,
          },
        }
      );
      return data;
    },
  });

  console.log(products);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24 ">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Selection of high quality clothing
        </h1>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="group inline-flex justify-center text-sm font-bold text-gray-700 hover:text-gray-900 ">
              Sort
              <ChevronDown className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group hover:text-gray-500" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.name}
                  className={cn("text-left w-full block px-4 py-2 text-sm", {
                    "text-gray-900": option.value === filiter.sort,
                    "text-gray-500": option.value !== filiter.sort,
                  })}
                  onClick={() => {
                    setFiliter((prev) => ({
                      ...prev,
                      sort: option.value,
                    }));
                  }}
                >
                  {option.name}
                </button>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-5 lg:hidden">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:gtid-cols-4">
          {/* filiters */}
          <div></div>

          {/* product grid */}
          <ul className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products?.map((product, index) => (
              <li key={index}>
                <Product product={product.metadata!} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
