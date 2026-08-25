import type { Metadata } from 'next';
import '../index.css';
import '../premium.css';
import '../responsive.css';
import '../hero-image.css';
import '../image-palette.css';
import '../brand-palette.css';
import '../hero-fit.css';
import '../logo-image-badge.css';
import '../footer.css';
import '../navbar-parallax.css';
import '../navbar-style.css';
import '../sections.css';
import '../home-premium.css';
import '../home-animation.css';
import '../market-status.css';
import '../lucky-style-parallax.css';
import '../mobile-hero-nav.css';
import '../home-breakpoints.css';
import '../home-enhancements.css';
import '../certificate-gallery.css';
import '../profile-blue-palette.css';
import '../hero-pro-motion.css';
import '../mentor-toolkit.css';

export const metadata: Metadata = {
  title: 'Krish FX Swing Lab',
  description: 'A refined swing trading framework for disciplined traders.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
