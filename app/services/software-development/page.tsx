import type { Metadata } from 'next';
import SoftwareDevContent from './content';

export const metadata: Metadata = {
  title: 'Разработка ПО под ключ — веб, мобильные приложения | aisolution',
  description: 'От идеи до развёртывания. React, Next.js, Flutter, iOS, Android. От $5,000 за MVP, сроки 4-8 недель.',
  keywords: 'software development, web app, mobile app, react, nextjs, flutter, mvp development',
  openGraph: {
    title: 'Разработка ПО под ключ — веб, мобильные приложения | aisolution',
    description: 'От идеи до развёртывания. React, Next.js, Flutter.',
    type: 'website',
  },
};

export default function SoftwareDevPage() {
  return <SoftwareDevContent />;
}
