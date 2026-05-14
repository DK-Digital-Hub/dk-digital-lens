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
        alert(`🎉 Payment successful! Reference: ${response.reference}\n\nThank you! We will contact you shortly.`);
        setFormData({ serviceType: "", packageTier: "", eventDate: "", county: "" });
        setLoading(false);
      },
      onClose: () => setLoading(false),
    });
    handler.openIframe();
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/dk-logo.png" alt="DK Digital Lens" width={52} height={52} className="rounded-full" />
            <div>
              <span className="text-3xl font-bold tracking-tighter">DK DIGITAL LENS</span>
              <p className="text-xs text-amber-300 -mt-1">capturing the moments that matter to you</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#services" className="hover:text-amber-300 transition">Services</a>
            <a href="#store" className="hover:text-amber-300 transition">Store</a>
            <a href="#booking" className="hover:text-amber-300 transition">Book Now</a>
          </div>
          <div className="text-emerald-400 font-mono text-sm tracking-widest">{currentTime}</div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-black via-zinc-900 to-black text-center">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none">DK DIGITAL LENS</h1>
        <p className="mt-6 text-3xl text-amber-300 max-w-2xl mx-auto">Premium Photography • Videography • Digital Branding • Kenya’s Moments</p>
        <a href="#booking" className="mt-10 inline-block bg-emerald-600 hover:bg-emerald-500 px-10 py-4 rounded-3xl text-xl font-semibold transition-all active:scale-95">Book Your Coverage</a>
      </section>

      {/* POPULAR PACKAGES */}
      <section className="py-20 bg-zinc-950" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 rounded-3xl p-8 hover:scale-105 transition-all duration-300 group">
              <div className="text-emerald-400 text-sm font-semibold mb-2">MOST POPULAR</div>
              <h3 className="text-3xl font-bold">Weddings</h3>
              <p className="text-4xl font-bold text-amber-300 mt-4">KSh 45,000</p>
              <ul className="mt-8 space-y-4 text-zinc-400">
                <li className="flex items-center gap-3">✓ 8 hours coverage</li>
                <li className="flex items-center gap-3">✓ 500+ photos + video</li>
                <li className="flex items-center gap-3">✓ Drone shots (premium)</li>
              </ul>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-8 hover:scale-105 transition-all duration-300 border-2 border-amber-300">
              <h3 className="text-3xl font-bold">Funerals (Multi-day)</h3>
              <p className="text-4xl font-bold text-amber-300 mt-4">KSh 55,000</p>
              <ul className="mt-8 space-y-4 text-zinc-400">
                <li className="flex items-center gap-3">✓ Full day + next day</li>
                <li className="flex items-center gap-3">✓ Livestream option</li>
                <li className="flex items-center gap-3">✓ 600+ photos</li>
              </ul>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-8 hover:scale-105 transition-all duration-300 group">
              <h3 className="text-3xl font-bold">Graduations / Corporate</h3>
              <p className="text-4xl font-bold text-amber-300 mt-4">KSh 35,000</p>
              <ul className="mt-8 space-y-4 text-zinc-400">
                <li className="flex items-center gap-3">✓ 6 hours coverage</li>
                <li className="flex items-center gap-3">✓ Professional video</li>
                <li className="flex items-center gap-3">✓ Social media clips</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* STORE SECTION - CJ Dropshipping Style */}
      <section className="py-20 bg-black" id="store">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">DK Store</h2>
          <p className="text-center text-zinc-400 mb-12">Curated gear &amp; Kenya-inspired products — shipped fast via CJ Dropshipping</p>
          <div className="grid md:grid-cols-4 gap-8">
            {/* Product 1 */}
            <div className="bg-zinc-900 rounded-3xl overflow-hidden group">
              <Image src="https://picsum.photos/id/1015/600/400" alt="Camera Strap" width={600} height={400} className="w-full h-56 object-cover group-hover:scale-110 transition duration-500" />
              <div className="p-6">
                <h4 className="font-semibold">Premium Leather Camera Strap</h4>
                <p className="text-emerald-400 text-2xl font-bold mt-2">KSh 2,800</p>
                <div className="flex text-yellow-400 text-xl mt-2">★★★★★</div>
                <p className="text-xs text-zinc-500 mt-1">"Best strap I’ve ever used!" – Jane M.</p>
                <button className="mt-6 w-full bg-white text-black py-4 rounded-2xl font-semibold hover:bg-amber-300 transition">Add to Cart</button>
              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-zinc-900 rounded-3xl overflow-hidden group">
              <Image src="https://picsum.photos/id/160/600/400" alt="Kenya Flag Hoodie" width={600} height={400} className="w-full h-56 object-cover group-hover:scale-110 transition duration-500" />
              <div className="p-6">
                <h4 className="font-semibold">Kenya Flag Premium Hoodie</h4>
                <p className="text-emerald-400 text-2xl font-bold mt-2">KSh 4,500</p>
                <div className="flex text-yellow-400 text-xl mt-2">★★★★☆</div>
                <p className="text-xs text-zinc-500 mt-1">"Perfect for events!" – Michael K.</p>
                <button className="mt-6 w-full bg-white text-black py-4 rounded-2xl font-semibold hover:bg-amber-300 transition">Add to Cart</button>
              </div>
            </div>

            {/* Product 3 */}
            <div className="bg-zinc-900 rounded-3xl overflow-hidden group">
              <Image src="https://picsum.photos/id/201/600/400" alt="Ring Light Kit" width={600} height={400} className="w-full h-56 object-cover group-hover:scale-110 transition duration-500" />
              <div className="p-6">
                <h4 className="font-semibold">12" Ring Light + Tripod Kit</h4>
                <p className="text-emerald-400 text-2xl font-bold mt-2">KSh 6,200</p>
                <div className="flex text-yellow-400 text-xl mt-2">★★★★★</div>
                <p className="text-xs text-zinc-500 mt-1">"Game changer for content!" – Sarah O.</p>
                <button className="mt-6 w-full bg-white text-black py-4 rounded-2xl font-semibold hover:bg-amber-300 transition">Add to Cart</button>
              </div>
            </div>

            {/* Product 4 */}
            <div className="bg-zinc-900 rounded-3xl overflow-hidden group">
              <Image src="https://picsum.photos/id/251/600/400" alt="Drone Mini" width={600} height={400} className="w-full h-56 object-cover group-hover:scale-110 transition duration-500" />
              <div className="p-6">
                <h4 className="font-semibold">Mini Drone (4K Camera)</h4>
                <p className="text-emerald-400 text-2xl font-bold mt-2">KSh 18,900</p>
                <div className="flex text-yellow-400 text-xl mt-2">★★★★☆</div>
                <p className="text-xs text-zinc-500 mt-1">"Amazing quality for the price" – Peter N.</p>
                <button className="mt-6 w-full bg-white text-black py-4 rounded-2xl font-semibold hover:bg-amber-300 transition">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section id="booking" className="py-20 bg-zinc-950">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-zinc-900 rounded-3xl p-10">
            <h2 className="text-4xl font-bold text-center mb-10">Book Your Coverage</h2>
            <div className="space-y-8">
              <select name="serviceType" onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-5 text-white focus:ring-2 focus:ring-emerald-500 transition">
                <option value="">Select Service</option>
                <option value="wedding">Wedding</option>
                <option value="funeral">Funeral (Multi-day)</option>
                <option value="graduation">Graduation / Corporate</option>
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
              <button onClick={handlePayment} disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 py-7 rounded-3xl text-2xl font-semibold transition-all duration-300 disabled:opacity-50">
                {loading ? "Processing..." : "Pay 50% Deposit Now"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center text-zinc-500 text-sm">
          © 2026 DK Digital Lens • Nairobi, Kenya • All Rights Reserved
        </div>
      </footer>
    </div>
  );
}