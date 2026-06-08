import { useEffect, useMemo, useRef, useState } from "react";
import { AutoComplete } from "../common";
import AddressAPI, { type AddressSuggestion } from "@/lib/api/address";
import { countries } from "country-data-list";

export type StreetAddressDetails = {
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  countryCode: string;
  zip: string;
};

const MIN_QUERY_LENGTH = 3;
const DEBOUNCE_MS = 350;

const toCountryName = (countryCode: string, fallback = "") => {
  if (!countryCode) return fallback;
  return (
    countries.all.find(
      (country) => country.alpha2.toLowerCase() === countryCode.toLowerCase()
    )?.name || fallback
  );
};

export default function StreetAddressAutoComplete({
  value,
  onChange,
  onAddressSelect,
  countryCode,
  required = false,
  labelClassName = "",
  classname = "",
  placeholder,
  label,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  onAddressSelect?: (details: StreetAddressDetails) => void;
  /** ISO 3166-1 alpha-2 — biases autocomplete results (e.g. US). */
  countryCode?: string;
  required?: boolean;
  labelClassName?: string;
  classname?: string;
  placeholder?: string;
  label?: string;
  error?: string;
}) {
  const [keyword, setKeyword] = useState(value);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const requestIdRef = useRef(0);

  useEffect(() => {
    setKeyword(value);
  }, [value]);

  useEffect(() => {
    const query = keyword.trim();

    if (query.length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    const requestId = ++requestIdRef.current;
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const results = await AddressAPI.autocomplete(query, countryCode);
        if (requestId !== requestIdRef.current) return;
        setSuggestions(results);
      } catch {
        if (requestId !== requestIdRef.current) return;
        setSuggestions([]);
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [keyword, countryCode]);

  const suggestionById = useMemo(
    () => new Map(suggestions.map((item) => [item.placeId, item])),
    [suggestions]
  );

  const options = useMemo(
    () =>
      suggestions.map((item) => ({
        label: item.label,
        value: item.placeId,
      })),
    [suggestions]
  );

  const handleSelect = (placeId: string) => {
    const selected = suggestionById.get(placeId);
    if (!selected) return;

    const details: StreetAddressDetails = {
      streetAddress: selected.streetAddress,
      city: selected.city,
      state: selected.state,
      country: toCountryName(selected.countryCode, selected.country),
      countryCode: selected.countryCode,
      zip: selected.zip,
    };

    setKeyword(details.streetAddress);
    onChange(details.streetAddress);
    onAddressSelect?.(details);
  };

  return (
    <AutoComplete
      name="streetAddress"
      label={label}
      labelClassName={labelClassName}
      required={required}
      placeholder={placeholder}
      classname={classname}
      value={keyword}
      options={options}
      loading={loading}
      filterOptionsLocally={false}
      error={error}
      noResultsText={
        keyword.trim().length < MIN_QUERY_LENGTH
          ? "Type at least 3 characters"
          : "No addresses found"
      }
      onChange={(nextValue) => {
        setKeyword(nextValue);
        onChange(nextValue);
      }}
      onSelect={(option) => handleSelect(option.value)}
    />
  );
}
