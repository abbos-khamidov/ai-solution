import type { Metadata } from 'next';
import { NotFoundClient } from '@/components/not-found/NotFoundClient';

export const metadata: Metadata = {
  title: '404 — Страница не найдена',
  description: 'Запрашиваемая страница не существует.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundClient />;
}
