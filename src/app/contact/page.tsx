import { ContactForm } from "@/components/contact/contact-form";
import { WHATSAPP_PHONE_E164 } from "@/lib/site";

export default function ContactPage() {
  return (
    <div className="container-page py-12">
      <p className="text-sm font-medium text-emerald-200/90">Contact</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        Contact Tobias Tech Hub
      </h1>
      <p className="mt-3 max-w-2xl text-white/70">
        Reach us for product inquiries, quotes, delivery details, or recommendations.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
            <ContactForm />
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
              <p className="text-sm font-semibold text-white">Phone / WhatsApp</p>
              <p className="mt-2 text-sm text-white/70">
                <a
                  href={`tel:${WHATSAPP_PHONE_E164.replace(/\D/g, "")}`}
                  className="text-emerald-200/90 underline-offset-4 hover:underline"
                >
                  {WHATSAPP_PHONE_E164.slice(0, 4)} {WHATSAPP_PHONE_E164.slice(4, 7)}{" "}
                  {WHATSAPP_PHONE_E164.slice(7)}
                </a>
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
              <p className="text-sm font-semibold text-white">Email</p>
              <p className="mt-2 text-sm text-white/70">sales@tobiastechhub.com</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
              <p className="text-sm font-semibold text-white">Location</p>
              <p className="mt-2 text-sm leading-7 text-white/70">
                Accra, Ghana
                <br />
                (Delivery & pickup options available)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

