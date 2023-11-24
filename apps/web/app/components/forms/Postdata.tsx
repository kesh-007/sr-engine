"use client"
import React, { useEffect, useState } from 'react';
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
import { HeaderComponent } from '../../components/header';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { postFormDataApi } from '@/server';

const PostData = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession()
  const [selectedCFile, setSelectedCFile] = useState(null);
  const [selectedAFile, setSelectedAFile] = useState(null);


  const handleCFileSelect = (e) => {
    const file = e.target.files[0];  
    setSelectedCFile(file);
  };
  const handleAFileSelect = (e) => {
    const file = e.target.files[0];  
    setSelectedAFile(file);
  };


  const FormSchema = z.object({
    test_name: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    url: z.string(),
    
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new FormData();
    formData.append('test_name', data.test_name);
    formData.append('url', data.url);
    formData.append('codersfile',selectedCFile)
    formData.append('absentfile',selectedAFile)
    const reponse = await postFormDataApi(formData)
    console.log(reponse.message,'idu')
    if (reponse.message==='Test name already exists')
    {

      toast({
        title: 'Test data already exists',
        description: `${data.test_name} exists`,
        action: <ToastAction altText="Goto schedule to undo">Exit</ToastAction>,
      });
      return;
      
    }
    
    toast({
      title: 'Test data added',
      description: `${data.test_name} is added`,
      action: <ToastAction altText="Goto schedule to undo">Exit</ToastAction>,
    });
  }

  return (
    <div className=''>
      <h1 className="text-4xl font-bold py-4 px-2 max-md:text-2xl max-md:text-center">Details of the test</h1>
      <div className="px-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6 text-lg">
            <div className='flex gap-10 mx-10 max-md:flex-col '>
            <FormField
              control={form.control}
              name="test_name"
              render={({ field }) => (
                <div className="space-y-2 w-1/2 max-md:w-full">
                  <FormLabel>Test Name</FormLabel>
                  <Input placeholder="test name" {...field} />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <div className="space-y-2 w-1/2 max-md:w-full">
                  <FormLabel>Url</FormLabel>
                  <Input placeholder="url" {...field} />
                </div>
              )}
            />
            </div>
<div className='flex  gap-10 mx-10 max-md:flex-col'>           
                <div className="space-y-2 w-1/2 max-md:w-full ">
                  <FormLabel>Coders File</FormLabel>
                  <Input type="file" onChange={handleCFileSelect} />
                </div>
             
            
                <div className="space-y-2 w-1/2 max-md:w-full">
                  <FormLabel>Absentese File</FormLabel>
                  <Input type="file" onChange={handleAFileSelect} />
                </div>
                </div>
                <div className='flex justify-end mx-10'>

             
            <Button type="submit" className=''>Submit</Button>
                </div>

          </form>
        </Form>
      </div>
    </div>
  );
};

export default PostData;
