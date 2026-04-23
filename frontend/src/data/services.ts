import { Snowflake, Refrigerator, WashingMachine, Microwave, LucideIcon } from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  short: string;
  href: string;
  icon: LucideIcon;
  problems: string[];
}

export const services: Service[] = [
  {
    slug: "ac-repair-delhi",
    title: "AC Repair Service",
    short:
      "Fast, affordable AC repair in Delhi for split, window and inverter air conditioners — gas refilling, servicing and installation.",
    href: "/services/ac-repair-delhi",
    icon: Snowflake,
    problems: [
      "AC not cooling or low cooling",
      "Water leaking from indoor unit",
      "Strange noise from outdoor unit",
      "Gas refilling and leak detection",
      "Remote / thermostat not working",
      "Foul smell or excess humidity",
    ],
  },
  {
    slug: "refrigerator-repair-delhi",
    title: "Refrigerator Repair Service",
    short:
      "Same-day refrigerator repair service in Delhi for single door, double door and side-by-side fridges of every brand.",
    href: "/services/refrigerator-repair-delhi",
    icon: Refrigerator,
    problems: [
      "Fridge not cooling properly",
      "Excess ice build-up in freezer",
      "Water leakage at the bottom",
      "Compressor noise or vibration",
      "Door gasket not sealing",
      "Lights or display not working",
    ],
  },
  {
    slug: "washing-machine-repair-delhi",
    title: "Washing Machine Repair Service",
    short:
      "Expert washing machine repair in Delhi for top-load, front-load and semi-automatic machines with genuine spare parts.",
    href: "/services/washing-machine-repair-delhi",
    icon: WashingMachine,
    problems: [
      "Machine not starting or powering on",
      "Drum not spinning or unbalanced",
      "Water not draining out",
      "Excess noise or vibration",
      "Display showing error codes",
      "Door / lid lock issues",
    ],
  },
  {
    slug: "microwave-repair-delhi",
    title: "Microwave Repair Service",
    short:
      "Affordable microwave oven repair in Delhi for solo, grill and convection microwaves with on-site diagnosis.",
    href: "/services/microwave-repair-delhi",
    icon: Microwave,
    problems: [
      "Microwave not heating food",
      "Sparking inside the cavity",
      "Turntable not rotating",
      "Buttons or display not responding",
      "Door not closing properly",
      "Burning smell during operation",
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);