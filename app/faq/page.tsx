import React from "react";
import Head from "next/head";

export const metadata = {
  title: "Ethnic Wear Manufacturer in Jaipur – FAQ | Ethnics by Aravalli",
  description:
    "Find answers to common questions about Ethnics by Aravalli, a leading kurti and ethnic wear manufacturer in Jaipur. Learn about our products, wholesale orders, customization, quality, shipping, and more.",
};

const faqs = [
  {
    category: "General Questions",
    label: "ABOUT",
    items: [
      {
        q: "What makes Ethnics by Aravalli a leading kurti manufacturer in Jaipur?",
        a: "Ethnics by Aravalli is recognized as a premium kurti manufacturer in Jaipur, specializing in designer, wholesale, and custom ethnic wear for women. Our skilled artisans use the finest fabrics and vibrant Jaipuri prints to create high-quality kurtis, kurta sets, co-ord sets, and more, blending traditional craftsmanship with modern design.",
      },
      {
        q: "Do you offer designer kurti and ethnic wear manufacturing in Jaipur?",
        a: "Yes, we are a designer kurti and ethnic wear manufacturer in Jaipur, offering a wide range of styles including boutique, embroidered, printed, and premium kurtis, as well as co-ord sets, anarkalis, and more.",
      },
      {
        q: "Can I order custom ethnic wear or private label manufacturing?",
        a: "Absolutely! We provide custom ethnic wear manufacturing and private label services in Jaipur. Whether you need bespoke designs, made-to-order garments, or OEM manufacturing, we cater to your specific requirements.",
      },
      {
        q: "What types of fabrics do you use for your ethnic wear?",
        a: "We use a variety of premium fabrics including cotton, silk, georgette, chiffon, crepe, rayon, and linen for our ethnic wear. Our focus is on quality, comfort, and durability, ensuring every piece meets the highest standards.",
      },
    ],
  },
  {
    category: "Frequently Asked Questions",
    label: "INFORMATION",
    items: [
      {
        q: "How can I buy ethnic wear directly from the manufacturer in Jaipur?",
        a: "You can place your order directly with Ethnics by Aravalli, a trusted ethnic wear manufacturer in Jaipur, by contacting us through our website, email, or WhatsApp. We offer seamless ordering for boutiques, retailers, and wholesalers.",
      },
      {
        q: "Do you offer wholesale ethnic wear and bulk order discounts?",
        a: "Yes, we are a wholesale ethnic wear manufacturer in Jaipur and provide attractive discounts on bulk orders for kurtis, kurta sets, co-ord sets, and more.",
      },
      {
        q: "What is the minimum order quantity for wholesale kurti sets?",
        a: "Our minimum order quantity for wholesale kurti sets and ethnic wear varies by product. Please contact us for specific details and a personalized quote.",
      },
      {
        q: "Are you an ISO certified ethnic wear manufacturer?",
        a: "Yes, Ethnics by Aravalli is an ISO certified ethnic wear manufacturer in Jaipur, ensuring premium quality and adherence to international standards.",
      },
      {
        q: "How do you ensure premium quality in your products?",
        a: "We follow strict quality control processes at every stage of manufacturing, from fabric selection to final inspection. Our commitment to premium quality ethnic wear has made us a trusted manufacturer in Jaipur.",
      },
      {
        q: "Do you export ethnic wear outside India?",
        a: "Yes, we are an ethnic wear exporter in Jaipur and ship our products to clients worldwide, including the USA, UK, Canada, Australia, and more.",
      },
      {
        q: "What are your shipping options for bulk ethnic wear orders?",
        a: "We offer reliable and cost-effective shipping options for bulk ethnic wear orders, both within India and internationally. Our team will assist you in choosing the best shipping method for your needs.",
      },
      {
        q: "Where is your ethnic wear manufacturing unit located in Jaipur?",
        a: "Our manufacturing unit is located in Jaipur, Rajasthan, the heart of India's ethnic wear industry. We welcome business inquiries and visits by appointment.",
      },
      {
        q: "How can I contact Ethnics by Aravalli for a quote or inquiry?",
        a: "You can contact us via our website contact form, email, or WhatsApp for quotes, inquiries, and consultations regarding ethnic wear manufacturing in Jaipur.",
      },
    ],
  },
];

const FAQPage = () => {
  let questionIndex = 1;
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="kurti manufacturer in jaipur, ethnic wear manufacturer in jaipur, designer kurti manufacturer, premium ethnic wear, wholesale kurti manufacturer, co-ord set manufacturer, ladies kurta set manufacturer, women ethnic wear manufacturer, jaipur ethnic wear, traditional wear manufacturer" />
        {/* FAQPage Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.flatMap(section =>
                section.items.map(item => ({
                  '@type': 'Question',
                  name: item.q,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.a,
                  },
                }))
              ),
            }),
          }}
        />
      </Head>
      {/* Heading only, no breadcrumb */}
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-bold mb-2 text-brand-primary">FAQ</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">Find answers to the most frequently asked questions about Ethnics by Aravalli, a leading kurti and ethnic wear manufacturer in Jaipur. Learn about our products, wholesale orders, customization, quality, shipping, and more.</p>
      </div>
      {/* FAQ Sections */}
      {faqs.map((section) => (
        <section key={section.category} className="mb-14">
          <div className="flex flex-col items-center mb-8">
            <span className="uppercase text-xs font-bold tracking-widest px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary mb-2">{section.label}</span>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2 text-center">{section.category}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {section.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#D9A8A0] border-2"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block w-8 h-8 flex items-center justify-center rounded-full bg-brand-primary text-white font-bold text-lg mr-2">{questionIndex++}</span>
                  <span className="font-semibold text-lg text-gray-900">{item.q}</span>
                </div>
                <div className="text-gray-700 text-base pl-10">{item.a}</div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default FAQPage; 