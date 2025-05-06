
"use client";

// import React, { useMemo } from "react";
// import {
//   useTable,
//   useSortBy,
//   useGlobalFilter,
//   Column,
//   useFilters,
// } from "react-table";

// type TableProps<T extends object> = {
//   columns: Column<T>[];
//   data: T[];
// };

// export default function StockTable<T extends object>({
//   columns,
//   data,
// }: TableProps<T>) {
//   const memoColumns = useMemo(() => columns, [columns]);
//   const memoData = useMemo(() => data, [data]);

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     setGlobalFilter,
//     state,
//   } = useTable<T>(
//     {
//       columns: memoColumns,
//       data: memoData,
//     },
//     useFilters,
//     useGlobalFilter,
//     useSortBy
//   );

//   return (
//     <div className="p-4">
//       <input
//         className="mb-4 px-3 py-1 border rounded"
//         placeholder="Search..."
//         onChange={(e) => setGlobalFilter(e.target.value)}
//       />

//       <table {...getTableProps()} className="min-w-full bg-white border">
//         <thead>
//           {headerGroups.map((headerGroup,index) => (
//             <tr key={index} {...headerGroup.getHeaderGroupProps()} className="bg-gray-200">
//               {headerGroup.headers.map((column) => (
//                 <th
//                   {...column.getHeaderProps(column.getSortByToggleProps())}
//                   className="text-left py-2 px-3 border"
//                 >
//                   {column.render("Header")}
//                   <span>
//                     {column.isSorted
//                       ? column.isSortedDesc
//                         ? " 🔽"
//                         : " 🔼"
//                       : ""}
//                   </span>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>

//         <tbody {...getTableBodyProps()}>
//           {rows.map((row,index) => {
//             prepareRow(row);
//             return (
//               <tr key={index} {...row.getRowProps()} className="hover:bg-gray-100">
//                 {row.cells.map((cell,index) => (
//                   <td key={index} {...cell.getCellProps()} className="py-2 px-3 border">
//                     {cell.render("Cell")}
//                   </td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";

import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  Column,
  Row,
} from "react-table";

type TableProps<T extends object> = {
  columns: Column<T>[];
  data: T[];
};

export default function StockTable<T extends object>({
  columns,
  data,
}: TableProps<T>) {
  const memoColumns = useMemo(() => columns, [columns]);
  const memoData = useMemo(() => data, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state,
  } = useTable<T>(
    {
      columns: memoColumns,
      data: memoData,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  return (
    <div className="p-4">
      <input
        className="mb-4 px-3 py-1 border rounded"
        placeholder="Search..."
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

      <table {...getTableProps()} className="min-w-full bg-white border">
        <thead>
          {headerGroups.map((headerGroup:any,index:number) => (
            <tr
              key={index}
              {...headerGroup.getHeaderGroupProps()}
              className="bg-gray-200"
            >
              {headerGroup.headers.map((column:any,index:number) => (
                <th
                  key={index}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="text-left py-2 px-3 border"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row: Row<T>) => {
            prepareRow(row);
            return (
              <tr
                key={row.id}
                {...row.getRowProps()}
                className="hover:bg-gray-100"
              >
                {row.cells.map((cell:any,index:number) => (
                  <td
                    key={index}
                    {...cell.getCellProps()}
                    className="py-2 px-3 border"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
