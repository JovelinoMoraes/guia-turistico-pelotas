type MapLocation = {
  address?: string;
  latitude?: number;
  longitude?: number;
};

export function getMapUrl(location: MapLocation): string | undefined {
  if (typeof location.latitude === "number" && typeof location.longitude === "number") {
    const destination = `${location.latitude},${location.longitude}`;
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
  }

  if (location.address?.trim()) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address.trim())}`;
  }

  return undefined;
}
