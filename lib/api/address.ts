import { request } from "./client";

export type AddressSuggestion = {
  placeId: string;
  label: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  countryCode: string;
  zip: string;
};

const AddressAPI = {
  autocomplete: async (
    text: string,
    countryCode?: string,
  ): Promise<AddressSuggestion[]> => {
    const params = new URLSearchParams({ text });
    if (countryCode) params.set("countryCode", countryCode);

    const data = await request<{ suggestions: AddressSuggestion[] }>(
      `/geocoding/autocomplete?${params.toString()}`,
    );

    return data?.suggestions ?? [];
  },
};

export default AddressAPI;
