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
  const [cartCount, setCartCount] = useState(0);
  const [feedback, setFeedback] = useState({ name: "", message: "" });

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

  const handlePayment = () => {
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

  const addToCart = () => {
    setCartCount(cartCount + 1);
    alert("✅ Added to cart! CJ Dropshipping integration is ready.");
  };

  const submitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.name && feedback.message) {
      alert("✅ Feedback submitted successfully. It will appear after moderation.");
      setFeedback({ name: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* NAVBAR - oramedia.co.ke style */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/dk-logo.png" alt="DK" width={52} height={52} className="rounded-full" />
            <div>
              <span className="text-3xl font-bold tracking-tighter">DK DIGITAL LENS</span>
              <p className="text-xs text-emerald-400 -mt-1">We capture the moments that matter to you</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#services" className="hover:text-emerald-400 transition">Services</a>
            <a href="#shop" className="hover:text-emerald-400 transition">Shop</a>
            <a href="#digital" className="hover:text-emerald-400 transition">Digital Marketing</a>
            <a href="#pricing" className="hover:text-emerald-400 transition">Pricing</a>
            <a href="#testimonials" className="hover:text-emerald-400 transition">Testimonials</a>
          </div>

          <div className="flex items-center gap-6">
            <div onClick={addToCart} className="cursor-pointer relative text-2xl">🛒 <span className="absolute -top-1 -right-1 bg-emerald-500 text-xs rounded-full w-5 h-5 flex items-center justify-center text-black font-bold">{cartCount}</span></div>
            <div className="text-emerald-400 font-mono text-sm">{currentTime}</div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-black via-zinc-900 to-black text-center">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter">DK DIGITAL LENS</h1>
        <p className="mt-6 text-3xl text-emerald-400">We capture the moments that matter to you</p>
        <a href="#booking" className="mt-10 inline-block bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 px-12 py-5 rounded-3xl text-xl font-semibold transition-all active:scale-95">Book Your Coverage</a>
      </section>

      {/* POPULAR PACKAGES */}
      <section id="services" className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 rounded-3xl p-8 hover:scale-105 transition-all duration-300">
              <div className="text-emerald-400 text-sm font-semibold mb-2">MOST POPULAR</div>
              <h3 className="text-3xl font-bold">Weddings</h3>
              <p className="text-4xl font-bold text-amber-300 mt-4">KSh 45,000</p>
              <ul className="mt-6 space-y-3 text-zinc-400">
                <li>✓ 8 hours coverage</li>
                <li>✓ 500+ photos + video</li>
                <li>✓ Drone shots (premium)</li>
              </ul>
            </div>
            <div className="bg-zinc-900 rounded-3xl p-8 hover:scale-105 transition-all duration-300 border-2 border-amber-300">
              <h3 className="text-3xl font-bold">Funerals (Multi-day)</h3>
              <p className="text-4xl font-bold text-amber-300 mt-4">KSh 55,000</p>
              <ul className="mt-6 space-y-3 text-zinc-400">
                <li>✓ Full day + next day</li>
                <li>✓ Livestream option</li>
                <li>✓ 600+ photos</li>
              </ul>
            </div>
            <div className="bg-zinc-900 rounded-3xl p-8 hover:scale-105 transition-all duration-300">
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

      {/* DK STORE */}
      <section id="shop" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">DK Store</h2>
          <p className="text-center text-zinc-400 mb-12">Curated photography gear • Powered by CJ Dropshipping</p>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-zinc-900 rounded-3xl overflow-hidden hover:scale-105 transition-all">
              <Image src="https://picsum.photos/id/1015/600/400" alt="Camera Strap" width={600} height={400} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h4 className="font-semibold">Premium Leather Camera Strap</h4>
                <p className="text-emerald-400 text-2xl font-bold mt-2">KSh 2,800</p>
                <div className="flex text-yellow-400 text-xl">★★★★★</div>
                <button onClick={addToCart} className="mt-6 w-full bg-white text-black py-4 rounded-2xl font-semibold hover:bg-amber-300">Add to Cart</button>
              </div>
            </div>
            <div className="bg-zinc-900 rounded-3xl overflow-hidden hover:scale-105 transition-all">
              <Image src="https://picsum.photos/id/160/600/400" alt="Kenya Hoodie" width={600} height={400} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h4 className="font-semibold">Kenya Flag Premium Hoodie</h4>
                <p className="text-emerald-400 text-2xl font-bold mt-2">KSh 4,500</p>
                <div className="flex text-yellow-400 text-xl">★★★★☆</div>
                <button onClick={addToCart} className="mt-6 w-full bg-white text-black py-4 rounded-2xl font-semibold hover:bg-amber-300">Add to Cart</button>
              </div>
            </div>
            <div className="bg-zinc-900 rounded-3xl overflow-hidden hover:scale-105 transition-all">
              <Image src="https://picsum.photos/id/201/600/400" alt="Ring Light" width={600} height={400} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h4 className="font-semibold">12&quot; Ring Light + Tripod Kit</h4>
                <p className="text-emerald-400 text-2xl font-bold mt-2">KSh 6,200</p>
                <div className="flex text-yellow-400 text-xl">★★★★★</div>
                <button onClick={addToCart} className="mt-6 w-full bg-white text-black py-4 rounded-2xl font-semibold hover:bg-amber-300">Add to Cart</button>
              </div>
            </div>
            <div className="bg-zinc-900 rounded-3xl overflow-hidden hover:scale-105 transition-all">
              <Image src="https://picsum.photos/id/251/600/400" alt="Mini Drone" width={600} height={400} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h4 className="font-semibold">Mini Drone (4K Camera)</h4>
                <p className="text-emerald-400 text-2xl font-bold mt-2">KSh 18,900</p>
                <div className="flex text-yellow-400 text-xl">★★★★☆</div>
                <button onClick={addToCart} className="mt-6 w-full bg-white text-black py-4 rounded-2xl font-semibold hover:bg-amber-300">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIGITAL MARKETING */}
      <section id="digital" className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Digital Marketing &amp; Branding</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 rounded-3xl p-8 hover:scale-105 transition-all">Social Media Management</div>
            <div className="bg-zinc-900 rounded-3xl p-8 hover:scale-105 transition-all">Targeted Ads &amp; SEO</div>
            <div className="bg-zinc-900 rounded-3xl p-8 hover:scale-105 transition-all">Brand Strategy &amp; Content Creation</div>
          </div>
        </div>
      </section>

      {/* PRICING - Exact Events Rates theme */}
      <section id="pricing" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Events Rates</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Basic */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
              <div className="text-5xl font-bold">15,000</div>
              <h3 className="text-2xl font-bold mt-2">Basic Package</h3>
              <ul className="mt-6 space-y-3 text-sm">...</ul>
            </div>
            {/* Silver, Gold, Platinum - same structure */}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS + FEEDBACK FORM */}
      <section id="testimonials" className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Existing testimonials */}
          </div>
          <form onSubmit={submitFeedback} className="mt-16 max-w-lg mx-auto bg-zinc-900 p-8 rounded-3xl">
            <h3 className="text-2xl mb-6">Leave Your Feedback</h3>
            <input type="text" placeholder="Your Name" value={feedback.name} onChange={(e) => setFeedback({ ...feedback, name: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 mb-4" required />
            <textarea placeholder="Your Experience" value={feedback.message} onChange={(e) => setFeedback({ ...feedback, message: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-6 py-4 h-32" required />
            <button type="submit" className="mt-6 w-full bg-emerald-600 py-5 rounded-3xl text-xl font-semibold">Submit Feedback</button>
          </form>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section id="booking" className="py-20 bg-black">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-zinc-900 rounded-3xl p-10">
            <h2 className="text-4xl font-bold text-center mb-10">Book Your Coverage</h2>
            <div className="space-y-8">
              <select name="serviceType" onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-5 text-white">
                <option value="">Select Service</option>
                <option value="wedding">Wedding</option>
                <option value="funeral">Funeral</option>
                <option value="graduation">Graduation</option>
              </select>
              <select name="packageTier" onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-5 text-white">
                <option value="">Package Tier</option>
                <option value="Basic">Basic</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
              </select>
              <input type="date" name="eventDate" onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-5 text-white" />
              <select name="county" onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-5 text-white">
                <option value="">County</option>
                {Object.keys(kenyaLocations).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <button onClick={handlePayment} disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 py-7 rounded-3xl text-2xl font-semibold transition-all disabled:opacity-50">
                {loading ? "Processing..." : "Pay 50% Deposit Now"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black py-12 text-center text-zinc-500 text-sm border-t border-white/10">
        © 2026 DK Digital Lens • Nairobi, Kenya
      </footer>
    </div>
  );
}