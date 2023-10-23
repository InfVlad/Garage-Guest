import { Sidebar } from '@/components';

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='flex min-h-[calc(100vh-3.5rem)] w-full overflow-hidden bg-white transition-colors duration-300  dark:bg-primary-background'>
      <Sidebar />
      <section className='flex h-full max-h-[calc(100vh-3.03rem)] min-h-[calc(100vh-3.03rem)] w-full flex-col items-center overflow-auto px-8 pb-10 pt-4 transition-colors duration-200'>
        {children}
      </section>
    </main>
  );
}