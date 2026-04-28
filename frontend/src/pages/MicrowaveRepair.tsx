import ServiceDetail from "./ServiceDetail";
import { getService } from "@/data/services";

const MicrowaveRepair = () => {
  const service = getService("microwave-repair-delhi")!;
  return (
    <ServiceDetail
      service={service}
      seoTitle="Microwave Repair Service in Delhi | FastFixx Services"
      seoDescription="Affordable microwave oven repair in Delhi for solo, grill and convection microwaves. On-site diagnosis, original parts and same-day service."
      keywords="microwave repair Delhi, convection microwave repair, microwave oven service"
      intro="A microwave that won't heat or sparks during use needs urgent attention. FastFixx offers safe, affordable microwave repair in Delhi for every model and brand."
      detail="Our certified technicians service solo, grill and convection microwaves — handling magnetron failures, faulty capacitors, broken turntables, door switch issues and display problems. Each microwave repair is performed at your doorstep with original spare parts and a 30-day service warranty."
    />
  );
};

export default MicrowaveRepair;