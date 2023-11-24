"use client"
import * as React from "react"

import { Button } from "@ui/components/ui/button"
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card"


interface PropsData {
    name: string
  date?: string
  
}

export function TestCard(props:PropsData) {
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.4,
      delay: 0.2,
      ease: [0, 0.71, 0.2, 1.01],
    }}
  >

    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>{props.name}</CardTitle>
        <CardDescription>{props.date}</CardDescription>
      </CardHeader>
      <CardContent>

      </CardContent>
      <CardFooter className="flex justify-between">
        
        <Button>View</Button>
      </CardFooter>
    </Card>
    </motion.div>

  )
}
