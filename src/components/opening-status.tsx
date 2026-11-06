"use client";

import { useEffect, useState } from "react";
import { getOpeningStatus } from "@/lib/opening-hours";
import type { OpeningHours } from "@/lib/opening-hours";

export function OpeningStatus({ hours }: { hours?: OpeningHours }) {
  const [status, setStatus] = useState<"open" | "closed" | undefined>();

  useEffect(() => {
    if (!hours) return;

    const updateStatus = () => setStatus(getOpeningStatus(hours, new Date()));
    updateStatus();
    const interval = window.setInterval(updateStatus, 60_000);

    return () => window.clearInterval(interval);
  }, [hours]);

  if (!status) return null;

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-extrabold ${status === "open" ? "bg-olive/15 text-olive" : "bg-brick/10 text-brick"}`} role="status">
      <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
      {status === "open" ? "Aberto" : "Fechado"}
    </span>
  );
}
