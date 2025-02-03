"use client";

import React, { useEffect, useState } from "react";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import useBasketStore, { type BasketItem } from "../../../store/store";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { imageUrl } from "../../../lib/imageUrl";
import { Plus, Minus, Loader2, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import DiscountBadge from "./DiscountBadge";
import {
  createCheckoutSession,
  Metadata,
} from "../../../../action/createCheckoutSession";
import Image from "next/image";

interface Props {
  sale?: {
    _id: string;
    _type: "sale";
    discountAmount?: number;
  } | null;
}

const OrderClient: React.FC<Props> = ({ sale }) => {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [groupedItems, setGroupedItems] = useState<BasketItem[]>([]);
  const { user } = useUser();
  const [isClient, setIsClient] = useState(false);
  const { addItem, removeItem, getGroupedItems, getTotalPrice } =
    useBasketStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const fetchItems = () => {
      const items = getGroupedItems();
      setGroupedItems(items);
    };

    fetchItems();
    const unsubscribe = useBasketStore.subscribe(fetchItems);

    return () => {
      unsubscribe();
    };
  }, [getGroupedItems]);

  const handleIncrement = (product: BasketItem["product"]) => {
    addItem(product);
  };

  const handleDecrement = (productId: string) => {
    removeItem(productId);
  };

  const handleCheckout = async () => {
    if (!isSignedIn) {
      return null;
    }
    setIsCheckingOut(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName || "Unknown",
        customerEmail: user?.emailAddresses?.[0]?.emailAddress ?? "Unknown",
        clerkUserId: user!.id || "Unknown",
      };
      const checkoutUrl: string | null | void = await createCheckoutSession(
        groupedItems,
        metadata,
      );
      if (typeof checkoutUrl === "string" && checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error checking out:", error);
    } finally {
      setTimeout(() => {
        setIsCheckingOut(false);
      }, 2000);
    }
  };

  const calculateDiscountedPrice = (price: number, discountAmount: number) => {
    return price - (price * discountAmount) / 100;
  };

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (groupedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <ShoppingCart className="w-16 h-16 mb-4 text-gray-400" />
        <h1 className="text-2xl font-bold mb-4">Your basket is empty!</h1>
        <Button onClick={() => router.push("/")}>Continue Shopping</Button>
      </div>
    );
  }

  const totalPrice = getTotalPrice();
  const discountedTotalPrice = groupedItems.reduce((acc, item) => {
    const discountedPrice = calculateDiscountedPrice(
      item.product.price || 0,
      sale?.discountAmount || 0,
    );
    return acc + discountedPrice * item.quantity;
  }, 0);
  const totalSavings = totalPrice - discountedTotalPrice;

  return (
    <div className="container mx-auto p-4 max-w-4xl pt-20">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Your Shopping Cart
      </h1>
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <Card className="p-6">
          <AnimatePresence>
            {groupedItems.map((item) => {
              
              console.log(item);
              
              const discountedPrice = calculateDiscountedPrice(
                item.product.price || 0,
                sale?.discountAmount || 0,
              );
              const savings =
              ((item.product.price || 0) - discountedPrice) * item.quantity;
              
              const {product} = item;
              return (
                <motion.div
                  key={item.product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-4 py-4 border-b last:border-b-0"
                >
                  <Link
                    href={`/product/${item.product.slug?.current}`}
                    className="shrink-0 relative"
                  >
                    <Image
                      src={
                        product.image
                          ? imageUrl(product.image).url()
                          : "/placeholder.svg"
                      } // Use Image component here
                      alt={item.product.name || "Product image"}
                      className="object-cover h-20 w-20 "
                      width={80} // You can specify the width and height
                      height={80}
                      unoptimized
                    />
                  </Link>

                  <div className="flex-grow">
                    <h3 className="font-semibold">
                      {(item.product.name?.[0]?.toUpperCase() ?? "") +
                        (item.product.name?.slice(1) ?? "")}
                    </h3>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDecrement(item.product._id)}
                        disabled={item.quantity === 1}
                        className="h-8 w-8"
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="mx-2 font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleIncrement(item.product)}
                        className="h-8 w-8"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${discountedPrice * item.quantity}
                    </p>
                    <p className="text-sm text-muted-foreground line-through">
                      ${(item.product.price || 0) * item.quantity}
                    </p>
                    {savings > 0 && (
                      <p className="text-sm text-green-600 font-semibold">
                        Save ${savings.toFixed(2)}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.product._id)}
                    className="text-destructive"
                  >
                    <Trash2 size={16} />
                  </Button>
                  {sale?.discountAmount && (
                    <DiscountBadge discountAmount={sale.discountAmount} />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${totalSavings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total</span>
                <span>${discountedTotalPrice.toFixed(2)}</span>
              </div>
            </div>
            {isSignedIn ? (
              <Button
                onClick={handleCheckout}
                className="w-full mt-6"
                size="lg"
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Proceed to Checkout"
                )}
              </Button>
            ) : (
              <SignInButton mode="modal">
                <Button className="w-full mt-6" size="lg">
                  Sign in to Checkout
                </Button>
              </SignInButton>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderClient;
