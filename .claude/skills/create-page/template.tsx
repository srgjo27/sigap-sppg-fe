// Template halaman. Ganti "Example" dengan nama halaman.
import { CtaSection } from '@/components/sections/CtaSection';
import { ExampleContent } from '@/components/sections/example/ExampleContent';
import { ExampleHero } from '@/components/sections/example/ExampleHero';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function ExamplePage() {
  useDocumentTitle('Example');

  return (
    <>
      {/* Hero berisi satu-satunya <h1> di halaman ini */}
      <ExampleHero />
      {/* Section dengan data API menangani loading/error/kosong di dalamnya */}
      <ExampleContent />
      <CtaSection />
    </>
  );
}
