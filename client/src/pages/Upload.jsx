import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import NotesList from "../components/NotesList";
import API from "../services/api";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setError(null);

      const res = await API.post("/notes/upload", formData);
      setTopics(res.data.topics || []);
    } catch(err) {
     setError(
    err.response?.data?.error ||
    "Failed to process PDF"
  );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">
          Upload Your Notes
        </h1>
        <p className="text-gray-600 mt-2">
          Upload a PDF and we’ll convert it into smart notes and quizzes.
        </p>
      </div>

      {/* Upload Card */}
      <div className="bg-white p-8 rounded-2xl shadow-sm max-w-xl">
        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">
            Select PDF file
          </span>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-2 block w-full text-sm
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-medium
                       file:bg-indigo-50 file:text-indigo-600
                       hover:file:bg-indigo-100"
          />
        </label>

        {/* File preview */}
        {file && (
          <p className="text-sm text-gray-600 mb-4">
            📄 {file.name}
          </p>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700
                     text-white px-4 py-2 rounded-lg
                     transition transform hover:scale-[1.02]
                     active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? "Processing your notes…" : "Upload & Generate Notes"}
        </button>

        {/* Status Messages */}
        {error && (
          <p className="text-red-600 text-sm mt-3">
            {error}
          </p>
        )}

        {!loading && topics.length === 0 && (
          <p className="text-gray-500 text-sm mt-6">
            ✨ Upload a PDF to generate smart study notes.
          </p>
        )}
      </div>

      {/* Notes Output */}
      {topics.length > 0 && (
        <div className="mt-10">
          <NotesList topics={topics} />
        </div>
      )}
    </MainLayout>
  );
}
