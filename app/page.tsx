// app/page.tsx
"use client";

import { useState } from "react";

const kenyaLocations = {
  Nairobi: ["Westlands", "Kasarani", "Embakasi", "Starehe", "Langata", "Dagoretti", "Makadara", "Ruaraka"],
  Kiambu: ["Thika", "Ruiru", "Kiambu Town", "Limuru", "Githunguri", "Lari"],
  Machakos: ["Machakos Town", "Mwala", "Kangundo", "Matungulu"],
  Kajiado: ["Kajiado North", "Kajiado Central", "Kajiado South", "Isinya"],
  Nakuru: ["Nakuru Town", "Naivasha", "Gilgil", "Molo", "Njoro"],
  Narok: ["Narok North", "Narok South"],
  Nyandarua: ["Ol Kalou", "Kinangop"],
  Nyeri: ["Nyeri Town", "Mathira", "Mukurweini"],
  Kirinyaga: ["Kerugoya", "Mwea"],
  Murang: ["Murang'a Town", "Kangema", "Kigumo"],
  Embu: ["Embu Town", "Mbeere North", "Mbeere South"],
  Tharaka Nithi: ["Chuka", "Tharaka South"],
  Meru: ["Meru Town", "Imenti North", "Imenti South", "Tigania"],
  Isiolo: ["Isiolo Town"],
  Marsabit: ["Marsabit Town"],
  Samburu: ["Samburu Central"],
  Laikipia: ["Laikipia West", "Laikipia East"],
  Baringo: ["Baringo Central"],
  Elgeyo Marakwet: ["Keiyo North"],
  Nandi: ["Nandi Hills"],
  Uasin Gishu: ["Eldoret Town", "Turbo", "Soy"],
  Trans Nzoia: ["Kitale"],
  West Pokot: ["Kapenguria"],
  Turkana: ["Lodwar"],
  Kakamega: ["Kakamega Town"],
  Vihiga: ["Vihiga Town"],
  Bungoma: ["Bungoma Town"],
  Busia: ["Busia Town"],
  Siaya: ["Siaya Town"],
  Kisumu: ["Kisumu City"],
  Homabay: ["Homabay Town"],
  Migori: ["Migori Town"],
  Kisii: ["Kisii Town"],
  Nyamira: ["Nyamira Town"],
  Kericho: ["Kericho Town"],
  Bomet: ["Bomet Town"],
  Mombasa: ["Mombasa Island", "Likoni"],
  Kwale: ["Kwale Town"],
  Kilifi: ["Kilifi Town"],
  Tana River: ["Hola"],
  Lamu: ["Lamu Town"],
  Taita Taveta: ["Voi"],
  Garissa: ["Garissa Town"],
  Wajir: ["Wajir Town"],
  Mandera: ["Mandera Town"],
};

const travelFeeMap: { [key: string]: number } = {
  Nairobi: 0,
  Kiambu: 3500,
  Machakos: 4500,
  Kajiado: 5000,
  Nakuru: 8000,
  // Add more as needed — these are realistic round-trip fuel estimates for your B15
};

export default function Home() {
  const [formData, setFormData] = useState({
    serviceType: "",
    packageTier: "",
    eventDate: "",
    county: "",
    subcounty: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectedCountyData = kenyaLocations[formData.county as keyof typeof kenyaLocations];
  const travelFee = travelFeeMap[formData.county] || 6000;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero & Pricing sections remain the same as before — abbreviated for space */}
      {/* ... (your previous hero + pricing teaser) ... */}

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
                    {Object.keys(kenyaLocations).map(county => (
                      <option key={county} value={county}>{county}</option>
                    ))}
                  </select>
                  <select name="subcounty" onChange={handleChange} className="bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white">
                    <option value="">Sub-county</option>
                    {selectedCountyData && selectedCountyData.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                  <input name="ward" placeholder="Ward (optional)" className="bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white" />
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert(`Booking summary:\nService: ${formData.serviceType}\nTier: ${formData.packageTier}\nDate: ${formData.eventDate}\nLocation: ${formData.county} - ${formData.subcounty}\nTravel fee included in total price`)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 py-6 rounded-3xl text-xl font-semibold transition"
              >
                Continue to Secure 50% Deposit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}