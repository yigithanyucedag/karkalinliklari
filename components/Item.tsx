import Link from "next/link";
import React from "react";
import { ResortItem } from "../types/resortItem";

export default function Item({
  resort,
  isLastItem,
  index,
}: {
  resort: ResortItem;
  isLastItem: boolean;
  index: number;
}) {
  return (
    <tr className="list-table-cell-item">
      <td
        className={`pl-0 py-6 lg:py-4 lg:pl-6 text-sm text-center lg:text-left dark:text-slate-400 text-gray-500 w-full lg:w-auto block lg:table-cell relative lg:static border-b ${
          isLastItem
            ? "dark:border-slate-700 border-gray-200 lg:border-transparent"
            : "dark:border-slate-700 border-gray-200"
        }`}
      >
        <span className="lg:hidden absolute top-0 left-0 dark:bg-slate-700 bg-gray-200 text-gray-700 dark:text-slate-200 px-2 py-1 text-xs font-medium">
          #
        </span>
        {index + 1}
      </td>
      <td
        className={`py-6 lg:py-4 p-0 lg:pl-3 lg:pr-6 text-sm text-center lg:text-left text-white w-full lg:w-auto block lg:table-cell relative lg:static border-b ${
          isLastItem
            ? "dark:border-slate-700 border-gray-200 lg:border-transparent"
            : "dark:border-slate-700 border-gray-200"
        }`}
      >
        <span className="lg:hidden absolute top-0 left-0 dark:bg-slate-700 dark:text-slate-200 bg-gray-200 text-gray-700 px-2 py-1 text-xs font-medium">
          Yer
        </span>
        <Link
          href={`http://maps.google.com/maps?z=12&t=m&q=loc:${resort.enlem}+${resort.boylam}`}
        >
          <a
            target="_blank"
            className="text-gray-900 dark:text-white font-bold dark:hover:text-sky-400 hover:text-sky-500"
          >
            <span>{resort.istAd}</span>
          </a>
        </Link>
        <div className="text-gray-900 dark:text-white font-medium text-xs">
          {resort.il} - {resort.ilce}
        </div>
      </td>
      <td
        className={`py-6 lg:py-4 px-0 lg:px-6 text-sm text-center lg:text-left dark:text-slate-400 text-gray-700 w-full lg:w-auto block lg:table-cell relative lg:static border-b ${
          isLastItem
            ? "dark:border-slate-700 border-gray-200 lg:border-transparent"
            : "dark:border-slate-700 border-gray-200"
        }`}
      >
        <span className="lg:hidden absolute top-0 left-0 dark:bg-slate-700 dark:text-slate-200 bg-gray-200 text-gray-700 px-2 py-1 text-xs font-medium">
          Son Güncelleme
        </span>
        {new Date(resort.veriZamani).toLocaleString()}
      </td>
      <td
        className={`py-6 lg:py-4 px-0 lg:px-6 text-center lg:text-left dark:text-white text-gray-900 w-full lg:w-auto block lg:table-cell relative lg:static border-b font-bold ${
          isLastItem
            ? "border-transparent"
            : "dark:lg:border-slate-700 lg:border-gray-200 border-transparent"
        }`}
      >
        <span className="lg:hidden absolute top-0 left-0 dark:bg-slate-700 dark:text-slate-200 bg-gray-200 text-gray-700 px-2 py-1 text-xs font-medium">
          Kar Yüksekliği
        </span>
        {resort.karYukseklik} cm
      </td>
    </tr>
  );
}
