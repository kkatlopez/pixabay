import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageList from './components/ImageList';
import ImageDetail from './components/ImageDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ImageList />} />
        <Route path="/images" element={<ImageList />} />
        <Route path="/:id" element={<ImageDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
