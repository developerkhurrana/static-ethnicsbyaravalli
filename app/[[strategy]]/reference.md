<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ekohum: Interactive Sales Funnel Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Chosen Palette: Earthy Neutrals (Light Beige, Warm Taupe, Muted Olive, Deep Charcoal) -->
    <!-- Application Structure Plan: A dashboard-style SPA with top navigation for 'B2C Funnel', 'B2B Funnel', 'Growth Tactics', and 'Implementation Roadmap'. This non-linear structure allows users to jump to sections of interest, rather than scrolling through a long document. The B2C/B2B funnels are visualized as interactive diagrams where clicking a stage reveals detailed strategies. This promotes exploration and better comprehension of the process flow. Growth Tactics are presented as interactive cards, making them easily scannable and digestible. The implementation plan is a clickable phased checklist. This structure was chosen to transform the dense text-based playbook into an engaging, task-oriented tool for a marketing strategist. -->
    <!-- Visualization & Content Choices: 1. B2C Funnel: Goal: Organize/Inform. Method: An interactive funnel diagram built with HTML/CSS, where each stage is clickable. Interaction: Clicking a stage (e.g., 'Awareness') dynamically displays the corresponding strategies, platforms, and content types in an adjacent pane. Justification: Visualizes the process flow and makes the dense information accessible on demand. 2. Channel Effectiveness Chart: Goal: Compare. Method: A Chart.js Bar Chart. Data: Comparing WhatsApp (~98% open rate) vs. Email (~21% open rate). Interaction: Hover tooltips provide exact percentages. Justification: Quantifies a key strategic point from the report, making the case for WhatsApp marketing immediately obvious. 3. Growth Tactics: Goal: Inform/Organize. Method: A grid of interactive HTML cards. Interaction: Clicking a card reveals detailed tactics and examples from the report. Justification: Breaks down complex strategies into bite-sized, engaging elements. 4. B2B Flow: Goal: Organize. Method: A horizontal process flow diagram using HTML/CSS. Interaction: Clicking a step highlights it and shows details. Justification: Clarifies the B2B lead generation process, which is linear. 5. Implementation Roadmap: Goal: Inform/Organize. Method: A vertical timeline/checklist with HTML/CSS. Interaction: Clicking a phase expands its details. Justification: Provides a clear, actionable plan. Library/Method: Chart.js for the one chart, Vanilla JS for all interactions. -->
    <!-- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #FDFBF8;
            color: #3D405B;
        }
        .nav-link {
            transition: all 0.3s ease;
            position: relative;
            padding-bottom: 8px;
        }
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: #8D8741;
            transition: width 0.3s ease;
        }
        .nav-link.active, .nav-link:hover {
            color: #8D8741;
        }
        .nav-link.active::after, .nav-link:hover::after {
            width: 100%;
        }
        .card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .funnel-stage, .b2b-stage, .timeline-item {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .funnel-stage.active {
            background-color: #8D8741;
            color: #FFFFFF;
            transform: scale(1.05);
        }
        .b2b-stage.active {
            border-color: #8D8741;
            background-color: #FDFBF8;
        }
        .b2b-stage.active .b2b-stage-icon {
            background-color: #8D8741;
            color: #FFFFFF;
        }
        .content-pane {
            transition: opacity 0.5s ease-in-out;
        }
        .hidden-content {
            display: none;
            opacity: 0;
        }
        .visible-content {
            display: block;
            opacity: 1;
        }
        .chart-container {
            position: relative;
            width: 100%;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            height: 350px;
            max-height: 400px;
        }
    </style>
</head>
<body class="antialiased">
    <header class="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 class="text-2xl font-bold text-[#659DBD]">
                <span class="font-light">Ekohum /</span> Strategy Dashboard
            </h1>
            <div class="hidden md:flex items-center space-x-8 text-lg font-medium">
                <a href="#b2c" class="nav-link active">B2C Funnel</a>
                <a href="#b2b" class="nav-link">B2B Funnel</a>
                <a href="#tactics" class="nav-link">Growth Tactics</a>
                <a href="#roadmap" class="nav-link">Roadmap</a>
            </div>
            <button id="mobile-menu-button" class="md:hidden text-2xl">☰</button>
        </nav>
        <div id="mobile-menu" class="hidden md:hidden bg-white py-4">
             <a href="#b2c" class="block text-center py-2 text-lg nav-link-mobile">B2C Funnel</a>
             <a href="#b2b" class="block text-center py-2 text-lg nav-link-mobile">B2B Funnel</a>
             <a href="#tactics" class="block text-center py-2 text-lg nav-link-mobile">Growth Tactics</a>
             <a href="#roadmap" class="block text-center py-2 text-lg nav-link-mobile">Roadmap</a>
        </div>
    </header>

    <main class="container mx-auto p-4 md:p-8">
        
        <!-- B2C Sales Funnel Section -->
        <section id="b2c" class="page-section mb-16">
            <div class="text-center mb-8">
                <h2 class="text-4xl font-bold text-[#3D405B]">B2C Sales Funnel</h2>
                <p class="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">An interactive guide to Ekohum's direct-to-consumer journey, from initial awareness to loyal advocacy. Click on each stage of the funnel to explore detailed strategies and platform-specific actions.</p>
            </div>

            <div class="lg:flex lg:space-x-8">
                <!-- Funnel Visualization -->
                <div class="lg:w-1/3 mb-8 lg:mb-0 flex flex-col items-center space-y-2">
                    <div class="funnel-stage active w-full max-w-xs p-4 text-center rounded-lg shadow-md bg-gray-100 border border-gray-200" data-target="awareness">
                        <h3 class="font-bold text-xl">Awareness</h3>
                        <p class="text-sm">Capture Attention</p>
                    </div>
                    <div class="text-2xl">▼</div>
                    <div class="funnel-stage w-full max-w-[280px] p-4 text-center rounded-lg shadow-md bg-gray-100 border border-gray-200" data-target="interest">
                        <h3 class="font-bold text-xl">Interest</h3>
                        <p class="text-sm">Spark Curiosity</p>
                    </div>
                    <div class="text-2xl">▼</div>
                    <div class="funnel-stage w-full max-w-[240px] p-4 text-center rounded-lg shadow-md bg-gray-100 border border-gray-200" data-target="desire">
                        <h3 class="font-bold text-xl">Desire</h3>
                        <p class="text-sm">Cultivate Want</p>
                    </div>
                     <div class="text-2xl">▼</div>
                    <div class="funnel-stage w-full max-w-[200px] p-4 text-center rounded-lg shadow-md bg-gray-100 border border-gray-200" data-target="action">
                        <h3 class="font-bold text-xl">Action</h3>
                        <p class="text-sm">Drive Purchase</p>
                    </div>
                     <div class="text-2xl">▼</div>
                    <div class="funnel-stage w-full max-w-[160px] p-4 text-center rounded-lg shadow-md bg-gray-100 border border-gray-200" data-target="retention">
                        <h3 class="font-bold text-xl">Retention</h3>
                        <p class="text-sm">Foster Loyalty</p>
                    </div>
                </div>

                <!-- Content Pane -->
                <div class="lg:w-2/3 p-6 bg-white rounded-xl shadow-lg border border-gray-200 content-pane">
                    <div id="awareness-content" class="funnel-content visible-content">
                        <h3 class="text-2xl font-bold mb-4 text-[#8D8741]">Awareness: Capturing Attention</h3>
                        <p class="mb-4">Introduce Ekohum to those who don't yet know they need handcrafted slow fashion. The goal is authentic storytelling, not just visibility.</p>
                        <ul class="space-y-3 list-disc list-inside text-gray-700">
                            <li><strong>Instagram Reels:</strong> Showcase the movement and artistry of apparel. Tell a value-driven narrative ("Here's why this belongs in your life").</li>
                            <li><strong>Micro-Influencer Collabs:</strong> Partner with influencers aligned with sustainability for authentic, high-engagement endorsements.</li>
                            <li><strong>Behind-the-Scenes:</strong> Share artisan stories and production processes to build transparency and emotional connection.</li>
                            <li><strong>Targeted Ads:</strong> Use Lookalike Audiences on Instagram/Facebook to reach new, highly relevant prospects.</li>
                        </ul>
                    </div>
                    <div id="interest-content" class="funnel-content hidden-content">
                        <h3 class="text-2xl font-bold mb-4 text-[#8D8741]">Interest: Sparking Curiosity</h3>
                        <p class="mb-4">Transition passive viewers into active followers. Nurture leads in a low-pressure, high-trust environment.</p>
                        <ul class="space-y-3 list-disc list-inside text-gray-700">
                            <li><strong>Value-Driven Content:</strong> Create styling guides, sustainable fashion tips, and customer testimonials.</li>
                            <li><strong>Interactive Stories:</strong> Use polls, Q&As, and quizzes on Instagram to engage users and gather preferences.</li>
                            <li><strong>WhatsApp Community:</strong> Invite followers to an exclusive group for early peeks and direct interaction. WhatsApp is a relationship builder, not just a sales tool.</li>
                            <li><strong>DM for Styling:</strong> Position Instagram DMs as personalized styling sessions to build rapport and capture leads.</li>
                        </ul>
                    </div>
                    <div id="desire-content" class="funnel-content hidden-content">
                        <h3 class="text-2xl font-bold mb-4 text-[#8D8741]">Desire: Cultivating Emotional Connection</h3>
                        <p class="mb-4">Transform interest into a strong want. Use authentic scarcity that reflects the true nature of handcrafted production.</p>
                        <ul class="space-y-3 list-disc list-inside text-gray-700">
                             <li><strong>Deep Storytelling:</strong> Share the narrative behind each piece—the artisan, inspiration, and cultural significance—on the website and via WhatsApp.</li>
                            <li><strong>Social Proof:</strong> Prominently display reviews, ratings, and User-Generated Content (UGC). "92% trust reviews."</li>
                            <li><strong>Authentic Scarcity:</strong> Use messages like "Only 11 made." This isn't a gimmick; it's a reflection of slow fashion production.</li>
                            <li><strong>VIP Early Access:</strong> Offer previews to the "Ekohum Insiders" community to create a sense of privilege and anticipation.</li>
                        </ul>
                    </div>
                     <div id="action-content" class="funnel-content hidden-content">
                        <h3 class="text-2xl font-bold mb-4 text-[#8D8741]">Action: Converting Desire into Purchase</h3>
                        <p class="mb-4">Make the purchase process seamless and enticing. Leverage WhatsApp as a high-conversion channel for the Indian market.</p>
                        <ul class="space-y-3 list-disc list-inside text-gray-700">
                            <li><strong>Clear CTAs:</strong> Use benefit-driven calls to action like "Shop the Handcrafted Collection" or "Tap to Unlock Offer."</li>
                            <li><strong>Frictionless Checkout:</strong> Simplify the website checkout process and offer diverse payment options like UPI and COD.</li>
                            <li><strong>WhatsApp Conversions:</strong> Use in-app catalogs and payment links for direct, seamless sales. WhatsApp has a ~98% open rate in India.</li>
                            <li><strong>Cart Recovery:</strong> Send automated reminders via email and WhatsApp, which is highly effective for cart recovery.</li>
                        </ul>
                    </div>
                     <div id="retention-content" class="funnel-content hidden-content">
                        <h3 class="text-2xl font-bold mb-4 text-[#8D8741]">Retention: Fostering Loyalty</h3>
                        <p class="mb-4">Turn one-time buyers into brand advocates. Loyalty in slow fashion is about shared values, not just discounts.</p>
                        <ul class="space-y-3 list-disc list-inside text-gray-700">
                            <li><strong>Values-Aligned Loyalty Program:</strong> Reward engagement, referrals, and purchases. Offer perks like early access and exclusive content, not just cashback.</li>
                             <li><strong>Post-Purchase Engagement:</strong> Send automated WhatsApp messages with care tips, styling suggestions, and new arrival alerts.</li>
                            <li><strong>Community Building:</strong> Encourage feedback, host virtual workshops, and create a sense of shared purpose.</li>
                            <li><strong>Personalized Re-engagement:</strong> Use data to predict customer needs and send "Back in Stock" notifications or tailored suggestions.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- B2B Sales Funnel Section -->
        <section id="b2b" class="page-section mb-16 hidden-content">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-[#3D405B]">B2B Sales Funnel</h2>
                <p class="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">A strategic flow for building wholesale partnerships, from making an impact at trade shows to nurturing long-term relationships. Click each stage to see key activities.</p>
            </div>
            
            <!-- B2B Process Flow -->
            <div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                 <div class="b2b-stage active flex-1 text-center p-4 border-2 border-gray-200 rounded-lg" data-target="pre-show">
                    <div class="b2b-stage-icon w-12 h-12 mx-auto mb-2 rounded-full bg-gray-200 flex items-center justify-center text-2xl">📢</div>
                    <h3 class="font-semibold">Pre-Show Engagement</h3>
                </div>
                <div class="text-2xl hidden md:block">→</div>
                <div class="text-2xl md:hidden">↓</div>
                 <div class="b2b-stage flex-1 text-center p-4 border-2 border-gray-200 rounded-lg" data-target="booth">
                    <div class="b2b-stage-icon w-12 h-12 mx-auto mb-2 rounded-full bg-gray-200 flex items-center justify-center text-2xl">🏠</div>
                    <h3 class="font-semibold">Booth as Storytelling Hub</h3>
                </div>
                <div class="text-2xl hidden md:block">→</div>
                <div class="text-2xl md:hidden">↓</div>
                <div class="b2b-stage flex-1 text-center p-4 border-2 border-gray-200 rounded-lg" data-target="follow-up">
                    <div class="b2b-stage-icon w-12 h-12 mx-auto mb-2 rounded-full bg-gray-200 flex items-center justify-center text-2xl">📱</div>
                    <h3 class="font-semibold">Digital Follow-Up</h3>
                </div>
                <div class="text-2xl hidden md:block">→</div>
                <div class="text-2xl md:hidden">↓</div>
                 <div class="b2b-stage flex-1 text-center p-4 border-2 border-gray-200 rounded-lg" data-target="nurturing">
                    <div class="b2b-stage-icon w-12 h-12 mx-auto mb-2 rounded-full bg-gray-200 flex items-center justify-center text-2xl">🤝</div>
                    <h3 class="font-semibold">Order & Nurturing</h3>
                </div>
            </div>

            <!-- B2B Content Pane -->
            <div class="mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200 content-pane min-h-[250px]">
                <div id="pre-show-content" class="b2b-content visible-content">
                    <h3 class="text-2xl font-bold mb-4 text-[#8D8741]">Pre-Show Engagement</h3>
                    <p>Build anticipation and book meetings before the event begins.</p>
                     <ul class="mt-4 space-y-2 list-disc list-inside text-gray-700">
                        <li>Send targeted email invitations to buyers with a link to a digital pre-show catalog.</li>
                        <li>Use LinkedIn and Instagram to tease new collections and announce participation.</li>
                        <li>Include a clear Call to Action to pre-book meetings at the booth.</li>
                    </ul>
                </div>
                 <div id="booth-content" class="b2b-content hidden-content">
                    <h3 class="text-2xl font-bold mb-4 text-[#8D8741]">Booth as Storytelling Hub</h3>
                    <p>Transform the booth from a sales point to an immersive brand experience.</p>
                     <ul class="mt-4 space-y-2 list-disc list-inside text-gray-700">
                        <li>**Live Artisan Demos:** Showcase the skill behind the craft to create a memorable impact.</li>
                        <li>**Interactive Displays:** Use raw materials and videos of the production process to tell Ekohum's story.</li>
                        <li>**Efficient Lead Capture:** Use QR codes linked to a WhatsApp chat or a digital form for easy lead collection.</li>
                    </ul>
                </div>
                <div id="follow-up-content" class="b2b-content hidden-content">
                    <h3 class="text-2xl font-bold mb-4 text-[#8D8741]">Digital Follow-Up</h3>
                    <p>Capitalize on momentum with swift, personalized communication.</p>
                     <ul class="mt-4 space-y-2 list-disc list-inside text-gray-700">
                        <li>Send an immediate, automated "Thank You" message via WhatsApp after lead capture.</li>
                        <li>Within 24-48 hours, send a personalized email with the digital catalog and a summary of the conversation.</li>
                         <li>Use WhatsApp to schedule virtual meetings and product demos.</li>
                    </ul>
                </div>
                 <div id="nurturing-content" class="b2b-content hidden-content">
                    <h3 class="text-2xl font-bold mb-4 text-[#8D8741]">Order & Relationship Nurturing</h3>
                    <p>Streamline the ordering process and build lasting partnerships.</p>
                     <ul class="mt-4 space-y-2 list-disc list-inside text-gray-700">
                        <li>Use interactive digital catalogs with wholesale pricing and MOQs clearly stated.</li>
                        <li>Provide automated order updates via WhatsApp for transparency.</li>
                         <li>Share relevant industry news and sustainable fashion insights to position Ekohum as a knowledgeable partner.</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Growth Tactics Section -->
        <section id="tactics" class="page-section mb-16 hidden-content">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-[#3D405B]">High-Converting Growth Tactics</h2>
                <p class="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">Explore proven strategies from top D2C brands and psychological triggers adapted for Ekohum's slow fashion ethos. This section includes a key data visualization on channel effectiveness.</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Tactic Cards -->
                <div class="card bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <h3 class="font-bold text-xl mb-2 text-[#659DBD]">Community-Driven Marketing</h3>
                    <p class="text-gray-600">Build a "Slow Fashion Enthusiasts" community. Host "Meet the Artisan" webinars and co-create designs with loyal customers to foster deep belonging and ensure product-market fit. Community is the new loyalty program.</p>
                </div>
                 <div class="card bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <h3 class="font-bold text-xl mb-2 text-[#659DBD]">Authentic Scarcity</h3>
                    <p class="text-gray-600">Leverage the natural limits of handcrafted production. Use messaging like "Only 11 made" not as a tactic, but as a truthful statement of quality and uniqueness that appeals to conscious consumers seeking special items.</p>
                </div>
                <div class="card bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <h3 class="font-bold text-xl mb-2 text-[#659DBD]">Psychological Triggers</h3>
                     <p class="text-gray-600">Use triggers ethically. Offer "VIP Early Access" to reward loyalty, use "Tap to Unlock" CTAs for engagement, and display social proof like "Over 12,000 women trust Ekohum" to build credibility without being manipulative.</p>
                </div>
                <div class="card bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <h3 class="font-bold text-xl mb-2 text-[#659DBD]">Lead Magnets as Ethos Reinforcers</h3>
                    <p class="text-gray-600">Offer valuable freebies like a "Slow Fashion Styling Guide" or a "Handcrafted Apparel Size Guide." These not only capture leads but also educate consumers on your brand's core values, attracting higher-quality prospects.</p>
                </div>
                <div class="card bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <h3 class="font-bold text-xl mb-2 text-[#659DBD]">Value Reiteration in Retargeting</h3>
                    <p class="text-gray-600">When retargeting a user for an abandoned cart, don't just show the product. Remind them of the value: "Remember that unique handcrafted piece? It's ethically made and waiting for you." This reinforces brand identity.</p>
                </div>
                 <div class="card bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <h3 class="font-bold text-xl mb-2 text-[#659DBD]">Reactivation as Re-education</h3>
                    <p class="text-gray-600">When re-engaging inactive customers, subtly remind them of the *why* behind their purchase—artisan skill, ethical impact, and garment longevity. This re-establishes an emotional, value-based connection.</p>
                </div>
            </div>

            <div class="mt-12 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                 <h3 class="text-2xl font-bold text-center mb-4 text-[#3D405B]">Data Insight: Channel Effectiveness</h3>
                 <p class="text-center text-gray-600 mb-6">This chart visualizes the dramatic difference in engagement between key marketing channels in the Indian market, highlighting why a WhatsApp-centric strategy is crucial for conversion and retention.</p>
                <div class="chart-container">
                    <canvas id="channelEffectivenessChart"></canvas>
                </div>
            </div>

        </section>

        <!-- Implementation Roadmap Section -->
        <section id="roadmap" class="page-section hidden-content">
             <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-[#3D405B]">Implementation Roadmap</h2>
                <p class="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">A prioritized, phased plan to roll out these strategies. Click on each phase to expand the checklist of key actions for sustainable growth.</p>
            </div>

            <div class="space-y-8 max-w-4xl mx-auto">
                <!-- Phase 1 -->
                <div class="timeline-item bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <div class="flex justify-between items-center">
                        <div>
                            <span class="text-sm font-semibold text-[#8D8741] bg-[#FDFBF8] px-3 py-1 rounded-full">Phase 1: Foundation (Next 3 Months)</span>
                            <h3 class="text-2xl font-bold mt-2">Quick Wins & Essential Setup</h3>
                        </div>
                        <div class="text-3xl font-light expansion-icon">+</div>
                    </div>
                    <div class="timeline-content hidden-content mt-4 border-t pt-4">
                        <ul class="space-y-2 list-disc list-inside text-gray-700">
                            <li>Optimize Instagram bio and prioritize Reels creation (artisan stories, styling guides).</li>
                            <li>Implement shoppable tags on all product-related Instagram posts.</li>
                            <li>Set up WhatsApp Business API with a full product catalog and automated welcome messages.</li>
                            <li>Launch key lead magnets: "Size Guide" on website, "WhatsApp-only offer" on Instagram.</li>
                            <li>Activate a basic 2-part abandoned cart recovery sequence (Email & WhatsApp).</li>
                        </ul>
                    </div>
                </div>

                 <!-- Phase 2 -->
                <div class="timeline-item bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <div class="flex justify-between items-center">
                        <div>
                            <span class="text-sm font-semibold text-[#8D8741] bg-[#FDFBF8] px-3 py-1 rounded-full">Phase 2: Expansion (Next 3-6 Months)</span>
                             <h3 class="text-2xl font-bold mt-2">Optimization & Community Building</h3>
                        </div>
                         <div class="text-3xl font-light expansion-icon">+</div>
                    </div>
                     <div class="timeline-content hidden-content mt-4 border-t pt-4">
                        <ul class="space-y-2 list-disc list-inside text-gray-700">
                             <li>Develop a comprehensive, interactive digital catalog for B2B partners.</li>
                             <li>Begin A/B testing B2C Calls to Action and retargeting ad creatives.</li>
                            <li>Identify and launch first collaborations with 2-3 aligned micro-influencers.</li>
                             <li>Launch a private WhatsApp community group for loyal customers, offering VIP perks.</li>
                             <li>Enhance post-purchase engagement with automated care tips and styling suggestions via WhatsApp.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </main>
<script>
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');
    const pageSections = document.querySelectorAll('.page-section');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    function setActiveLink(targetId) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    function showPage(targetId) {
        pageSections.forEach(section => {
            if (section.id === targetId) {
                section.classList.remove('hidden-content');
                section.classList.add('visible-content');
            } else {
                section.classList.remove('visible-content');
                section.classList.add('hidden-content');
            }
        });
        setActiveLink(targetId);
    }
    
    function handleNavClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href').substring(1);
        showPage(targetId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    navLinks.forEach(link => link.addEventListener('click', handleNavClick));
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            handleNavClick(e);
            mobileMenu.classList.add('hidden');
        });
    });
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    const funnelStages = document.querySelectorAll('.funnel-stage');
    funnelStages.forEach(stage => {
        stage.addEventListener('click', () => {
            const target = stage.dataset.target;

            funnelStages.forEach(s => s.classList.remove('active'));
            stage.classList.add('active');

            document.querySelectorAll('.funnel-content').forEach(content => {
                content.classList.remove('visible-content');
                content.classList.add('hidden-content');
            });

            const targetContent = document.getElementById(`${target}-content`);
            if (targetContent) {
                targetContent.classList.remove('hidden-content');
                targetContent.classList.add('visible-content');
            }
        });
    });

    const b2bStages = document.querySelectorAll('.b2b-stage');
    b2bStages.forEach(stage => {
        stage.addEventListener('click', () => {
            const target = stage.dataset.target;
            b2bStages.forEach(s => s.classList.remove('active'));
            stage.classList.add('active');
            document.querySelectorAll('.b2b-content').forEach(content => {
                content.classList.remove('visible-content');
                content.classList.add('hidden-content');
            });
            const targetContent = document.getElementById(`${target}-content`);
            if (targetContent) {
                targetContent.classList.remove('hidden-content');
                targetContent.classList.add('visible-content');
            }
        });
    });

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const content = item.querySelector('.timeline-content');
            const icon = item.querySelector('.expansion-icon');
            const isVisible = !content.classList.contains('hidden-content');
            
            if (isVisible) {
                content.classList.add('hidden-content');
                icon.textContent = '+';
            } else {
                content.classList.remove('hidden-content');
                icon.textContent = '-';
            }
        });
    });

    showPage('b2c');

    const ctx = document.getElementById('channelEffectivenessChart').getContext('2d');
    const channelEffectivenessChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['WhatsApp Open Rate', 'Email Open Rate', 'WhatsApp Conversion Rate'],
            datasets: [{
                label: 'Effectiveness (%)',
                data: [98, 21, 52.5],
                backgroundColor: [
                    'rgba(141, 135, 65, 0.7)',
                    'rgba(217, 217, 217, 0.7)',
                    'rgba(101, 157, 189, 0.7)',
                ],
                borderColor: [
                    'rgba(141, 135, 65, 1)',
                    'rgba(156, 163, 175, 1)',
                    'rgba(101, 157, 189, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                let value = context.parsed.y;
                                if (context.label === 'WhatsApp Conversion Rate') {
                                     label = 'Avg. Campaign Conversion: 45-60%';
                                } else {
                                     label = `${context.label}: ~${value}%`;
                                }
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
});
</script>
</body>
</html>
