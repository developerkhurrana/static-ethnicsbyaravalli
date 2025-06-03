import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCatalogProduct } from "@/lib/catalog-data";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function CatalogProductPage({ params }: { params: { slug: string } }) {
  const product = getCatalogProduct(params.slug);

  if (!product) {
    notFound();
  }

  const sizeChart = [
    { size: "XS", bust: 32, waist: 26, hips: 36, shoulder: 14, tLength: 40, bLength: 38, fullLength: 56 },
    { size: "S",  bust: 34, waist: 28, hips: 38, shoulder: 14.5, tLength: 41, bLength: 39, fullLength: 57 },
    { size: "M",  bust: 36, waist: 30, hips: 40, shoulder: 15, tLength: 42, bLength: 40, fullLength: 58 },
    { size: "L",  bust: 38, waist: 32, hips: 42, shoulder: 15.5, tLength: 43, bLength: 41, fullLength: 59 },
    { size: "XL", bust: 40, waist: 34, hips: 44, shoulder: 16, tLength: 44, bLength: 42, fullLength: 60 },
    { size: "XXL",bust: 42, waist: 36, hips: 46, shoulder: 16.5, tLength: 45, bLength: 43, fullLength: 61 },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/catalog" className="text-muted-foreground hover:text-[#D9A8A0] text-sm">&larr; Back to Catalog</Link>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-[#E5E0DC] bg-white">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex-1 flex flex-col">
            <span className="inline-block w-auto px-2 py-1 text-xs font-medium bg-[#F9F6F4] text-[#D9A8A0] rounded-full mb-2 self-start">
              {product.category}
            </span>
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <p className="text-muted-foreground mb-4">{product.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.features.map((feature, idx) => (
                <span key={idx} className="inline-block px-2 py-1 text-xs font-medium bg-[#F9F6F4] text-[#4A3A3A] rounded-full">
                  {feature}
                </span>
              ))}
            </div>
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-1">
                <div className="font-semibold">Available Sizes:</div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="text-xs px-3 py-1 h-auto">Size Guide</Button>
                  </SheetTrigger>
                  <SheetContent side="top" className="max-w-7xl w-full overflow-y-auto max-h-[90vh] sm:overflow-visible sm:max-h-none sm:inset-0 sm:mx-auto sm:my-auto rounded-2xl p-4 sm:p-8">
                    <SheetHeader>
                      <SheetTitle>Size Guide</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-shrink-0 flex justify-center items-center">
                        <Image src="/products/size_measurement.png" alt="Size Measurement" width={280} height={480} className="object-contain max-w-xs w-full h-auto" />
                      </div>
                      <div className="flex-1">
                        <table className="w-full text-xs border-collapse mb-6">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-1">Size</th>
                              <th className="text-left p-1">Bust (in)</th>
                              <th className="text-left p-1">Waist (in)</th>
                              <th className="text-left p-1">Hips (in)</th>
                              <th className="text-left p-1">Shoulder (in)</th>
                              <th className="text-left p-1">T. Length (in)</th>
                              <th className="text-left p-1">B. Length (in)</th>
                              <th className="text-left p-1">Full Length (in)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sizeChart.map((row) => (
                              <tr key={row.size} className="border-b last:border-0">
                                <td className="p-1 font-semibold">{row.size}</td>
                                <td className="p-1">{row.bust}</td>
                                <td className="p-1">{row.waist}</td>
                                <td className="p-1">{row.hips}</td>
                                <td className="p-1">{row.shoulder}</td>
                                <td className="p-1">{row.tLength}</td>
                                <td className="p-1">{row.bLength}</td>
                                <td className="p-1">{row.fullLength}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="mt-4">
                          <h3 className="font-semibold mb-3">How to measure</h3>
                          <ul className="list-disc pl-5 mb-3 text-xs">
                            <li>Keep measurement tape firm, but not tight.</li>
                            <li>Ask someone to assist you while taking measurement.</li>
                          </ul>
                          <div className="text-xs mb-1"><b>BUST:</b> Measure around the fullest part of your bust, keeping the tape parallel to the floor.</div>
                          <div className="text-xs mb-1"><b>WAIST & FIT:</b> Measure around the narrowest part of your waist.</div>
                          <div className="text-xs mb-1"><b>HIPS:</b> Measure around the fullest part of your hips.</div>
                          <div className="text-xs mb-1"><b>KAMEEZ LENGTH:</b> Measure from the top of the shoulder down to the desired hemline.</div>
                          <div className="text-xs mb-1"><b>BOTTOM LENGTH:</b> Measure from the waist (where you normally wear bottom) downwards along the side to the heel.</div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map((size) => (
                  <span key={size} className="inline-block px-2 py-1 text-xs font-medium bg-[#F9F6F4] text-[#4A3A3A] rounded-full">
                    {size}
                  </span>
                ))}
              </div>
            </div>
            <Button asChild className="w-full bg-[#D9A8A0] text-white hover:bg-[#C08478] hover:text-white mt-6">
              <Link href={`/contact?product=${encodeURIComponent(product.name)}`}>Inquire Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 