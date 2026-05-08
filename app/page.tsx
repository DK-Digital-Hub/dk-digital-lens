// app/page.tsx
"use client";

import { useState } from "react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectedSubcounties = kenyaLocations[formData.county] || [];
  const travelFee = travelFeeMap[formData.county] || 6000;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero + Pricing Teaser (same as before) */}
      {/* ... your previous hero and pricing section ... */}

      {/* Booking Form */}
      <section id="booking" className="py-20 bg-black">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Book Your Coverage</h2>
          <div className="bg-zinc-900 rounded-3xl p-10">
            <form className="space-y-8">
              {/* Service, Tier, Date fields - same as before */}

              <div>
                <label className="block text-sm mb-2">Location</label>
                <div className="grid grid-cols-3 gap-4">
                  <select name="county" onChange={handleChange} className="bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white">
                    <option value="">County</option>
                    {Object.keys(kenyaLocations).map((county) => (
                      <option key={county} value={county}>{county}</option>
                    ))}
                  </select>

                  <select name="subcounty" onChange={handleChange} className="bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white">
                    <option value="">Sub-county</option>
                    {selectedSubcounties.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>

                  <input
                    name="ward"
                    placeholder="Ward"
                    onChange={handleChange}
                    className="bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert(`Booking ready!\n\nService: ${formData.serviceType}\nTier: ${formData.packageTier}\nDate: ${formData.eventDate}\nLocation: ${formData.county} - ${formData.subcounty} - ${formData.ward}\nTravel fee (hidden): KSh ${travelFee}`)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 py-6 rounded-3xl text-xl font-semibold transition"
              >
                Continue to 50% Deposit (M-Pesa / Card)
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}