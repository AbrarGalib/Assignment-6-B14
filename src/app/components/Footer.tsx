import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-darkbg border-t border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 md:px-8 py-8 text-gray-400 text-sm">
        <div className="flex items-center gap-2 font-bold text-white uppercase mb-4 sm:mb-0">
          <Image 
            src="/assets/logo.png" 
            alt="FitLog Logo" 
            width={20} 
            height={20} 
            className="w-5 h-5 object-contain" 
          />
          FITLOG
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}