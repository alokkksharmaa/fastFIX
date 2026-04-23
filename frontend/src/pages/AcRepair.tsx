import ServiceDetail from "./ServiceDetail";
import { getService } from "@/data/services";

const AcRepair = () => {
  const service = getService("ac-repair-delhi")!;
  return (
    <ServiceDetail
      service={service}
      seoTitle="AC Repair in Delhi | Same-Day Service | FixFast Services"
      seoDescription="Reliable AC repair in Delhi for split, window and inverter ACs. Gas refilling, leak detection and servicing by expert technicians. Same-day visits."
      keywords="AC repair in Delhi, split AC repair, inverter AC service, AC gas refilling Delhi"
      intro="Beat the Delhi heat with prompt, professional AC repair. Whether your AC is not cooling, leaking water or making strange noises, our certified technicians diagnose and fix it on the same day."
      detail="At FixFast Services, we repair every type of air conditioner — split, window, cassette and inverter ACs — from all major brands. Our team carries genuine spare parts and uses calibrated tools for accurate gas charging and leak detection. Every AC repair in Delhi includes a free general checkup, transparent pricing and a 30-day warranty so you can book with confidence."
    />
  );
};

export default AcRepair;