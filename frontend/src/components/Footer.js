import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-on-surface text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-semibold">HealSync</span>
            </div>
            <p className="text-white/70 text-sm max-w-md">
              Redefining the medical experience with precision tools and human
              compassion.
            </p>
            <div className="flex gap-4 mt-4">
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-primary cursor-pointer transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </span>
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-primary cursor-pointer transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/60">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-white/70 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/" className="text-sm text-white/70 hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link href="/" className="text-sm text-white/70 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/60">
              Resources
            </h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-white/70 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/" className="text-sm text-white/70 hover:text-white transition-colors">Patient FAQ</Link></li>
              <li><Link href="/" className="text-sm text-white/70 hover:text-white transition-colors">Doctor Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/50">
          &copy; 2024 HealSync. All rights reserved. Precision Care, Compassionate Delivery.
        </div>
      </div>
    </footer>
  );
}
