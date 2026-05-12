"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState({
    serviceType: "",
    packageTier: "",
    eventDate: "",
    county: "",
  });
  const [currentTime, setCurrentTime] = useState("");
  const [loading, setLoading] = useState(false);

  const kenyaLocations: { [key: string]: string[] } = {
    "Nairobi": ["Makadara", "Westlands", "Kasarani", "Langata"],
    "Kiambu": ["Thika", "Ruiru"],
    "Machakos": ["Machakos Town"],
    "Kajiado": ["Kajiado North"],
    "Nakuru": ["Nakuru Town"],
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-US", { hour12: true }));
    }, 1000);

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    if (!formData.serviceType || !formData.packageTier || !formData.eventDate || !formData.county) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    const deposit = 25000;

    // @ts-ignore
    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: "client@dkdigitalmedia.co.ke",
      amount: deposit * 100,
      currency: "KES",
      ref: `DK-${Math.floor(Math.random() * 1000000000)}`,
      callback: (response: any) => {
        alert(`🎉 Payment successful! Reference: ${response.reference}\n\nWe will contact you shortly.`);
        setFormData({ serviceType: "", packageTier: "", eventDate: "", county: "" });
        setLoading(false);
      },
      onClose: () => setLoading(false),
    });

    handler.openIframe();
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/dk-logo.png" alt="DK" width={48} height={48} className="rounded-full" />
            <div>
              <span className="text-3xl font-bold tracking-tighter">DK DIGITAL LENS</span>
              <p className="text-xs text-amber-300 -mt-1">capturing the moments that matter to you</p>
            </div>
          </div>
          <div className="text-emerald-400 font-mono text-sm tracking-widest">{currentTime}</div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-black via-zinc-900 to-black text-center">
        <h1 className="text-7xl font-bold tracking-tighter mb-4">DK DIGITAL LENS</h1>
        <p className="text-4xl text-amber-300">Capturing Kenya’s most important moments</p>
      </section>

      {/* Popular Packages */}
      <section className="py-16 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Wedding Card */}
            <div className="group bg-zinc-900 rounded-3xl p-8 hover:scale-105 transition-all duration-300">
              <div className="text-emerald-400 text-sm font-semibold mb-2">Most Popular</div>
              <h3 className="text-3xl font-bold">Weddings</h3>
              <p className="text-4xl font-bold text-amber-300 mt-4">KSh 45,000</p>
              <ul className="mt-6 space-y-3 text-zinc-400">
                <li>✓ 8 hours coverage</li>
                <li>✓ 500+ photos + video</li>
                <li>✓ Drone shots (premium)</li>
              </ul>
            </div>

            {/* Funeral Card */}
            <div className="group bg-zinc-900 rounded-3xl p-8 hover:scale-105 transition-all duration-300 border-2 border-amber-300">
              <h3 className="text-3xl font-bold">Funerals (Multi-day)</h3>
              <p className="text-4xl font-bold text-amber-300 mt-4">KSh 55,000</p>
              <ul className="mt-6 space-y-3 text-zinc-400">
                <li>✓ Full day + next day</li>
                <li>✓ Livestream option</li>
                <li>✓ 600+ photos</li>
              </ul>
            </div>

            {/* Graduation Card */}
            <div className="group bg-zinc-900 rounded-3xl p-8 hover:scale-105 transition-all duration-300">
              <h3 className="text-3xl font-bold">Graduations / Corporate</h3>
              <p className="text-4xl font-bold text-amber-300 mt-4">KSh 35,000</p>
              <ul className="mt-6 space-y-3 text-zinc-400">
                <li>✓ 6 hours coverage</li>
                <li>✓ Professional video</li>
                <li>✓ Social media clips</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-20 bg-black">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-zinc-900 rounded-3xl p-10 shadow-2xl">
            <h2 className="text-4xl font-bold text-center mb-10">Book Your Coverage</h2>
            <div className="space-y-8">
              <select name="serviceType" onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-5 text-white focus:ring-2 focus:ring-emerald-500 transition">
                <option value="">Select Service</option>
                <option value="wedding">Wedding</option>
                <option value="funeral">Funeral (Multi-day)</option>
                <option value="graduation">Graduation / School Function</option>
              </select>

              <select name="packageTier" onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-5 text-white focus:ring-2 focus:ring-emerald-500 transition">
                <option value="">Package Tier</option>
                <option value="Basic">Basic</option>
                <option value="Standard">Standard (Recommended)</option>
                <option value="Premium">Premium + Drone/Livestream</option>
              </select>

              <input type="date" name="eventDate" onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-5 text-white focus:ring-2 focus:ring-emerald-500 transition" />

              <select name="county" onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-5 text-white focus:ring-2 focus:ring-emerald-500 transition">
                <option value="">County</option>
                {Object.keys(kenyaLocations).map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 py-7 rounded-3xl text-2xl font-semibold transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Pay 50% Deposit Now"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}