import type { NextPage } from "next";
import React from "react";
import { useFetchUsers } from "../hooks/users";
import authenticate from "../lib/authenticate";
import moment from "moment";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  sortingFns,
  getSortedRowModel,
  FilterFn,
  SortingFn,
  FilterFns,
} from "@tanstack/react-table";
import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
import { IUser } from "../types/users";
import Avatar from "../components/Avatar";
import DebouncedInput from "../components/debounce-input";
import Filter from "../components/Filter";
declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);
  console.log("itemRank :>> ", itemRank);
  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

const columnHelper = createColumnHelper<IUser>();

const Home: NextPage = () => {
  const columns = React.useMemo<ColumnDef<IUser, any>[]>(
    () => [
      columnHelper.accessor("AUSCODEXT", {
        id: "ref",
        header: "REF",
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor(
        (row) => {
          console.log("row :>> ", row);
          return row;
        },
        {
          id: "details",

          cell: (info) => (
            <div className="flex items-center justify-start gap-3 w-full">
              <Avatar
                url={`http://localhost:5000/api/${info.getValue()!.AUSIMAGE!}`}
                name={info.getValue()!.AUSUSERNAME}
                className="w-12 h-12 drop-shadow-lg ring-2 ring-green-primary rounded-full object-cover"
              />
              {/* {info.getValue()!.AUSUSERNAME + info.getValue()!.AUSEMAIL!} */}
              <div className="flex justify-start flex-col items-start">
                <div className="flex justify-start items-baseline gap-2 text-sm">
                  {/* { <h1 className="text-sm font-semibold">
                  {record.AUSNOM + record.AUSPRENOM}
                </h1> } */}
                  <span className="text-sm font-semibold">
                    {"@" + info.getValue()!.AUSUSERNAME!}
                  </span>
                </div>
                <span>
                  {info.getValue()!.AUSEMAIL.length > 20
                    ? info.getValue()!.AUSEMAIL.slice(0, 20) + "..."
                    : info.getValue()!.AUSEMAIL}
                </span>
              </div>
            </div>
          ),
          header: () => <span>Details</span>,
          footer: (info) => info.column.id,
        }
      ),
      columnHelper.accessor("profile", {
        header: () => "Profile",
        cell: (info) => info.renderValue()!.APFLIBPRF,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("AUSDATDEB", {
        header: () => <span>Date Debut</span>,
        cell: (info) => (
          <span>{moment(info.getValue()).format("DD-MM-YYYY")}</span>
        ),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("AUSDATFIN", {
        header: () => <span>Date Fin</span>,
        cell: (info) => (
          <span>{moment(info.getValue()).format("DD-MM-YYYY")}</span>
        ),
        footer: (info) => info.column.id,
      }),
    ],
    []
  );
  console.log("columns", columns);

  const { data, isLoading } = useFetchUsers();
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const table = useReactTable({
    data: data ? data : [],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });
  React.useEffect(() => {
    (async () => {
      await authenticate();
    })();
  }, []);
  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  return (
    <div className="flex min-h-screen flex-col items-start justify-start text-black-primary dark:text-white bg-gray-50 dark:bg-dark py-2 pt-8  lg:px-24 font-poppins font-medium">
      <div className="flex items-center">
        <input
          id="toggle-all"
          {...{
            type: "checkbox",
            checked: table.getIsAllColumnsVisible(),
            onChange: table.getToggleAllColumnsVisibilityHandler(),
          }}
          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="toggle-all"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Toggle All
        </label>
      </div>

      {table.getAllLeafColumns().map((column) => {
        return (
          <div key={column.id} className="flex items-center">
            <input
              id={column.id.toString()}
              {...{
                type: "checkbox",
                checked: column.getIsVisible(),
                onChange: column.getToggleVisibilityHandler(),
              }}
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />{" "}
            {/* {column.id} */}
            <label
              htmlFor={column.id.toString()}
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {column.id}
            </label>
          </div>
        );
      })}
      <div>
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className="p-2 font-lg shadow border border-block"
          placeholder="Search all columns..."
        />
      </div>
      <div className="h-2" />
      <div className="overflow-x-auto relative w-full rounded-md py-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className="py-3 px-6"
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-4 px-6">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr
                key={footerGroup.id}
                className="font-semibold text-gray-900 dark:text-white"
              >
                {footerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="row"
                    className="py-3 px-6 text-base"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
      <pre>{JSON.stringify(table.getState(), null, 2)}</pre>
    </div>
  );
};

export default Home;

// : flexRender(
//     header.column.columnDef.header,
//     header.getContext()
//   )}
