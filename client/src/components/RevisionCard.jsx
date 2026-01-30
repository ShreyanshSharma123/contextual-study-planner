export default function RevisionCard({ r }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center mb-4">
      <div>
        <h3 className="text-lg font-semibold">
          {r.topic_title}
        </h3>
        <p className="text-sm text-gray-600">
          Last score: {r.score}/{r.total}
        </p>
      </div>

      <div className="text-right">
        <p className="text-sm text-indigo-600 font-medium">
          Revise on
        </p>
        <p className="font-semibold">
          {new Date(r.next_revision).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

