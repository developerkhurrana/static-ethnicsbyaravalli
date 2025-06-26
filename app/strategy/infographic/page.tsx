"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ADMIN_PASSWORD = "ethnics@123";

export default function InfographicPage() {
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
      const blogTopicsContainer = document.querySelector('#blog-topics .grid');
      if (blogTopicsContainer) {
        const blogTopicsData = [
          { title: 'Diwali & Navratri 2025: Your Guide to Trending Ethnic Wear & Festive Colors', category: 'Trend-Focused', products: ['👗', '✨'] },
          { title: 'Beyond Lehengas: Chic & Comfortable Wedding Guest Outfits for Late 2025', category: 'Buying Guide', products: ['👗', '👘'] },
          { title: 'Mastering Indo-Western Fusion: Effortless Looks with Kurtas & Co-ords', category: 'Styling', products: ['👚', '👖'] },
          { title: 'Winter Warmth, Ethnic Charm: Trending Styles & Layering for Late 2025', category: 'Trend-Focused', products: ['🧥', '🧣'] },
          { title: 'The Art of Conscious Dressing: Embracing Sustainable & Handcrafted Indian Wear', category: 'Informational', products: ['🌿', '👐'] },
          { title: 'Elevate Your Ethnic Look: The Ultimate Guide to Accessorizing Indian Wear', category: 'Styling', products: ['💍', '👜'] },
          { title: 'From Bandhani to Brocade: Celebrating India\'s Timeless Prints & Weaves in 2025', category: 'Informational', products: ['🎨', '✨'] },
          { title: 'Your Ultimate Guide to Occasion Dressing: From Brunch to Gala', category: 'Buying Guide', products: ['☀️', '🌙'] },
          { title: 'The Kaftan Comeback: Your New Ethnic Wardrobe Essential', category: 'Trend-Focused', products: ['👘', '💨'] },
          { title: 'Steal the Style: How to Recreate Celebrity Ethnic Looks with Ekohum', category: 'Styling', products: ['⭐', '📸'] }
        ];
        const categoryColors: Record<string, string> = {
          'Trend-Focused': 'bg-[#FFD166] text-black',
          'Styling': 'bg-[#06D6A0] text-white',
          'Buying Guide': 'bg-[#FF6B6B] text-white',
          'Informational': 'bg-[#118AB2] text-white',
        };
        blogTopicsData.forEach(topic => {
          const card = document.createElement('div');
          card.className = 'bg-white rounded-lg shadow-md p-6 flex flex-col justify-between flow-step';
          card.innerHTML = `
            <div>
                <span class=\"text-xs font-bold py-1 px-3 rounded-full ${categoryColors[topic.category]}\">${topic.category}</span>
                <h4 class=\"font-semibold text-lg mt-3 mb-2\">${topic.title}</h4>
            </div>
            <div class=\"text-right text-2xl mt-4\">
                ${topic.products.join(' ')}
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
        if (str.length <= maxWidth) {
          return str;
        }
        const words = str.split(' ');
        const lines: string[] = [];
        let currentLine = '';
        words.forEach(word => {
          if ((currentLine + word).length > maxWidth) {
            lines.push(currentLine.trim());
            currentLine = '';
          }
          currentLine += word + ' ';
        });
        lines.push(currentLine.trim());
        return lines;
      }
      const tooltipTitleCallback = (tooltipItems: unknown[]) => {
        const item = (tooltipItems as any[])[0];
        if (!item) return '';
        const label = item.chart.data.labels[item.dataIndex];
        if (Array.isArray(label)) {
          return label.join(' ');
        }
        return label;
      };
      const universalChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom' as const,
            labels: {
              color: chartColors.darkBlue,
              font: {
                family: "'Poppins', sans-serif"
              }
            }
          },
          tooltip: {
            callbacks: {
              title: tooltipTitleCallback
            },
            bodyFont: {
              family: "'Poppins', sans-serif"
            },
            titleFont: {
              family: "'Poppins', sans-serif"
            }
          }
        },
        scales: {
          x: {
            ticks: { color: chartColors.darkBlue, font: { family: "'Poppins', sans-serif" } },
            grid: { display: false }
          },
          y: {
            ticks: { color: chartColors.darkBlue, font: { family: "'Poppins', sans-serif" } },
            grid: { color: '#e5e7eb' }
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
              label: 'Trending Color Palettes',
              data: [45, 35, 20],
              backgroundColor: [chartColors.red, chartColors.green, chartColors.yellow],
              borderColor: '#fff',
              borderWidth: 3
            }]
          },
          options: { ...universalChartOptions, scales: { x: { display: false }, y: { display: false } } }
        });
      }
      // Fabrics Chart
      const fabricsElem = document.getElementById('fabricsChart') as HTMLCanvasElement | null;
      if (fabricsElem) {
        const fabricsCtx = fabricsElem.getContext('2d');
        if (fabricsCtx) new Chart(fabricsCtx, {
          type: 'bar',
          data: {
            labels: ['Light & Flowy (Organza, Cotton)', 'Luxurious & Textured (Brocade)', 'Handwoven & Natural Fibers'].map(l => wrapLabel(l, 16)),
            datasets: [{
              label: 'Popularity Index',
              data: [85, 65, 75],
              backgroundColor: [chartColors.green, chartColors.blue, chartColors.yellow],
              borderRadius: 5
            }]
          },
          options: { ...universalChartOptions, indexAxis: 'y' as const, plugins: { legend: { display: false }, tooltip: { callbacks: { title: tooltipTitleCallback } } } }
        });
      }
      // Silhouettes Chart
      const silhouettesElem = document.getElementById('silhouettesChart') as HTMLCanvasElement | null;
      if (silhouettesElem) {
        const silhouettesCtx = silhouettesElem.getContext('2d');
        if (silhouettesCtx) new Chart(silhouettesCtx, {
          type: 'bar',
          data: {
            labels: ['Co-ord Sets', 'Fusion Wear', 'Anarkalis', 'Kaftans', 'Dresses & Maxi Dresses'].map(l => wrapLabel(l, 16)),
            datasets: [{
              label: 'Trend Score',
              data: [90, 85, 70, 75, 65],
              backgroundColor: [chartColors.red, chartColors.yellow, chartColors.green, chartColors.blue, chartColors.darkBlue],
              borderRadius: 5
            }]
          },
          options: { ...universalChartOptions, plugins: { legend: { display: false }, tooltip: { callbacks: { title: tooltipTitleCallback } } } }
        });
      }
      // Competitor Chart
      const competitorElem = document.getElementById('competitorChart') as HTMLCanvasElement | null;
      if (competitorElem) {
        const competitorCtx = competitorElem.getContext('2d');
        if (competitorCtx) new Chart(competitorCtx, {
          type: 'radar',
          data: {
            labels: ['Luxury Focus', 'Styling Content', 'Celebrity Appeal', 'Timeliness', 'Comfort Focus', 'Cultural Storytelling'],
            datasets: [
            {
              label: 'Ekohum (Goal)',
              data: [7, 8, 7, 9, 10, 10],
              backgroundColor: 'rgba(6, 214, 160, 0.2)',
              borderColor: chartColors.green,
              pointBackgroundColor: chartColors.green
            },
            {
              label: 'Avg. Competitor',
              data: [8, 7, 8, 7, 5, 5],
              backgroundColor: 'rgba(255, 107, 107, 0.2)',
              borderColor: chartColors.red,
              pointBackgroundColor: chartColors.red
            }
          ]},
          options: { ...universalChartOptions, scales: { r: { suggestedMin: 0, suggestedMax: 10, pointLabels: { font: { size: 12, family: "'Poppins', sans-serif" } }, ticks: { backdropColor: 'white', color: chartColors.darkBlue } } } }
        });
      }
    })();
  }, [authorized]);

  if (!authorized) return null;

  return (
    <div className="text-[#073B4C] mt-8" style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#f8f9fa' }}>
      <header className="bg-white shadow-md p-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#118AB2]">Ekohum's Content Roadmap</h1>
        <p className="text-lg md:text-xl mt-2 text-gray-600">A Visual Strategy for Organic Growth & Conversion in 2025-2026</p>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        <section id="audience" className="bg-white rounded-lg shadow-md p-6 mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#118AB2]">Meet the Ekohum Woman</h2>
          <p className="max-w-3xl mx-auto text-gray-700 mb-6">Our content is crafted for the urban Indian woman who seeks a harmonious blend of modern style and cultural roots. She values comfort, elegance, and authentic storytelling in her fashion choices.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-5xl font-bold text-[#06D6A0]">24-45</div>
              <p className="mt-2 font-semibold">Age Group</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-5xl font-bold text-[#FF6B6B]">🏙️</div>
              <p className="mt-2 font-semibold">Urban & Digitally Savvy</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-5xl font-bold text-[#FFD166]">✨</div>
              <p className="mt-2 font-semibold">Values Comfort & Elegance</p>
            </div>
          </div>
        </section>
        <section id="trends" className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-bold mb-2 text-center text-[#118AB2]">The 2025/26 Fashion Zeitgeist</h2>
          <p className="max-w-3xl mx-auto text-gray-700 mb-8 text-center">The upcoming seasons are defined by a vibrant fusion of comfort, tradition, and contemporary aesthetics. Our content strategy will tap directly into these key consumer demands.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="w-full">
              <h3 className="text-xl font-semibold mb-2 text-center">Trending Color Palettes</h3>
              <p className="text-sm text-center text-gray-600 mb-4">A diverse palette dominates, from soft pastels to rich jewel tones, reflecting a mood of sophisticated experimentation.</p>
              <div className="chart-container">
                <canvas id="colorsChart"></canvas>
              </div>
            </div>
            <div className="w-full">
              <h3 className="text-xl font-semibold mb-2 text-center">In-Demand Fabrics</h3>
              <p className="text-sm text-center text-gray-600 mb-4">Comfort is key. Consumers are gravitating towards light, breathable fabrics and rich, natural textures.</p>
              <div className="chart-container">
                <canvas id="fabricsChart"></canvas>
              </div>
            </div>
            <div className="w-full lg:col-span-2">
              <h3 className="text-xl font-semibold mb-2 text-center">Evolving Silhouettes</h3>
              <p className="text-sm text-center text-gray-600 mb-4">Modern adaptations of traditional forms are trending, with co-ords, fusion wear, and kaftans leading the charge in versatility and style.</p>
              <div className="chart-container mx-auto">
                <canvas id="silhouettesChart"></canvas>
              </div>
            </div>
          </div>
        </section>
        <section id="pillars" className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-bold mb-2 text-center text-[#118AB2]">The Four Pillars of Content Strategy</h2>
          <p className="max-w-3xl mx-auto text-gray-700 mb-8 text-center">Our content will be built on four strategic pillars to engage users at every stage of their journey, from initial discovery to final purchase.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg flow-step">
              <div className="text-4xl mb-3">ℹ️</div>
              <h3 className="text-xl font-semibold text-[#118AB2] mb-2">Informational</h3>
              <p className="text-sm text-gray-600">Educate on fabrics, weaves, and sustainability to build trust and cultural connection.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg flow-step">
              <div className="text-4xl mb-3">👠</div>
              <h3 className="text-xl font-semibold text-[#06D6A0] mb-2">Styling</h3>
              <p className="text-sm text-gray-600">Provide practical "how-to" advice to showcase product versatility and inspire looks.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg flow-step">
              <div className="text-4xl mb-3">📈</div>
              <h3 className="text-xl font-semibold text-[#FFD166] mb-2">Trend-Focused</h3>
              <p className="text-sm text-gray-600">Highlight what&apos;s new and next in ethnic fashion to position Ekohum as a style leader.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg flow-step">
              <div className="text-4xl mb-3">🛒</div>
              <h3 className="text-xl font-semibold text-[#FF6B6B] mb-2">Buying Guides</h3>
              <p className="text-sm text-gray-600">Help customers make confident purchase decisions with curated guides.</p>
            </div>
          </div>
        </section>
        <section id="blog-topics" className="p-6 mb-8">
          <h2 className="text-3xl font-bold mb-2 text-center text-[#118AB2]">Top 10 High-Impact Blog Topics</h2>
          <p className="max-w-3xl mx-auto text-gray-700 mb-8 text-center">These SEO-optimized topics are designed to capture high-intent search traffic and drive conversions across our key product categories.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        </section>
        <section id="competitors" className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-bold mb-2 text-center text-[#118AB2]">The Competitive Arena</h2>
          <p className="max-w-3xl mx-auto text-gray-700 mb-8 text-center">While competitors are strong, Ekohum has a unique opportunity to lead by emphasizing its &quot;modern yet rooted&quot; philosophy, focus on comfort, and deep cultural storytelling.</p>
          <div className="chart-container">
            <canvas id="competitorChart"></canvas>
          </div>
        </section>
        <section id="conversion" className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-bold mb-2 text-center text-[#118AB2]">From Clicks to Conversions</h2>
          <p className="max-w-3xl mx-auto text-gray-700 mb-8 text-center">Our strategy transforms readers into customers by creating a seamless journey from inspiration to purchase.</p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flow-step text-center p-4 bg-gray-50 rounded-lg w-48">
              <div className="text-3xl">🎯</div>
              <p className="font-semibold">Attract with SEO</p>
            </div>
            <div className="flow-arrow hidden md:block">&rarr;</div>
            <div className="flow-arrow block md:hidden">&darr;</div>
            <div className="flow-step text-center p-4 bg-gray-50 rounded-lg w-48">
              <div className="text-3xl">💡</div>
              <p className="font-semibold">Engage with Stories</p>
            </div>
            <div className="flow-arrow hidden md:block">&rarr;</div>
            <div className="flow-arrow block md:hidden">&darr;</div>
            <div className="flow-step text-center p-4 bg-gray-50 rounded-lg w-48">
              <div className="text-3xl">🔗</div>
              <p className="font-semibold">Integrate Products</p>
            </div>
            <div className="flow-arrow hidden md:block">&rarr;</div>
            <div className="flow-arrow block md:hidden">&darr;</div>
            <div className="flow-step text-center p-4 bg-white border-2 border-[#06D6A0] rounded-lg w-48">
              <div className="text-3xl">✅</div>
              <p className="font-semibold text-[#06D6A0]">Drive Conversion</p>
            </div>
          </div>
        </section>
      </main>
      <style>{`
        .chart-container {
          position: relative;
          width: 100%;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          height: 350px;
          max-height: 400px;
        }
        @media (min-width: 768px) {
          .chart-container {
            height: 400px;
          }
        }
        .flow-arrow {
          font-size: 2rem;
          line-height: 1;
          color: #118AB2;
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