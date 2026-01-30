import { useEffect, useState } from "react";
import API from "../services/api";
import { calculateNextRevision } from "../utils/revision";
import { useNavigate } from "react-router-dom";

export default  function Quiz({ topic, onExit }) {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [submitted,setSubmitted]=useState(false);

  /* ---------------- FETCH QUIZ ---------------- */
  useEffect(() => {
    setLoading(true);
    setError(null);

    API.post("/quiz/generate", { content: topic.content })
      .then((res) => {
        if (
          !Array.isArray(res.data.questions) ||
          res.data.questions.length === 0
        ) {
          throw new Error("No quiz questions generated");
        }
        setQuestions(res.data.questions);
      })
      .catch(() => {
        setError("Failed to generate quiz.");
      })
      .finally(() => setLoading(false));
  }, [topic.content]);

   useEffect(() => {
    if (index >= questions.length && questions.length > 0 && !submitted) {
      API.post("/quiz/submit", {
        topicId: topic.id,
        score,
        total: questions.length,
      }).catch(() => {
        console.error("Failed to submit quiz");
      });

      setSubmitted(true);
    }
  }, [index, questions.length, score, submitted, topic.id]);


  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <p className="text-gray-600">Generating quiz…</p>
      </div>
    );
  }

  /* ---------------- ERROR ---------------- */
  if (error) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={onExit}
          className="border px-4 py-2 rounded"
        >
          Back to Notes
        </button>
      </div>
    );
  }

  /* ---------------- QUIZ COMPLETED ---------------- */
  if (index >= questions.length) {
    
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          Quiz Completed 🎉
        </h2>

        <p className="mb-4">
          Score: {score} / {questions.length}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/revision")}
            className="bg-indigo-600 text-white px-4 py-2 rounded transition transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Go to Revision
          </button>

          <button
            onClick={onExit}
            className="border px-4 py-2 rounded"
          >
            Back to Notes
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- SAFE QUESTION ACCESS ---------------- */
  const q = questions[index];

  if (!q) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <p className="text-red-600 mb-4">
          Failed to load quiz question.
        </p>
        <button
          onClick={onExit}
          className="border px-4 py-2 rounded"
        >
          Back to Notes
        </button>
      </div>
    );
  }

  /* ---------------- HANDLERS ---------------- */
  const handleSelect = (i) => {
    setSelected(i);
    setShowFeedback(true);
    if (i === q.answer) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowFeedback(false);
    setIndex((i) => i + 1);
  };

  /* ---------------- QUIZ UI ---------------- */
  return (
    <>
      <p className="text-sm text-gray-500 mb-2">
        Question {index + 1} of {questions.length}
      </p>

      <div className="w-full bg-gray-200 h-2 rounded mb-4">
        <div
          className="bg-indigo-600 h-2 rounded"
          style={{
            width: `${((index + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-2">
          {topic.title} — Question {index + 1}
        </h2>

        <p className="mb-4">{q.question}</p>

        <div className="space-y-2">
          {q.options.map((opt, i) => {
            let className =
              "block w-full text-left border px-3 py-2 rounded";

            if (showFeedback) {
              if (i === q.answer)
                className += " bg-green-100 border-green-500";
              else if (i === selected)
                className += " bg-red-100 border-red-500";
            }

            return (
              <button
                key={i}
                disabled={showFeedback}
                onClick={() => handleSelect(i)}
                className={className}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="mt-4">
            <p className="font-semibold">
              {selected === q.answer
                ? "Correct ✅"
                : "Incorrect ❌"}
            </p>

            <p className="text-gray-700 mt-1">
              {q.explanation}
            </p>

            <button
              onClick={nextQuestion}
              className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded transition transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </>
  );
}
