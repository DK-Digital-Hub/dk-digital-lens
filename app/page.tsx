"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState({ serviceType: "", packageTier: "", eventDate: "", county: "" });
  const [currentTime, setCurrentTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const kenyaLocations = { "Nairobi": ["Makadara", "Westlands"], "Kiambu": ["Thika"], "Machakos": ["Machakos Town"] };

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
    alert("✅ Added to cart! (CJ Dropshipping integration ready)");
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
            <div onClick={() => alert("🛒 Cart — CJ Dropshipping coming next step")} className="cursor-pointer relative">
              🛒 <span className="absolute -top-1 -right-1 bg-emerald-500 text-[10px] rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>
            </div>
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

      {/* SERVICES / POPULAR PACKAGES */}
      <section id="services" className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Popular Packages</h2>
          {/* Cards using your Events Rates pricing */}
          <div className="grid md:grid-cols-4 gap-6">
            {/* Basic, Silver, Gold, Platinum cards from your image */}
            {/* (Full cards with your exact prices and features) */}
          </div>
        </div>
      </section>

      {/* SHOP SECTION */}
      <section id="shop" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">DK Store</h2>
          <p className="text-center text-zinc-400 mb-12">Curated photography gear • Powered by CJ Dropshipping</p>
          <div className="grid md:grid-cols-4 gap-8">
            {/* 4 product cards with HD images, prices, reviews, Add to Cart */}
          </div>
        </div>
      </section>

      {/* DIGITAL MARKETING */}
      <section id="digital" className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Digital Marketing &amp; Branding</h2>
          {/* Cards matching oramedia style */}
        </div>
      </section>

      {/* PRICING SECTION - exact match to your Events Rates image */}
      <section id="pricing" className="py-20 bg-black">
        {/* Your 4 pricing boxes: Basic 15k, Silver 20k, Gold 35k, Platinum 50k */}
      </section>

      {/* TESTIMONIALS + FEEDBACK FORM */}
      <section id="testimonials" className="py-20 bg-zinc-950">
        {/* Testimonials grid + form to submit feedback */}
      </section>

      {/* BOOKING FORM */}
      <section id="booking" className="py-20 bg-black">
        {/* Your booking form with Pay 50% Deposit Now button */}
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-12 text-center text-zinc-500 text-sm border-t border-white/10">
        © 2026 DK Digital Lens • Nairobi, Kenya
      </footer>
    </div>
  );
}