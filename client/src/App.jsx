import { BrowserRouter, Route, Link, Routes } from "react-router-dom"
import { Home, CreatePost } from "./pages"
import { logo } from './assets'

export default function App() {
  return (
    <BrowserRouter>
    <header className="flex justify-between w-full
    items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4}">
      <Link to="/">
        <img alt="Logo" src={logo} className="w-28 object-contain" />
      </Link>
      <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] first-letter
      text-white px-4 py-2 rounded-md">
        Create
      </Link>
    </header>
    <main className="sm:px-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
    </BrowserRouter>
  )
}
