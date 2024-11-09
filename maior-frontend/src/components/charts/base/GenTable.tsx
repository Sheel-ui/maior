import { useState } from "react";
import { Button } from "@/components/ui/button"; // Ensure that this import is correct
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define the type for dynamic data
type DynamicData = Record<string, string | number>; // Dynamic row data, key is the column name, value is the data

interface GenTableProps {
  data: DynamicData[]; // Array of dynamic data rows
}

export function GenTable({ data }: GenTableProps) {
  const [currentPage, setCurrentPage] = useState(0); // Track the current page index
  const rowsPerPage = 8; // Define how many rows to show per page

  // Handle previous and next page navigation
  const nextPage = () => {
    if ((currentPage + 1) * rowsPerPage < data.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Get the data for the current page
  const currentRows = data.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  // If data is empty, show a message
  if (data.length === 0) {
    return <div>No data available</div>;
  }

  // Dynamically get column names from the keys of the first row
  const columns = Object.keys(data[0]);

  return (
    <div>
      <Table>
        <TableCaption>A list of dynamic data.</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col}>{col}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentRows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col) => (
                <TableCell key={col}>{row[col]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={previousPage}
          disabled={currentPage === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={(currentPage + 1) * rowsPerPage >= data.length}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
