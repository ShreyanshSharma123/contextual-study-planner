import MainLayout from "../layouts/MainLayout";
import API from "../services/api";
import StatCard from "../components/StatCard";
import { useState,useEffect } from "react";

export default function Dashboard() {
   const [stats, setStats] = useState({
    notesUploaded: 0,
    topicsIdentified: 0,
    pendingRevisions: 0,
  });

  const [loading, setLoading] = useState(true);

   useEffect(() => {
    API.get("/dashboard/stats")
      .then((res) => {
        setStats(res.data);
      })
      .catch(() => {
        setStats({
          notesUploaded: 0,
          topicsIdentified: 0,
          pendingRevisions: 0,
        });
      })
      .finally(() => setLoading(false));
  }, []);


  return (
    <MainLayout>
      <h1 className="text-2xl mb-5 font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Notes Uploaded" value={stats.notesUploaded} />
      <StatCard title="Topics Identified" value={stats.topicsIdentified} />
      <StatCard title="Pending Revisions" value={stats.pendingRevisions} />
        </div>
    </MainLayout>
  );
}
