export default function AboutPage() {
  return (
    <div className="container-page py-12">
      <p className="text-sm font-medium text-emerald-200/90">About</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        Tobias Tech Hub
      </h1>
      <p className="mt-4 max-w-3xl text-white/70">
        Tobias Tech Hub is a tech retail company based in Accra, Ghana. We specialize in laptops,
        computer accessories, and networking devices—curated for performance, reliability, and
        value. Our mission is simple: help customers power their digital world with premium tech
        and trustworthy support.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
          <p className="text-sm font-semibold text-white">Mission</p>
          <p className="mt-2 text-sm leading-7 text-white/70">
            Make premium technology accessible with expert guidance, fair pricing, and dependable
            after-sales support.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
          <p className="text-sm font-semibold text-white">Credibility</p>
          <p className="mt-2 text-sm leading-7 text-white/70">
            We focus on trusted brands, clear product specifications, and quality checks—so you
            can buy with confidence.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
          <p className="text-sm font-semibold text-white">Service</p>
          <p className="mt-2 text-sm leading-7 text-white/70">
            Support for setup, upgrades, accessories, and recommendations tailored to your needs.
          </p>
        </div>
      </div>
    </div>
  );
}

