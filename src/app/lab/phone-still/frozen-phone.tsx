"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";

const PhoneCanvas = dynamic(() => import("@/components/art/phone/PhoneCanvas"), { ssr: false });

export function FrozenPhone() {
  const pointer = useRef(null);
  return <PhoneCanvas frozen pointer={pointer} onReady={() => document.body.setAttribute("data-phone-ready", "")} />;
}
