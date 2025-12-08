"use client";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/blocks/navbar/resizable-navbar";
import { LanguageSwitcher } from '@/components/widget/language-switcher';
import { ThemeToggle } from '@/components/widget/theme-toggle';
import { useState } from "react";
import { useNavbar } from '@/hooks/use-navbar';
import { TransitionLink } from "@/components/page-transition";

export function ResizableNavbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navbarData = useNavbar();
    const { logo, menu } = navbarData;
    return (
        <Navbar>
            {/* Desktop Navigation */}
            <NavBody>
                <NavbarLogo url={logo.url} src={logo.src} alt={logo.alt} title={logo.title} />
                <NavItems items={menu} />
                <div className="flex items-center gap-2">
                    <NavbarButton variant="secondary" className="p-0">
                        <ThemeToggle />
                    </NavbarButton>
                    <NavbarButton variant="secondary" className="p-0">
                        <LanguageSwitcher />
                    </NavbarButton>
                </div>
            </NavBody>

            {/* Mobile Navigation */}
            <MobileNav>
                <MobileNavHeader>
                    <NavbarLogo url={logo.url} src={logo.src} alt={logo.alt} title={logo.title} />
                    <MobileNavToggle
                        isOpen={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    />
                </MobileNavHeader>

                <MobileNavMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                >
                    {menu.map((item, idx) => (
                        <TransitionLink
                            key={`mobile-link-${idx}`}
                            href={item.url}
                            className="relative text-neutral-600 dark:text-neutral-300"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="block">{item.title}</span>
                        </TransitionLink>
                    ))}
                    <div className="flex w-full gap-4">
                        <LanguageSwitcher />
                        <ThemeToggle />
                    </div>
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    );
}
