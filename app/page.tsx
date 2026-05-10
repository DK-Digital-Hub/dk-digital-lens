// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const kenyaLocations: { [key: string]: string[] } = {
  "Nairobi": ["Westlands", "Kasarani", "Embakasi Central", "Embakasi East", "Embakasi North", "Embakasi South", "Embakasi West", "Langata", "Dagoretti North", "Dagoretti South", "Makadara", "Ruaraka", "Starehe"],
  "Kiambu": ["Thika", "Ruiru", "Kiambu Town", "Limuru", "Githunguri", "Lari", "Kikuyu", "Kabete"],
  "Machakos": ["Machakos Town", "Mwala", "Kangundo", "Matungulu", "Kathiani"],
  "Kajiado": ["Kajiado North", "Kajiado Central", "Kajiado South", "Isinya", "Loitokitok"],
  "Nakuru": ["Nakuru Town", "Naivasha", "Gilgil", "Molo", "Njoro", "Subukia", "Bahati"],
  "Narok": ["Narok North", "Narok South", "Narok East", "Narok West"],
  "Nyandarua": ["Ol Kalou", "Kinangop", "Kipipiri", "Ndaragwa"],
  "Nyeri": ["Nyeri Town", "Mathira East", "Mathira West", "Mukurweini", "Tetu"],
  "Kirinyaga": ["Kerugoya", "Mwea East", "Mwea West"],
  "Murang'a": ["Murang'a Town", "Kangema", "Kigumo", "Kiharu", "Gatanga"],
  "Embu": ["Embu Town", "Mbeere North", "Mbeere South", "Runyenjes"],
  "Tharaka Nithi": ["Chuka", "Tharaka South", "Tharaka North", "Maara"],
  "Meru": ["Meru Town", "Imenti North", "Imenti South", "Imenti Central", "Tigania East", "Tigania West"],
  "Isiolo": ["Isiolo Town", "Garbatulla"],
  "Marsabit": ["Marsabit Town", "Moyale", "North Horr"],
  "Samburu": ["Samburu Central", "Samburu North", "Samburu East"],
  "Laikipia": ["Laikipia West", "Laikipia East", "Laikipia North"],
  "Baringo": ["Baringo Central", "Baringo North", "Baringo South", "Tiaty"],
  "Elgeyo Marakwet": ["Keiyo North", "Keiyo South", "Marakwet East", "Marakwet West"],
  "Nandi": ["Nandi Hills", "Nandi East", "Nandi West", "Emgwen"],
  "Uasin Gishu": ["Eldoret Town", "Turbo", "Soy", "Kapseret"],
  "Trans Nzoia": ["Kitale", "Endebess", "Saboti"],
  "West Pokot": ["Kapenguria", "Pokot South"],
  "Turkana": ["Lodwar", "Turkana West", "Turkana South"],
  "Kakamega": ["Kakamega Town", "Lurambi", "Shinyalu", "Mumias"],
  "Vihiga": ["Vihiga Town", "Luanda", "Sabatia"],
  "Bungoma": ["Bungoma Town", "Kimilili", "Webuye"],
  "Busia": ["Busia Town", "Nambale"],
  "Siaya": ["Siaya Town", "Bondo", "Gem"],
  "Kisumu": ["Kisumu Central", "Kisumu West", "Kisumu East"],
  "Homabay": ["Homabay Town", "Ndhiwa", "Mbita"],
  "Migori": ["Migori Town", "Rongo", "Awendo"],
  "Kisii": ["Kisii Town", "Gucha", "Nyamache"],
  "Nyamira": ["Nyamira Town", "Borabu"],
  "Kericho": ["Kericho Town", "Bureti", "Belgut"],
  "Bomet": ["Bomet Town", "Sotik"],
  "Mombasa": ["Mombasa Island", "Likoni", "Changamwe"],
  "Kwale": ["Kwale Town", "Kinango"],
  "Kilifi": ["Kilifi Town", "Malindi", "Magarini"],
  "Tana River": ["Hola", "Garsen"],
  "Lamu": ["Lamu Town", "Lamu West"],
  "Taita Taveta": ["Voi", "Taveta", "Mwatate"],
  "Garissa": ["Garissa Town", "Dadaab"],
  "Wajir": ["Wajir Town"],
  "Mandera": ["Mandera Town"],
};

