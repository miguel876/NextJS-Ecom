import { Breadcrumb } from '@/components/ui/breadcrumb/breadcrumb';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <div>
      <Breadcrumb />
      {children}
    </div>
  );
}
