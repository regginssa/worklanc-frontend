import { TProjectCard, TSEO, TServiceCard } from "@/types/components.types";
import ServicesLayout from "../ServicesLayout";
import {
  PriceRangeSlider,
  ProjectCard,
  SearchInput,
  ServiceCard,
} from "@/components/molecules";
import { TNavItem } from "../NavLayout";
import { Breadcrumbs } from "@/components/organisms";
import { Icon } from "@iconify/react";
import { Button, FilterDropdown, Rater, Slider } from "@/components/atoms";
import { useState } from "react";
import RadioGroup, { IRadioOption } from "@/components/molecules/RadioGroup";
import CheckboxGroup, {
  ICheckboxOption,
} from "@/components/molecules/FCheckboxGroup";
import Autocomplete, {
  IAutocompleteOption,
} from "@/components/atoms/Autocomplete";

interface ServicesSubcatLayoutProps {
  title: string;
  subtitle: string;
  category: TNavItem[];
  seo: TSEO | null;
  topProjects: TProjectCard[];
  services: TServiceCard[];
  projects: TProjectCard[];
}

const ServicesSubcatLayout: React.FC<ServicesSubcatLayoutProps> = ({
  seo,
  title,
  subtitle,
  category,
  topProjects,
  services,
  projects,
}) => {
  const [minPrice, setMinPrice] = useState<number>(5);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [selectedDeliveryTimeOption, setSelectedDeliveryTimeOption] =
    useState("");
  const [selectedTalentQualityOptions, setSelectedTalentQualityOptions] =
    useState<string[]>(["top-rated-plus"]);
  const [selectedEnglishLevelOption, setSelectedEnglishLevelOption] =
    useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchResults, setSearchResults] = useState<IAutocompleteOption[]>([]);
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(0);
  const [isLocationLoading, setIsLocationLoading] = useState<boolean>(false);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState<boolean>(false);
  const [loadingFromIndex, setLoadingFromIndex] = useState<number>(-1);

  const deliveryOptions: IRadioOption[] = [
    {
      id: "anytime",
      label: "Any time",
      count: 67316,
    },
    {
      id: "extra-fast",
      label: "Extra fast 24 hour delivery",
      count: 25993,
    },
    {
      id: "less-7-days",
      label: "Less than 7 days",
      count: 63730,
    },
    {
      id: "less-21-days",
      label: "Less than 21 days",
      count: 66745,
    },
  ];

  const englishLevelOptions: IRadioOption[] = [
    {
      id: "anylevel",
      label: "Any level",
      count: 67254,
    },
    {
      id: "basic",
      label: "Basic",
      count: 67254,
    },
    {
      id: "conversational",
      label: "Conversational",
      count: 61886,
    },
    {
      id: "fluent",
      label: "Fluent",
      count: 49536,
    },
    {
      id: "native",
      label: "Native or bilingual",
      count: 13430,
    },
  ];

  const talentQualityOptions: ICheckboxOption[] = [
    {
      id: "top-rated-plus",
      label: "Top Rated Plus",
      count: 1050,
      iconUrl:
        "https://cdn.prod.website-files.com/603fea6471d9d8559d077603/662e89079cf27c1b6bfc0aeb_top-rated-plus%20(1).svg",
    },
    {
      id: "top-rated",
      label: "Top Rated",
      count: 3605,
      iconUrl:
        "https://cdn.prod.website-files.com/603fea6471d9d8559d077603/662e89079cf27c1b6bfc0aeb_top-rated-plus%20(1).svg",
    },
    {
      id: "rising-talent",
      label: "Rising Talent",
      count: 609,
      iconUrl:
        "https://cdn.prod.website-files.com/603fea6471d9d8559d077603/662e89079cf27c1b6bfc0aeb_top-rated-plus%20(1).svg",
    },
  ];

  const ratingOptions: IRadioOption[] = [
    {
      id: "anyrating",
      label: "Any rating",
      count: 67316,
    },
    {
      id: "up4",
      label: "& up",
      children: <Rater rate={4} />,
      count: 18234,
    },
    {
      id: "up3",
      label: "& up",
      children: <Rater rate={3} />,
      count: 18471,
    },
    {
      id: "up2",
      label: "& up",
      children: <Rater rate={2} />,
      count: 18523,
    },
  ];

  const nftArtStyleOptions: ICheckboxOption[] = [
    {
      id: "3d_art",
      label: "3D Art",
      count: 253,
    },
    {
      id: "cartoon_art",
      label: "Cartoon Art",
      count: 253,
    },
    {
      id: "pixel_art",
      label: "Pixel Art",
      count: 253,
    },
    {
      id: "photographic",
      label: "Photographic",
      count: 253,
    },
    {
      id: "anime",
      label: "Anime",
      count: 253,
    },
    {
      id: "collage",
      label: "Collage",
      count: 253,
    },
    {
      id: "realistic",
      label: "Realistic",
      count: 253,
    },
  ];

  const nftMarketplaceOptions: ICheckboxOption[] = [
    {
      id: "foundation_platform",
      label: "Foundation Platform",
      count: 253,
    },
    {
      id: "nifty_gateway",
      label: "Nifty Gateway",
      count: 253,
    },
    {
      id: "rarible",
      label: "Rarible",
      count: 253,
    },
    {
      id: "superRare",
      label: "SuperRare",
      count: 253,
    },
    {
      id: "mintable",
      label: "Mintable",
      count: 253,
    },
    {
      id: "opensea",
      label: "OpenSea",
      count: 253,
    },
    {
      id: "solanart",
      label: "Solanart",
      count: 253,
    },
  ];

  const handleOnPriceClear = () => {
    setMinPrice(5);
    setMaxPrice(1000);
  };

  const handleOnPriceApply = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const countryOptions: IAutocompleteOption[] = [
    { id: "1", label: "United Arab Emirates", category: "Countries" },
    { id: "2", label: "United Kingdom", category: "Countries" },
    { id: "3", label: "United States", category: "Countries" },
    {
      id: "4",
      label: "United States Minor Outlying Islands",
      category: "Countries",
    },
    { id: "5", label: "Uruguay", category: "Countries" },
    { id: "6", label: "Uzbekistan", category: "Countries" },
  ];

  const handleLoadMore = async () => {
    setIsLoadMoreLoading(true);
    // Set the starting index for loading projects
    setLoadingFromIndex(currentProjectIndex + 16);

    setTimeout(() => {
      setCurrentProjectIndex((prev) => prev + 16);
      setIsLoadMoreLoading(false);
      setLoadingFromIndex(-1); // Reset loading index
    }, 3000);
  };

  const isProjectLoading = (projectIndex: number): boolean => {
    return (
      loadingFromIndex !== -1 &&
      projectIndex >= loadingFromIndex &&
      projectIndex < loadingFromIndex + 8
    );
  };

  return (
    <ServicesLayout seo={seo}>
      <div className="w-full flex flex-col gap-10">
        {/* Header */}
        <header className="w-full space-y-8">
          {/* Search bar */}
          <div className="flex items-start">
            <SearchInput placeholder="Search projects" className="w-1/2" />
          </div>

          {/* Breadcrumbs */}
          <Breadcrumbs homePath="/services" navs={category} />
        </header>

        {/* Main */}

        {/* Title & Description */}
        <section className="space-y-6">
          <h1 className="text-4xl font-semibold">{title}</h1>
          <div className="flex items-center gap-2">
            <p>{subtitle}</p>
            <button className="flex items-center gap-1 text-blue-600 font-medium cursor-pointer">
              How it works
              <Icon icon="solar:play-circle-linear" className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Services */}
        {services.length > 0 && (
          <section className="w-full">
            <Slider
              itemsPerView={{
                default: 1,
                sm: 3,
                md: 4,
                lg: 5,
                xl: 6,
              }}
              gap={24}
            >
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} size="small" />
              ))}
            </Slider>
          </section>
        )}

        {/* Filters Group */}
        <section className="w-full flex flex-row items-center gap-4">
          {/* Project Attributes */}
          {title === "NFT Art" && (
            <FilterDropdown placeholder="Project Attributes">
              <div className="min-w-[500px] space-y-6">
                <h1 className="mb-4 px-1 text-lg font-semibold">
                  Project Attributes
                </h1>
                {/* NFT Art Style */}
                <div className="w-full space-y-4 px-1">
                  <h2 className="text-base font-semibold">NFT Art Style</h2>
                  <div className="w-full flex">
                    <div className="w-1/2">
                      <CheckboxGroup
                        options={nftArtStyleOptions.slice(0, 4)}
                        defaultValues={["3d_art"]}
                        onChange={(values) => {
                          setSelectedTalentQualityOptions(values);
                          console.log("Selected:", values);
                        }}
                      />
                    </div>
                    <div className="w-1/2">
                      <CheckboxGroup
                        options={nftArtStyleOptions.slice(
                          4,
                          nftArtStyleOptions.length
                        )}
                        defaultValues={["3d_art"]}
                        onChange={(values) => {
                          setSelectedTalentQualityOptions(values);
                          console.log("Selected:", values);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* NFT Marketplace */}
                <div className="w-full space-y-4 px-1">
                  <h2 className="text-base font-semibold">NFT Marketplace</h2>
                  <div className="w-full flex">
                    <div className="w-1/2">
                      <CheckboxGroup
                        options={nftMarketplaceOptions.slice(0, 4)}
                        defaultValues={["3d_art"]}
                        onChange={(values) => {
                          setSelectedTalentQualityOptions(values);
                          console.log("Selected:", values);
                        }}
                      />
                    </div>
                    <div className="w-1/2">
                      <CheckboxGroup
                        options={nftMarketplaceOptions.slice(
                          4,
                          nftArtStyleOptions.length
                        )}
                        defaultValues={["3d_art"]}
                        onChange={(values) => {
                          setSelectedTalentQualityOptions(values);
                          console.log("Selected:", values);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="sticky bg-white bottom-0 pt-6 w-full flex flex-row items-center justify-between px-1">
                  <button className="text-blue-600 hover:text-blue-500 cursor-pointer text-sm py-[10px] px-4">
                    Clear
                  </button>
                  <Button type="primary" label="Apply" size="medium" />
                </div>
              </div>
            </FilterDropdown>
          )}

          {/* Price */}
          <FilterDropdown placeholder="Price">
            <div className="w-[400px]">
              <h1 className="mb-4 px-1 text-lg font-semibold">Price</h1>
              <PriceRangeSlider
                minLimit={5}
                maxLimit={1000}
                onClear={handleOnPriceClear}
                onApply={handleOnPriceApply}
              />
            </div>
          </FilterDropdown>

          {/* Delivery Time */}
          <FilterDropdown placeholder="Delivery Time">
            <div className="w-[400px]">
              <h1 className="mb-4 px-1 text-lg font-semibold">Delivery Time</h1>
              <RadioGroup
                options={deliveryOptions}
                defaultValue="anytime"
                onChange={(value: string) => {
                  setSelectedDeliveryTimeOption(value);
                }}
                name="delivery-options"
              />
            </div>
          </FilterDropdown>

          {/* Talent Details */}
          <FilterDropdown placeholder="Talent Details">
            <div className="min-w-[700px] max-h-[400px] overflow-auto relative">
              {/* Title */}
              <h1 className="mb-6 px-1 text-lg font-semibold">
                Talent Details
              </h1>

              {/* Content */}
              <div className="w-full space-y-14 px-1 mb-[40px]">
                {/* Talent Quality & English Level */}
                <div className="w-full flex">
                  {/* Talent Quality */}
                  <div className="w-1/2 space-y-4">
                    <h2>Talent Quality</h2>
                    <CheckboxGroup
                      options={talentQualityOptions}
                      defaultValues={["top-rated-plus"]}
                      onChange={(values) => {
                        setSelectedTalentQualityOptions(values);
                        console.log("Selected:", values);
                      }}
                    />
                  </div>

                  {/* English Level */}
                  <div className="w-1/2 space-y-4">
                    <h2>English Level</h2>
                    <RadioGroup
                      options={englishLevelOptions}
                      defaultValue="anylevel"
                      onChange={(value: string) => {
                        setSelectedEnglishLevelOption(value);
                      }}
                      name="english-level-options"
                      hiddenBtns={true}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full bg-gray-200 h-[1px]"></div>

                {/* Rating & Location */}
                <div className="w-full flex items-start justify-between">
                  {/* Rating */}
                  <div className="w-1/2 space-y-4">
                    <h2>Rating</h2>
                    <RadioGroup
                      options={ratingOptions}
                      defaultValue="anyrating"
                      onChange={(value: string) => {
                        setSelectedEnglishLevelOption(value);
                      }}
                      name="english-level-options"
                      hiddenBtns={true}
                    />
                  </div>

                  {/* Location Autocomplete */}
                  <div className="w-1/2 space-y-4">
                    <h2>Location</h2>
                    <Autocomplete
                      options={countryOptions}
                      placeholder="Search locations"
                      onChange={setSelectedLocation}
                      onSelect={(option: any) => setSelectedLocation(option)}
                      noResultsText="No locations found"
                    />
                  </div>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="sticky bg-white bottom-0 pt-6 w-full flex flex-row items-center justify-between px-1">
                <button className="text-blue-600 hover:text-blue-500 cursor-pointer text-sm py-[10px] px-4">
                  Clear
                </button>
                <Button type="primary" label="Apply" size="medium" />
              </div>
            </div>
          </FilterDropdown>
        </section>

        {/* Top Projects */}
        <section className="w-full py-6 px-4 rounded-2xl bg-gray-100 space-y-6">
          {/* Badge & Title */}
          <div className="flex items-center gap-2">
            <span className="py-1 px-4 rounded-full border border-green-600 text-xs text-green-600">
              Worklanc Picks
            </span>
            <p className="text-sm">Top projects you may like</p>
          </div>

          {/* Projects */}
          <div className="w-full grid grid-cols-4 gap-6">
            {topProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </section>

        {/* Filtered Projects lists */}
        <section className="w-full space-y-6 mt-8">
          <h1>67,315 {title.toLowerCase()} projects available</h1>
          <section className="w-full grid grid-cols-4 gap-8">
            {/* Display current projects */}
            {projects
              .slice(0, currentProjectIndex + 16)
              .map((project, index) => (
                <ProjectCard
                  key={index}
                  {...project}
                  isLoading={isProjectLoading(index)}
                />
              ))}

            {/* Display loading placeholders for new projects */}
            {isLoadMoreLoading &&
              Array(8)
                .fill(null)
                .map((_, index) => (
                  <ProjectCard
                    key={`loading-${loadingFromIndex + index}`}
                    isLoading={true}
                    title={{ label: "", path: "" }}
                  />
                ))}
          </section>

          {/* Load More Button */}
          {currentProjectIndex < projects.length && (
            <div className="w-full flex items-center justify-center">
              <Button
                type="outline"
                label={isLoadMoreLoading ? "Loading..." : "Load More"}
                size="medium"
                onClick={handleLoadMore}
                disabled={isLoadMoreLoading}
                loading={isLoadMoreLoading}
              />
            </div>
          )}
        </section>
      </div>
    </ServicesLayout>
  );
};

export default ServicesSubcatLayout;
