// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center bg-[radial-gradient(at_center,#1a1a1a_0%,#000_70%)]">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter mb-6">
            DK DIGITAL LENS
          </h1>
          <p className="text-3xl md:text-4xl text-gray-300 mb-10">
            Capturing the moments that matter to you 
          </p>
          <Link
            href="#booking"
            className="inline-block bg-white text-black px-10 py-5 rounded-2xl text-xl font-semibold hover:scale-105 transition"
          >
            Book Your Event Now
          </Link>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 p-8 rounded-3xl">
              <h3 className="text-2xl font-semibold">Weddings</h3>
              <div className="text-5xl font-bold my-4">KSh 45,000</div>
              <p className="text-gray-400">Basic • 6 hours • 400 photos + video</p>
            </div>
            <div className="bg-zinc-900 p-8 rounded-3xl border-2 border-amber-400">
              <h3 className="text-2xl font-semibold">Funerals (Multi-day)</h3>
              <div className="text-5xl font-bold my-4">KSh 55,000</div>
              <p className="text-gray-400">Standard • Church + Burial coverage</p>
            </div>
            <div className="bg-zinc-900 p-8 rounded-3xl">
              <h3 className="text-2xl font-semibold">Graduations</h3>
              <div className="text-5xl font-bold my-4">KSh 28,000</div>
              <p className="text-gray-400">Full day • Group + individual shots</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="py-20 bg-black">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Book Your Coverage</h2>
          <div className="bg-zinc-900 rounded-3xl p-10">
            <form className="space-y-8">
              <div>
                <label className="block text-sm mb-2">Service Type</label>
                <select className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white">
                  <option>Wedding</option>
                  <option>Funeral (Multi-day)</option>
                  <option>Graduation / School Function</option>
                  <option>Corporate Event</option>
                  <option>Birthday / Baby Shower</option>
                  <option>Sports Event</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2">Package Tier</label>
                  <select className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white">
                    <option>Basic</option>
                    <option>Standard (Recommended)</option>
                    <option>Premium</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Event Date</label>
                  <input type="date" className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white" />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Location (County → Sub-county → Ward)</label>
                <div className="grid grid-cols-3 gap-4">
                  <select className="bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white">
                    <option>Nairobi</option>
                    <option>Kiambu</option>
                    <option>Kajiado</option>
                    {/* More counties will be added in next step */}
                  </select>
                  <select className="bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white">
                    <option>Select Sub-county</option>
                  </select>
                  <select className="bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white">
                    <option>Select Ward</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                className="w-full bg-emerald-600 hover:bg-emerald-500 py-6 rounded-3xl text-xl font-semibold transition"
              >
                Pay 50% Deposit with M-Pesa / Card (KSh XX,XXX)
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-500 text-sm">
        © 2026 DK Digital Lens • Nairobi, Kenya
      </footer>
    </div>
  );
}