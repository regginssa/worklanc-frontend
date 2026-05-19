import { Button, Input } from "@/components/atoms";
import { SocialAuthButtonGroup } from "@/components/molecules";
import { LoginLayout } from "@/components/templates/auth/LoginLayout";
import AuthAPI, { setAuthToken } from "@/lib/api/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitForm = async () => {
    const isValid = validate();
    if (!isValid) return;
    setLoading(true);
    const data = await AuthAPI.signin({ ...formData, signinOption: "email" });
    if (data?.message?.includes("password")) {
      setErrors({ ...errors, password: "Password is incorrect" });
    }
    if (!data?.token) return setLoading(false);
    console.log(data.token);
    setAuthToken(data?.token);
    toast.success("Welcome back", { position: "top-center" });
    setLoading(false);
  };

  return (
    <LoginLayout>
      <div className="w-full max-w-lg border border-slate-200 rounded-lg px-16 py-10 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold">Log in to TalentForge</h1>

        <form
          className="mt-8 w-full mx-auto flex flex-col gap-6"
          onSubmit={(e: any) => {
            e.preventDefault();
          }}
        >
          <Input
            type="email"
            name="email"
            placeholder="Username or Email"
            icon="mdi:user-outline"
            error={errors?.email}
            value={formData?.email}
            onChange={handleInputChange}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            error={errors?.password}
            value={formData?.password}
            onChange={handleInputChange}
          />

          <Button
            type="primary"
            label="Log in"
            classname="h-10! text-base! rounded-md!"
            loading={loading}
            onClick={handleSubmitForm}
          />

          <div className="flex items-center gap-2">
            <div className="flex-1 h-[1px] bg-slate-200"></div>
            <span className="text-sm">or</span>
            <div className="flex-1 h-[1px] bg-slate-200"></div>
          </div>

          <SocialAuthButtonGroup vertical />

          <p className="text-slate-500 mt-12 text-center text-sm">
            Don't have an TalentForge account?
          </p>
          <Button
            type="outline"
            label="Sign Up"
            size="medium"
            classname="h-10! rounded-md!"
            onClick={() => router.push("/auth/signup")}
          />
        </form>
      </div>
    </LoginLayout>
  );
};

export default Login;
