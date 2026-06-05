import { Button } from "@/components/atoms";
import { BenchLayout } from "@/components/layouts";

export default function Discover() {
  return (
    <BenchLayout
      seo={{
        title: "Discover talent - Worklanc",
        description: "Discover talent - Worklanc",
        url: "/browse/bench",
      }}
    >
      <section>
        <h1 className="text-3xl font-medium">Discover</h1>
        <p className="text-sm text-slate-600">
          Tailored talent matches to help you hire the right person faster
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium">Recently viewed</h2>
          <Button
            type="secondary"
            label="See all recently viewed"
            icon="mdi:search"
            classname="rounded-full! text-sm! font-medium!"
          />
        </div>
      </section>
    </BenchLayout>
  );
}
