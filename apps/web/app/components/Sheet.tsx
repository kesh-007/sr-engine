import React, { ReactNode } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/components/ui/sheet";
import { Button } from "@ui/components/ui/button";
import { ScrollArea } from "@ui/components/ui/scroll-area"

interface SheetProps {
  children: ReactNode;
  trigger:ReactNode;
  title: string;
  description: string;
  buttonText: string;
}

export function CustomSheet({
  children,
  trigger,
  title,
  description,
}: SheetProps) {
  return (

    <Sheet>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {/* <SheetDescription>{description}</SheetDescription> */}
        </SheetHeader>
{/* <ScrollArea className="h-[150vh]"> */}
        {children}
        {/* </ScrollArea> */}
        <SheetFooter>
          <SheetClose asChild>
            <Button >{'Close'}</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>

  );
}
