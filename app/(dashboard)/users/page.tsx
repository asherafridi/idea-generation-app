"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import axios from "axios";
import { columns } from "./columns";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { useAllUserFetch } from "@/hooks/userHook";
import Breadcrumb from "@/components/Breadcrumb";

const Page = () => {
  const { users, userLoader } = useAllUserFetch();

  return (
    <div className="p-4 min-h-screen pt-12">
      <Breadcrumb text="Your Users" />
      <p className="mb-10"></p>
      {!userLoader && (
        <Card className="p-4 pt-0 font-body">
          <DataTable columns={columns} data={users} />
        </Card>
      )}
    </div>
  );
};

export default Page;
