import { useState } from "react";
import TopicCard from "./TopicCard";
import Quiz from "./Quiz";

export default function NotesList({ topics }) {
  const [activeQuiz, setActiveQuiz] = useState(null);
  if (activeQuiz) {
    return <Quiz topic={activeQuiz} onExit={() => setActiveQuiz(null)} />;
  }
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Generated Notes</h2>
      {topics.map((topic, index) => (
        <TopicCard
          key={index}
          topic={topic}
          onQuiz={() => setActiveQuiz(topic)}
        />
      ))}

     
    </div>
  );
}
