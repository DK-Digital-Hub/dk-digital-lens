// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// ... (keep the same kenyaLocations, currentTime, handleChange etc. from previous version)

export default function Home() {
  // ... (all previous state and functions)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* FIXED NAVBAR, HERO, POPULAR PACKAGES, COMPARISON TABLE — unchanged */}

      {/* NEW: Digital Marketing & Branding Packages */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Digital Marketing & Branding</h2>
          <p className="text-center text-gray-400 mb-12">Grow your business with professional social media, content & branding</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 p-8 rounded-3xl">
              <h3 className="text-2xl font-semibold mb-2">Starter Package</h3>
              <div className="text-5xl font-bold mb-6">KSh 25,000/month</div>
              <ul className="space-y-3 text-sm">
                <li>✓ 12 posts/month (IG + Facebook + X)</li>
                <li>✓ Basic content creation</li>
                <li>✓ Monthly performance report</li>
              </ul>
            </div>

            <div className="bg-zinc-900 p-8 rounded-3xl border-2 border-amber-400">
              <h3 className="text-2xl font-semibold mb-2">Growth Package</h3>
              <div className="text-5xl font-bold mb-6">KSh 45,000/month</div>
              <ul className="space-y-3 text-sm">
                <li>✓ 24 posts/month + Reels</li>
                <li>✓ Professional photography/videography</li>
                <li>✓ Targeted ads management</li>
                <li>✓ Monthly strategy call</li>
              </ul>
            </div>

            <div className="bg-zinc-900 p-8 rounded-3xl">
              <h3 className="text-2xl font-semibold mb-2">Premium Branding</h3>
              <div className="text-5xl font-bold mb-6">KSh 85,000/month</div>
              <ul className="space-y-3 text-sm">
                <li>✓ Full social media management</li>
                <li>✓ Logo redesign + brand guidelines</li>
                <li>✓ Website updates + SEO</li>
                <li>✓ Drone content + livestreams</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Booking form remains the same as before */}

    </div>
  );
}