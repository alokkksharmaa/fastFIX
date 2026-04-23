import ServiceDetail from "./ServiceDetail";
import { getService } from "@/data/services";

const RefrigeratorRepair = () => {
  const service = getService("refrigerator-repair-delhi")!;
  return (
    <ServiceDetail
      service={service}
      seoTitle="Refrigerator Repair Service in Delhi | FixFast Services"
      seoDescription="Same-day refrigerator repair service in Delhi for single door, double door & side-by-side fridges. Genuine parts, expert technicians and 30-day warranty."
      keywords="refrigerator repair service, fridge repair Delhi, double door fridge repair"
      intro="A faulty refrigerator can ruin a week's groceries. Our same-day refrigerator repair service in Delhi gets your fridge cooling again — quickly, safely and affordably."
      detail="FixFast Services handles every type of refrigerator — single door, double door, side-by-side and convertible models — from leading brands. From compressor faults to thermostat replacements and gas charging, our trained technicians arrive with the right tools and original spare parts. Each refrigerator repair includes a free safety check and a 30-day service warranty."
    />
  );
};

export default RefrigeratorRepair;