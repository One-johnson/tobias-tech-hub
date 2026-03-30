"use client";

import { faqs } from "@/lib/content";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FaqSection() {
  return (
    <section id="faq" className="container-page pb-16 md:pb-24">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-sm font-medium text-emerald-200/90">FAQ</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Quick answers
          </h2>
          <p className="mt-3 text-white/70">
            Delivery, recommendations, quotes, and after-sales support—answered in one place.
          </p>
        </div>
        <div className="grid gap-3 md:col-span-7">
          <Accordion type="single" collapsible className="grid gap-3">
            {faqs.map((f) => (
              <AccordionItem key={f.question} value={f.question}>
                <AccordionTrigger>{f.question}</AccordionTrigger>
                <AccordionContent>{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

