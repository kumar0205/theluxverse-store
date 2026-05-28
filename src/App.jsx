import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import ThankYou from '@/pages/ThankYou';
import Launchpad from '@/pages/Launchpad';
import Links from '@/pages/Links';
import StarterVault from '@/pages/StarterVault';
import CreatorVault from '@/pages/CreatorVault';
import FullVault from '@/pages/FullVault';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/launchpad" element={<Launchpad />} />
          <Route path="/links" element={<Links />} />
          <Route path="/starter-vault" element={<StarterVault />} />
          <Route path="/creator-vault" element={<CreatorVault />} />
          <Route path="/full-vault" element={<FullVault />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;