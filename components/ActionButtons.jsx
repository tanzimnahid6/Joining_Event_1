"use client";
import { useAuth } from "@/hooks/useAuth";
import { addInterested } from "@/serverAction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const ActionButtons = ({ eventId, interestedIds, goingIds, fromDetails }) => {
  const { auth, setAuth } = useAuth();
  const isInterested = interestedIds?.find((id) => id == auth?.id);
  const isGoing = goingIds?.find((id) => id == auth?.id);
  const [going, setGoing] = useState(isGoing);
  const router = useRouter();
  const [interested, setInterested] = useState(isInterested);
  const [isPending, starTransition] = useTransition();

  const toggleInterested = async () => {
    if (auth) {
      await addInterested(eventId, auth?.id);
      setInterested(!interested);
    } else {
      router.push("/login");
    }
  };
  const markGoing = async () => {
    if (auth) {
      router.push(`/payment/${eventId}`);
    } else {
      router.push("/login");
    }
  };
  return (
    <div className={`w-full flex gap-4 mt-4 ${fromDetails && "flex-1"}`}>
      <button
        onClick={() =>
          starTransition(() => {
            toggleInterested();
          })
        }
        className={`w-full ${
          interested && "bg-indigo-600 hover:bg-indigo-800"
        } `}
      >
        Interested
      </button>
      <button
        onClick={markGoing}
        disabled={auth && going}
        className={` text-center w-full bg-[#464849] py-2 px-2 rounded-md border border-[#5F5F5F]/50 shadow-sm cursor-pointer hover:bg-[#3C3D3D] transition-colors active:translate-y-1`}
      >
        Going
      </button>
    </div>
  );
};

export default ActionButtons;
