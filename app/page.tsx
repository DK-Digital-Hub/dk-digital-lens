// app/page.tsx
"use client";

import { useState } from "react";

const counties = [
  { name: "Nairobi", subcounties: ["Westlands", "Kasarani", "Embakasi", "Starehe", "Langata"] },
  { name: "Kiambu", subcounties: ["Thika", "Ruiru", "Kiambu Town", "Limuru"] },
  { name: "Kajiado", subcounties: ["Kajiado North", "Kajiado Central"] },
  { name: "Nakuru", subcounties: ["Nakuru Town", "Naivasha", "Gilgil"] },
  // Add more counties later if needed
];

export default function Home() {
  const [formData, setFormData] = useState({
    serviceType: "",
    packageTier: "",
    eventDate: "",
    county: "",
    subcounty: "",
    ward: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectedCounty = counties.find(c => c.name === formData.county);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center bg-[radial-gradient(at_center,#1a1a1a_0%,#000_70%)]">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter mb-6">
            DK DIGITAL LENS
          </h1>
          <p className="text-3xl md:text-4xl text-gray-300 mb-10">
            Premium Photography &amp; Videography • Kenya
          </p>
          <a href="#booking" className="inline-block bg-white text-black px-10 py-5 rounded-2xl text-xl font-semibold hover:scale-105 transition">
            Book Your Event Now
          </a>
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

      {/* Booking Form */}
      <section id="booking" className="py-20 bg-black">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Book Your Coverage</h2>
          <div className="bg-zinc-900 rounded-3xl p-10">
            <form className="space-y-8">
              <div>
                <label className="block text-sm mb-2">Service Type</label>
                <select name="serviceType" onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white">
                  <option value="">Select Service</option>
                  <option value="wedding">Wedding</option>
                  <option value="funeral">Funeral (Multi-day)</option>
                  <option value="graduation">Graduation / School Function</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="birthday">Birthday / Baby Shower</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2">Package Tier</label>
                  <select name="packageTier" onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white">
                    <option value="">Select Tier</option>
                    <option value="Basic">Basic</option>
                    <option value="Standard">Standard (Recommended)</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Event Date</label>
                  <input type="date" name="eventDate" onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white" />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Location</label>
                <div className="grid grid-cols-3 gap-4">
                  <select name="county" onChange={handleChange} className="bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white">
                    <option value="">County</option>
                    {counties.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                  <select name="subcounty" onChange={handleChange} className="bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white">
                    <option value="">Sub-county</option>
                    {selectedCounty && selectedCounty.subcounties.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <select name="ward" onChange={handleChange} className="bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white">
                    <option value="">Ward</option>
                    <option value="Any Ward">Any Ward</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert("Booking form ready! Next step: Paystack 50% deposit integration")}
                className="w-full bg-emerald-600 hover:bg-emerald-500 py-6 rounded-3xl text-xl font-semibold transition"
              >
                Continue to 50% Deposit Payment
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-500 text-sm">
        © 2026 DK Digital Lens • Nairobi, Kenya • All content remains private
      </footer>
    </div>
  );
}