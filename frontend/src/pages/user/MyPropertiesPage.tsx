import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { PlusCircle, Building2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import PropertyCard from "@/components/properties/PropertyCard";

export default function MyPropertiesPage() {
  const { user } = useAuth();

  const { data: properties, isLoading, error, refetch } = useQuery({
    queryKey: ["properties"],
    queryFn: api.getProperties,
  });

  const myProperties = properties?.filter((p) => p.ownerId === user?.id) ?? [];

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Properties</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {isLoading ? "Loading…" : `${myProperties.length} propert${myProperties.length !== 1 ? "ies" : "y"} listed`}
          </p>
        </div>
        <Button asChild>
          <Link to="/properties/new">
            <PlusCircle className="mr-2 w-4 h-4" /> Add Property
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-border shadow-card">
              <Skeleton className="h-48 w-full" />
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
          <p className="text-foreground font-medium">Failed to load properties.</p>
          <Button variant="outline" onClick={() => refetch()}>Retry</Button>
        </div>
      ) : myProperties.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <Building2 className="w-14 h-14 mx-auto text-muted-foreground opacity-25" />
          <p className="text-foreground font-medium text-lg">No properties yet</p>
          <p className="text-muted-foreground text-sm">Start by adding your first property listing.</p>
          <Button asChild>
            <Link to="/properties/new">
              <PlusCircle className="mr-2 w-4 h-4" /> Add Property
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
