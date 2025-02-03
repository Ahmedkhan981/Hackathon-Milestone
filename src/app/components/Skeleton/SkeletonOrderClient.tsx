"use client";

import React from "react";
import { motion } from "framer-motion";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

const SkeletonOrderClient: React.FC = () => {
  return (
        <SkeletonTheme baseColor="#9e9e9e" highlightColor="#a4a4a4">

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 md:p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl"
    >
      <Accordion type="single" collapsible className="w-full">
        {[...Array(3)].map((_, index) => (
          <AccordionItem
            key={index}
            value={`skeleton-${index}`}
            className="mb-4 overflow-hidden bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg border-l-4 border-slate-500"
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 transition-colors group">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center space-x-4">
                  <Skeleton width={120} height={24} />
                  <Badge variant="secondary" className="ml-2">
                    <Skeleton width={60} />
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card className="border-0 shadow-none bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800">
                    <Skeleton width={150} />
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <Skeleton width={80} height={20} className="mb-2" />
                      <Skeleton width={120} height={24} />
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <Skeleton width={100} height={20} className="mb-2" />
                      <Skeleton width={100} height={24} />
                    </div>
                  </div>
                  <Separator className="bg-slate-200" />
                  <h3 className="font-semibold text-xl mt-2 text-slate-800">
                    <Skeleton width={100} />
                  </h3>
                  <ul className="space-y-4">
                    {[...Array(2)].map((_, productIndex) => (
                      <li
                        key={productIndex}
                        className="flex flex-col sm:flex-row items-start sm:items-center py-4 px-6 bg-slate-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex-shrink-0 mr-6 mb-4 sm:mb-0">
                          <Skeleton
                            width={80}
                            height={80}
                            className="rounded-md"
                          />
                        </div>
                        <div className="flex-grow">
                          <Skeleton width={150} height={24} className="mb-2" />
                          <Skeleton width={100} height={20} className="mb-1" />
                          <Skeleton width={80} height={20} />
                        </div>
                        <div className="mt-4 sm:mt-0">
                          <Skeleton width={80} height={24} />
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center font-semibold text-slate-800 bg-slate-100 p-4 rounded-lg">
                    <span>Total Discount:</span>
                    <Skeleton width={80} height={24} />
                  </div>
                  <Button
                    className="mt-4 w-full bg-slate-700 text-white hover:bg-slate-600 transition-colors text-lg py-6"
                    disabled
                    >
                    Download Invoice
                  </Button>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
        </SkeletonTheme>
  );
};

export default SkeletonOrderClient;
