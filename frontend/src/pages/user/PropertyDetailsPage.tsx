import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  MapPin, Bed, Bath, Square, ArrowLeft, Edit, Flag,
  Mail, Phone, ChevronLeft, ChevronRight, X, User,
} from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  available: { label: "Available", cls: "bg-success text-success-foreground" },
  pending: { label: "Pending Review", cls: "bg-warning text-warning-foreground" },
  sold: { label: "Sold", cls: "bg-destructive text-destructive-foreground" },
  rented: { label: "Rented", cls: "bg-info text-info-foreground" },
};

export default function PropertyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");

  const { data: property, isLoading, error } = useQuery({
    queryKey: ["property", id],
    queryFn: () => api.getProperty(id!),
    enabled: !!id,
  });

  const isOwner = user?.id === property?.ownerId;

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(p);

  const handleReport = () => {
    if (!reportReason) { toast.error("Please select a reason."); return; }
    toast.success("Report submitted. Our team will review it shortly.");
    setReportOpen(false);
    setReportReason("");
    setReportDetails("");
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl space-y-6">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-96 w-full rounded-xl" />
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => <Skeleton key={i} className="h-24 rounded-lg" />)}
        </div>
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-foreground font-medium">Property not found.</p>
        <Button onClick={() => navigate(-1)} variant="outline">
          <ArrowLeft className="mr-2 w-4 h-4" /> Go back
        </Button>
      </div>
    );
  }

  const status = STATUS_CONFIG[property.status];

  return (
    <div className="max-w-5xl space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <span className="text-border">/</span>
        <Link to="/properties" className="text-muted-foreground hover:text-foreground transition-colors">Properties</Link>
        <span className="text-border">/</span>
        <span className="text-foreground font-medium truncate max-w-48">{property.title}</span>
      </nav>

      {/* Image gallery */}
      <div className="space-y-3">
        {/* Main image */}
        <div
          className="relative h-80 md:h-[420px] rounded-xl overflow-hidden bg-muted cursor-zoom-in"
          onClick={() => setLightbox(true)}
        >
          {property.images[activeImg] ? (
            <img
              src={property.images[activeImg]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
          )}
          {property.images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setActiveImg((i) => Math.max(0, i - 1)); }}
                disabled={activeImg === 0}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 disabled:opacity-30"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setActiveImg((i) => Math.min(property.images.length - 1, i + 1)); }}
                disabled={activeImg === property.images.length - 1}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 disabled:opacity-30"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">
                {activeImg + 1} / {property.images.length}
              </span>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {property.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {property.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={cn(
                  "flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all",
                  activeImg === i ? "border-primary" : "border-transparent hover:border-border"
                )}
              >
                <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-5">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
              <h1 className="text-2xl font-bold text-foreground leading-tight">{property.title}</h1>
              <span className={cn("text-sm font-semibold px-3 py-1 rounded-full", status.cls)}>
                {status.label}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
              <MapPin className="w-4 h-4" />
              <span>{property.location}</span>
            </div>

            <p className="text-3xl font-bold text-primary mt-3">
              {formatPrice(property.price)}
            </p>
          </div>

          {/* Specs */}
          {(property.bedrooms !== undefined || property.bathrooms !== undefined || property.area) && (
            <div className="flex flex-wrap gap-4 py-4 border-y border-border">
              {property.bedrooms !== undefined && property.bedrooms > 0 && (
                <div className="flex items-center gap-2 text-foreground">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Bed className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{property.bedrooms}</p>
                    <p className="text-xs text-muted-foreground">Bedrooms</p>
                  </div>
                </div>
              )}
              {property.bathrooms !== undefined && (
                <div className="flex items-center gap-2 text-foreground">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Bath className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{property.bathrooms}</p>
                    <p className="text-xs text-muted-foreground">Bathrooms</p>
                  </div>
                </div>
              )}
              {property.area && (
                <div className="flex items-center gap-2 text-foreground">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Square className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{property.area.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Sq Ft</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="capitalize">{property.type}</Badge>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h2 className="font-semibold text-foreground mb-2">Description</h2>
            <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {isOwner && (
              <Button asChild>
                <Link to={`/properties/${property.id}/edit`}>
                  <Edit className="mr-2 w-4 h-4" /> Edit Property
                </Link>
              </Button>
            )}
            <Button variant="outline" onClick={() => setReportOpen(true)} className="text-destructive hover:text-destructive border-destructive/30 hover:border-destructive/60">
              <Flag className="mr-2 w-4 h-4" /> Report Property
            </Button>
          </div>
        </div>

        {/* Owner info */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <h3 className="font-semibold text-foreground mb-4">Listed by</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10 flex-shrink-0">
                {property.ownerAvatar ? (
                  <img src={property.ownerAvatar} alt={property.ownerName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold text-foreground">{property.ownerName}</p>
                <p className="text-xs text-muted-foreground">Property Owner</p>
              </div>
            </div>
            <div className="space-y-2">
              <a
                href={`mailto:${property.ownerEmail}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                {property.ownerEmail}
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 000-0000</span>
              </div>
            </div>
            <Button className="w-full mt-4" variant="outline" asChild>
              <a href={`mailto:${property.ownerEmail}`}>Contact Owner</a>
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 shadow-card text-sm text-muted-foreground space-y-1">
            <p><span className="font-medium text-foreground">Listed:</span> {new Date(property.submittedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
            {property.approvedAt && (
              <p><span className="font-medium text-foreground">Approved:</span> {new Date(property.approvedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
            )}
            <p><span className="font-medium text-foreground">Property ID:</span> #{property.id}</p>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button className="absolute top-4 right-4 text-white hover:text-gray-300" onClick={() => setLightbox(false)}>
            <X className="w-8 h-8" />
          </button>
          {property.images[activeImg] && (
            <img
              src={property.images[activeImg]}
              alt="Lightbox"
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}

      {/* Report modal */}
      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Property</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Reason</Label>
              <Select value={reportReason} onValueChange={setReportReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason…" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scam">Scam / Fraud</SelectItem>
                  <SelectItem value="duplicate">Duplicate Listing</SelectItem>
                  <SelectItem value="inappropriate">Inappropriate Content</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Additional details <span className="text-muted-foreground">(optional)</span></Label>
              <Textarea
                placeholder="Describe the issue…"
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReportOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleReport}>Submit Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
