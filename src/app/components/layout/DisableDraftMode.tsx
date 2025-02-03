"use client";
import React from 'react';
import { useDraftModeEnvironment } from "next-sanity/hooks";
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const DisableDraftMode:React.FC= () => {
  const environment = useDraftModeEnvironment();
  const router = useRouter();
  if(environment!=="live"&& environment!=="unknown"){
    return null
  }
  const handleClick = async () => {
    await fetch("/draft-mode/disable")
    router.refresh();
  }
  return (
    <>
    <Button onClick={handleClick} style={{display:"none"}}>Disable Draft Mode</Button>

    </>
  );
};

export default DisableDraftMode;