import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Upload, X, Loader2, DollarSign, Save } from "lucide-react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const propertySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  location: z.string().min(2, "Location is required"),
  type: z.enum(["apartment", "house", "commercial", "land"]),
  status: z.enum(["available", "pending", "sold", "rented"]),
  bedrooms: z.coerce.number().min(0).optional(),
  bathrooms: z.coerce.number().min(0).optional(),
  area: z.coerce.number().positive().optional(),
});

type PropertyForm = z.infer<typeof propertySchema>;

export default function PropertyFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [images, setImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: existing, isLoading: loadingExisting } = useQuery({
    queryKey: ["property", id],
    queryFn: () => api.getProperty(id!),
    enabled: isEdit,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<PropertyForm>({
    resolver: zodResolver(propertySchema),
    defaultValues: { status: "pending", type: "apartment" },
  });

  // Populate form when editing
  useEffect(() => {
    if (existing) {
      reset({
        title: existing.title,
        description: existing.description,
        price: existing.price,
        location: existing.location,
        type: existing.type,
        status: existing.status,
        bedrooms: existing.bedrooms,
        bathrooms: existing.bathrooms,
        area: existing.area,
      });
      setImages(existing.images);
    }
  }, [existing, reset]);

  const createMutation = useMutation({
    mutationFn: (data: PropertyForm) => api.createProperty({ ...data, images }),
    onSuccess: (prop) => {
      toast.success("Property submitted for approval!");
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      navigate(`/properties/${prop.id}`);
    },
    onError: () => toast.error("Failed to create property."),
  });

  const updateMutation = useMutation({
    mutationFn: (data: PropertyForm) => api.updateProperty(id!, { ...data, images }),
    onSuccess: () => {
      toast.success("Property updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      queryClient.invalidateQueries({ queryKey: ["property", id] });
      navigate(`/properties/${id}`);
    },
    onError: () => toast.error("Failed to update property."),
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const onSubmit = (data: PropertyForm) => {
    if (isEdit) updateMutation.mutate(data);
    else createMutation.mutate(data);
  };

  const addImages = (files: File[]) => {
    const remaining = 5 - images.length;
    if (remaining <= 0) { toast.error("Maximum 5 images allowed."); return; }
    const toAdd = files.slice(0, remaining);
    toAdd.forEach((file) => {
      const url = URL.createObjectURL(file);
      setImages((prev) => [...prev, url]);
    });
    setIsDirty(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addImages(Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/")));
  };

  const handleCancel = () => {
    if (isDirty) setConfirmCancel(true);
    else navigate(-1);
  };

  if (isEdit && loadingExisting) {
    return (
      <div className="max-w-2xl space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-10" /><Skeleton className="h-10" />
        </div>
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={handleCancel}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{isEdit ? "Edit Property" : "Add New Property"}</h1>
          <p className="text-muted-foreground text-sm">{isEdit ? "Update your property listing" : "Submit a new property for approval"}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" onChange={() => setIsDirty(true)}>
        {/* Basic info card */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-card space-y-4">
          <h2 className="font-semibold text-foreground">Basic Information</h2>

          <div className="space-y-1.5">
            <Label htmlFor="title">Property Title</Label>
            <Input
              id="title"
              placeholder="e.g. Modern Downtown Apartment"
              className={errors.title ? "border-destructive" : ""}
              {...register("title")}
            />
            {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the property in detail…"
              rows={4}
              className={errors.description ? "border-destructive" : ""}
              {...register("description")}
            />
            {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="price">Price</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="price"
                  type="number"
                  placeholder="500000"
                  className={`pl-8 ${errors.price ? "border-destructive" : ""}`}
                  {...register("price")}
                />
              </div>
              {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g. New York, NY"
                className={errors.location ? "border-destructive" : ""}
                {...register("location")}
              />
              {errors.location && <p className="text-xs text-destructive">{errors.location.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Property Type</Label>
              <Select
                defaultValue={existing?.type || "apartment"}
                onValueChange={(v) => { setValue("type", v as any); setIsDirty(true); }}
              >
                <SelectTrigger className={errors.type ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select
                defaultValue={existing?.status || "pending"}
                onValueChange={(v) => { setValue("status", v as any); setIsDirty(true); }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="rented">Rented</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Specs card */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-card space-y-4">
          <h2 className="font-semibold text-foreground">Property Specs <span className="text-muted-foreground text-sm font-normal">(optional)</span></h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input id="bedrooms" type="number" min={0} placeholder="0" {...register("bedrooms")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input id="bathrooms" type="number" min={0} placeholder="0" {...register("bathrooms")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="area">Area (sqft)</Label>
              <Input id="area" type="number" min={0} placeholder="0" {...register("area")} />
            </div>
          </div>
        </div>

        {/* Image upload card */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Property Images</h2>
            <span className="text-xs text-muted-foreground">{images.length}/5 images</span>
          </div>

          {/* Drop zone */}
          {images.length < 5 && (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">Drop images here or click to browse</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB · Max 5 images</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => addImages(Array.from(e.target.files || []))}
              />
            </div>
          )}

          {/* Previews */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative group rounded-lg overflow-hidden h-24 bg-muted">
                  <img src={img} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => { setImages((prev) => prev.filter((_, idx) => idx !== i)); setIsDirty(true); }}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-1.5 left-1.5 text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded font-medium">Cover</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pb-4">
          <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Saving…</>
            ) : (
              <><Save className="mr-2 w-4 h-4" /> {isEdit ? "Save Changes" : "Submit Property"}</>
            )}
          </Button>
        </div>
      </form>

      {/* Unsaved changes confirmation */}
      <Dialog open={confirmCancel} onOpenChange={setConfirmCancel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Discard changes?</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm">You have unsaved changes. Are you sure you want to leave? All changes will be lost.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmCancel(false)}>Keep editing</Button>
            <Button variant="destructive" onClick={() => { setConfirmCancel(false); navigate(-1); }}>Discard changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
