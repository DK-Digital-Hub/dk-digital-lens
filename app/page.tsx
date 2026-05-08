// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const kenyaLocations: { [key: string]: string[] } = {
  "Nairobi": ["Makadara", "Westlands", "Kasarani", "Embakasi Central", "Embakasi East", "Embakasi North", "Embakasi South", "Embakasi West", "Langata", "Dagoretti North", "Dagoretti South", "Ruaraka", "Starehe"],
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

const travelFeeMap: { [key: string]: number } = {
  "Nairobi": 0,
  "Kiambu": 3500,
  "Machakos": 4500,
  "Kajiado": 5000,
  "Nakuru": 8000,
  "Narok": 9500,
  "Nyandarua": 11000,
  "Nyeri": 12000,
  "Kirinyaga": 13000,
  "Murang'a": 9000,
  "Embu": 15000,
  "Tharaka Nithi": 16000,
  "Meru": 17000,
  "Isiolo": 22000,
  "Marsabit": 35000,
  "Samburu": 28000,
  "Laikipia": 18000,
  "Baringo": 20000,
  "Elgeyo Marakwet": 21000,
  "Nandi": 22000,
  "Uasin Gishu": 23000,
  "Trans Nzoia": 25000,
  "West Pokot": 28000,
  "Turkana": 38000,
  "Kakamega": 32000,
  "Vihiga": 33000,
  "Bungoma": 34000,
  "Busia": 36000,
  "Siaya": 37000,
  "Kisumu": 38000,
  "Homabay": 40000,
  "Migori": 42000,
  "Kisii": 41000,
  "Nyamira": 43000,
  "Kericho": 25000,
  "Bomet": 27000,
  "Mombasa": 45000,
  "Kwale": 47000,
  "Kilifi": 48000,
  "Tana River": 50000,
  "Lamu": 55000,
  "Taita Taveta": 52000,
  "Garissa": 45000,
  "Wajir": 55000,
  "Mandera": 65000,
};

export default function Home() {
  const [formData, setFormData] = useState({
    serviceType: "",
    packageTier: "",
    eventDate: "",
    county: "",
    subcounty: "",
    ward: "",
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
  const travelFee = travelFeeMap[formData.county] || 6000;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* FIXED NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="DK Digital Lens" width={48} height={48} className="rounded" />
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
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black relative">
        <div className="max-w-5xl mx-auto text-center px-6 z-10">
          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter mb-6 text-white">DK DIGITAL LENS</h1>
          <p className="text-3xl md:text-4xl text-amber-300 mb-12">Capturing Kenya&apos;s most important moments</p>
          <a href="#booking" className="inline-block bg-emerald-500 hover:bg-emerald-400 px-12 py-6 rounded-3xl text-2xl font-semibold transition">
            Book Your Event
          </a>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-20 bg-zinc-950">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Book Your Coverage</h2>
          <div className="bg-zinc-900 rounded-3xl p-10">
            <form className="space-y-8">
              <div>
                <label className="block text-sm mb-2">Service Type</label>
                <select name="serviceType" onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4">
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
                  <select name="packageTier" onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4">
                    <option value="">Select Tier</option>
                    <option value="Basic">Basic</option>
                    <option value="Standard">Standard (Recommended)</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Event Date</label>
                  <input type="date" name="eventDate" onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4" />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Location</label>
                <div className="grid grid-cols-3 gap-4">
                  <select name="county" onChange={handleChange} className="bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4">
                    <option value="">County</option>
                    {Object.keys(kenyaLocations).map(county => <option key={county} value={county}>{county}</option>)}
                  </select>
                  <select name="subcounty" onChange={handleChange} className="bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4">
                    <option value="">Sub-county</option>
                    {selectedSubcounties.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                  </select>
                  <input name="ward" placeholder="Ward" onChange={handleChange} className="bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4" />
                </div>
              </div>

              <div className="bg-zinc-800 p-4 rounded-2xl text-sm">
                Estimated travel fee (hidden in final price): <span className="font-semibold text-emerald-400">KSh {travelFee}</span>
              </div>

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
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-8 right-8 bg-white/10 hover:bg-white/20 p-4 rounded-full text-2xl">
        ↑
      </button>

      {/* Custom quote */}
      <button onClick={() => alert("Custom quote request coming soon")} className="fixed bottom-8 left-8 bg-amber-400 text-black px-6 py-3 rounded-3xl text-sm font-semibold">
        💬 Request Custom Quote
      </button>
    </div>
  );
}