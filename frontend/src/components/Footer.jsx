// export default function Footer() {
//   return (
//     <footer className="footer">
//       <p>Built by Riya • AI Resume Analyzer © 2026</p>
//     </footer>
//   );
// }


import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">

        {/* Left side */}
        <p className="text-sm text-center md:text-left">
          Built by <span className="text-white font-semibold">Riya</span> • AI Resume Analyzer © 2026
        </p>

        {/* Right side links */}
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition">
            Terms
          </a>
          <a href="#" className="hover:text-white transition">
            Contact
          </a>
        </div>

      </div>
    </footer>
  );
}
