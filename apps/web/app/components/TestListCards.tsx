import { ScrollArea, ScrollBar } from '@ui/components/ui/scroll-area';
import React from 'react';
import { TestCard } from './CardComponet';

interface PropsData {
  data: { name: string; date: string }[];
}

const TestListCards = (props: PropsData) => {
  const { data } = props;

  return (
    <div>
      <div className="relative  md:flex">
        <ScrollArea className="px-4">
          <div className="grid grid-cols-4 gap-4 mx-5 max-md:grid-cols-1">
            {data.map((item, index) => (
              <TestCard
                key={index} 
                name={item.name}
                date={item.date}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default TestListCards;
