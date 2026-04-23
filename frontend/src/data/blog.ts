export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: { heading?: string; type: "h2" | "h3" | "p" | "ul"; text?: string; items?: string[] }[];
  related: { slug: string; title: string }[];
}

export const posts: BlogPost[] = [
  {
    slug: "maintain-air-conditioner-better-performance",
    title: "How to Maintain Your Air Conditioner for Better Performance",
    excerpt:
      "Simple AC maintenance tips that improve cooling, lower electricity bills and extend the life of your air conditioner in Delhi's hot climate.",
    date: "2025-03-12",
    readTime: "6 min read",
    category: "AC Care",
    image: "/AC care.jfif",
    content: [
      { type: "p", text: "Delhi summers can push your air conditioner to its limits. Regular care keeps cooling strong, electricity bills low and breakdowns rare. Here is a homeowner-friendly guide to AC maintenance you can follow without any tools." },
      { type: "h2", text: "Why AC maintenance matters" },
      { type: "p", text: "A neglected AC works harder, consumes more power and develops faults faster. Routine maintenance can improve efficiency by up to 15% and add years to the unit's lifespan." },
      { type: "h2", text: "Easy maintenance steps you can do at home" },
      { type: "h3", text: "1. Clean or replace the air filter monthly" },
      { type: "p", text: "A clogged filter blocks airflow and forces the compressor to overwork. Wash washable filters with mild soap and water once a month during summer." },
      { type: "h3", text: "2. Keep the outdoor unit clear" },
      { type: "p", text: "Remove leaves, dust and debris from around the outdoor unit. Maintain at least two feet of clearance for proper heat exchange." },
      { type: "h3", text: "3. Check for unusual sounds and smells" },
      { type: "p", text: "Rattling, hissing or musty odours often indicate early problems. Schedule a professional AC repair in Delhi before these issues escalate." },
      { type: "h2", text: "When to call a professional" },
      { type: "ul", items: [
        "Cooling drops even after cleaning the filter",
        "Water dripping from the indoor unit",
        "AC switches off frequently",
        "Electricity bill suddenly increases",
      ]},
      { type: "p", text: "If you notice any of these signs, our technicians offer same-day AC repair across Delhi with transparent pricing and a 30-day service warranty." },
    ],
    related: [
      { slug: "ac-repair-delhi", title: "Book AC Repair in Delhi" },
      { slug: "refrigerator-repair-delhi", title: "Refrigerator Repair Service" },
    ],
  },
  {
    slug: "common-washing-machine-problems-and-fixes",
    title: "Common Washing Machine Problems and How to Fix Them",
    excerpt:
      "From a drum that won't spin to water that won't drain — here are the most common washing machine problems and what they really mean.",
    date: "2025-02-20",
    readTime: "7 min read",
    category: "Appliance Tips",
    image: "/Washing machine.jfif",
    content: [
      { type: "p", text: "Your washing machine works hard every week. When something goes wrong, a quick diagnosis can save time and money. Here are the most common issues we see during washing machine repair in Delhi homes." },
      { type: "h2", text: "1. The machine will not start" },
      { type: "p", text: "Check the power socket, door lock and water supply first. Modern machines refuse to start if the door is not fully closed or the inlet tap is off." },
      { type: "h2", text: "2. Drum is not spinning" },
      { type: "p", text: "Overloading is the most common reason. If the drum still does not spin after redistributing the load, the drive belt or motor coupling may be worn out and needs a technician." },
      { type: "h2", text: "3. Water is not draining" },
      { type: "p", text: "A blocked drain filter is usually the culprit. Coins, lint and small fabric pieces collect at the filter and stop water from flowing out." },
      { type: "h2", text: "4. Excess noise or vibration" },
      { type: "p", text: "Make sure the machine is level and not touching walls. Loud banging during the spin cycle can also point to worn shock absorbers." },
      { type: "h2", text: "5. Error codes on the display" },
      { type: "p", text: "Each brand uses its own error codes. Note the code and call us — our team handles every major brand for affordable washing machine repair in Delhi." },
      { type: "p", text: "If a quick fix does not solve the issue, do not force the machine. Continued use can damage the motor and increase repair costs." },
    ],
    related: [
      { slug: "washing-machine-repair-delhi", title: "Washing Machine Repair in Delhi" },
      { slug: "ac-repair-delhi", title: "AC Repair Service" },
    ],
  },
  {
    slug: "signs-refrigerator-needs-repair",
    title: "Signs Your Refrigerator Needs Immediate Repair",
    excerpt:
      "Spot these warning signs early to avoid food spoilage and a costly compressor replacement. A guide for every Delhi household.",
    date: "2025-01-30",
    readTime: "5 min read",
    category: "Refrigerator Care",
    image: "/Refrigerator repair.jfif",
    content: [
      { type: "p", text: "Your fridge runs 24x7 — and small problems often turn into big repair bills if ignored. Here are the warning signs that mean it is time to book a refrigerator repair service." },
      { type: "h2", text: "1. Food is spoiling faster than usual" },
      { type: "p", text: "If milk or vegetables go bad before their expected shelf life, the cooling temperature is likely too high. This usually points to a thermostat or compressor issue." },
      { type: "h2", text: "2. Excess frost in the freezer" },
      { type: "p", text: "Heavy ice build-up restricts airflow and forces the compressor to overwork. A faulty defrost timer or door gasket is often to blame." },
      { type: "h2", text: "3. Loud or constant compressor noise" },
      { type: "p", text: "A healthy fridge cycles on and off quietly. Continuous loud humming or clicking is a clear sign of a failing compressor or relay." },
      { type: "h2", text: "4. Water pooling under or inside the fridge" },
      { type: "p", text: "A blocked defrost drain is the most common cause. Left untreated, it can damage flooring and electrical components." },
      { type: "h2", text: "5. The fridge feels hot on the outside" },
      { type: "p", text: "Some warmth is normal, but excessive heat means the condenser coils need cleaning or the compressor is overloaded." },
      { type: "p", text: "Catching these issues early saves money and prevents food loss. Our team provides same-day refrigerator repair across Delhi for all major brands." },
    ],
    related: [
      { slug: "refrigerator-repair-delhi", title: "Refrigerator Repair in Delhi" },
      { slug: "microwave-repair-delhi", title: "Microwave Repair Service" },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);