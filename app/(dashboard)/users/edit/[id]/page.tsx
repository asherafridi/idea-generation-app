"use client";
import FormButton from "@/components/FormButton";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetchUser } from "@/hooks/userHook";
import Breadcrumb from "@/components/Breadcrumb";

const Page = ({ params }: { params: { id: string } }) => {
  const { data, loader } = useFetchUser(params.id);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm();

  const submit = (values: any) => {
    setLoading(true);
    axios
      .post(`/api/users/update`, {
        ...values,
        id: params.id,
      })
      .then((response) => {
        toast.success(response.data?.msg);
        setTimeout(() => {
          setLoading(false);
          router.push("/users");
        }, 2000);
      })
      .catch((e) => {
        toast.error(e.response.data?.error);
        setLoading(false);
        console.log(e);
      });
  };

  if (loader) {
    return (
        <div className="p-4 min-h-screen pt-12"><Skeleton className="w-full h-[400px] rounded mt-4" /></div>
    )
  }

  return (
    <div className="p-4 min-h-screen pt-12">
      <Breadcrumb text="Edit User" />
      <p className="mb-10"></p>
      <Card className="rounded p-4 font-body max-w-3xl m-auto">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Edit User</CardTitle>
        </CardHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="mt-4 flex w-full  flex-wrap "
          >
            <FormField
              control={form.control}
              name="name"
              defaultValue={data?.name}
              render={({ field }) => (
                <FormItem className="w-full p-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="email"
              defaultValue={data?.email}
              render={({ field }) => (
                <FormItem className="w-full p-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full p-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            <br />

            <FormButton state={loading} text="Update User" className="hover:bg-blue-600 hover:text-white" />
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Page;
