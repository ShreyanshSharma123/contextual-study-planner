import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import './index.css';
import Revision from './pages/Revision';

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/Revision" element={<Revision />} />
      
    </Routes>
  </BrowserRouter>;
}
