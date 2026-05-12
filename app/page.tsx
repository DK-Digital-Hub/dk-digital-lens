"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

export default function Home() {
  const [formData, setFormData] = useState({
    serviceType: "",
    packageTier: "",
    eventDate: "",
    county: "",
    subcounty: "",
  });
  const [currentTime, setCurrentTime] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

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
      alert("Please fill all fields before paying");
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
      callback: async (response: any) => {
        await supabase.from("bookings").insert({
          service_type: formData.serviceType,
          package_tier: formData.packageTier,
          event_date: formData.eventDate,
          county: formData.county,
          subcounty: formData.subcounty,
          deposit_paid: true,
          paystack_reference: response.reference,
        });
        alert(`🎉 Payment successful! Reference: ${response.reference}`);
        setFormData({ serviceType: "", packageTier: "", eventDate: "", county: "", subcounty: "" });
      },
      onClose: () => setLoading(false),
    });

    handler.openIframe();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/dk-logo.png" alt="DK Digital Lens" width={48} height={48} className="rounded" />
            <div>
              <span className="text-3xl font-bold tracking-tighter">DK DIGITAL LENS</span>
              <p className="text-xs text-amber-300 -mt-1">capturing the moments that matter to you</p>
            </div>
          </div>
          <div className="text-emerald-400 font-mono text-sm">{currentTime}</div>
        </div>
      </nav>

      <section className="pt-24 pb-12 bg-gradient-to-br from-black to-zinc-900 text-center">
        <h1 className="text-6xl font-bold">DK DIGITAL LENS</h1>
        <p className="text-3xl text-amber-300 mt-4">Book Your Coverage</p>
      </section>

      <section id="booking" className="py-20 bg-zinc-950">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-zinc-900 rounded-3xl p-10">
            <h2 className="text-4xl font-bold text-center mb-10">Book Your Coverage</h2>
            <div className="space-y-8">
              <select name="serviceType" onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white">
                <option value="">Select Service</option>
                <option value="wedding">Wedding</option>
                <option value="funeral">Funeral</option>
                <option value="graduation">Graduation</option>
              </select>

              <select name="packageTier" onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white">
                <option value="">Package Tier</option>
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
              </select>

              <input type="date" name="eventDate" onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white" />

              <select name="county" onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white">
                <option value="">County</option>
                {Object.keys(kenyaLocations).map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 py-6 rounded-3xl text-xl font-semibold transition disabled:opacity-50"
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