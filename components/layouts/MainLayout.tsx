import { Provider as ReduxProvider } from "react-redux";
import store from "@/store/store";
import QueryProvider from "../providers/QueryProvider";
import AuthBootstrap from "../providers/AuthBootstrap";
import { ThemeProvider } from "next-themes";
import { Toaster } from "../ui/sonner";
import { TooltipProvider } from "../ui/tooltip";
import CookieConsent from "../molecules/CookieConsent";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider store={store}>
      <QueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="worklanc-theme"
          disableTransitionOnChange
        >
          <AuthBootstrap />
          <TooltipProvider>{children}</TooltipProvider>
          <CookieConsent />
          <Toaster />
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}
