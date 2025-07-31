'use client';

import { Navbar } from './navbar';
import { useNavbar } from '@/hooks/use-navbar';
import { NewNavbar } from '../newNav/resize-nav';

export function NavbarWrapper() {
  const navbarData = useNavbar();

  return (
    <>
      {/* <Navbar
      logo={navbarData.logo}
      menu={navbarData.menu}
      auth={navbarData.auth}
      locale={navbarData.locale}
      isAuthenticated={navbarData.isAuthenticated}
      isLoading={navbarData.isLoading}
      isInitialized={navbarData.isInitialized}
      onPricingClick={navbarData.handlePricingClick}
    /> */}
      <NewNavbar />
    </>
  );
} 