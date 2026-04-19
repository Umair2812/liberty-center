/** Pakistan checkout demo options — extend as needed. */
export const DEFAULT_COUNTRY = "Pakistan";

export const PROVINCES = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Gilgit-Baltistan",
  "Azad Jammu and Kashmir",
] as const;

export const CITIES_BY_PROVINCE: Record<string, string[]> = {
  Punjab: [
    "Lahore",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Gujranwala",
    "Sialkot",
    "Bahawalpur",
    "Sargodha",
    "Sheikhupura",
  ],
  Sindh: [
    "Karachi",
    "Hyderabad",
    "Sukkur",
    "Larkana",
    "Nawabshah",
    "Mirpur Khas",
  ],
  "Khyber Pakhtunkhwa": [
    "Peshawar",
    "Mardan",
    "Abbottabad",
    "Swabi",
    "Kohat",
    "Charsadda",
  ],
  Balochistan: ["Quetta", "Gwadar", "Turbat", "Khuzdar", "Hub"],
  "Islamabad Capital Territory": ["Islamabad"],
  "Gilgit-Baltistan": ["Gilgit", "Skardu", "Hunza"],
  "Azad Jammu and Kashmir": ["Muzaffarabad", "Mirpur", "Kotli"],
};
