"use client";

import { motion, AnimatePresence } from "framer-motion";
import type React from "react";
import Image from "next/image";
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
import { imageUrl } from "@/lib/imageUrl";
import { Order } from "sanity.types";

interface OrderClientProps {
  orders: Order[];
}

const OrderClient: React.FC<OrderClientProps> = ({
  orders,
}: OrderClientProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 md:p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl"
    >
      <Accordion type="single" collapsible className="w-full">
        <AnimatePresence>
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <AccordionItem
                value={order._id}
                className="mb-4 overflow-hidden bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg border-l-4 border-slate-500"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 transition-colors group">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold text-lg text-slate-800">
                        Order #{order.orderNumber}
                      </span>
                      <Badge
                        variant={
                          order.status === "paid" ? "outline" : "secondary"
                        }
                        className="ml-2"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card className="border-0 shadow-none bg-white">
                    <CardHeader>
                      <CardTitle className="text-2xl text-slate-800">
                        Order Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                      <div className="grid grid-cols-2 gap-4">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="bg-slate-100 p-4 rounded-lg"
                        >
                          <span className="font-medium text-slate-600 block mb-1">
                            Date:
                          </span>
                          <span className="text-slate-800 text-lg">
                            {formatDate(order.orderDate ?? "")}
                          </span>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          className="bg-slate-100 p-4 rounded-lg"
                        >
                          <span className="font-medium text-slate-600 block mb-1">
                            Total Amount:
                          </span>
                          <span className="text-xl font-semibold text-slate-800">
                            {formatCurrency(order.totalAmount ?? 0)}
                          </span>
                        </motion.div>
                      </div>
                      <Separator className="bg-slate-200" />
                      <h3 className="font-semibold text-xl mt-2 text-slate-800">
                        Products:
                      </h3>
                      <ul className="space-y-4">
                        <AnimatePresence>
                          {order.products?.map((productItem, index: number) => (
                            <motion.li
                              key={productItem._key}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="flex flex-col sm:flex-row items-start sm:items-center py-4 px-6 bg-slate-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                              <div className="flex-shrink-0 mr-6 mb-4 sm:mb-0">
                                <Image
                                  src={
                                    productItem.product &&
                                    "image" in productItem.product
                                      ? imageUrl(
                                          (productItem.product as { image: string }).image ,
                                        ).url()
                                      : "/placeholder.svg"
                                  }
                                  alt={
                                    productItem.product &&
                                    typeof productItem.product === "object" &&
                                    "name" in productItem.product
                                      ? (
                                          productItem.product as {
                                            name: string;
                                          }
                                        ).name
                                      : "Product image"
                                  }
                                  width={80}
                                  height={80}
                                  className="rounded-md object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <h4 className="font-medium text-lg text-slate-800 mb-2">
                                  {productItem.product &&
                                  typeof productItem.product === "object" &&
                                  "name" in productItem.product
                                    ? (productItem.product as { name: string })
                                        .name
                                    : "Unknown Product"}
                                </h4>
                                <p className="text-sm text-slate-600 mb-1">
                                  Price:{" "}
                                  <span className="font-semibold">
                                    {formatCurrency(
                                      productItem.product &&
                                        typeof productItem.product ===
                                          "object" &&
                                        "price" in productItem.product
                                        ? (
                                            productItem.product as {
                                              price: number;
                                            }
                                          ).price
                                        : 0,
                                    )}
                                  </span>
                                </p>
                                <p className="text-sm text-slate-600">
                                  Quantity:{" "}
                                  <span className="font-semibold">
                                    {productItem.quantity}
                                  </span>
                                </p>
                              </div>
                              <div className="mt-4 sm:mt-0">
                                <span className="text-lg font-semibold text-slate-800">
                                  {formatCurrency(
                                    (productItem.product &&
                                    typeof productItem.product === "object" &&
                                    "price" in productItem.product
                                      ? (
                                          productItem.product as {
                                            price: number;
                                          }
                                        ).price
                                      : 0) * (productItem.quantity ?? 1),
                                  )}
                                </span>
                              </div>
                            </motion.li>
                          ))}
                        </AnimatePresence>
                      </ul>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="flex justify-between items-center font-semibold text-slate-800 bg-slate-100 p-4 rounded-lg"
                      >
                        <span>Total Discount:</span>
                        <span className="text-xl">
                          {formatCurrency(order.amountDiscount ?? 0)}
                        </span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <Button className="mt-4 w-full bg-slate-700 text-white hover:bg-slate-600 transition-colors text-lg py-6">
                          Download Invoice
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </Accordion>
    </motion.div>
  );
};

export default OrderClient;
