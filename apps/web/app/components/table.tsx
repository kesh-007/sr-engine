"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@ui/components/ui/button"
import { Checkbox } from "@ui/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu"
import { Input } from "@ui/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/components/ui/table"

export function DataTableDemo(props) {
  const data: Payment[] = props.data
  
   type Payment = {
    "#": number,
    "Name": string,
    "Regn Num": string,
    "Branch": string,
    "Solved Count": number,
    "Score": string,
    "Total Submissions": number,
    "Login": string,
    "Batch\/Section": string,
    "Batch": string,
    "Resume Count": number,
    "Usage Time": string,
    "Active Utilization": string
  }
  
   const columns: ColumnDef<Payment>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "#",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rank
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("#")}</div>,
    },   
    {
      accessorKey: "Name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Name")}</div>
      ),
    },
    {
      accessorKey: "Regn Num",
      header: "Regn Num",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Regn Num")}</div>
      ),
    },
    {
      accessorKey: "Branch",
      header: "Branch",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Branch")}</div>
      ),
    },
    {
      accessorKey: "Batch\/Section",
      header: "Batch\/Section",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Batch\/Section")}</div>
      ),
    },

    {
      accessorKey: "Solved Count",
      header: "Solved Count",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Solved Count")}</div>
      ),
    },
    {
      accessorKey: "Score",
      header: "Score",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Score")}</div>
      ),
    },
    {
      accessorKey: "Total Submissions",
      header: "Total Submissions",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Total Submissions")}</div>
      ),
    },
    {
      accessorKey: "Resume Count",
      header: "Resume Count",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Resume Count")}</div>
      ),
    },
    {
      accessorKey: "Usage Time",
      header: "Usage Time",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Usage Time")}</div>
      ),
    },
    {
      accessorKey: "Active Utilization",
      header: "Active Utilization",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Active Utilization")}</div>
      ),
    },
    

  
   
    
    
  ]
  
  
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Names..."
          value={(table.getColumn("Name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Filter Section..."
          value={(table.getColumn("Batch\/Section")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Batch\/Section")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
