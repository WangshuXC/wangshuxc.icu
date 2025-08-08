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
} from "@/components/ui/resizable-navbar";
import { LanguageSwitcher } from '@/components/widget/language-switcher';
import { ThemeToggle } from '@/components/widget/theme-toggle';
import { UserAvatarMenu } from '@/components/widget/user-avatar-menu';
import { useState } from "react";
import { useNavbar } from '@/hooks/use-navbar';
import Link from "next/link";

function DesktopAuthDisplay({
    loginText,
    loginUrl,
    signupText,
    signupUrl,
    isAuthenticated,
    isLoading,
    isInitialized,
}: {
    loginText: string;
    loginUrl: string;
    signupText: string;
    signupUrl: string;
    isAuthenticated: boolean;
    isLoading: boolean;
    isInitialized: boolean;
}) {
    // Zustand ensure state remains consistent on both server side and client side.
    if (!isInitialized || isLoading) {
        return <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />;
    }

    if (isAuthenticated) {
        return <UserAvatarMenu />;
    }

    return (
        <div className="flex items-center gap-2">
            <NavbarButton variant="secondary" className="w-full justify-start" href={loginUrl}>
                {loginText}
            </NavbarButton>
            <NavbarButton className="w-full justify-start" href={signupUrl}>
                {signupText}
            </NavbarButton>
        </div>
    );
}

function MobileAuthDisplay({
    loginText,
    loginUrl,
    signupText,
    signupUrl,
    isAuthenticated,
    isLoading,
    isInitialized,
}: {
    loginText: string;
    loginUrl: string;
    signupText: string;
    signupUrl: string;
    isAuthenticated: boolean;
    isLoading: boolean;
    isInitialized: boolean;
}) {
    // Keep the same loading state as the desktop side.
    if (!isInitialized || isLoading) {
        return (
            <div className="space-y-2">
                <div className="h-10 w-full animate-pulse rounded bg-muted" />
                <div className="h-10 w-full animate-pulse rounded bg-muted" />
            </div>
        );
    }

    if (isAuthenticated) {
        return (
            <div className="flex items-center gap-2">
                <UserAvatarMenu />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            <NavbarButton className="w-full justify-start" href={loginUrl}>
                {loginText}
            </NavbarButton>
            <NavbarButton className="w-full justify-start" href={signupUrl}>
                {signupText}
            </NavbarButton>
        </div>
    );
}

export function NewNavbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navbarData = useNavbar();
    const { logo, menu, auth, isAuthenticated, isLoading, isInitialized } = navbarData;

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

                    <DesktopAuthDisplay
                        loginText={auth.login.text}
                        loginUrl={auth.login.url}
                        signupText={auth.signup.text}
                        signupUrl={auth.signup.url}
                        isAuthenticated={isAuthenticated}
                        isLoading={isLoading}
                        isInitialized={isInitialized}
                    />
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
                        <Link
                            key={`mobile-link-${idx}`}
                            href={item.url}
                            className="relative text-neutral-600 dark:text-neutral-300"
                        >
                            <span className="block">{item.title}</span>
                        </Link>
                    ))}
                    <div className="flex w-full gap-4">
                        <LanguageSwitcher />
                        <ThemeToggle />
                    </div>
                    <div className="w-full">
                        <MobileAuthDisplay
                            loginText={auth.login.text}
                            loginUrl={auth.login.url}
                            signupText={auth.signup.text}
                            signupUrl={auth.signup.url}
                            isAuthenticated={isAuthenticated}
                            isLoading={isLoading}
                            isInitialized={isInitialized}
                        />
                    </div>
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    );
}
