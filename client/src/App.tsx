import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { LanguageProvider } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import { PrivacyPolicy, TermsConditions, ImpressumPage, CookiePolicy } from "./pages/Legal";

function ScrollToTopOnMount() {
  window.scrollTo(0, 0);
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider translations={translations}>
          <TooltipProvider>
            <Toaster />
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/privacy">{() => (<><ScrollToTopOnMount /><PrivacyPolicy /></>)}</Route>
              <Route path="/terms">{() => (<><ScrollToTopOnMount /><TermsConditions /></>)}</Route>
              <Route path="/impressum">{() => (<><ScrollToTopOnMount /><ImpressumPage /></>)}</Route>
              <Route path="/cookies">{() => (<><ScrollToTopOnMount /><CookiePolicy /></>)}</Route>
              <Route component={Home} />
            </Switch>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
