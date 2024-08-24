"use client";
import PrayerCard from "@/components/PrayerCard";
import { getPrayers } from "@/lib/server-actions";
import { useState } from "react";

interface PrayerFeedProps {
  initialPrayers: Prayer[];
}
function PrayerFeed({ initialPrayers }: PrayerFeedProps) {
  const [offset, setOffset] = useState(0);
  const [prayers, setPrayers] = useState<Prayer[]>(initialPrayers);

  const loadMorePrayers = async () => {
    const apiPrayers = await getPrayers<Prayer[]>({
      page: offset.toString(),
      owner: "self",
    });
    setPrayers((prev) => [...prev, ...apiPrayers]);
    setOffset((prev) => prev + 1);
  };
  return (
    <div className="flex flex-col gap-3 h-full overflow-auto">
      {prayers.map((prayer) => (
        <PrayerCard key={prayer.uuid} {...prayer} />
      ))}
    </div>
  );
}

export default PrayerFeed;
