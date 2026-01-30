import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import API from "../services/api";
import RevisionCard from "../components/RevisionCard";

export default function Revision() {
 
  const [loading, setLoading] = useState(true);

  const [today, setToday] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    API.get("/revisions")
      .then((res) => {
        setToday(res.data.today || []);
        setUpcoming(res.data.upcoming || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Revise Planner</h1>
        {loading && <p className="text-gray-500">Loading revisions…</p>}
       

        <h2 className="text-lg font-semibold mb-3">
          📌 Topics to Revise Today
        </h2>

        {today.length === 0 ? (
          <p className="text-gray-500 mb-6">No revisions due today 🎉</p>
        ) : (
          today.map((r, i) => <RevisionCard key={i} r={r} />)
        )}

        {/* 🟡 UPCOMING */}
        <h2 className="text-lg font-semibold mt-8 mb-3">
          ⏳ Upcoming Revisions
        </h2>

        {upcoming.length === 0 ? (
          <p className="text-gray-500">No upcoming revisions yet.</p>
        ) : (
          upcoming.map((r, i) => <RevisionCard key={i} r={r} />)
        )}
      </div>
    </MainLayout>
  );
}
