export const validateInputs = () => {
  let errors: {
    location?: string;
    listingType?: string;
    bathrooms?: string;
    bedrooms?: string;
    area?: string;
    description?: string;
  } = {};

  if (selectedLocation === null) {
    errors.location = "location has to be selected";
  }

  if (selectedListingType === null) {
    errors.listingType = "listing type has to be selected";
  }

  if (selectedNumBathrooms === null) {
    errors.bathrooms = "number of bathrooms has to be selected";
  }

  if (selectedNumBedrooms === null) {
    errors.bedrooms = "number of bedrooms has to be selected";
  }

  if (area === "") {
    errors.area = "area cannot be empty";
  }

  if (description === "") {
    errors.description = "description cannot be empty";
  }

  return errors;
};
