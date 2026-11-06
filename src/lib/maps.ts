type MapLocation = {
  address?: string;
  latitude?: number;
  longitude?: number;
};

export function getMapUrl(location: MapLocation): string | undefined {
  if (typeof location.latitude === "number" && typeof location.longitude === "number") {
    return `https://www.openstreetmap.org/?mlat=${encodeURIComponent(location.latitude)}&mlon=${encodeURIComponent(location.longitude)}#map=18/${encodeURIComponent(location.latitude)}/${encodeURIComponent(location.longitude)}`;
  }

  if (location.address?.trim()) {
    return `https://www.openstreetmap.org/search?query=${encodeURIComponent(location.address.trim())}`;
  }

  return undefined;
}
