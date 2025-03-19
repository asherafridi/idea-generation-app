"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

export type Contact = {
  id: string;
  name: string;
  email: string;
};

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      const [open, setOpen] = useState(false); // State for controlling the dialog

      const handleDelete = async () => {
        try {
          // Call your API to delete the user
          const response = await fetch(`/api/users/${payment.id}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Failed to delete user");
          }

          // Handle success (e.g., refresh the data or show a notification)
          console.log("User deleted successfully");
          setOpen(false); // Close the dialog
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      };

      const handleCancel = () => {
        setOpen(false); // Close the dialog
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="font-body">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/users/edit/${payment.id}`}>Edit User</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>Delete User</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Custom Delete Confirmation Dialog */}
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the user.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-500 text-white">
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];