"use client"
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ToastAction } from '@ui/components/ui/toast';
import { Button } from '@ui/components/ui/button';
import {
  Form,
  FormField,
  FormLabel,
} from '@ui/components/ui/form';
import { Input } from '@ui/components/ui/input';
import { useToast } from '@ui/components/ui/use-toast';
import { HeaderComponent } from '../components/header';

const Page = () => {
  const { toast } = useToast();

  const FormSchema = z.object({
    test_name: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    url: z.string(),
    scorefile: z.any(),
    absentfile:z.any(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'Test data added',
      description: `${data.scorefile}`,
      action: <ToastAction altText="Goto schedule to undo">Exit</ToastAction>,
    });
  }

  return (
    <div>
      <title>Dashboard || SR Engine</title>
      <div className="flex justify-between p-4">
        <p className="text-2xl poppins-text font-bold">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/kraftcode-6e365.appspot.com/o/images%2Flogo%20(1).png?alt=media&token=e10d1c04-abfa-4bfd-8261-f335206489d7"
            className="w-[6rem] h-[3rem] object-fill"
            alt="logo"
          />
        </p>
        <HeaderComponent />
        <p></p>
      </div>
      <h1 className="text-2xl font-bold py-3 px-2">Details of the test</h1>
      <div className="px-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 space-y-6 text-lg">
            <FormField
              control={form.control}
              name="test_name"
              render={({ field }) => (
                <div className="space-y-2">
                  <FormLabel>Test Name</FormLabel>
                  <Input placeholder="test name" {...field} />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <div className="space-y-2">
                  <FormLabel>Url</FormLabel>
                  <Input placeholder="url" {...field} />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="scorefile"
              render={({ field }) => (
                <div className="space-y-2">
                  <FormLabel>Coders File</FormLabel>
                  <Input type="file" {...field} />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="absentfile"
              render={({ field }) => (
                <div className="space-y-2">
                  <FormLabel>Absentese File</FormLabel>
                  <Input type="file" {...field} />
                </div>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
