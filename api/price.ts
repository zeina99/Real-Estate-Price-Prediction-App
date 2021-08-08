const SERVER_URL = "https://aqueous-atoll-22403.herokuapp.com/";

export const fetchPrice = async (
  selectedNumBedrooms: string,
  selectedNumBathrooms: string,
  area: string,
  selectedListingType: string,
  selectedLocation: string,
  description: string
) => {
  let res = await fetch(SERVER_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bedrooms: selectedNumBedrooms,
      bathrooms: selectedNumBathrooms,
      area: area,
      location: selectedLocation,
      listing_type: selectedListingType,
      description: description,
    }),
  });
  let price = await res.json();
  let priceText = price.price;
  return priceText;
};
