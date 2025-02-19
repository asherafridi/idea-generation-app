"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import FormButton from "@/components/FormButton";
import { useRouter } from "next/navigation";
import { useIdea } from "@/components/IdeaProvider";

interface Card {
  id: string;
  type: string;
  description: string;
  link: string;
}

interface Table {
  table_name: string;
}

const DatabaseCard: React.FC<{ card: Card }> = ({ card }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string>(""); // Track selected table
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();
  
    const { setText } = useIdea();

  const handleConnect = async () => {
    setIsDialogOpen(true);
    try {
      setLoading(true);
      const response = await axios.get(`/api/database/tables/${card.id}`);
      setTables(response.data.tables || []);
    } catch (error) {
      toast.error("Failed to fetch tables. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleExtractTable = async () => {
    if (!selectedTable) {
      toast.error("Please select a table.");
      return;
    }

    try {
      setFormLoading(true);
      const response = await axios.get(`/api/database/extract-data`, {
        params: {
          database_id: card.id, // Use the database ID from the card
          table_name: selectedTable, // Use the selected table name
        },
      });
      
      console.log("API Response:", JSON.stringify(response.data)); // Log the response
      toast.success("Data extraction successful!");
      
      setText(JSON.stringify(response.data));
      router.push("/idea-generation");

      
    } catch (error) {
      console.error("Error extracting data:", error);
      toast.error("Failed to extract data. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="p-4 w-full border rounded-xl font-body shadow-md bg-background relative pb-24 min-h-[240px]">
      <div className="flex justify-between items-start">
        <h3 className="text-md font-semibold text-blue-600 break-words">
          {card.type.toLocaleUpperCase()}
        </h3>
        <a
          href={card.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
          aria-label="Open in new tab"
        >
          <ArrowTopRightIcon />
        </a>
      </div>
      <p className="mt-2 text-foreground text-sm mb-4">{card.description}</p>
      <button
        onClick={handleConnect}
        className="absolute bottom-4 bg-primary px-10 text-xl py-2 rounded-full text-white border-2 border-blue-600 hover:bg-blue-700 hover:text-white"
      >
        Connect
      </button>

      {/* Dialog for Tables */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle className="font-body">Select a Table</DialogTitle>
          </DialogHeader>
          {loading ? (
            <p>Loading tables...</p>
          ) : tables.length > 0 ? (
            <>
              <Select onValueChange={(value) => setSelectedTable(value)}>
                <SelectTrigger className="w-full font-body">
                  <SelectValue placeholder="Select a table" />
                </SelectTrigger>
                <SelectContent>
                  {tables.map((table, index) => (
                    <SelectItem key={index} value={table.table_name} className="font-body">
                      {table.table_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormButton
                state={formLoading}
                className="h-12 text-md bg-[rgba(106,68,255,0.2)] hover:bg-[#6A44FF] hover:text-white rounded-lg text-blue-800 border-blue-800 border"
                text="Connect"
                onClick={handleExtractTable}
              />
            </>
          ) : (
            <p className="text-center text-lg">No tables found.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DatabaseCard;