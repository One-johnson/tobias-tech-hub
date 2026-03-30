import { reasons } from "@/lib/content";

export function ReasonsSection() {
  return (
    <section className="container-page pb-16 md:pb-24">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-sm font-medium text-emerald-200/90">Why Tobias Tech Hub</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Built for trust. Designed for performance.
          </h2>
          <p className="mt-3 text-white/70">
            From guidance to after-sales support, we make buying tech feel premium and simple.
          </p>
        </div>
        <div className="grid gap-4 md:col-span-7 md:grid-cols-2">
          {reasons.map((r) => (
            <div key={r.title} className="rounded-2xl border border-white/10 bg-black/20 p-6">
              <p className="text-sm font-semibold text-white">{r.title}</p>
              <p className="mt-2 text-sm leading-7 text-white/70">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
