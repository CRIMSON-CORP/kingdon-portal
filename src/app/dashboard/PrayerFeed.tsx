"use client";
import PrayerCard from "@/components/PrayerCard";
import { getPrayers } from "@/lib/server-actions";
import { useEffect, useState } from "react";

interface PrayerFeedProps {
  initialPrayers: Prayer[];
}
function PrayerFeed({ initialPrayers }: PrayerFeedProps) {
  const [offset, setOffset] = useState(0);
  const [prayers, setPrayers] = useState<Prayer[]>([]);

  useEffect(() => {
    setPrayers(initialPrayers);
    setOffset(0);
  }, [initialPrayers]);

  const loadMorePrayers = async () => {
    const apiPrayers = await getPrayers<Prayer[]>({
      page: offset.toString(),
      owner: "self",
    });
    setPrayers((prev) => [...prev, ...apiPrayers]);
    setOffset((prev) => prev + 1);
  };

  const removePrayer = (prayerId: string) => {
    const newPrayers = [...prayers];
    const index = newPrayers.findIndex((prayer) => prayer.uuid === prayerId);
    if (index !== -1) {
      newPrayers.splice(index, 1);
      setPrayers(newPrayers);
    }
  };

  return (
    <div className="flex flex-col gap-3 h-full overflow-auto">
      {prayers.map((prayer) => (
        <PrayerCard key={prayer.uuid} {...prayer} removePrayer={removePrayer} />
      ))}
    </div>
  );
}

export default PrayerFeed;
