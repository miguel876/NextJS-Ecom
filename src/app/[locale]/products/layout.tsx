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
      <div className="flex container my-4 justify-between">
        <Breadcrumb />
      </div>
      {children}
    </div>
  );
}
