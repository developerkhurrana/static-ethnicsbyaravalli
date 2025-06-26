"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { TooltipItem } from "chart.js";

const ADMIN_PASSWORD = "ethnics@123";

export default function InteractiveContentPage() {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const password = window.prompt("Enter admin password:");
    if (password === ADMIN_PASSWORD) {
      setAuthorized(true);
    } else {
      router.replace("/");
    }
  }, [router]);

  useEffect(() => {
    if (!authorized) return;
    (async () => {
      if (typeof window === "undefined") return;
      const Chart = (await import("chart.js/auto")).default;
      // Blog topics
      const blogTopicsContainer = document.getElementById('blog-topics-grid');
      if (blogTopicsContainer) {
        const blogTopicsData = [
          { title: 'Diwali & Navratri 2025: Your Guide to Trending Ethnic Wear & Festive Colors', category: 'Trend-Focused', products: ['Kurta Sets', 'Festive Outfits'] },
          { title: 'Beyond Lehengas: Chic & Comfortable Wedding Guest Outfits for Late 2025', category: 'Buying Guide', products: ['Dresses', 'Kaftans'] },
          { title: 'Mastering Indo-Western Fusion: Effortless Looks with Kurtas & Co-ords', category: 'Styling', products: ['Kurta Sets', 'Co-ords'] },
          { title: 'Winter Warmth, Ethnic Charm: Trending Styles & Layering for Late 2025', category: 'Trend-Focused', products: ['Kurta Sets', 'Festive Outfits'] },
          { title: 'The Art of Conscious Dressing: Embracing Sustainable Indian Wear', category: 'Informational', products: ['Dresses', 'Kaftans'] },
          { title: 'Elevate Your Ethnic Look: The Ultimate Guide to Accessorizing Indian Wear', category: 'Styling', products: ['All Products'] },
          { title: 'From Bandhani to Brocade: Celebrating India\'s Timeless Prints & Weaves', category: 'Informational', products: ['Festive Outfits', 'Kurta Sets'] },
          { title: 'Your Ultimate Guide to Occasion Dressing: From Brunch to Gala', category: 'Buying Guide', products: ['Dresses', 'Co-ords'] },
          { title: 'The Kaftan Comeback: Your New Ethnic Wardrobe Essential', category: 'Trend-Focused', products: ['Kaftans', 'Kurta Sets'] },
          { title: 'Steal the Style: How to Recreate Celebrity Ethnic Looks with Ekohum', category: 'Styling', products: ['All Products'] }
        ];
        const categoryColors: Record<string, string> = {
          'Trend-Focused': 'bg-yellow-100 text-yellow-800',
          'Styling': 'bg-green-100 text-green-800',
          'Buying Guide': 'bg-red-100 text-red-800',
          'Informational': 'bg-blue-100 text-blue-800',
        };
        blogTopicsData.forEach(topic => {
          const card = document.createElement('div');
          card.className = 'bg-white rounded-lg shadow-md p-6 flex flex-col justify-between flow-step';
          card.innerHTML = `
            <div>
                <span class="text-xs font-bold py-1 px-3 rounded-full ${categoryColors[topic.category]}">${topic.category}</span>
                <h4 class="font-semibold text-lg mt-3 mb-2 h-16">${topic.title}</h4>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-100">
                <p class="text-xs text-gray-500 mb-1 font-semibold">Featured Products:</p>
                <div class="flex flex-wrap gap-2">
                   ${topic.products.map(p => `<span class=\"text-xs bg-gray-200 text-gray-800 py-1 px-2 rounded\">${p}</span>`).join('')}
                </div>
            </div>
          `;
          blogTopicsContainer.appendChild(card);
        });
      }
      // Chart.js charts
      const chartColors = {
        blue: '#118AB2',
        green: '#06D6A0',
        yellow: '#FFD166',
        red: '#FF6B6B',
        darkBlue: '#073B4C'
      };
      function wrapLabel(str: string, maxWidth: number) {
        if (!str) return '';
        if (str.length <= maxWidth) return str;
        const words = str.split(' ');
        const lines: string[] = [];
        let currentLine = '';
        words.forEach(word => {
          if ((currentLine + ' ' + word).length > maxWidth) {
            lines.push(currentLine.trim());
            currentLine = word;
          } else {
            currentLine += ' ' + word;
          }
        });
        lines.push(currentLine.trim());
        return lines.map(l => l.trim());
      }
      const tooltipTitleCallback = (tooltipItems: TooltipItem<'bar'>[]): string | void | string[] => {
        const item = tooltipItems[0];
        if (!item || !item.chart.data.labels) return '';
        const label = item.chart.data.labels[item.dataIndex];
        if (Array.isArray(label)) {
          return label.join(' ');
        }
        if (typeof label === 'string') {
          return label;
        }
        return '';
      };
      const universalChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom' as const,
            labels: {
              color: chartColors.darkBlue,
              padding: 20,
              font: { family: "'Poppins', sans-serif" }
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0,0,0,0.7)',
            titleFont: { size: 14, family: "'Poppins', sans-serif" },
            bodyFont: { size: 12, family: "'Poppins', sans-serif" },
            padding: 10,
            callbacks: { title: tooltipTitleCallback }
          }
        }
      };
      // Colors Chart
      const colorsElem = document.getElementById('colorsChart') as HTMLCanvasElement | null;
      if (colorsElem) {
        const colorsCtx = colorsElem.getContext('2d');
        if (colorsCtx) new Chart(colorsCtx, {
          type: 'doughnut',
          data: {
            labels: ['Vibrant & Jewel Tones', 'Pastels & Soft Hues', 'Neutrals & Metallics'],
            datasets: [{
              data: [45, 35, 20],
              backgroundColor: [chartColors.red, chartColors.green, chartColors.yellow],
              borderColor: '#fff',
              borderWidth: 4
            }]
          },
          options: { ...universalChartOptions, cutout: '60%' }
        });
      }
      // Fabrics Chart
      const fabricsElem = document.getElementById('fabricsChart') as HTMLCanvasElement | null;
      if (fabricsElem) {
        const fabricsCtx = fabricsElem.getContext('2d');
        if (fabricsCtx) new Chart(fabricsCtx, {
          type: 'bar',
          data: {
            labels: ['Light & Flowy', 'Luxurious & Textured', 'Handwoven & Natural'].map(l => wrapLabel(l, 16)),
            datasets: [{
              label: 'Popularity Index',
              data: [85, 65, 75],
              backgroundColor: [chartColors.green, chartColors.blue, chartColors.yellow],
              borderRadius: 5,
              barThickness: 30,
            }]
          },
          options: { ...universalChartOptions, indexAxis: 'y' as const, plugins: { ...universalChartOptions.plugins, legend: { display: false } }, scales: { x: { grid: { display: true, color: '#e2e8f0' } }, y: { grid: { display: false } } } }
        });
      }
      // Silhouettes Chart
      const silhouettesElem = document.getElementById('silhouettesChart') as HTMLCanvasElement | null;
      if (silhouettesElem) {
        const silhouettesCtx = silhouettesElem.getContext('2d');
        if (silhouettesCtx) new Chart(silhouettesCtx, {
          type: 'bar',
          data: {
            labels: ['Co-ord Sets', 'Fusion Wear', 'Anarkalis', 'Kaftans', 'Maxi Dresses'].map(l => wrapLabel(l, 12)),
            datasets: [{
              label: 'Trend Score',
              data: [90, 85, 75, 70, 65],
              backgroundColor: [chartColors.red, chartColors.yellow, chartColors.green, chartColors.blue, chartColors.darkBlue],
              borderRadius: 5,
              barThickness: 25,
            }]
          },
          options: { ...universalChartOptions, plugins: { ...universalChartOptions.plugins, legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { display: true, color: '#e2e8f0' } } } }
        });
      }
      // Competitor Chart
      const competitorElem = document.getElementById('competitorChart') as HTMLCanvasElement | null;
      if (competitorElem) {
        const competitorCtx = competitorElem.getContext('2d');
        if (competitorCtx) new Chart(competitorCtx, {
          type: 'radar',
          data: {
            labels: ['Styling Content', 'Celebrity Appeal', 'Timeliness', 'Comfort Focus', 'Cultural Story', 'Luxury Focus'],
            datasets: [
            {
              label: 'Ekohum (Opportunity)',
              data: [8, 7, 9, 10, 10, 7],
              backgroundColor: 'rgba(6, 214, 160, 0.2)',
              borderColor: chartColors.green,
              pointBackgroundColor: chartColors.green,
              borderWidth: 2,
            },
            {
              label: 'Avg. Competitor',
              data: [7, 8, 7, 5, 5, 8],
              backgroundColor: 'rgba(255, 107, 107, 0.2)',
              borderColor: chartColors.red,
              pointBackgroundColor: chartColors.red,
              borderWidth: 2,
            }
          ]},
          options: { ...universalChartOptions, scales: { r: { suggestedMin: 0, suggestedMax: 10, pointLabels: { font: { size: 12, family: "'Poppins', sans-serif" } }, ticks: { backdropColor: 'rgba(255,255,255,0.7)', stepSize: 2 } } } }
        });
      }
    })();
  }, [authorized]);

  if (!authorized) return null;

  return (
    <div className="text-[#073B4C] mt-8" style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#f7fafc' }}>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto p-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#118AB2]">Ekohum: Strategic Content Roadmap</h1>
          <p className="text-md md:text-lg mt-1 text-gray-500">Interactive Application | Late 2025 - Early 2026</p>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8 mt-4">
        <section id="introduction" className="mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center border border-gray-200">
            <h2 className="text-3xl font-bold mb-3 text-[#118AB2]">Translating Strategy into Growth</h2>
            <p className="max-w-4xl mx-auto text-gray-600">
              This interactive application translates the comprehensive content strategy for Ekohum into a digestible, visual format. It outlines the key market trends, strategic content pillars, and actionable blog topics designed to boost organic growth and conversions. Explore the sections below to understand how we'll connect with the modern, rooted Indian woman.
            </p>
          </div>
        </section>
        <section id="audience" className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-center">The Ekohum Woman: Our Audience</h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-8 text-center">Our content is crafted for the urban Indian woman who seeks a harmonious blend of modern style and cultural roots. She values comfort, elegance, and authentic storytelling.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md flow-step">
              <div className="text-5xl font-bold text-[#06D6A0]">24-45</div>
              <p className="mt-2 font-semibold text-gray-700">Age Group</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flow-step">
              <div className="text-5xl font-bold text-[#FFD166]">🏙️</div>
              <p className="mt-2 font-semibold text-gray-700">Urban & Digitally Savvy</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flow-step">
              <div className="text-5xl font-bold text-[#FF6B6B]">✨</div>
              <p className="mt-2 font-semibold text-gray-700">Values Comfort & Elegance</p>
            </div>
          </div>
        </section>
        <section id="trends" className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-center">The 2025/26 Fashion Zeitgeist</h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-8 text-center">The upcoming seasons are defined by a vibrant fusion of comfort, tradition, and contemporary aesthetics. Our content strategy will tap directly into these key consumer demands.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="bg-white rounded-lg shadow-md p-6 w-full">
              <h3 className="text-xl font-semibold mb-2 text-center">Trending Color Palettes</h3>
              <p className="text-sm text-center text-gray-500 mb-4">A diverse palette dominates, from soft pastels to rich jewel tones, reflecting sophisticated experimentation.</p>
              <div className="chart-container">
                <canvas id="colorsChart"></canvas>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 w-full">
              <h3 className="text-xl font-semibold mb-2 text-center">In-Demand Fabrics</h3>
              <p className="text-sm text-center text-gray-500 mb-4">Comfort is key. Consumers gravitate towards light, breathable fabrics and rich, natural textures.</p>
              <div className="chart-container">
                <canvas id="fabricsChart"></canvas>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 w-full lg:col-span-2">
              <h3 className="text-xl font-semibold mb-2 text-center">Evolving Silhouettes</h3>
              <p className="text-sm text-center text-gray-500 mb-4">Modern adaptations of traditional forms are trending, with co-ords and fusion wear leading in versatility.</p>
              <div className="chart-container mx-auto">
                <canvas id="silhouettesChart"></canvas>
              </div>
            </div>
          </div>
        </section>
        <section id="pillars" className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-center">Four Pillars of Content Strategy</h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-8 text-center">Our content is built on four pillars to engage users at every stage of their journey, from discovery to purchase.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-md flow-step">
              <div className="text-4xl mb-3">ℹ️</div>
              <h3 className="text-xl font-semibold text-[#118AB2] mb-2">Informational</h3>
              <p className="text-sm text-gray-600">Educate on fabrics, weaves, and sustainability to build trust.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md flow-step">
              <div className="text-4xl mb-3">👠</div>
              <h3 className="text-xl font-semibold text-[#06D6A0] mb-2">Styling</h3>
              <p className="text-sm text-gray-600">Provide "how-to" advice to showcase product versatility.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md flow-step">
              <div className="text-4xl mb-3">📈</div>
              <h3 className="text-xl font-semibold text-[#FFD166] mb-2">Trend-Focused</h3>
              <p className="text-sm text-gray-600">Highlight what&apos;s new and next to position Ekohum as a style leader.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md flow-step">
              <div className="text-4xl mb-3">🛒</div>
              <h3 className="text-xl font-semibold text-[#FF6B6B] mb-2">Buying Guides</h3>
              <p className="text-sm text-gray-600">Help customers make confident purchase decisions.</p>
            </div>
          </div>
        </section>
        <section id="blog-topics" className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-center">Top 10 High-Impact Blog Topics</h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-8 text-center">These SEO-optimized topics are designed to capture high-intent search traffic and drive conversions across our key product categories.</p>
          <div id="blog-topics-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        </section>
        <section id="competitors" className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-center">The Competitive Arena</h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-8 text-center">While competitors are strong, Ekohum has a unique opportunity to lead by emphasizing its &quot;modern yet rooted&quot; philosophy, focus on comfort, and deep cultural storytelling.</p>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="chart-container">
              <canvas id="competitorChart"></canvas>
            </div>
          </div>
        </section>
        <section id="conversion" className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-center">From Clicks to Conversions</h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-8 text-center">Our strategy transforms readers into customers by creating a seamless journey from inspiration to purchase.</p>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col md:flex-row items-center justify-around space-y-4 md:space-y-0 md:space-x-4">
              <div className="flow-step text-center p-4 rounded-lg w-48">
                <div className="text-4xl">🎯</div>
                <p className="font-semibold mt-2">Attract with SEO</p>
              </div>
              <div className="flow-arrow hidden md:block">&rarr;</div>
              <div className="flow-arrow block md:hidden">&darr;</div>
              <div className="flow-step text-center p-4 rounded-lg w-48">
                <div className="text-4xl">💡</div>
                <p className="font-semibold mt-2">Engage with Stories</p>
              </div>
              <div className="flow-arrow hidden md:block">&rarr;</div>
              <div className="flow-arrow block md:hidden">&darr;</div>
              <div className="flow-step text-center p-4 rounded-lg w-48">
                <div className="text-4xl">🔗</div>
                <p className="font-semibold mt-2">Integrate Products</p>
              </div>
              <div className="flow-arrow hidden md:block">&rarr;</div>
              <div className="flow-arrow block md:hidden">&darr;</div>
              <div className="flow-step text-center p-4 bg-[#f0fff4] border-2 border-[#06D6A0] rounded-lg w-48">
                <div className="text-4xl">✅</div>
                <p className="font-semibold mt-2 text-[#06D6A0]">Drive Conversion</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <style>{`
        .chart-container {
          position: relative;
          width: 100%;
          max-width: 550px;
          margin-left: auto;
          margin-right: auto;
          height: 320px;
          max-height: 380px;
        }
        @media (min-width: 768px) {
          .chart-container {
            height: 350px;
          }
        }
        .flow-arrow {
          font-size: 2rem;
          line-height: 1;
          color: #118AB2;
          opacity: 0.6;
        }
        .flow-step {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .flow-step:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
} 