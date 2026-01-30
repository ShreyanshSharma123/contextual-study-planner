import { useState } from "react";

export default function TopicCard({ topic, onQuiz }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm mb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h3 className="font-semibold text-lg">{topic.title}</h3>
        <span className="text-indigo-600 text-xl">{open ? "−" : "+"}</span>
      </div>

      {topic.confidence === "low" && (
        <p className="text-xs text-amber-600 mb-2">
          ⚠️ Inferred from scanned notes (may be approximate)
        </p>
      )}

      {open && (
        <>
          <p className="mt-4 text-gray-700 whitespace-pre-line leading-relaxed max-w-3xl">
            {topic.content}
          </p>

          <button
            onClick={onQuiz}
            className="mt-4 bg-indigo-600 text-white px-3 py-1 rounded"
          >
            Generate Quiz
          </button>
        </>
      )}
    </div>
  );
}
