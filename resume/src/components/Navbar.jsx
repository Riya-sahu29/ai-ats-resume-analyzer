// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="logo">AI Resume</div>

//       <div className="nav-links">
//         <Link className="nav-btn" to="/">Home</Link>
//         <Link className="nav-btn primary" to="/analyzer">Analyzer</Link>
//       </div>
//     </nav>
//   );
// }


import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 z-50 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white">
          AI Resume
        </Link>

        {/* Links */}
        <div className="flex gap-6 items-center">
          <Link to="/" className="text-gray-300 hover:text-white transition">
            Home
          </Link>

          <Link 
            to="/analyzer" 
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition font-medium"
          >
            Analyzer
          </Link>
        </div>

      </div>
    </nav>
  );
}
