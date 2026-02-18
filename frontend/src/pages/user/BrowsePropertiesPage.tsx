import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Search, SlidersHorizontal, MapPin, DollarSign, Building2,
  ChevronLeft, ChevronRight, X,
} from "lucide-react";
import { api } from "@/lib/api";
import type { Property } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import PropertyCard from "@/components/properties/PropertyCard";

const STATUS_OPTIONS = ["all", "available", "pending", "sold", "rented"] as const;
const TYPE_OPTIONS = ["apartment", "house", "commercial", "land"] as const;
const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
];
const PAGE_SIZE = 6;

export default function BrowsePropertiesPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [types, setTypes] = useState<string[]>([]);
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const { data: properties, isLoading, error, refetch } = useQuery({
    queryKey: ["properties"],
    queryFn: api.getProperties,
  });

  const filtered = useMemo(() => {
    if (!properties) return [];
    let list = [...properties];

    if (search) list = list.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()));
    if (location) list = list.filter((p) => p.location.toLowerCase().includes(location.toLowerCase()));
    if (status !== "all") list = list.filter((p) => p.status === status);
    if (types.length > 0) list = list.filter((p) => types.includes(p.type));
    if (minPrice) list = list.filter((p) => p.price >= Number(minPrice));
    if (maxPrice) list = list.filter((p) => p.price <= Number(maxPrice));

    if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

    return list;
  }, [properties, search, location, status, types, minPrice, maxPrice, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleType = (t: string) =>
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const activeFiltersCount = [
    location !== "",
    status !== "all",
    types.length > 0,
    minPrice !== "",
    maxPrice !== "",
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSearch(""); setLocation(""); setStatus("all");
    setTypes([]); setMinPrice(""); setMaxPrice(""); setPage(1);
  };

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Browse Properties</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {isLoading ? "Loading…" : `${filtered.length} propert${filtered.length !== 1 ? "ies" : "y"} found`}
          </p>
        </div>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by title or location…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="pl-10 h-11"
        />
      </div>

      <div className="flex gap-5">
        {/* Filter panel */}
        <aside className={cn("flex-shrink-0 space-y-5", showFilters ? "block" : "hidden lg:block", "w-56")}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" /> Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="text-xs">{activeFiltersCount}</Badge>
              )}
            </h3>
            {activeFiltersCount > 0 && (
              <button onClick={clearFilters} className="text-xs text-destructive hover:underline flex items-center gap-1">
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="City, state…"
                value={location}
                onChange={(e) => { setLocation(e.target.value); setPage(1); }}
                className="pl-8 h-9 text-sm"
              />
            </div>
          </div>

          {/* Price range */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Price Range</Label>
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                <Input placeholder="Min" value={minPrice} onChange={(e) => { setMinPrice(e.target.value); setPage(1); }} className="pl-6 h-9 text-sm" type="number" />
              </div>
              <span className="text-muted-foreground text-xs">–</span>
              <div className="relative flex-1">
                <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                <Input placeholder="Max" value={maxPrice} onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }} className="pl-6 h-9 text-sm" type="number" />
              </div>
            </div>
          </div>

          {/* Property type */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Property Type</Label>
            <div className="space-y-2">
              {TYPE_OPTIONS.map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <Checkbox
                    id={`type-${t}`}
                    checked={types.includes(t)}
                    onCheckedChange={() => { toggleType(t); setPage(1); }}
                  />
                  <Label htmlFor={`type-${t}`} className="text-sm font-normal capitalize cursor-pointer">{t}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</Label>
            <div className="space-y-1">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => { setStatus(s); setPage(1); }}
                  className={cn(
                    "w-full text-left text-sm px-3 py-1.5 rounded-md capitalize transition-colors",
                    status === s
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {s === "all" ? "All Statuses" : s}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile filter toggle */}
        <div className="lg:hidden">
          <Button variant="outline" size="sm" onClick={() => setShowFilters((v) => !v)}>
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </Button>
        </div>

        {/* Property grid */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-border shadow-card">
                  <Skeleton className="h-48 w-full shimmer" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-6 w-24 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16 space-y-3">
              <Building2 className="w-12 h-12 mx-auto text-muted-foreground opacity-30" />
              <p className="text-foreground font-medium">Failed to load properties</p>
              <Button variant="outline" onClick={() => refetch()}>Retry</Button>
            </div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Search className="w-12 h-12 mx-auto text-muted-foreground opacity-30" />
              <p className="text-foreground font-medium">No properties match your filters</p>
              <p className="text-muted-foreground text-sm">Try adjusting your search criteria</p>
              <Button variant="outline" onClick={clearFilters}>Clear all filters</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {paginated.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button variant="outline" size="icon" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <Button
                        key={p}
                        variant={p === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPage(p)}
                        className="w-9"
                      >
                        {p}
                      </Button>
                    ))}
                  </div>
                  <Button variant="outline" size="icon" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
