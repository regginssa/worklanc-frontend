import { Footer, Header } from "@/components/organisms";

const IntroLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <Header variant="intro" />
      {children}
      <Footer />
    </div>
  );
};

export default IntroLayout;
