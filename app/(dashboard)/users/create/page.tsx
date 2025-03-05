"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import FormButton from "@/components/FormButton";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";
import { useRouter } from "next/navigation";

const Page = () => {
  const form = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = (values: any) => {
    setLoading(true);
    console.log(values);
    axios
      .post("/api/users/create", values)
      .then((response) => {
        toast.success(response.data?.msg);
        setTimeout(() => {
          setLoading(false);
          form.reset();
          router.push('/users');
        });
      })
      .catch((e) => {
        toast.error(e?.response?.data?.error);
        setLoading(false);
        console.log(e);
      });
  };

  return (
    <div className="p-4 min-h-screen pt-12">
      <Breadcrumb text="Add New User" />
      <p className="mb-10"></p>
      <Card className=" rounded p-4 font-body max-w-3xl m-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="mt-4 flex w-full  flex-wrap "
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full  p-2">
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
                <FormItem className="w-full  p-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <br />

            <FormButton state={loading} className="hover:bg-blue-600 hover:text-white" />
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Page;
