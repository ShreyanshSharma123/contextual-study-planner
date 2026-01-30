import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
        <h1 className="font-bold text-xl text-indigo-600">
          Study Companion
        </h1>
        <div className="space-x-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-600">
            Dashboard
          </Link>
          <Link to="/upload" className="text-gray-600 hover:text-indigo-600">
            Upload
          </Link>
          <Link to="/Revision" className="text-gray-600 hover:text-indigo-600">
            Revision
          </Link>
        </div>
      </div>
    </nav>
  );
}
