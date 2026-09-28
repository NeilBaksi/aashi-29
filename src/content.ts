/**
 * All copy, verbatim from the original Canva site (see docs/CONTENT.md for the
 * source extraction). Do not paraphrase — if wording needs to change, that's a
 * content decision for Neil/Aashi, not a rewrite while building.
 *
 * Times are encoded with explicit UTC offsets because the weekend straddles the
 * Victorian daylight-saving switch: Fri 2 Oct & Sat 3 Oct are AEST (+10:00), and
 * from 2am Sun 4 Oct it's AEDT (+11:00). See docs/ARCHITECTURE.md.
 */

export const address = {
  line: '2 Lightwood Court, Merrijig, VIC 3723, Australia',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=2+Lightwood+Court%2C+Merrijig+VIC+3723%2C+Australia',
  appleMapsUrl: 'https://maps.apple.com/?q=2+Lightwood+Court,+Merrijig+VIC+3723,+Australia',
}

export const links = {
  marmaladesDirections:
    'https://www.google.com/maps/dir/?api=1&destination=Marmalades%2C+20+High+St%2C+Yea+VIC+3717',
  timbertopWalk: 'https://www.mansfieldmtbuller.com.au/listing/timbertop-summit-walk/',
  // TODO(Neil): swap for the real "Anyone with link: Editor" Drive folder before launch.
  memoriesDrive: 'https://drive.google.com/drive/folders/REPLACE_ME',
}

export const hero = {
  eyebrow: 'A little birthday escape to the mountains 🤎',
  titleLine1: "Aashi's",
  titleLine2: 'turning',
  titleLine3: 'Twenty-Fine',
  dateRange: '2–4 October 2026 · Mount Buller, Victoria',
  blurb: 'Three days. One house. A questionable amount of food, drinks & games.',
  blurb2: 'And my favourite people to celebrate another year with. 🥂',
  metaDescription:
    'Enter a world where dreams dance under starlight and a birthday wish comes to life.',
}

export const stay = {
  heading: 'Our Little Getaway',
  addressLabel: '🏡 2 Lightwood Court, Merrijig, VIC 3723, Australia',
  areaLabel: '📍 Mount Buller, Victoria',
  checkIn: 'Check-in: Friday 2 October',
  checkOut: 'Check-out: Sunday 4 October',
  blurb:
    'Our home for the weekend; come prepared for cosy nights, slow mornings and questionable amounts of food.',
}

export interface ItineraryItem {
  time: string
  text: string
  /** ISO 8601 with explicit offset; undefined for items with no fixed clock time. */
  iso?: string
  durationMin?: number
  href?: string
}

export interface ItineraryDay {
  id: 'fri' | 'sat' | 'sun'
  dateLabel: string
  heading: string
  subheading: string
  items: ItineraryItem[]
}

export const itinerary: ItineraryDay[] = [
  {
    id: 'fri',
    dateLabel: '2026-10-02',
    heading: '☕ FRIDAY · 2 OCTOBER',
    subheading: 'CHECK IN & EXPLORE',
    items: [
      { time: '9:30 am', text: 'Meet at 106, 6 Lord Street, Richmond', iso: '2026-10-02T09:30:00+10:00', durationMin: 30 },
      { time: '10:00 am', text: '🚗 Car pool and Travel to Mount Buller', iso: '2026-10-02T10:00:00+10:00', durationMin: 60 },
      { time: '11:00 am', text: '🥞 Breakfast Stop @ Marmalades', iso: '2026-10-02T11:00:00+10:00', durationMin: 60, href: 'marmaladesDirections' },
      { time: '1:00 pm', text: '🏡 Check in + unpack', iso: '2026-10-02T13:00:00+10:00', durationMin: 60 },
      { time: '7:00 pm', text: '🍕 BBQ at the house', iso: '2026-10-02T19:00:00+10:00', durationMin: 90 },
      { time: '', text: '🍸 Drinks' },
      { time: '', text: '🎲 Games + chill night', iso: '2026-10-02T21:00:00+10:00', durationMin: 180 },
    ],
  },
  {
    id: 'sat',
    dateLabel: '2026-10-03',
    heading: '🥂 SATURDAY · 3 OCTOBER',
    subheading: 'HIKE, CHILL & BIRTHDAY DINNER',
    items: [
      { time: '9 am', text: '☕ Breakfast + coffee', iso: '2026-10-03T09:00:00+10:00', durationMin: 90 },
      { time: '11 am', text: '🏔️ Explore Mount Buller', iso: '2026-10-03T11:00:00+10:00', durationMin: 180, href: 'timbertopWalk' },
      { time: '2:30 pm', text: '🍴 Lunch', iso: '2026-10-03T14:30:00+10:00', durationMin: 60 },
      { time: '4 pm', text: '🏡 Back to the house + relax', iso: '2026-10-03T16:00:00+10:00', durationMin: 120 },
      { time: '7 pm', text: '✨ Get ready.', iso: '2026-10-03T19:00:00+10:00', durationMin: 60 },
      { time: '8 pm', text: 'BIRTHDAY DINNER 🥂 — Dinner. Music. Drinks. Games.', iso: '2026-10-03T20:00:00+10:00', durationMin: 240 },
      { time: '', text: "🎧 AFTER DINNER — WE'RE NOT GOING TO BED YET…" },
      { time: '', text: '🎶 Shweth on DJ duties' },
      { time: '', text: '💃 Dancing' },
      { time: '12 AM', text: '🎂 Birthday cake', iso: '2026-10-04T00:00:00+10:00', durationMin: 30 },
      { time: '', text: '📸 Photos' },
      { time: '', text: '🌙 Midnight birthday chaos' },
    ],
  },
  {
    id: 'sun',
    dateLabel: '2026-10-04',
    heading: '🥞 SUNDAY · 4 OCTOBER',
    subheading: "BIRTHDAY GIRL'S ACTUAL BIRTHDAY 🤍",
    items: [
      { time: 'Morning', text: 'No alarms. 🥞 Big breakfast. Coffee. Leftover cake.', iso: '2026-10-04T09:00:00+11:00', durationMin: 120 },
      { time: 'Late morning', text: 'Walk / explore. Then one last little adventure before we head home.', iso: '2026-10-04T11:00:00+11:00', durationMin: 90 },
      { time: 'Lunch', text: 'One last meal together 🍴', iso: '2026-10-04T13:00:00+11:00', durationMin: 90 },
      { time: 'Afternoon', text: 'Head home 🚗', iso: '2026-10-04T15:00:00+11:00', durationMin: 60 },
    ],
  },
]

