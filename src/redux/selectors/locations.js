export const getLocationData = ({ locations: { userLocation: { lat, long, error } } }) => ({
  lat,
  long,
  error
});

export const getNextPlace = ({ locations: { places, placeIndex } }) => ({
  place: places.length > placeIndex ? places[placeIndex] : null
});