export default function Home() {
  const [formData, setFormData] = useState({
    serviceType: "",
    packageTier: "",
    eventDate: "",
    county: "",
    subcounty: "",
  });

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectedSubcounties = kenyaLocations[formData.county] || [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* FIXED NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/dk-logo.png" alt="DK Digital Lens" width={48} height={48} className="rounded" />
            <div>
              <span className="text-3xl font-bold tracking-tighter">DK DIGITAL LENS</span>
              <p className="text-xs text-amber-300 -mt-1">capturing the moments that matter to you</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-2xl text-sm font-mono">
              <span className="text-emerald-400">🕒</span>
              {currentTime}
            </div>
            <a href="#booking" className="bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:bg-amber-300 transition">
              Book Now
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black relative pt-20">
        <div className="max-w-5xl mx-auto text-center px-6 z-10">
          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter mb-6">DK DIGITAL LENS</h1>
          <p className="text-3xl md:text-4xl text-amber-300 mb-12">Capturing Kenya&apos;s most important moments</p>
          <a href="#booking" className="inline-block bg-emerald-500 hover:bg-emerald-400 px-12 py-6 rounded-3xl text-2xl font-semibold transition">
            Book Your Event
          </a>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-4">Popular Packages</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-zinc-900 p-8 rounded-3xl hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-2">Weddings</h3>
              <div className="text-5xl font-bold mb-6">KSh 45,000</div>
              <p className="text-gray-400">Basic • 6 hours • 400 photos + video</p>
            </div>

            <div className="bg-zinc-900 p-8 rounded-3xl border-2 border-amber-400 hover:scale-105 transition-all duration-300 relative">
              <div className="absolute -top-3 right-6 bg-amber-400 text-black text-xs font-bold px-4 py-1 rounded-full">Most Popular</div>
              <h3 className="text-2xl font-semibold mb-2">Funerals (Multi-day)</h3>
              <div className="text-5xl font-bold mb-6">KSh 55,000</div>
              <p className="text-gray-400">Standard • Church + Journey + Burial</p>
            </div>

            <div className="bg-zinc-900 p-8 rounded-3xl hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-2">Graduations</h3>
              <div className="text-5xl font-bold mb-6">KSh 28,000</div>
              <p className="text-gray-400">Full day • Group + individual shots</p>
            </div>
          </div>
        </div>
      </section>

      {/* Package Comparison Table */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Package Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900">
                  <th className="p-6">Feature</th>
                  <th className="p-6 text-center">Basic</th>
                  <th className="p-6 text-center">Standard</th>
                  <th className="p-6 text-center">Premium</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-zinc-800 hover:bg-zinc-900 transition-colors">
                  <td className="p-6 font-medium">Hours of coverage</td>
                  <td className="p-6 text-center">6 hrs</td>
                  <td className="p-6 text-center">10 hrs</td>
                  <td className="p-6 text-center">Full day</td>
                </tr>
                <tr className="border-b border-zinc-800 hover:bg-zinc-900 transition-colors">
                  <td className="p-6 font-medium">Edited photos</td>
                  <td className="p-6 text-center">400</td>
                  <td className="p-6 text-center">800</td>
                  <td className="p-6 text-center">1,200</td>
                </tr>
                <tr className="border-b border-zinc-800 hover:bg-zinc-900 transition-colors">
                  <td className="p-6 font-medium">Highlight video</td>
                  <td className="p-6 text-center">10 min</td>
                  <td className="p-6 text-center">20 min</td>
                  <td className="p-6 text-center">30 min + teaser</td>
                </tr>
                <tr className="border-b border-zinc-800 hover:bg-zinc-900 transition-colors">
                  <td className="p-6 font-medium">Drone / Livestream</td>
                  <td className="p-6 text-center text-gray-500">—</td>
                  <td className="p-6 text-center text-gray-500">—</td>
                  <td className="p-6 text-center text-emerald-400 font-semibold">Included</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Digital Marketing & Branding - Lively & Colorful */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-4">Digital Marketing &amp; Branding</h2>
          <p className="text-center text-gray-400 mb-12">Grow your business with professional social media, content &amp; branding</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 p-8 rounded-3xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-emerald-400/30 hover:border-emerald-400 group">
              <div className="text-emerald-400 text-sm font-semibold mb-2">STARTER</div>
              <h3 className="text-2xl font-semibold mb-2">Starter Package</h3>
              <div className="text-5xl font-bold mb-6">KSh 25,000<span className="text-base font-normal text-gray-400">/month</span></div>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span>12 posts/month (IG + FB + X)</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span>Basic content creation</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span>Monthly performance report</li>
              </ul>
            </div>

            <div className="bg-zinc-900 p-8 rounded-3xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-amber-400 group relative">
              <div className="absolute -top-3 right-6 bg-amber-400 text-black text-xs font-bold px-4 py-1 rounded-full">RECOMMENDED</div>
              <div className="text-amber-400 text-sm font-semibold mb-2">GROWTH</div>
              <h3 className="text-2xl font-semibold mb-2">Growth Package</h3>
              <div className="text-5xl font-bold mb-6">KSh 45,000<span className="text-base font-normal text-gray-400">/month</span></div>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-2"><span className="text-amber-400">✓</span>24 posts/month + Reels</li>
                <li className="flex items-start gap-2"><span className="text-amber-400">✓</span>Professional photography/videography</li>
                <li className="flex items-start gap-2"><span className="text-amber-400">✓</span>Targeted ads management</li>
                <li className="flex items-start gap-2"><span className="text-amber-400">✓</span>Monthly strategy call</li>
              </ul>
            </div>

            <div className="bg-zinc-900 p-8 rounded-3xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-purple-400/30 hover:border-purple-400 group">
              <div className="text-purple-400 text-sm font-semibold mb-2">PREMIUM</div>
              <h3 className="text-2xl font-semibold mb-2">Premium Branding</h3>
              <div className="text-5xl font-bold mb-6">KSh 85,000<span className="text-base font-normal text-gray-400">/month</span></div>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-2"><span className="text-purple-400">✓</span>Full social media management</li>
                <li className="flex items-start gap-2"><span className="text-purple-400">✓</span>Logo redesign + brand guidelines</li>
                <li className="flex items-start gap-2"><span className="text-purple-400">✓</span>Website updates + SEO</li>
                <li className="flex items-start gap-2"><span className="text-purple-400">✓</span>Drone content + livestreams</li>
              </ul>
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
                    <option value="Premium">Premium (+ Drone &amp; Livestream)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Event Date</label>
                  <input type="date" name="eventDate" onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white" />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Location</label>
                <div className="grid grid-cols-2 gap-4">
                  <select name="county" onChange={handleChange} className="bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white">
                    <option value="">County</option>
                    {Object.keys(kenyaLocations).map(county => <option key={county} value={county}>{county}</option>)}
                  </select>
                  <select name="subcounty" onChange={handleChange} className="bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white">
                    <option value="">Sub-county</option>
                    {selectedSubcounties.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                  </select>
                </div>
              </div>

              <p className="text-xs text-gray-400 text-center">
                For events outside Nairobi, client provides transport &amp; accommodation
              </p>

              <button
                type="button"
                className="w-full bg-emerald-600 hover:bg-emerald-500 py-6 rounded-3xl text-xl font-semibold transition"
              >
                Continue to 50% Deposit Payment
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Scroll to top */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-8 right-8 bg-white/10 hover:bg-white/20 p-4 rounded-full text-2xl transition">
        ↑
      </button>

      {/* Custom quote bubble */}
      <button onClick={() => alert("Custom quote request coming soon")} className="fixed bottom-8 left-8 bg-amber-400 text-black px-6 py-3 rounded-3xl text-sm font-semibold shadow-2xl hover:scale-105 transition">
        💬 Request Custom Quote
      </button>
    </div>
  );
}