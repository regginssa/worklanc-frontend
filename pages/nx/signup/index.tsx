import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Button, Checkbox, Input, SearchCombobox } from "@/components/atoms";
import { countries } from "country-data-list";
import Link from "next/link";
import GEO from "@/lib/api/geo";
import { SocialAuthButtonGroup } from "@/components/molecules";
import SignupLayout from "@/components/layouts/auth/SignupLayout";
import AuthAPI, { setAuthToken } from "@/lib/api/auth";
import { toast } from "sonner";
import { useRouter } from "next/router";

type TUserType = "client" | "talent";

const SignUp = () => {
  const [userType, setUserType] = useState<TUserType>("client");
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    alert: true,
    terms: false,
  });
  const [errors, setErrors] = useState<any>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const validate = () => {
    const newErrors: any = {};

    if (!formData.firstName?.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName?.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Minimum 8 characters required";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    if (!formData.terms) {
      newErrors.terms =
        "Please accept the Worklanc Terms of Service before continuing";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchCurrentGeo = async () => {
      const geo = await GEO.get();

      setFormData({
        ...formData,
        country:
          countries.all.find((c) => c.alpha2 === geo?.country)?.name ||
          countries.all[0].name,
      });
    };
    fetchCurrentGeo();
  }, []);

  const handleOptionSelect = (val: TUserType) => {
    setCurrentStep(1);
    setUserType(val);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    setLoading(true);

    const data = await AuthAPI.signup({
      ...formData,
      accountType: userType,
      countryCode:
        countries.all.find((c) => c.name === formData.country)?.alpha2 || "US",
      createdAt: new Date(),
      appleId: null,
      googleId: null,
      signinOption: "email",
    } as any);

    if (!data?.token) return setLoading(false);
    setAuthToken(data.token);
    toast.success(`Welcome Jack`, { position: "top-center" });
    router.push("/nx/signup/please-verify");
    setLoading(false);
  };

  console.log(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
  );

  return (
    <SignupLayout
      userType={userType}
      toggleUserType={() =>
        setUserType((prev) => (prev === "client" ? "talent" : "client"))
      }
      hiddenToggle={currentStep === 0}
    >
      {currentStep === 0 ? (
        <>
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold">Welcome to Worklanc</h1>
            <p className="mt-4 text-slate-500">Which describes you best?</p>
          </div>
          <div className="flex items-center gap-10">
            <Option value="client" onSelect={handleOptionSelect} />
            <Option value="talent" onSelect={handleOptionSelect} />
          </div>
        </>
      ) : (
        <>
          <div className="text-center">
            <h1 className="text-4xl mb-8">
              Sign up to{" "}
              {userType === "client" ? "hire talent" : "find work you love"}
            </h1>

            <SocialAuthButtonGroup
              intent="signup"
              accountType={userType}
              countryCode={formData.country}
            />

            <div className="mt-8 flex items-center gap-2">
              <div className="flex-1 h-[1px] bg-slate-200"></div>
              <span className="text-sm">or</span>
              <div className="flex-1 h-[1px] bg-slate-200"></div>
            </div>

            <form
              className="mt-8 w-full max-w-lg mx-auto flex flex-col gap-6"
              onSubmit={handleSubmitForm}
            >
              <div className="w-full flex items-start gap-4">
                <Input
                  type="text"
                  label="First name"
                  name="firstName"
                  classname="flex-1"
                  error={errors?.firstName}
                  value={formData?.firstName}
                  onChange={handleInputChange}
                />

                <Input
                  type="text"
                  label="Last name"
                  name="lastName"
                  error={errors?.lastName}
                  classname="flex-1"
                  value={formData?.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <Input
                type="email"
                label="Work email address"
                name="email"
                error={errors?.email}
                value={formData?.email}
                onChange={handleInputChange}
              />

              <Input
                type="password"
                label="Password"
                name="password"
                placeholder="Password (8 or more characters)"
                error={errors?.password}
                value={formData?.password}
                onChange={handleInputChange}
              />

              <SearchCombobox
                label="Country"
                name="country"
                options={countries.all.map((c) => c.name)}
                error={errors?.country}
                defaultOption={formData?.country}
                onSelect={(v: string) =>
                  setFormData({ ...formData, country: v })
                }
              />

              {userType === "talent" && (
                <div>
                  <div className="flex items-start gap-2">
                    <Checkbox
                      checked={formData?.alert}
                      error={errors?.alert}
                      onCheck={(v: boolean) =>
                        setFormData({ ...formData, alert: v })
                      }
                    />
                    <p className="text-left text-slate-600 text-sm">
                      Send me helpful emails to find rewarding work and job
                      leads.
                    </p>
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-start gap-2">
                  <Checkbox
                    checked={formData?.terms}
                    error={errors?.terms}
                    onCheck={(v: boolean) => {
                      setFormData({ ...formData, terms: v });
                      setErrors({ ...errors, terms: false });
                    }}
                  />
                  <p className="text-left text-slate-600 text-sm">
                    Yes, I understand and agree to the{" "}
                    <Link href="#" className="text-blue-600 underline">
                      Worklanc Terms of Service
                    </Link>
                    , including the{" "}
                    <Link href="#" className="text-blue-600 underline">
                      User Agreement
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-blue-600 underline">
                      Privacy Policy ( CA Notice at Collection )
                    </Link>{" "}
                    .
                  </p>
                </div>

                {errors?.terms && (
                  <div className="mt-1 flex items-center gap-2">
                    <Icon
                      icon="mdi:information-outline"
                      width={16}
                      className="text-red-500"
                    />
                    <p className="text-red-600 text-sm">{errors.terms}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center mt-4">
                <Button
                  type="primary"
                  label="Create my account"
                  size="medium"
                  loading={loading}
                  isSubmit
                  classname="rounded-md!"
                />
              </div>
            </form>
          </div>
        </>
      )}
    </SignupLayout>
  );
};

const Option = ({
  value,
  onSelect,
}: {
  value: TUserType;
  onSelect: (val: TUserType) => void;
}) => {
  return (
    <button
      className="p-4 border border-slate-200 rounded-xl shadow-md hover:shadow-2xl group transition-all duration-300 cursor-pointer"
      onClick={() => onSelect(value)}
    >
      <div className="w-52 h-52 rounded-lg bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center transition-all duration-300">
        <Icon icon="mdi:user-outline" width={64} height={64} />
      </div>

      <div className="mt-4 flex flex-col gap-1 items-center justify-center">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">
            {value === "client" ? "Client" : "Freelancer"}
          </h3>

          <Icon icon="mdi:arrow-right" width={18} />
        </div>

        <p className="text-sm text-slate-500">
          {value === "client" ? "Post jobs and hire" : "Work and get paid"}
        </p>
      </div>
    </button>
  );
};

export default SignUp;
