import { Footer, Header } from "@/components/organisms";

const IntroLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen">
      <Header variant="intro" />
      {children}
      <Footer />
    </div>
  );
};

export default IntroLayout;
