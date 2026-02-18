import { Link } from "react-router-dom";
import { MapPin, Eye, Bed, Bath, Square } from "lucide-react";
import type { Property } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  available: { label: "Available", cls: "bg-success text-success-foreground" },
  pending: { label: "Pending", cls: "bg-warning text-warning-foreground" },
  sold: { label: "Sold", cls: "bg-destructive text-destructive-foreground" },
  rented: { label: "Rented", cls: "bg-info text-info-foreground" },
};

const TYPE_CONFIG = {
  apartment: "Apartment",
  house: "House",
  commercial: "Commercial",
  land: "Land",
};

export default function PropertyCard({ property }: { property: Property }) {
  const status = STATUS_CONFIG[property.status];

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);

  return (
    <div className="group rounded-xl overflow-hidden border border-border bg-card shadow-card hover:shadow-md transition-all duration-200 flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted flex-shrink-0">
        {property.images[0] ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <svg className="w-12 h-12 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </div>
        )}
        {/* Status badge overlay */}
        <span className={cn("absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full", status.cls)}>
          {status.label}
        </span>
        {/* Image count */}
        {property.images.length > 1 && (
          <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
            +{property.images.length - 1} photos
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-foreground text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          <Badge variant="outline" className="text-xs capitalize flex-shrink-0">
            {TYPE_CONFIG[property.type]}
          </Badge>
        </div>

        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Specs */}
        {(property.bedrooms !== undefined || property.bathrooms !== undefined || property.area) && (
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            {property.bedrooms !== undefined && property.bedrooms > 0 && (
              <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{property.bedrooms} bd</span>
            )}
            {property.bathrooms !== undefined && (
              <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{property.bathrooms} ba</span>
            )}
            {property.area && (
              <span className="flex items-center gap-1"><Square className="w-3.5 h-3.5" />{property.area.toLocaleString()} sqft</span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between">
          <p className="text-xl font-bold text-primary">{formatPrice(property.price)}</p>
          <Button asChild size="sm" variant="outline" className="gap-1.5 text-xs">
            <Link to={`/properties/${property.id}`}>
              <Eye className="w-3.5 h-3.5" /> View Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
