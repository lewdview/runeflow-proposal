import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = '/Volumes/extremeUno/runeflow-proposal.html';

// Read the HTML file
const html = fs.readFileSync(htmlPath, 'utf-8');
const $ = cheerio.load(html);

// Extract content
const content = {
  meta: {
    title: 'RuneFlow - AI Growth Automation Systems',
    description: 'Transform your operations into a scalable growth engine',
    companyName: 'RuneFlow',
    tagline: 'A Division of Webhalla',
  },
  hero: {
    headline: 'AI GROWTH AUTOMATION',
    subheadline: 'Transform your operations into a scalable growth engine',
    cta: 'Explore Systems',
    secondary_cta: 'Get Started',
  },
  about: {
    title: 'Why RuneFlow?',
    points: [
      {
        icon: 'ᚱ',
        title: 'Deep Expertise',
        description: 'n8n workflow architect, OpenAI specialist, and 5+ years of scaling automations',
      },
      {
        icon: 'ᛞ',
        title: 'Transparent Billing',
        description: 'No surprises. API costs separated. You know exactly where your money goes',
      },
      {
        icon: 'ᛈ',
        title: 'Full Team Training',
        description: 'Not just handing you code—we train your team to own and evolve it',
      },
      {
        icon: 'ᚠ',
        title: 'Future-Proof',
        description: 'Open-source foundation (n8n). No vendor lock-in. Walk away anytime with full access',
      },
    ],
  },
  services: {
    title: 'Service Tiers',
    subtitle: 'Each tier available in Baked (RuneFlow hosted) or Non-Baked (client hosted) options',
    items: [
      {
        id: 'lsrs',
        name: 'Lead Scaling & Response System',
        shortName: 'LSRS',
        description: 'Automate inbound lead response, qualification, and CRM sync',
        features: [
          'Multichannel intake (website, email, SMS, DM)',
          'Auto-responder & booking links',
          'Follow-up sequencing',
          'CRM integration (HubSpot, GoHighLevel, Airtable)',
          'Analytics dashboard',
        ],
      },
      {
        id: 'cms',
        name: 'Content Marketing System',
        shortName: 'CMS',
        description: 'Auto-generate, schedule, and publish content at scale',
        features: [
          'Multiplatform publishing (IG, TikTok, YouTube, LinkedIn)',
          'AI-assisted video & caption creation',
          'Brand tone & topic control',
          'Calendar automation',
          'Optional Canva/RunwayML integration',
        ],
      },
      {
        id: 'fsgs',
        name: 'Full Stack Growth System',
        shortName: 'FSGS',
        description: 'Complete unified growth engine (LSRS + CMS + more)',
        features: [
          'Shared data pipelines (lead triggers content)',
          'Unified lead + content system',
          'Reporting automation',
          'Team training included',
          'Notion dashboard & API management',
        ],
      },
    ],
  },
  pricing: {
    title: 'Service Delivery Models',
    models: [
      {
        name: 'Non-Baked',
        subtitle: 'DIY Infrastructure',
        hosting: 'PSG hosts on Bluehost',
        management: 'PSG manages infrastructure',
        bestFor: 'Teams with DevOps capacity, Full control desired',
        price: 'One-time setup fee',
      },
      {
        name: 'Baked',
        subtitle: 'Fully Managed',
        hosting: 'RuneFlow hosts on AWS',
        management: '24/7 monitoring & maintenance',
        bestFor: 'Hands-off, turnkey solution, No infrastructure concerns',
        price: 'Monthly recurring',
      },
    ],
    tiers: [
      {
        name: 'LSRS (Lead System Only)',
        nonBaked: { setup: 1800, description: 'one-time' },
        baked: { setup: 3200, monthly: 450, description: 'setup + operations' },
        note: 'Setup includes 12-week implementation + integrations. Monthly = hosting + infrastructure only',
      },
      {
        name: 'CMS (Content System Only)',
        nonBaked: { setup: 1800, description: 'one-time' },
        baked: { setup: 3500, monthly: 500, description: 'setup + operations' },
        note: 'Setup includes full implementation. Monthly = hosting + platform maintenance',
      },
      {
        name: 'FSGS (Full Stack Growth)',
        nonBaked: { setup: 2800, description: 'one-time' },
        baked: { setup: 5500, monthly: 800, description: 'setup + operations' },
        note: 'Complete system. Monthly = AWS hosting + 24/7 monitoring + platform infrastructure',
      },
    ],
    operatingCosts: [
      {
        service: 'OpenAI GPT-4o',
        description: '20–40 posts + responses',
        estimate: '$60–$120',
      },
      {
        service: 'GPT-4-Turbo',
        description: 'Scriptwriting + captioning',
        estimate: '$100–$250',
      },
      {
        service: 'RunwayML/Sora',
        description: '10–20 short videos',
        estimate: '$100–$180',
      },
    ],
  },
  timeline: {
    title: '12-Week Detailed Implementation',
    weeks: [
      {
        week: '0',
        phase: 'Pre-Kickoff',
        tasks: [
          'Sign contract & 50% deposit',
          'Receive API keys & credentials',
          'Grant sandbox access',
          'Share brand assets & tone guide',
        ],
      },
      {
        week: '1',
        phase: 'Discovery & Audit',
        tasks: [
          'Technical intake & tool versioning',
          'Process mapping (sales, ops, content)',
          'Define KPIs & SLOs',
          'Create Notion workspace & Slack channel',
        ],
      },
      {
        week: '2',
        phase: 'Lead System Design',
        tasks: [
          'Finalize lead scoring & qualification rules',
          'Build n8n webhook & normalization',
          'Setup enrichment APIs',
          'Create CRM mapping & test',
        ],
      },
      {
        week: '3',
        phase: 'Lead Build & Test',
        tasks: [
          'Connect SMS + Slack notifications',
          'Implement follow-up sequences',
          'Error handling & retry logic',
          'End-to-end testing',
        ],
      },
      {
        week: '4',
        phase: 'Content System Design',
        tasks: [
          'Finalize LLM prompt library',
          'Define content templates & formats',
          'Create brand overlays',
          'Configure Human-in-Loop toggle',
        ],
      },
      {
        week: '5',
        phase: 'Content Pipeline Build',
        tasks: [
          'Implement LLM script generation',
          'Integrate video provider (Sora/RunwayML)',
          'Auto-generate 3 asset variations',
          'Test captioning & formatting',
        ],
      },
      {
        week: '6',
        phase: 'Posting & Scheduling',
        tasks: [
          'Connect platform APIs (TikTok, IG, YT, LinkedIn)',
          'Build scheduler nodes',
          'Test with dummy accounts',
          'Enable HIL approval workflow',
        ],
      },
      {
        week: '7',
        phase: 'Ads Automation Prep',
        tasks: [
          'Build ad-variant generation',
          'Setup TikTok Ads API skeleton',
          'Campaign tracking & UTM templates',
          'Lead attribution mapping',
        ],
      },
      {
        week: '8',
        phase: 'Full Integration & QA',
        tasks: [
          'Run end-to-end funnel tests',
          'Validate attribution & reporting',
          'Implement daily Slack digest',
          'Fix edge cases & rate limits',
        ],
      },
      {
        week: '9',
        phase: 'Training & SOPs',
        tasks: [
          'Create SOP docs (creative review, escalation)',
          'Deliver team training (recorded)',
          'Pin quick-reference guides in Slack',
        ],
      },
      {
        week: '10',
        phase: 'Soft Launch (Beta)',
        tasks: [
          'Launch limited ad tests or organic posting',
          'Monitor performance hourly/daily',
          'Collect feedback & prioritize fixes',
        ],
      },
      {
        week: '11',
        phase: 'Optimize & Scale',
        tasks: [
          'Scale spend on winners',
          'Auto-promote top organic content as ads',
          'Refine LLM prompts with real data',
        ],
      },
      {
        week: '12',
        phase: 'Handoff & Future Roadmap',
        tasks: [
          'Finalize docs & transfer ownership',
          'Present final ROI report',
          'Propose retainer/expansion options',
          'Schedule monthly health checks',
        ],
      },
    ],
  },
  support: {
    title: 'Post-Launch Support Plans',
    plans: [
      {
        name: 'Exclusive Retainer',
        description: 'Ongoing support, monthly updates, new automation design',
        bestFor: 'Baked tier users',
        price: '$1.2K/mo',
      },
      {
        name: 'Monthly Support',
        description: 'Proactive monitoring, bug fixes, performance optimization',
        bestFor: 'Baked tier users',
        price: '$600/mo',
      },
      {
        name: 'Emergency Call',
        description: 'On-demand troubleshooting & consultation',
        bestFor: 'Non-Baked users',
        price: '$150/hr',
      },
    ],
  },
  contact: {
    title: 'Next Steps',
    subtitle: "Let's build your growth engine together",
    email: 'webhalla@proton.me',
    phone: '+1 (520) 427-2131',
    steps: [
      'Select desired system + tier',
      'Schedule kickoff call (Zoom)',
      'Deploy n8n + API integrations',
      'Begin 12-week roadmap to automation',
    ],
  },
  legal: {
    copyright: '© 2025 Primitive Success Group & RuneFlow. All rights reserved.',
    tagline: 'Ancient Power. Modern Automation.',
  },
};

// Write to file
const outputPath = path.join(__dirname, '../src/content/content.json');
fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));
console.log(`✓ Content extracted to ${outputPath}`);
