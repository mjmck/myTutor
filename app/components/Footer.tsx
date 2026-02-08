export default function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-white/60 text-sm">myTutor AI</span>
          </div>

          {/* Links */}

          {/* Copyright */}
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} myTutor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