export const pack = {
  heading: 'WHAT TO PACK',
  weatherHeading: 'MOUNTAIN WEATHER = LAYERS, BABY 🏔️',
  weatherBlurb:
    "It might be 13–14°C during the day but drop to -1 to -2°C overnight, so don't let the sunshine fool you. Think layers you can add & remove throughout the day.",
  adventureHeading: '🥾 FOR OUR MOUNTAIN ADVENTURE',
  adventureIntro: 'Wear something you can actually walk in:',
  adventureList: 'Comfy layers + leggings/activewear + sneakers or hiking boots + jacket',
  dressCodeHeading: 'WEEKEND DRESS CODE',
  dressCode: [
    { day: 'FRIDAY', title: 'Cute & comfy', detail: 'Knitwear, jeans, leggings, sneakers, cosy layers.' },
    { day: 'SATURDAY DAY', title: 'Mountain casual', detail: 'Comfy + warm enough to actually enjoy being outside.' },
    { day: 'SATURDAY NIGHT', title: 'Birthday Dinner ✨', detail: 'Dress it up! Neutral color outfit.' },
    { day: 'SUNDAY', title: '', detail: 'Comfy clothes, coffee in hand, minimal responsibilities.' },
  ],
  dinnerDressCodeHeading: 'Saturday Night Dinner Dress Code',
  dinnerSwatches: [
    { name: 'White', hex: '#f7f3ea' },
    { name: 'Beige', hex: '#d8c3a0' },
    { name: 'Cream', hex: '#f0e2c4' },
  ],
}

export const packingChecklist = [
  'Comfy layers (knitwear, leggings, jeans)',
  'Sneakers or hiking boots',
  'Warm jacket for evenings',
  'Neutral-colour birthday dinner outfit',
  'Swimwear / thermal layer (just in case)',
  'Phone charger + power bank',
  'Camera for the group photo',
  'Any medication / dietary snacks',
]

export const food = {
  heading: '🍝 FOOD',
  menuHeading: 'THE WEEKEND MENU',
  dietaryLine: 'Dietary requirements? Let me know!',
  days: [
    { day: 'FRIDAY', items: ['☕ Marmalade Cafe', '🍕 BBQ', '🍷 Drinks + snacks'] },
    { day: 'SATURDAY', items: ['☕ Breakfast', '🥪 Lunch', '🥂 Birthday dinner', '🎂 Birthday cake'] },
    { day: 'SUNDAY', items: ['🥞 Breakfast', '☕ Coffee', '🍴 Lunch before heading home'] },
  ],
}

export const houseRules = {
  heading: 'THE OFFICIAL HOUSE RULES',
  rules: [
    '01. No one is allowed to be boring.',
    "02. If there's music, dance.",
    '03. Competitive behaviour will be judged.',
    '04. Birthday girl gets final say.',
    '05. Photos will be taken. Look cute.',
    '06. Nobody leaves without a group photo.',
    '07. Have fun. 🤎',
  ],
}

export const people = {
  heading: '🥂 THE PEOPLE',
  subheading: 'MY FAVOURITE PEOPLE IN ONE PLACE',
  names: ['ABHI', 'AKASH', 'ANOUCHKA', 'AQEEL', 'BISMA', 'PUMORI', 'SANNIDHI', 'SANYA', 'SHWETH', 'YUTI'],
  closing: "29 wouldn't be the same without you. 🤎",
}

export const thankYou = {
  heading: '🤍 ONE MORE THING',
  subheading: 'THANK YOU FOR CELEBRATING WITH ME',
  body: 'Another year, another excuse to get everyone together and escape to the mountains.',
  body2: 'Good food · terrible games · questionable decisions · lots of laughs',
  cta: 'SEE YOU IN THE MOUNTAINS 🏔️',
  signature: 'AASHI x',
}

export const memories = {
  heading: 'Memories',
  blurb: "Got photos or videos from the weekend? Drop them in — everyone's invited to add.",
  cta: 'Upload to the shared album',
  howToIphone: 'iPhone: open the link, tap the ⋯ menu → Upload, then select from your camera roll.',
  howToAndroid: 'Android: open the link and tap the upload (+) button in the top right.',
}

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'stay', label: 'The Weekend & Stay' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'pack', label: 'What to Pack' },
  { id: 'food', label: 'Food' },
  { id: 'important', label: 'The Important Stuff' },
  { id: 'memories', label: 'Memories' },
]
