import ServiceDetail from "./ServiceDetail";
import { getService } from "@/data/services";

const WashingMachineRepair = () => {
  const service = getService("washing-machine-repair-delhi")!;
  return (
    <ServiceDetail
      service={service}
      seoTitle="Washing Machine Repair in Delhi | FastFixx Services"
      seoDescription="Expert washing machine repair in Delhi for top-load, front-load and semi-automatic machines. Genuine parts, doorstep service, transparent pricing."
      keywords="washing machine repair, front load washing machine repair Delhi, top load repair"
      intro="From drum imbalance to drainage issues, our team delivers reliable washing machine repair in Delhi for every brand and model — usually on the same day."
      detail="Whether you have a top-load, front-load or semi-automatic washing machine, FastFixx technicians diagnose the root cause quickly and use genuine spare parts for a long-lasting fix. We handle motor replacements, PCB faults, drain pump issues, error codes and full machine servicing — all backed by a 30-day warranty and clear, upfront pricing."
    />
  );
};

export default WashingMachineRepair;