"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { CheckCircle, Home } from "lucide-react";
import Confetti from "react-confetti";
import { useSearchParams } from "next/navigation";
import useBasketStore from "@/store/store";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const clearBasket = useBasketStore((state) => state.clearBasket);
  const orderNumber = searchParams.get("orderNumber");
  const sessionId = searchParams.get("session_id");
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (orderNumber && sessionId) {
      clearBasket();
      // Here you can add any additional logic you want to perform with the sessionId
      console.log("Session ID:", sessionId);
    }
  }, [orderNumber, sessionId, clearBasket]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={200}
      />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            </motion.div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-2xl font-bold text-center mb-4">
              Order Successful!
            </h1>
            <p className="text-center text-gray-600 mb-4">
              Thank you for your purchase. Your order has been received and is
              being processed.
            </p>
            {orderNumber && (
              <motion.p
                className="text-center text-lg font-semibold text-green-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Order Number: {orderNumber}
              </motion.p>
            )}
            {sessionId && (
              <motion.p
                className="text-center text-sm text-gray-500 mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Session ID: {sessionId}
              </motion.p>
            )}
          </motion.div>
        </CardContent>
        <CardFooter>
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/" passHref>
              <Button className="w-full">
                <Home className="mr-2 h-4 w-4" /> Return to Home
              </Button>
            </Link>
          </motion.div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SuccessPage;
