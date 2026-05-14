"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState({ serviceType: "", packageTier: "", eventDate: "", county: "" });
  const [currentTime, setCurrentTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [feedback, setFeedback] = useState({ name: "", message: "" });

  const kenyaLocations = { "Nairobi": ["Makadara", "Westlands", "Kasarani"], "Kiambu": ["Thika"], "Machakos": ["Machakos Town"] };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString("en-US", { hour12: true })), 1000);
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
        alert(`🎉 Payment successful! Reference: ${response.reference}`);
        setFormData({ serviceType: "", packageTier: "", eventDate: "", county: "" });
        setLoading(false);
      },
      onClose: () => setLoading(false),
    });
    handler.openIframe();
  };

  const addToCart = () => {
    setCartCount(cartCount + 1);
    alert("✅ Added to cart! CJ Dropshipping ready.");
  };

  const submitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.name && feedback.message) {
      alert("✅ Feedback submitted for moderation.");
      setFeedback({ name: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* NAVBAR - exact oramedia.co.ke style with dropdowns */}
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
            <a href="#services" className="hover:text-emerald-400 transition">Home</a>
            
            {/* Services Dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1 hover:text-emerald-400 transition">Services ▾</button>
              <div className="absolute hidden group-hover:block bg-zinc-900 mt-2 py-4 px-6 rounded-3xl shadow-2xl w-72 text-sm">
                <a href="#" className="block py-2 hover:text-emerald-400">Photography</a>
                <a href="#" className="block py-2 hover:text-emerald-400">Videography</a>
                <a href="#" className="block py-2 hover:text-emerald-400">Drone Services</a>
                <a href="#" className="block py-2 hover:text-emerald-400">Events Coverage</a>
                <a href="#" className="block py-2 hover:text-emerald-400">Graduation & Corporate</a>
              </div>
            </div>

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

      {/* HERO - oramedia style */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-black via-zinc-900 to-black text-center">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter">DK DIGITAL LENS</h1>
        <p className="mt-6 text-3xl text-emerald-400">Innovative, Multimedia Services</p>
        <a href="#booking" className="mt-10 inline-block bg-gradient-to-r from-orange-500 to-purple-600 px-12 py-5 rounded-3xl text-xl font-semibold transition-all active:scale-95">Book Your Coverage</a>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          {/* Service cards */}
        </div>
      </section>

      {/* SHOP SECTION - healthyu.co.ke style dropdown categories */}
      <section id="shop" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">DK Store</h2>
          <p className="text-center text-zinc-400 mb-12">Photography & Videography Gear • CJ Dropshipping</p>
          {/* Product grid with categories */}
        </div>
      </section>

      {/* DIGITAL MARKETING */}
      <section id="digital" className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Digital Marketing & Branding</h2>
          {/* Cards */}
        </div>
      </section>

      {/* PRICING - imageloft style + your competitive prices */}
      <section id="pricing" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Competitive Pricing</h2>
          {/* 4 pricing cards with industry prices */}
        </div>
      </section>

      {/* TESTIMONIALS + FEEDBACK */}
      <section id="testimonials" className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
          {/* Testimonials */}
          <form onSubmit={submitFeedback} className="mt-16 max-w-lg mx-auto">
            {/* Feedback form */}
          </form>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section id="booking" className="py-20 bg-black">
        {/* Your booking form with Pay 50% Deposit button */}
      </section>

      <footer className="bg-black py-12 text-center text-zinc-500">
        © 2026 DK Digital Lens • Nairobi, Kenya
      </footer>
    </div>
  );
}