import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles, Calendar, MapPin, Users, IndianRupee, CheckCircle2, Clock,
  Plus, Trash2, Edit3, Download, Share2, Search, Filter, ArrowRight,
  ArrowLeft, ShieldCheck, AlertTriangle, Building2, ListChecks, Send,
  RefreshCw, LogIn, LogOut, KeyRound, UserCheck, ChevronRight, Star,
  FileText, FileSpreadsheet, FileJson, CalendarPlus, Sliders, Check,
  X, Eye, Copy, Terminal, Database, Server, Globe, Layers, Award,
  Heart, Music, Briefcase, GraduationCap, PartyPopper, HelpCircle, Settings
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, Legend
} from 'recharts';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================
export type EventType = 'Wedding' | 'Birthday' | 'College Fest' | 'Conference' | 'Corporate';
export type EventStatus = 'Idea' | 'Planning' | 'Confirmed' | 'In Progress' | 'Completed';

export interface TimelinePhase {
  id: string;
  phase: string;
  timeframe: string;
  keyActions: string[];
}

export interface VendorRecommendation {
  id: string;
  serviceType: string;
  specification: string;
  estimatedCost: number;
  bookingLeadTime: string;
}

export interface RiskItem {
  id: string;
  risk: string;
  severity: 'High' | 'Medium' | 'Low';
  mitigation: string;
}

export interface MasterPlan {
  overview: string;
  isMock: boolean;
  modeLabel: string;
  timeline: TimelinePhase[];
  venueRequirements: {
    minCapacity: number;
    layoutStyle: string;
    powerAvNeeds: string;
    accessibility: string;
  };
  recommendedVendors: VendorRecommendation[];
  riskConsiderations: RiskItem[];
}

export interface ExpenseItem {
  id: string;
  category: string;
  title: string;
  vendor: string;
  estimated: number;
  actual: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Deposit Paid' | 'Paid';
}

export interface VenueOption {
  id: string;
  name: string;
  location: string;
  capacity: number;
  estimatedPrice: number;
  amenities: string[];
  pros: string[];
  cons: string[];
  matchScore: number;
  matchCriteria: string;
  isIllustrative: boolean;
  shortlisted: boolean;
}

export interface AgendaSlot {
  id: string;
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  zone: string;
  lead: string;
}

export interface TaskItem {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Todo' | 'In Progress' | 'Completed';
  assignee: string;
  isMilestone: boolean;
}

export interface EventRecord {
  id: string;
  title: string;
  eventType: EventType;
  date: string;
  time: string;
  location: string;
  guestCount: number;
  totalBudget: number;
  status: EventStatus;
  themeStyle: string;
  cateringPreference: string;
  priorities: string[];
  masterPlan: MasterPlan;
  expenses: ExpenseItem[];
  venues: VenueOption[];
  agenda: AgendaSlot[];
  tasks: TaskItem[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  followUpQuestions?: string[];
  generatedProposal?: {
    title: string;
    eventType: EventType;
    guestCount: number;
    totalBudget: number;
    location: string;
    summary: string;
    allocations: { category: string; amount: number; pct: number }[];
  };
}

// ============================================================================
// INITIAL RICH SEED DATA
// ============================================================================
const HERO_GALA_IMG = "user_uploaded_files/ttl=63d/tool_generated/hero_gala_opt.jpg";
const STAGE_FEST_IMG = "user_uploaded_files/ttl=63d/tool_generated/stage_fest_opt.jpg";

const INITIAL_EVENTS: EventRecord[] = [
  {
    id: 'evt-1',
    title: 'Aarav & Meera Royal Udaipur Reception',
    eventType: 'Wedding',
    date: '2026-12-18',
    time: '18:30',
    location: 'Udaipur, Rajasthan',
    guestCount: 280,
    totalBudget: 1800000,
    status: 'Planning',
    themeStyle: 'Regal Lavender & Warm Ivory Heritage',
    cateringPreference: 'Multi-Cuisine Royal Banquet + Live Chaat & Artisan Dessert Bar',
    priorities: ['Venue & Ambience', 'Gourmet Catering', 'Floral & Lighting Design', 'Photography'],
    masterPlan: {
      overview: 'An intimate yet regal 280-guest evening reception blending heritage courtyard architecture with soft lavender ambient uplighting, warm ivory floral canopies, and a curated multi-course culinary showcase.',
      isMock: true,
      modeLabel: 'Illustrative AI Plan (Demo Mode)',
      timeline: [
        {
          id: 'tl-1',
          phase: 'Phase 1: Heritage Venue & Core Vendors',
          timeframe: '8–10 Weeks Before Event',
          keyActions: [
            'Lock courtyard & banquet lawn contract with 50% deposit',
            'Book documentary wedding photography & drone cinematography team',
            'Finalize lavender-and-gold floral moodboard and table layout'
          ]
        },
        {
          id: 'tl-2',
          phase: 'Phase 2: Culinary Tasting & Guest Logistics',
          timeframe: '4–6 Weeks Before Event',
          keyActions: [
            'Conduct chef tasting for 5-course royal banquet & live stations',
            'Confirm airport shuttle transfers and hotel room block for outstation guests',
            'Lock acoustic fusion ensemble and DJ console riders'
          ]
        },
        {
          id: 'tl-3',
          phase: 'Phase 3: Final Run-of-Show & Rehearsal',
          timeframe: '1–2 Weeks Before Event',
          keyActions: [
            'Distribute minute-by-minute cue sheet to stage manager & MC',
            'Confirm final 280-guest seating chart and dietary tags',
            'Complete on-site lighting focus and sound check 5 hours before doors'
          ]
        }
      ],
      venueRequirements: {
        minCapacity: 320,
        layoutStyle: 'Heritage Courtyard + Indoor Crystal Ballroom Backup',
        powerAvNeeds: '63A 3-phase silent DG backup, warm architectural pin-spotting, concert-grade line array',
        accessibility: 'Golf-cart shuttle from valet gate, step-free elderly seating zone near stage'
      },
      recommendedVendors: [
        { id: 'v-1', serviceType: 'Bespoke Floral & Decor Studio', specification: 'Lavender hydrangeas, ivory roses, chandelier mandap/stage', estimatedCost: 340000, bookingLeadTime: '8 weeks out' },
        { id: 'v-2', serviceType: 'Royal Culinary & Hospitality', specification: '280 pax luxury dinner + 6 live counters + mocktail bar', estimatedCost: 520000, bookingLeadTime: '6 weeks out' },
        { id: 'v-3', serviceType: 'Cinematic Photo & Film Crew', specification: '4 photographers, 2 cinematographers, same-day edit reel', estimatedCost: 185000, bookingLeadTime: '8 weeks out' },
        { id: 'v-4', serviceType: 'Sound, Intelligent Lighting & SFX', specification: 'Warm amber/lavender DMX wash, cold pyro entry, live acoustic rig', estimatedCost: 145000, bookingLeadTime: '4 weeks out' }
      ],
      riskConsiderations: [
        { id: 'r-1', risk: 'Evening winter temperature drop in open courtyard', severity: 'Medium', mitigation: 'Deploy 18 brass patio heaters and offer Pashmina shawls at welcome desk' },
        { id: 'r-2', risk: 'Outstation guest flight delays affecting grand entry timing', severity: 'Low', mitigation: 'Build 30-minute extended welcome cocktail & acoustic sitar buffer slot' },
        { id: 'r-3', risk: 'Acoustic curfew at 10:30 PM outdoors', severity: 'High', mitigation: 'Transition high-energy DJ afterparty into soundproofed indoor ballroom at 10:15 PM' }
      ]
    },
    expenses: [
      { id: 'exp-1', category: 'Venue & Rentals', title: 'Palace Courtyard & Ballroom Hire', vendor: 'Lakeview Heritage Palace (Illustrative)', estimated: 550000, actual: 540000, priority: 'High', status: 'Deposit Paid' },
      { id: 'exp-2', category: 'Catering & Hospitality', title: 'Royal Banquet & Live Counters (280 Pax)', vendor: 'Mewar Culinary Collective', estimated: 520000, actual: 510000, priority: 'High', status: 'Deposit Paid' },
      { id: 'exp-3', category: 'Decor & Florals', title: 'Lavender & Ivory Floral Architecture', vendor: 'Atelier Bloom Studio', estimated: 340000, actual: 365000, priority: 'High', status: 'Pending' },
      { id: 'exp-4', category: 'Photography & Film', title: 'Candid Photo + Drone + Same-Day Edit', vendor: 'Lumiere Stories', estimated: 185000, actual: 185000, priority: 'Medium', status: 'Paid' },
      { id: 'exp-5', category: 'Audio, Visual & Lighting', title: 'DMX Ambient Lighting & Live Sound', vendor: 'SonicCraft Pro', estimated: 145000, actual: 138000, priority: 'Medium', status: 'Pending' },
      { id: 'exp-6', category: 'Guest Logistics & Gifting', title: 'Artisan Welcome Hampers & Shuttles', vendor: 'Royal Concierge Desk', estimated: 60000, actual: 52000, priority: 'Low', status: 'Pending' }
    ],
    venues: [
      {
        id: 'ven-1',
        name: 'The Lavender Courtyard & Crystal Pavilion (Illustrative)',
        location: 'Pichola East Bank, Udaipur',
        capacity: 350,
        estimatedPrice: 540000,
        amenities: ['Heritage Courtyard', 'Indoor Ballroom Backup', 'In-House Valet', 'Bridal Suite', 'Silent DG Backup'],
        pros: ['Seamless indoor-outdoor flow for 280 guests', 'Built-in architectural lighting reduces decor rig cost'],
        cons: ['Outdoor lawn music curfew at 10:30 PM requires moving indoors'],
        matchScore: 96,
        matchCriteria: '98% Capacity Fit (280/350) • Within 30% Venue Budget Ratio • Matches Regal Heritage Theme',
        isIllustrative: true,
        shortlisted: true
      },
      {
        id: 'ven-2',
        name: 'Aravalli Grand Terraces & Spa Resort (Illustrative)',
        location: 'Kumbhalgarh Road, Udaipur',
        capacity: 450,
        estimatedPrice: 610000,
        amenities: ['Mountain View Amphitheatre', '120 Guest Rooms', 'Helipad', 'Poolside Deck'],
        pros: ['No immediate neighbors—extended acoustic flexibility', 'Ample room inventory for all guests'],
        cons: ['25 minutes outside city center', 'Slightly above target venue allocation'],
        matchScore: 88,
        matchCriteria: '90% Capacity Fit • 34% of Total Budget • High Privacy & Late-Night Flexibility',
        isIllustrative: true,
        shortlisted: false
      }
    ],
    agenda: [
      { id: 'ag-1', startTime: '18:30', endTime: '19:30', title: 'Sunset Welcome & Sitar Lounge', description: 'Guests arrive via floral archway; artisanal mocktails and passed hors d’oeuvres.', zone: 'East Courtyard', lead: 'Hospitality Lead — Kabir' },
      { id: 'ag-2', startTime: '19:30', endTime: '20:00', title: 'Grand Couple Entry & Cold Pyro Walkway', description: 'Choreographed entry under lavender pin-spots and live percussion.', zone: 'Central Stage', lead: 'Stage Manager — Rhea' },
      { id: 'ag-3', startTime: '20:00', endTime: '21:00', title: 'Family Toasts, Ring Exchange & First Dance', description: 'Curated speeches followed by cake cutting and couple performance.', zone: 'Main Pavilion', lead: 'Emcee — Vikram' },
      { id: 'ag-4', startTime: '21:00', endTime: '22:30', title: 'Royal Gala Dinner & Acoustic Fusion Set', description: 'Multi-course dining opens alongside live Sufi-acoustic ensemble.', zone: 'Banquet Lawn', lead: 'Catering Director — Chef Dev' },
      { id: 'ag-5', startTime: '22:30', endTime: '00:30', title: 'Indoor Crystal Ballroom Afterparty', description: 'High-energy DJ set and espresso/dessert lounge.', zone: 'Crystal Ballroom', lead: 'Production Lead — Arjun' }
    ],
    tasks: [
      { id: 'tsk-1', title: 'Sign Heritage Courtyard Agreement & Pay 50% Deposit', category: 'Venue', dueDate: '2026-11-10', priority: 'High', status: 'Completed', assignee: 'Aarav Mehta', isMilestone: true },
      { id: 'tsk-2', title: 'Approve Lavender & Ivory Centerpiece Mockup', category: 'Decor', dueDate: '2026-11-18', priority: 'High', status: 'In Progress', assignee: 'Meera Kapoor', isMilestone: true },
      { id: 'tsk-3', title: 'Confirm Final Dietary & Jain/Vegan Guest Counts', category: 'Catering', dueDate: '2026-11-28', priority: 'Medium', status: 'Todo', assignee: 'Kabir Sharma', isMilestone: false },
      { id: 'tsk-4', title: 'Submit Sound & Cold Pyro Safety Clearance', category: 'Production', dueDate: '2026-12-05', priority: 'High', status: 'Todo', assignee: 'Rhea Verma', isMilestone: true }
    ]
  },
  {
    id: 'evt-2',
    title: 'AURA 2026 — Inter-College Cultural & Tech Fest',
    eventType: 'College Fest',
    date: '2026-11-24',
    time: '09:30',
    location: 'Vellore, Tamil Nadu',
    guestCount: 500,
    totalBudget: 200000,
    status: 'Confirmed',
    themeStyle: 'Neon Indigo & Cyber-Cultural Fusion',
    cateringPreference: 'Campus Food Stalls + VIP Judge Hospitality Lounge',
    priorities: ['Stage & Concert AV', 'Crowd Safety & Registration', 'Sponsor Branding'],
    masterPlan: {
      overview: 'A high-energy 500-attendee college cultural and innovation festival engineered strictly within a ₹2,00,000 budget. Prioritizes concert-grade main-stage audio/lighting, digital QR check-in, and high-visibility sponsor zones.',
      isMock: true,
      modeLabel: 'Illustrative AI Plan (Demo Mode)',
      timeline: [
        { id: 'tl-201', phase: 'Phase 1: Dean Approval & Sponsor Lock', timeframe: '4 Weeks Out', keyActions: ['Secure campus auditorium & quadrangle permits', 'Confirm title sponsor deliverables & stage banner specs'] },
        { id: 'tl-202', phase: 'Phase 2: Registration & Tech Riders', timeframe: '2 Weeks Out', keyActions: ['Launch online college delegation passes', 'Finalize battle-of-bands backline & DJ console'] },
        { id: 'tl-203', phase: 'Phase 3: Show Day Execution', timeframe: 'Event Week', keyActions: ['Brief 30 student volunteers on gate scanning', 'Run 7:00 AM soundcheck before 9:30 AM inauguration'] }
      ],
      venueRequirements: {
        minCapacity: 600,
        layoutStyle: 'Main Auditorium + Open Quadrangle Flea & Food Zone',
        powerAvNeeds: 'Dual 45kVA generator backup, 12-box line array, 200 sq.ft LED backdrop',
        accessibility: 'Dedicated emergency lane, medical first-aid booth, digital QR turnstiles'
      },
      recommendedVendors: [
        { id: 'v-201', serviceType: 'Concert Stage, Truss & Line-Array Audio', specification: 'Main stage rig for 500 pax + band backline', estimatedCost: 72000, bookingLeadTime: '3 weeks out' },
        { id: 'v-202', serviceType: 'Hospitality, Refreshments & Water Stations', specification: 'Judge lounge catering + 500 snack/hydration kits', estimatedCost: 48000, bookingLeadTime: '2 weeks out' },
        { id: 'v-203', serviceType: 'Event Branding, Badges & Trophies', specification: 'Flex backdrops, 500 lanyards, winner shields', estimatedCost: 32000, bookingLeadTime: '2 weeks out' }
      ],
      riskConsiderations: [
        { id: 'r-201', risk: 'Bottleneck at morning inter-college registration desk', severity: 'High', mitigation: 'Deploy 4 parallel mobile QR-scanner lanes sorted alphabetically by college' },
        { id: 'r-202', risk: 'Stage changeover delays between band performances', severity: 'Medium', mitigation: 'Enforce strict 10-minute shared backline rule with rolling drum riser' }
      ]
    },
    expenses: [
      { id: 'exp-201', category: 'Audio, Visual & Lighting', title: 'Main Stage Sound, Truss & LED Wall', vendor: 'Decibel Pro Audio (Illustrative)', estimated: 72000, actual: 70000, priority: 'High', status: 'Deposit Paid' },
      { id: 'exp-202', category: 'Catering & Hospitality', title: 'Guest Judges Lunch & 500 Refreshment Boxes', vendor: 'Campus Gourmet Services', estimated: 48000, actual: 46500, priority: 'High', status: 'Paid' },
      { id: 'exp-203', category: 'Decor & Branding', title: 'Stage Backdrop, Sponsor Gates & 500 Lanyards', vendor: 'PrintWorks Hub', estimated: 32000, actual: 34000, priority: 'Medium', status: 'Paid' },
      { id: 'exp-204', category: 'Prizes & Artist Honorarium', title: 'Cash Prizes, Trophies & Headliner DJ', vendor: 'Cultural Council Pool', estimated: 35000, actual: 35000, priority: 'High', status: 'Pending' },
      { id: 'exp-205', category: 'Logistics & Security', title: 'Walkie-Talkies, First Aid & Volunteer Kits', vendor: 'SafeEvent Ops', estimated: 13000, actual: 11500, priority: 'Low', status: 'Pending' }
    ],
    venues: [
      {
        id: 'ven-201',
        name: 'convocation Main Auditorium & South Quad (Illustrative)',
        location: 'University Campus Zone, Vellore',
        capacity: 650,
        estimatedPrice: 15000,
        amenities: ['650-Seat Acoustic Hall', 'Green Rooms', '3-Phase Power', 'Open Food Court Lawn'],
        pros: ['Minimal institutional rental cost leaves 92% of ₹2L budget for production & prizes', 'Built-in seating & security perimeter'],
        cons: ['Requires formal campus security clearance for outside college delegates'],
        matchScore: 98,
        matchCriteria: '100% Capacity Fit (500/650) • Fits ₹2,00,000 Student Fest Budget • Ready Stage Infrastructure',
        isIllustrative: true,
        shortlisted: true
      }
    ],
    agenda: [
      { id: 'ag-201', startTime: '09:30', endTime: '10:30', title: 'Delegate Check-In & Inaugural Lamp Lighting', description: 'QR badge distribution and keynote welcome.', zone: 'Main Auditorium', lead: 'Student Convener — Diya' },
      { id: 'ag-202', startTime: '10:30', endTime: '13:30', title: 'Battle of Bands & Solo Vocal Showdown', description: '8 shortlisted college bands compete live.', zone: 'Main Stage', lead: 'Cultural Sec — Rohan' },
      { id: 'ag-203', startTime: '13:30', endTime: '14:30', title: 'Networking Lunch & Street Art Flea Market', description: 'Food stalls and sponsor experience booths.', zone: 'South Quadrangle', lead: 'Hospitality Team' },
      { id: 'ag-204', startTime: '14:30', endTime: '17:30', title: 'Group Choreography & Fashion Walk Finals', description: 'Flagship cultural showcase judged by industry panel.', zone: 'Main Stage', lead: 'Stage Team — Nisha' },
      { id: 'ag-205', startTime: '17:30', endTime: '20:00', title: 'Valedictory Awards & Pro-Night DJ Set', description: 'Trophy distribution followed by headline closing concert.', zone: 'Open Arena', lead: 'Core Committee' }
    ],
    tasks: [
      { id: 'tsk-201', title: 'Lock Auditorium & Generator Permit from Estate Office', category: 'Venue', dueDate: '2026-11-05', priority: 'High', status: 'Completed', assignee: 'Diya Nair', isMilestone: true },
      { id: 'tsk-202', title: 'Confirm 8 Finalist College Bands & Tech Riders', category: 'Program', dueDate: '2026-11-12', priority: 'High', status: 'Completed', assignee: 'Rohan Iyer', isMilestone: true },
      { id: 'tsk-203', title: 'Print 500 QR Delegate Passes & Sponsor Standees', category: 'Branding', dueDate: '2026-11-18', priority: 'Medium', status: 'In Progress', assignee: 'Karthik V', isMilestone: false }
    ]
  },
  {
    id: 'evt-3',
    title: 'NexaCloud AI Product Launch & Executive Summit',
    eventType: 'Corporate',
    date: '2026-12-04',
    time: '14:00',
    location: 'Bengaluru, Karnataka',
    guestCount: 220,
    totalBudget: 650000,
    status: 'Planning',
    themeStyle: 'Deep Indigo Executive Minimalist',
    cateringPreference: 'Artisanal Coffee Bar + Evening Networking Tapas',
    priorities: ['LED Wall & Live Demo Wi-Fi', 'Executive Hospitality', 'Press & Livestream'],
    masterPlan: {
      overview: 'An executive product keynote and hands-on demo summit for 220 enterprise leaders, analysts, and tech press in Bengaluru.',
      isMock: true,
      modeLabel: 'Illustrative AI Plan (Demo Mode)',
      timeline: [
        { id: 'tl-301', phase: 'Phase 1: Venue & Redundant Fiber Lock', timeframe: '5 Weeks Out', keyActions: ['Book business hotel ballroom with dedicated 1Gbps leased line', 'Lock widescreen P2.5 LED wall vendor'] },
        { id: 'tl-302', phase: 'Phase 2: Keynote Rehearsal & Demo Pods', timeframe: '2 Weeks Out', keyActions: ['Fabricate 4 interactive product experience pods', 'Complete speaker slide deck & livestream encoding test'] }
      ],
      venueRequirements: {
        minCapacity: 250,
        layoutStyle: 'Pillarless Theatre Seating + 4 Demo Kiosk Zones',
        powerAvNeeds: 'Dedicated 1Gbps symmetrical internet, P2.5 curved LED wall, 4-camera livestream mixer',
        accessibility: 'Metro & business district proximity, valet parking, press media lounge'
      },
      recommendedVendors: [
        { id: 'v-301', serviceType: 'Broadcast AV & Widescreen LED Production', specification: '24ft x 10ft P2.5 LED wall + confidence monitors + livestream', estimatedCost: 210000, bookingLeadTime: '4 weeks out' },
        { id: 'v-302', serviceType: '5-Star Ballroom & Executive Catering', specification: 'Half-day ballroom + gourmet high tea & networking dinner', estimatedCost: 295000, bookingLeadTime: '5 weeks out' }
      ],
      riskConsiderations: [
        { id: 'r-301', risk: 'Live product demo Wi-Fi congestion from 220 attendee devices', severity: 'High', mitigation: 'Isolate keynote stage on hardwired Ethernet + secondary 5G bonded failover router' }
      ]
    },
    expenses: [
      { id: 'exp-301', category: 'Venue & Catering', title: 'Business Ballroom & Executive Tapas (220 Pax)', vendor: 'Indigo Grand Hotel Bengaluru (Illustrative)', estimated: 295000, actual: 295000, priority: 'High', status: 'Deposit Paid' },
      { id: 'exp-302', category: 'Audio, Visual & Lighting', title: 'Curved LED Wall, Cue System & 4K Livestream', vendor: 'PixelStage Enterprise', estimated: 210000, actual: 205000, priority: 'High', status: 'Pending' },
      { id: 'exp-303', category: 'Decor & Branding', title: '4 Product Demo Pods & NFC Smart Badges', vendor: 'ExpoCraft India', estimated: 95000, actual: 92000, priority: 'Medium', status: 'Pending' },
      { id: 'exp-304', category: 'Guest Logistics & Gifting', title: 'Press Kits & Speaker Commemoratives', vendor: 'CurateCorp', estimated: 50000, actual: 48000, priority: 'Low', status: 'Paid' }
    ],
    venues: [
      {
        id: 'ven-301',
        name: 'The Sapphire Pillarless Ballroom — MG Road (Illustrative)',
        location: 'Central Business District, Bengaluru',
        capacity: 260,
        estimatedPrice: 295000,
        amenities: ['Pillarless 18ft Ceiling', 'Dedicated 1Gbps Fiber', 'Press Lounge', 'Valet Parking'],
        pros: ['Prime CBD location maximizes C-suite attendance', 'Zero sightline obstructions for keynote LED wall'],
        cons: ['Peak Friday evening traffic outside venue requires early shuttle advisory'],
        matchScore: 95,
        matchCriteria: '96% Capacity Fit (220/260) • Enterprise AV Ready • CBD Accessibility',
        isIllustrative: true,
        shortlisted: true
      }
    ],
    agenda: [
      { id: 'ag-301', startTime: '14:00', endTime: '14:45', title: 'Executive Registration & Specialty Coffee Bar', description: 'NFC badge pickup and press check-in.', zone: 'Grand Foyer', lead: 'Marketing Ops' },
      { id: 'ag-302', startTime: '14:45', endTime: '16:00', title: 'Founder Keynote & Live AI Architecture Demo', description: 'Unveiling NexaCloud 3.0 with real-time telemetry.', zone: 'Main Ballroom', lead: 'CEO & VP Engineering' },
      { id: 'ag-303', startTime: '16:00', endTime: '17:30', title: 'Interactive Demo Pods & Customer Panel', description: 'Hands-on sandbox stations and Q&A.', zone: 'Breakout Lounge', lead: 'Solutions Architects' }
    ],
    tasks: [
      { id: 'tsk-301', title: 'Test Hardwired Failover Internet Line on Keynote Stage', category: 'AV & Tech', dueDate: '2026-12-01', priority: 'High', status: 'In Progress', assignee: 'Vikram Dev', isMilestone: true },
      { id: 'tsk-302', title: 'Approve 4 Interactive Demo Pod Graphic Panels', category: 'Branding', dueDate: '2026-11-25', priority: 'Medium', status: 'Completed', assignee: 'Ananya Rao', isMilestone: false }
    ]
  }
];

const CHART_COLORS = ['#4338CA', '#7C3AED', '#D97706', '#0D9488', '#EC4899', '#6366F1'];

const formatINR = (val: number) => {
  return '₹' + Math.round(val).toLocaleString('en-IN');
};

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // Navigation & View State
  const [activePage, setActivePage] = useState<
    'landing' | 'auth' | 'dashboard' | 'wizard' | 'ai-chat' | 'master-plan' | 'budget' | 'venues' | 'agenda-tasks' | 'exports' | 'architecture'
  >('landing');

  // Authentication & Backend Connection State
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    role: string;
    isAuthenticated: boolean;
  }>({
    id: 'usr-demo-01',
    name: 'Aarav Mehta',
    email: 'aarav.mehta@eventpilot.ai',
    role: 'Lead Event Architect',
    isAuthenticated: true
  });
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [authForm, setAuthForm] = useState({ name: '', email: 'aarav.mehta@eventpilot.ai', password: '' });
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  // Live API / Gemini Configuration Drawer
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [backendConfig, setBackendConfig] = useState({
    flaskApiUrl: 'http://localhost:5000',
    supabaseUrl: 'https://demo-project.supabase.co',
    useLiveBackend: false
  });

  // Global Toast Notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);
  const triggerToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3800);
  };

  // Events State
  const [events, setEvents] = useState<EventRecord[]>(INITIAL_EVENTS);
  const [selectedEventId, setSelectedEventId] = useState<string>('evt-1');
  const activeEvent = useMemo(
    () => events.find((e) => e.id === selectedEventId) || events[0],
    [events, selectedEventId]
  );

  // Dashboard Filter/Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date' | 'budget-desc' | 'guests-desc'>('date');

  // Multi-Step Event Creation Wizard State
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [wizardErrors, setWizardErrors] = useState<Record<string, string>>({});
  const [wizardDraft, setWizardDraft] = useState<{
    title: string;
    eventType: EventType;
    date: string;
    time: string;
    location: string;
    guestCount: number;
    totalBudget: number;
    themeStyle: string;
    cateringPreference: string;
    priorities: string[];
  }>({
    title: '',
    eventType: 'College Fest',
    date: '2026-12-12',
    time: '17:00',
    location: 'Bengaluru, Karnataka',
    guestCount: 400,
    totalBudget: 250000,
    themeStyle: 'Soft Lavender & Deep Indigo Modern',
    cateringPreference: 'Live Gourmet Counters & Refreshment Bar',
    priorities: ['Venue & Ambience', 'Stage & Concert AV', 'Catering & Hospitality']
  });

  // Safe localStorage draft persistence
  useEffect(() => {
    try {
      const saved = localStorage.getItem('eventpilot_wizard_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.title !== undefined) setWizardDraft(parsed);
      }
    } catch {
      // Ignore sandbox storage errors
    }
  }, []);

  const updateWizardDraft = (patch: Partial<typeof wizardDraft>) => {
    setWizardDraft((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem('eventpilot_wizard_draft', JSON.stringify(next));
      } catch {
        // Ignore sandbox storage errors
      }
      return next;
    });
  };

  // Conversational AI Planner State
  const [chatInput, setChatInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      text: 'Welcome to EventPilot AI! Describe your event idea in natural language—for example: "I want to organize a college cultural fest for 500 people with a budget of ₹2 lakh in Vellore." I will identify any missing parameters, ask targeted follow-up questions, and generate a structured, editable event plan.',
      timestamp: 'Just now',
      followUpQuestions: [
        'I want to organize a college cultural fest for 500 people with a budget of ₹2 lakh.',
        'Plan an intimate 200-guest luxury engagement ceremony in Jaipur with ₹12 lakh budget.',
        'Organize a 300-attendee AI developer conference in Hyderabad under ₹5 lakh.'
      ]
    }
  ]);

  // Master Plan Inline Editing State
  const [editingOverview, setEditingOverview] = useState(false);
  const [overviewDraft, setOverviewDraft] = useState('');
  const [newRiskForm, setNewRiskForm] = useState({ risk: '', severity: 'Medium' as 'High' | 'Medium' | 'Low', mitigation: '' });

  // Budget Form & AI Optimizer State
  const [expenseForm, setExpenseForm] = useState<{
    category: string;
    title: string;
    vendor: string;
    estimated: string;
    actual: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'Pending' | 'Deposit Paid' | 'Paid';
  }>({
    category: 'Venue & Rentals',
    title: '',
    vendor: '',
    estimated: '',
    actual: '',
    priority: 'Medium',
    status: 'Pending'
  });
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [aiOptimizationResult, setAiOptimizationResult] = useState<{
    summary: string;
    potentialSavings: number;
    adjustments: { id: string; title: string; current: number; suggested: number; reason: string }[];
  } | null>(null);

  // Venue Filter & Custom Venue Form
  const [showAddVenue, setShowAddVenue] = useState(false);
  const [venueForm, setVenueForm] = useState({
    name: '',
    location: '',
    capacity: '300',
    estimatedPrice: '150000',
    amenities: 'AC Hall, Power Backup, Valet Parking'
  });

  // Agenda & Task Forms
  const [agendaForm, setAgendaForm] = useState({
    startTime: '18:00',
    endTime: '19:00',
    title: '',
    description: '',
    zone: 'Main Hall',
    lead: ''
  });
  const [taskForm, setTaskForm] = useState({
    title: '',
    category: 'Operations',
    dueDate: '2026-12-01',
    priority: 'High' as 'High' | 'Medium' | 'Low',
    assignee: 'Aarav Mehta',
    isMilestone: false
  });
  const [taskFilter, setTaskFilter] = useState<'All' | 'Todo' | 'In Progress' | 'Completed'>('All');

  // Share Modal State
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Sync overview draft when switching events
  useEffect(() => {
    if (activeEvent) {
      setOverviewDraft(activeEvent.masterPlan.overview);
      setAiOptimizationResult(null);
    }
  }, [activeEvent]);

  // ============================================================================
  // HELPER MUTATORS FOR ACTIVE EVENT
  // ============================================================================
  const updateActiveEvent = (updater: (evt: EventRecord) => EventRecord) => {
    setEvents((prev) => prev.map((evt) => (evt.id === activeEvent.id ? updater(evt) : evt)));
  };

  // ============================================================================
  // WIZARD VALIDATION & SUBMISSION
  // ============================================================================
  const validateWizardStep = (step: number): boolean => {
    const errs: Record<string, string> = {};
    if (step === 1) {
      if (!wizardDraft.title || wizardDraft.title.trim().length < 3) {
        errs.title = 'Please enter an event title of at least 3 characters.';
      }
    } else if (step === 2) {
      if (!wizardDraft.date) errs.date = 'Event date is required.';
      if (!wizardDraft.location || wizardDraft.location.trim().length < 2) {
        errs.location = 'Please provide a valid city or venue location.';
      }
    } else if (step === 3) {
      if (!wizardDraft.guestCount || wizardDraft.guestCount < 10) {
        errs.guestCount = 'Guest count must be at least 10 attendees.';
      }
      if (!wizardDraft.themeStyle.trim()) {
        errs.themeStyle = 'Please specify a visual or atmosphere preference.';
      }
    } else if (step === 4) {
      if (!wizardDraft.totalBudget || wizardDraft.totalBudget < 5000) {
        errs.totalBudget = 'Total budget must be at least ₹5,000.';
      }
      if (wizardDraft.priorities.length === 0) {
        errs.priorities = 'Select at least one priority so AI can weight your budget.';
      }
    }
    setWizardErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleWizardNext = () => {
    if (validateWizardStep(wizardStep)) {
      setWizardStep((s) => Math.min(5, s + 1));
    }
  };

  const handleCreateEventFromWizard = () => {
    const b = wizardDraft.totalBudget;
    const g = wizardDraft.guestCount;
    const newId = 'evt-' + Date.now();
    const newEvent: EventRecord = {
      id: newId,
      title: wizardDraft.title.trim(),
      eventType: wizardDraft.eventType,
      date: wizardDraft.date,
      time: wizardDraft.time,
      location: wizardDraft.location.trim(),
      guestCount: g,
      totalBudget: b,
      status: 'Planning',
      themeStyle: wizardDraft.themeStyle,
      cateringPreference: wizardDraft.cateringPreference,
      priorities: wizardDraft.priorities,
      masterPlan: {
        overview: `[AI-Synthesized Master Plan] ${wizardDraft.title} is architected for ${g} guests in ${wizardDraft.location} with a total budget of ${formatINR(b)}. The plan prioritizes ${wizardDraft.priorities.join(', ')} with a "${wizardDraft.themeStyle}" design aesthetic.`,
        isMock: !backendConfig.useLiveBackend,
        modeLabel: backendConfig.useLiveBackend ? 'Live Flask + Gemini API' : 'Illustrative AI Plan (Demo Mode)',
        timeline: [
          { id: 't-1', phase: 'Phase 1: Venue Lock & Charter', timeframe: '6–8 Weeks Out', keyActions: [`Shortlist 3 venues in ${wizardDraft.location} for ${g} pax`, 'Sign primary venue contract & lock date'] },
          { id: 't-2', phase: 'Phase 2: Production & Culinary', timeframe: '3–5 Weeks Out', keyActions: [`Finalize ${wizardDraft.cateringPreference}`, `Lock decor & AV specs aligned with ${wizardDraft.themeStyle}`] },
          { id: 't-3', phase: 'Phase 3: Run-of-Show & Rehearsal', timeframe: '1–2 Weeks Out', keyActions: ['Confirm final RSVP headcount', 'Distribute cue-to-cue agenda & conduct technical rehearsal'] }
        ],
        venueRequirements: {
          minCapacity: Math.round(g * 1.15),
          layoutStyle: g > 300 ? 'Main Arena / Auditorium + Networking Foyer' : 'Banquet Hall with Central Stage & Lounge',
          powerAvNeeds: '3-Phase silent generator backup, concert sound reinforcement, ambient DMX lighting',
          accessibility: 'Step-free entrance, dedicated registration desks, group parking bay'
        },
        recommendedVendors: [
          { id: 'rv-1', serviceType: 'Venue & Core Infrastructure', specification: `${Math.round(g * 1.15)}-capacity space in ${wizardDraft.location}`, estimatedCost: Math.round(b * 0.30), bookingLeadTime: '6 weeks prior' },
          { id: 'rv-2', serviceType: 'Culinary & Beverage Service', specification: `${wizardDraft.cateringPreference} (${g} pax)`, estimatedCost: Math.round(b * 0.28), bookingLeadTime: '4 weeks prior' },
          { id: 'rv-3', serviceType: 'Stage, Audio & Visual Production', specification: 'Sound array, wireless mics, stage wash & LED screen', estimatedCost: Math.round(b * 0.18), bookingLeadTime: '4 weeks prior' },
          { id: 'rv-4', serviceType: 'Thematic Decor & Experience', specification: wizardDraft.themeStyle, estimatedCost: Math.round(b * 0.14), bookingLeadTime: '3 weeks prior' }
        ],
        riskConsiderations: [
          { id: 'rk-1', risk: 'Guest attendance surge above initial RSVP forecast', severity: 'Medium', mitigation: `Ensure caterer & seating layout have a 15% buffer (${Math.round(g * 1.15)} pax)` },
          { id: 'rk-2', risk: 'AV or power interruption during keynote/main performance', severity: 'High', mitigation: 'Mandate dedicated UPS + DG backup and 3-hour early technical soundcheck' }
        ]
      },
      expenses: [
        { id: 'ex-1', category: 'Venue & Rentals', title: 'Primary Venue & Seating Setup', vendor: `${wizardDraft.location} Premier Venue (Illustrative)`, estimated: Math.round(b * 0.30), actual: Math.round(b * 0.29), priority: 'High', status: 'Pending' },
        { id: 'ex-2', category: 'Catering & Hospitality', title: `${wizardDraft.cateringPreference} (${g} Guests)`, vendor: 'Signature Culinary Partners', estimated: Math.round(b * 0.28), actual: Math.round(b * 0.28), priority: 'High', status: 'Pending' },
        { id: 'ex-3', category: 'Audio, Visual & Lighting', title: 'Stage Sound, Lighting & Visuals', vendor: 'ProStage AV Collective', estimated: Math.round(b * 0.18), actual: Math.round(b * 0.17), priority: 'High', status: 'Pending' },
        { id: 'ex-4', category: 'Decor & Florals', title: `${wizardDraft.themeStyle} Styling`, vendor: 'Aura Design Studio', estimated: Math.round(b * 0.14), actual: Math.round(b * 0.14), priority: 'Medium', status: 'Pending' },
        { id: 'ex-5', category: 'Contingency & Operations', title: 'Permits, Logistics & Buffer Reserve', vendor: 'EventPilot Reserve', estimated: Math.round(b * 0.10), actual: 0, priority: 'Low', status: 'Pending' }
      ],
      venues: [
        {
          id: 'vn-1',
          name: `The Grand ${wizardDraft.location.split(',')[0]} Pavilion (Illustrative)`,
          location: wizardDraft.location,
          capacity: Math.round(g * 1.2),
          estimatedPrice: Math.round(b * 0.29),
          amenities: ['Pillarless Hall', '3-Phase Backup', 'Green Rooms', 'Valet & Bus Bay', 'In-House Acoustic Treatment'],
          pros: [`Ideal capacity match for ${g} guests`, `Fits cleanly within 30% venue budget allocation (${formatINR(Math.round(b * 0.29))})`],
          cons: ['High weekend demand—requires early deposit lock'],
          matchScore: 95,
          matchCriteria: `97% Capacity Fit • 29% Budget Ratio • Matches ${wizardDraft.eventType} Requirements`,
          isIllustrative: true,
          shortlisted: true
        },
        {
          id: 'vn-2',
          name: `Starlight Courtyard & Convention Center (Illustrative)`,
          location: wizardDraft.location,
          capacity: Math.round(g * 1.35),
          estimatedPrice: Math.round(b * 0.33),
          amenities: ['Open Lawn + Indoor Hall', 'LED Wall Rigging Points', 'Dedicated Catering Kitchen'],
          pros: ['Flexible indoor-outdoor breakout zones', 'Generous overflow capacity'],
          cons: ['Slightly higher rental + external decor rigging needed'],
          matchScore: 87,
          matchCriteria: `89% Capacity Fit • 33% Budget Ratio • Strong Ambience Flexibility`,
          isIllustrative: true,
          shortlisted: false
        }
      ],
      agenda: [
        { id: 'ag-n1', startTime: wizardDraft.time, endTime: '18:00', title: 'Guest Arrival, Check-In & Welcome Refreshments', description: 'Registration desk, ambient music, and welcome drinks.', zone: 'Welcome Foyer', lead: 'Hospitality Lead' },
        { id: 'ag-n2', startTime: '18:00', endTime: '19:30', title: 'Main Stage Program & Keynote Showcase', description: `Core ${wizardDraft.eventType} spotlight session and featured segments.`, zone: 'Main Stage', lead: 'Stage Director' },
        { id: 'ag-n3', startTime: '19:30', endTime: '21:00', title: 'Curated Dining & Experiential Networking', description: wizardDraft.cateringPreference, zone: 'Dining Pavilion', lead: 'Catering Manager' },
        { id: 'ag-n4', startTime: '21:00', endTime: '22:00', title: 'Closing Finale & Guest Send-Off', description: 'Awards/Toast, thank-you address, and departure logistics.', zone: 'Main Arena', lead: 'Event Producer' }
      ],
      tasks: [
        { id: 'tk-n1', title: `Confirm Venue Contract for ${wizardDraft.title}`, category: 'Venue', dueDate: wizardDraft.date, priority: 'High', status: 'In Progress', assignee: user.name, isMilestone: true },
        { id: 'tk-n2', title: 'Lock AV, Stage & Lighting Production Vendor', category: 'Production', dueDate: wizardDraft.date, priority: 'High', status: 'Todo', assignee: user.name, isMilestone: true },
        { id: 'tk-n3', title: 'Finalize Menu Tasting & Headcount Guarantee', category: 'Catering', dueDate: wizardDraft.date, priority: 'Medium', status: 'Todo', assignee: user.name, isMilestone: false }
      ]
    };

    setEvents((prev) => [newEvent, ...prev]);
    setSelectedEventId(newId);
    setWizardStep(1);
    setActivePage('master-plan');
    triggerToast(`Created "${newEvent.title}" with full AI Master Plan!`, 'success');
  };

  // ============================================================================
  // CONVERSATIONAL AI PLANNER HANDLER
  // ============================================================================
  const handleSendChatMessage = (customPrompt?: string) => {
    const raw = (customPrompt ?? chatInput).trim();
    if (!raw || isAiThinking) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      text: raw,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setChatInput('');
    setIsAiThinking(true);

    setTimeout(() => {
      // Intelligent NLP extraction from prompt
      const lower = raw.toLowerCase();
      let detectedType: EventType = activeEvent.eventType;
      if (lower.includes('wedding') || lower.includes('engagement') || lower.includes('reception') || lower.includes('sangeet')) {
        detectedType = 'Wedding';
      } else if (lower.includes('college') || lower.includes('fest') || lower.includes('cultural') || lower.includes('campus')) {
        detectedType = 'College Fest';
      } else if (lower.includes('conference') || lower.includes('summit') || lower.includes('meetup') || lower.includes('workshop')) {
        detectedType = 'Conference';
      } else if (lower.includes('birthday') || lower.includes('anniversary')) {
        detectedType = 'Birthday';
      } else if (lower.includes('corporate') || lower.includes('launch') || lower.includes('product')) {
        detectedType = 'Corporate';
      }

      // Extract guest count (e.g. "500 people", "300 guests", "250 pax")
      const guestMatch = raw.match(/(\d{2,5})\s*(people|guests|pax|attendees|students|delegates)/i);
      const guests = guestMatch ? parseInt(guestMatch[1], 10) : activeEvent.guestCount;

      // Extract budget (e.g. "2 lakh", "₹15 lakh", "500000", "6.5 lakh")
      let budget = activeEvent.totalBudget;
      const lakhMatch = raw.match(/(\d+(?:\.\d+)?)\s*lakh/i);
      const crMatch = raw.match(/(\d+(?:\.\d+)?)\s*crore/i);
      const rawNumMatch = raw.match(/₹\s*([\d,]{4,10})/);
      if (lakhMatch) {
        budget = Math.round(parseFloat(lakhMatch[1]) * 100000);
      } else if (crMatch) {
        budget = Math.round(parseFloat(crMatch[1]) * 10000000);
      } else if (rawNumMatch) {
        budget = parseInt(rawNumMatch[1].replace(/,/g, ''), 10);
      }

      // Extract city/location
      const cities = ['Vellore', 'Bengaluru', 'Mumbai', 'Delhi', 'Udaipur', 'Jaipur', 'Hyderabad', 'Chennai', 'Pune', 'Goa', 'Kolkata'];
      const foundCity = cities.find((c) => lower.includes(c.toLowerCase())) || activeEvent.location;

      const proposalTitle =
        detectedType === 'College Fest'
          ? `Campus Cultural & Innovation Fest (${guests} Pax)`
          : detectedType === 'Wedding'
          ? `Royal ${foundCity} Wedding Celebration`
          : `${detectedType} Showcase — ${foundCity}`;

      const allocations = [
        { category: 'Venue & Infrastructure', pct: 30, amount: Math.round(budget * 0.30) },
        { category: 'Catering & Refreshments', pct: 28, amount: Math.round(budget * 0.28) },
        { category: 'Stage, Sound & Lighting AV', pct: 20, amount: Math.round(budget * 0.20) },
        { category: 'Decor, Branding & Experience', pct: 12, amount: Math.round(budget * 0.12) },
        { category: 'Contingency & Operations', pct: 10, amount: Math.round(budget * 0.10) }
      ];

      const aiReply: ChatMessage = {
        id: 'msg-ai-' + Date.now(),
        role: 'assistant',
        text: `I've structured a complete ${detectedType} blueprint for **${guests} attendees** in **${foundCity}** with a target budget of **${formatINR(budget)}**. You can apply this directly to your active workspace or refine any parameter below.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        followUpQuestions: [
          `Optimize the ${formatINR(budget)} budget to prioritize Concert AV & Stage Lighting`,
          `Generate a 6-slot run-of-show agenda for ${guests} attendees`,
          `What contingency risks should we plan for in ${foundCity}?`
        ],
        generatedProposal: {
          title: proposalTitle,
          eventType: detectedType,
          guestCount: guests,
          totalBudget: budget,
          location: foundCity,
          summary: `Tailored ${detectedType} plan for ${guests} guests in ${foundCity} (${formatINR(budget)} total cap), featuring balanced allocations across venue, hospitality, AV production, and a 10% risk reserve.`,
          allocations
        }
      };

      setChatMessages((prev) => [...prev, aiReply]);
      setIsAiThinking(false);
    }, 650);
  };

  const applyChatProposalToWorkspace = (proposal: NonNullable<ChatMessage['generatedProposal']>) => {
    const newId = 'evt-chat-' + Date.now();
    const b = proposal.totalBudget;
    const g = proposal.guestCount;
    const created: EventRecord = {
      ...activeEvent,
      id: newId,
      title: proposal.title,
      eventType: proposal.eventType,
      location: proposal.location,
      guestCount: g,
      totalBudget: b,
      masterPlan: {
        ...activeEvent.masterPlan,
        overview: `[AI Conversational Plan] ${proposal.summary}`,
        venueRequirements: {
          ...activeEvent.masterPlan.venueRequirements,
          minCapacity: Math.round(g * 1.15)
        }
      },
      expenses: proposal.allocations.map((al, idx) => ({
        id: `exp-chat-${idx}-${Date.now()}`,
        category: al.category,
        title: `${al.category} Allocation`,
        vendor: 'AI Recommended Tier (Illustrative)',
        estimated: al.amount,
        actual: al.amount,
        priority: idx < 3 ? 'High' : 'Medium',
        status: 'Pending'
      }))
    };
    setEvents((prev) => [created, ...prev]);
    setSelectedEventId(newId);
    triggerToast(`Applied "${proposal.title}" to workspace!`, 'success');
    setActivePage('master-plan');
  };

  // ============================================================================
  // BUDGET CALCULATIONS & AI OPTIMIZER
  // ============================================================================
  const budgetMetrics = useMemo(() => {
    const totalBudget = activeEvent.totalBudget;
    const estimatedTotal = activeEvent.expenses.reduce((acc, item) => acc + item.estimated, 0);
    const actualTotal = activeEvent.expenses.reduce((acc, item) => acc + item.actual, 0);
    const remaining = totalBudget - actualTotal;
    const utilizationPct = totalBudget > 0 ? Math.round((actualTotal / totalBudget) * 100) : 0;

    // Group by category for charts
    const byCatMap: Record<string, { name: string; estimated: number; actual: number }> = {};
    activeEvent.expenses.forEach((exp) => {
      if (!byCatMap[exp.category]) {
        byCatMap[exp.category] = { name: exp.category, estimated: 0, actual: 0 };
      }
      byCatMap[exp.category].estimated += exp.estimated;
      byCatMap[exp.category].actual += exp.actual;
    });
    const categoryData = Object.values(byCatMap);

    return { totalBudget, estimatedTotal, actualTotal, remaining, utilizationPct, categoryData };
  }, [activeEvent]);

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseForm.title.trim() || !expenseForm.vendor.trim()) {
      triggerToast('Please enter both an expense title and vendor name.', 'warning');
      return;
    }
    const est = Math.max(0, Number(expenseForm.estimated) || 0);
    const act = Math.max(0, Number(expenseForm.actual) || 0);

    if (editingExpenseId) {
      updateActiveEvent((evt) => ({
        ...evt,
        expenses: evt.expenses.map((item) =>
          item.id === editingExpenseId
            ? {
                ...item,
                category: expenseForm.category,
                title: expenseForm.title.trim(),
                vendor: expenseForm.vendor.trim(),
                estimated: est,
                actual: act,
                priority: expenseForm.priority,
                status: expenseForm.status
              }
            : item
        )
      }));
      setEditingExpenseId(null);
      triggerToast('Updated expense item.', 'success');
    } else {
      const newItem: ExpenseItem = {
        id: 'exp-' + Date.now(),
        category: expenseForm.category,
        title: expenseForm.title.trim(),
        vendor: expenseForm.vendor.trim(),
        estimated: est,
        actual: act,
        priority: expenseForm.priority,
        status: expenseForm.status
      };
      updateActiveEvent((evt) => ({
        ...evt,
        expenses: [...evt.expenses, newItem]
      }));
      triggerToast('Added new expense item.', 'success');
    }
    setExpenseForm({
      category: 'Venue & Rentals',
      title: '',
      vendor: '',
      estimated: '',
      actual: '',
      priority: 'Medium',
      status: 'Pending'
    });
  };

  const handleRunAiBudgetOptimizer = () => {
    const adjustments = activeEvent.expenses.map((exp) => {
      // Protect High priority items more, trim Medium/Low priority by 10-16%
      const reductionFactor = exp.priority === 'High' ? 0.95 : exp.priority === 'Medium' ? 0.88 : 0.82;
      const suggested = Math.round((exp.actual || exp.estimated) * reductionFactor);
      const current = exp.actual || exp.estimated;
      const reason =
        exp.priority === 'High'
          ? 'Protected core priority; negotiated 5% early-bird vendor bundle discount.'
          : exp.priority === 'Medium'
          ? 'Consolidated vendor deliverables and switched to modular package.'
          : 'Streamlined non-essential add-ons while preserving guest experience.';
      return {
        id: exp.id,
        title: exp.title,
        current,
        suggested,
        reason
      };
    });

    const potentialSavings = adjustments.reduce((acc, a) => acc + (a.current - a.suggested), 0);
    setAiOptimizationResult({
      summary: `[Illustrative AI Budget Optimizer] Evaluated ${activeEvent.expenses.length} line items against your ${formatINR(activeEvent.totalBudget)} target while safeguarding your top priorities (${activeEvent.priorities.slice(0, 2).join(', ')}).`,
      potentialSavings,
      adjustments
    });
    triggerToast(`AI identified ${formatINR(potentialSavings)} in realistic savings!`, 'info');
  };

  const applyAiBudgetOptimization = () => {
    if (!aiOptimizationResult) return;
    const mapSug = new Map(aiOptimizationResult.adjustments.map((a) => [a.id, a.suggested]));
    updateActiveEvent((evt) => ({
      ...evt,
      expenses: evt.expenses.map((item) => {
        const nextVal = mapSug.get(item.id);
        return nextVal !== undefined ? { ...item, estimated: nextVal, actual: nextVal } : item;
      })
    }));
    setAiOptimizationResult(null);
    triggerToast('Applied AI-optimized budget figures across all expense items!', 'success');
  };

  // ============================================================================
  // EXPORT FUNCTIONS (CSV, JSON, ICS, PRINT/PDF)
  // ============================================================================
  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const headers = ['Category', 'Item Title', 'Vendor', 'Priority', 'Payment Status', 'Estimated (INR)', 'Actual (INR)'];
    const rows = activeEvent.expenses.map((e) => [
      `"${e.category}"`,
      `"${e.title.replace(/"/g, '""')}"`,
      `"${e.vendor.replace(/"/g, '""')}"`,
      e.priority,
      e.status,
      e.estimated,
      e.actual
    ]);
    rows.push(['"TOTAL"', '""', '""', '""', '""', budgetMetrics.estimatedTotal, budgetMetrics.actualTotal]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadFile(csv, `${activeEvent.title.toLowerCase().replace(/\s+/g, '_')}_budget.csv`, 'text/csv;charset=utf-8;');
    triggerToast('Downloaded CSV Budget spreadsheet!', 'success');
  };

  const handleExportJSON = () => {
    const json = JSON.stringify(activeEvent, null, 2);
    downloadFile(json, `${activeEvent.title.toLowerCase().replace(/\s+/g, '_')}_master_plan.json`, 'application/json');
    triggerToast('Downloaded complete JSON Event Data package!', 'success');
  };

  const handleExportICS = () => {
    const cleanDate = activeEvent.date.replace(/-/g, '');
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//EventPilot AI//Master Event Schedule//EN',
      'CALSCALE:GREGORIAN'
    ];
    activeEvent.agenda.forEach((slot, idx) => {
      const st = slot.startTime.replace(':', '') + '00';
      const et = slot.endTime.replace(':', '') + '00';
      lines.push(
        'BEGIN:VEVENT',
        `UID:${activeEvent.id}-slot-${idx}@eventpilot.ai`,
        `SUMMARY:${activeEvent.title} — ${slot.title}`,
        `DTSTART:${cleanDate}T${st}`,
        `DTEND:${cleanDate}T${et}`,
        `LOCATION:${slot.zone} (${activeEvent.location})`,
        `DESCRIPTION:${slot.description} | Lead: ${slot.lead}`,
        'END:VEVENT'
      );
    });
    lines.push('END:VCALENDAR');
    downloadFile(lines.join('\r\n'), `${activeEvent.title.toLowerCase().replace(/\s+/g, '_')}.ics`, 'text/calendar');
    triggerToast('Downloaded ICS Calendar schedule!', 'success');
  };

  const handleExportPrintablePDF = () => {
    window.print();
    triggerToast('Opened Printable PDF Master Dossier view!', 'info');
  };

  const copyShareSummary = () => {
    const text = `EventPilot AI Master Summary: ${activeEvent.title} (${activeEvent.eventType}) | Date: ${activeEvent.date} at ${activeEvent.time} | Location: ${activeEvent.location} | Guests: ${activeEvent.guestCount} | Total Budget: ${formatINR(activeEvent.totalBudget)} | Overview: ${activeEvent.masterPlan.overview}`;
    try {
      navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    triggerToast('Copied shareable event summary to clipboard!', 'success');
  };

  // Filtered events for Dashboard
  const filteredEvents = useMemo(() => {
    return events
      .filter((e) => {
        const matchesType = typeFilter === 'All' || e.eventType === typeFilter;
        const matchesSearch =
          e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.eventType.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'budget-desc') return b.totalBudget - a.totalBudget;
        if (sortBy === 'guests-desc') return b.guestCount - a.guestCount;
        return a.date.localeCompare(b.date);
      });
  }, [events, typeFilter, searchQuery, sortBy]);

  // Task progress metrics
  const taskMetrics = useMemo(() => {
    const total = activeEvent.tasks.length;
    const completed = activeEvent.tasks.filter((t) => t.status === 'Completed').length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pct };
  }, [activeEvent.tasks]);

  // ============================================================================
  // RENDER NAVIGATION HEADER
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans selection:bg-indigo-600 selection:text-white">
      {/* Subtle Ambient Background Gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-200/40 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-amber-100/40 blur-3xl" />
      </div>

      {/* Global Toast Banner */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border bg-[#1E1B4B] text-white border-indigo-400/30 animate-in fade-in slide-in-from-bottom-4">
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="text-sm font-medium">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            aria-label="Close notification"
            className="text-indigo-200 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF8F5]/90 border-b border-indigo-950/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <button
            onClick={() => setActivePage('landing')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#6D28D9] flex items-center justify-center shadow-md shadow-indigo-950/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg font-bold tracking-tight text-[#1E1B4B]">
                  EventPilot
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-900 border border-indigo-200">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block leading-none">
                Intelligent Event Architecture
              </p>
            </div>
          </button>

          {/* Primary Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/80 p-1 rounded-xl border border-indigo-950/10 shadow-sm">
            {[
              { id: 'landing', label: 'Home' },
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'wizard', label: 'Create Event' },
              { id: 'ai-chat', label: 'AI Planner' },
              { id: 'master-plan', label: 'Master Plan' },
              { id: 'budget', label: 'Budget' },
              { id: 'venues', label: 'Venues' },
              { id: 'agenda-tasks', label: 'Agenda & Tasks' },
              { id: 'exports', label: 'Exports' },
              { id: 'architecture', label: 'Stack & SQL' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id as typeof activePage)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activePage === item.id
                    ? 'bg-[#1E1B4B] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#1E1B4B] hover:bg-indigo-50/70'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowConfigModal(true)}
              title="Configure Gemini API & Supabase Connection"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-amber-50 text-amber-900 border border-amber-300/70 hover:bg-amber-100 transition-colors"
            >
              <Settings className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">
                {backendConfig.useLiveBackend ? 'Live API Mode' : 'Demo AI Mode'}
              </span>
            </button>

            {user.isAuthenticated ? (
              <button
                onClick={() => setActivePage('auth')}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:border-indigo-300"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="hidden lg:inline">{user.name}</span>
                <UserCheck className="w-3.5 h-3.5 text-indigo-700" />
              </button>
            ) : (
              <button
                onClick={() => setActivePage('auth')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1E1B4B] text-white hover:bg-indigo-900"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Quick Navigation Scroller */}
        <div className="flex md:hidden items-center gap-1.5 overflow-x-auto px-4 py-2 border-t border-indigo-950/5 bg-white/70">
          {[
            { id: 'landing', label: 'Home' },
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'wizard', label: '+ Wizard' },
            { id: 'ai-chat', label: 'AI Chat' },
            { id: 'master-plan', label: 'Master Plan' },
            { id: 'budget', label: 'Budget' },
            { id: 'venues', label: 'Venues' },
            { id: 'agenda-tasks', label: 'Agenda/Tasks' },
            { id: 'exports', label: 'Export' },
            { id: 'architecture', label: 'SQL & Code' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id as typeof activePage)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
                activePage === item.id
                  ? 'bg-[#1E1B4B] text-white'
                  : 'bg-indigo-50/70 text-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Active Event Context Switcher Bar (shown on workspace pages) */}
        {activePage !== 'landing' && activePage !== 'auth' && activePage !== 'architecture' && (
          <div className="bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#1E1B4B] text-white px-4 py-2 text-xs">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-indigo-200 font-medium">Active Workspace Event:</span>
                <select
                  aria-label="Select active event"
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  className="bg-white/10 text-white font-semibold rounded-lg px-2.5 py-1 border border-white/20 focus:outline-none"
                >
                  {events.map((ev) => (
                    <option key={ev.id} value={ev.id} className="text-slate-900">
                      {ev.title} ({ev.eventType} • {formatINR(ev.totalBudget)})
                    </option>
                  ))}
                </select>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30">
                  <Calendar className="w-3 h-3" /> {activeEvent.date}
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-indigo-100">
                  <MapPin className="w-3 h-3" /> {activeEvent.location}
                </span>
                <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-indigo-100">
                  <Users className="w-3 h-3" /> {activeEvent.guestCount} Guests
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePage('wizard')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-400 text-slate-950 font-semibold hover:bg-amber-300 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> New Event
                </button>
                <button
                  onClick={() => setShareModalOpen(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ====================================================================
          PAGE A: LANDING PAGE
      ==================================================================== */}
      {activePage === 'landing' && (
        <main className="space-y-20 pb-20">
          {/* Hero Section */}
          <section className="relative pt-10 sm:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-950 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Powered by Google Gemini AI • Next.js • Flask • Supabase</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1E1B4B] leading-[1.12]">
                  Your Event. Your Vision.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4338CA] via-[#7C3AED] to-[#D97706]">
                    Perfectly Planned.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                  EventPilot AI transforms your raw idea into an executive-ready master plan—complete
                  with dynamic budget optimization, illustrative venue matching, run-of-show agendas,
                  and critical-path task tracking for weddings, college fests, conferences, and
                  product launches.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setActivePage('wizard')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#1E1B4B] to-[#4338CA] text-white font-semibold shadow-lg shadow-indigo-950/25 hover:opacity-95 transition-all"
                  >
                    <span>Plan My Event</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </button>

                  <button
                    onClick={() => {
                      const el = document.getElementById('features-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#1E1B4B] font-semibold border border-indigo-950/15 hover:bg-indigo-50/50 transition-all"
                  >
                    <span>Explore Features</span>
                  </button>

                  <button
                    onClick={() => setActivePage('ai-chat')}
                    className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-amber-50 text-amber-950 font-medium border border-amber-300/80 hover:bg-amber-100 transition-all text-sm"
                  >
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Try Conversational AI</span>
                  </button>
                </div>

                {/* Trust & Capability Strip */}
                <div className="pt-4 grid grid-cols-3 gap-4 border-t border-indigo-950/10 max-w-lg">
                  <div>
                    <p className="text-xl font-bold text-[#1E1B4B]">5+ Event Archetypes</p>
                    <p className="text-xs text-slate-500">Weddings to Campus Fests</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-[#1E1B4B]">Structured AI JSON</p>
                    <p className="text-xs text-slate-500">Timelines, Risks & Budgets</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-[#1E1B4B]">4 Instant Exports</p>
                    <p className="text-xs text-slate-500">PDF, CSV, JSON & ICS</p>
                  </div>
                </div>
              </div>

              {/* Animated / Interactive Event Dashboard Preview Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden bg-white border border-indigo-950/10 shadow-2xl">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={HERO_GALA_IMG}
                      alt="Luxury evening wedding and gala reception venue with soft lavender lighting"
                      className="w-full h-full object-cover max-w-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B] via-[#1E1B4B]/40 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-bold">
                          Live AI Workspace Preview
                        </span>
                        <h3 className="font-serif text-lg font-bold mt-1">
                          {activeEvent.title}
                        </h3>
                      </div>
                      <span className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg font-medium">
                        {formatINR(activeEvent.totalBudget)}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-3 gap-2.5 text-center">
                      <div className="p-2.5 rounded-xl bg-[#F3EFFE] border border-indigo-200/60">
                        <p className="text-[11px] text-slate-500">Guests</p>
                        <p className="text-sm font-bold text-[#1E1B4B]">{activeEvent.guestCount} Pax</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#F3EFFE] border border-indigo-200/60">
                        <p className="text-[11px] text-slate-500">Top Venue Match</p>
                        <p className="text-sm font-bold text-emerald-700">96% Fit</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#F3EFFE] border border-indigo-200/60">
                        <p className="text-[11px] text-slate-500">Tasks Done</p>
                        <p className="text-sm font-bold text-indigo-700">{taskMetrics.pct}%</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700">AI Budget Allocation</span>
                        <span className="text-indigo-700 font-medium">
                          {budgetMetrics.utilizationPct}% Allocated
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#4338CA] to-[#D97706] rounded-full transition-all"
                          style={{ width: `${Math.min(100, budgetMetrics.utilizationPct)}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-1 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setActivePage('dashboard')}
                        className="w-full py-2.5 rounded-xl bg-[#1E1B4B] text-white text-xs font-semibold hover:bg-indigo-900 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>Open Interactive Dashboard</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Supported Event Archetypes Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  Tailored Domain Intelligence
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#1E1B4B] mt-1">
                  Engineered for Every Celebration & Milestone
                </h2>
              </div>
              <p className="text-sm text-slate-600 max-w-md">
                Click any archetype below to pre-load a specialized template in the Event Creation
                Wizard or inspect an active workspace.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                {
                  type: 'Wedding' as EventType,
                  icon: Heart,
                  title: 'Weddings & Engagements',
                  desc: 'Heritage venues, multi-day ceremonies, floral architecture & guest hospitality.',
                  sampleBudget: 1800000,
                  sampleGuests: 280
                },
                {
                  type: 'Birthday' as EventType,
                  icon: PartyPopper,
                  title: 'Birthdays & Anniversaries',
                  desc: 'Milestone soirées, custom themes, live entertainment & curated tasting menus.',
                  sampleBudget: 150000,
                  sampleGuests: 120
                },
                {
                  type: 'College Fest' as EventType,
                  icon: Music,
                  title: 'College Cultural Fests',
                  desc: 'Main-stage concert rigs, QR delegate passes, sponsor booths & band riders.',
                  sampleBudget: 200000,
                  sampleGuests: 500
                },
                {
                  type: 'Conference' as EventType,
                  icon: GraduationCap,
                  title: 'Conferences & Meetups',
                  desc: 'Multi-track agendas, speaker management, badge scanning & breakout lounges.',
                  sampleBudget: 450000,
                  sampleGuests: 350
                },
                {
                  type: 'Corporate' as EventType,
                  icon: Briefcase,
                  title: 'Corporate & Launches',
                  desc: 'Keynote LED walls, press kits, redundant Wi-Fi & executive networking.',
                  sampleBudget: 650000,
                  sampleGuests: 220
                }
              ].map((card) => {
                const IconComp = card.icon;
                return (
                  <div
                    key={card.type}
                    className="p-5 rounded-2xl bg-white border border-indigo-950/10 shadow-sm hover:shadow-md hover:border-indigo-400 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F3EFFE] text-[#4338CA] flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#1E1B4B]">
                        {card.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                    </div>
                    <button
                      onClick={() => {
                        updateWizardDraft({
                          eventType: card.type,
                          title: `Signature ${card.type} Showcase`,
                          totalBudget: card.sampleBudget,
                          guestCount: card.sampleGuests
                        });
                        setActivePage('wizard');
                      }}
                      className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-indigo-700 hover:text-indigo-950 flex items-center justify-between"
                    >
                      <span>Launch {card.type} Template</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Feature Highlights Section */}
          <section id="features-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-[#1E1B4B] text-white p-8 sm:p-12 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
                <div className="lg:col-span-7 space-y-3">
                  <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                    End-to-End Platform Capabilities
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                    AI Intelligence Meets Professional Event Control
                  </h2>
                  <p className="text-sm text-indigo-200 max-w-2xl">
                    Every module in EventPilot AI works in concert—updating your conversational prompt
                    synchronizes your master timeline, expense ledger, venue match criteria, and exportable
                    dossiers.
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <img
                    src={STAGE_FEST_IMG}
                    alt="Cultural festival and tech conference stage with deep indigo and gold lighting"
                    className="w-full h-48 object-cover rounded-2xl border border-white/15 max-w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Conversational Gemini Planner',
                    desc: 'Describe your event in plain English or Hinglish. The AI detects missing constraints, asks smart follow-ups, and outputs structured JSON plans.',
                    action: 'ai-chat',
                    cta: 'Open AI Chat'
                  },
                  {
                    title: 'AI Budget Optimizer & Recharts',
                    desc: 'Track estimated vs. actual spend across categories and run 1-click AI optimization that trims costs while protecting your top priorities.',
                    action: 'budget',
                    cta: 'Open Budget Studio'
                  },
                  {
                    title: 'Transparent Venue Matching',
                    desc: 'Compare illustrative venue contenders with explicit capacity, budget-ratio, and amenity match scores—zero fabricated live claims.',
                    action: 'venues',
                    cta: 'Compare Venues'
                  },
                  {
                    title: 'Editable Master Blueprint',
                    desc: 'Review phased timelines, electrical/AV requirements, vendor lead times, and risk mitigation matrices with full inline editing.',
                    action: 'master-plan',
                    cta: 'View Master Plan'
                  },
                  {
                    title: 'Run-of-Show Agenda & Tasks',
                    desc: 'Manage minute-by-minute event day time slots alongside deadline-driven task checklists and milestone progress indicators.',
                    action: 'agenda-tasks',
                    cta: 'Manage Schedule'
                  },
                  {
                    title: 'Multi-Format Exports & SQL',
                    desc: 'Download CSV budgets, JSON event packages, ICS calendar files, printable PDF briefs, plus full Supabase RLS SQL & Flask API code.',
                    action: 'exports',
                    cta: 'Export Center'
                  }
                ].map((feat) => (
                  <div
                    key={feat.title}
                    className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex flex-col justify-between hover:bg-white/15 transition-colors"
                  >
                    <div className="space-y-2">
                      <h3 className="font-serif text-lg font-bold text-white">{feat.title}</h3>
                      <p className="text-xs text-indigo-100/90 leading-relaxed">{feat.desc}</p>
                    </div>
                    <button
                      onClick={() => setActivePage(feat.action as typeof activePage)}
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200"
                    >
                      <span>{feat.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                4-Step Workflow
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1E1B4B] mt-1">
                How EventPilot AI Works
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Share Your Vision',
                  desc: 'Use the 4-step Event Wizard or type a natural prompt like "500-person college fest with ₹2 lakh budget".'
                },
                {
                  step: '02',
                  title: 'AI Synthesizes the Plan',
                  desc: 'Gemini generates a structured master plan: phased timeline, budget split, vendor specs, and risk matrix.'
                },
                {
                  step: '03',
                  title: 'Optimize & Customize',
                  desc: 'Run the AI Budget Optimizer, shortlist illustrative venues, and fine-tune your run-of-show agenda.'
                },
                {
                  step: '04',
                  title: 'Export & Execute',
                  desc: 'Download PDF dossiers, CSV budgets, ICS calendar invites, or share a live summary with your team.'
                }
              ].map((st) => (
                <div
                  key={st.step}
                  className="p-6 rounded-2xl bg-white border border-indigo-950/10 shadow-sm relative"
                >
                  <span className="font-serif text-3xl font-bold text-indigo-200">{st.step}</span>
                  <h3 className="font-serif text-lg font-bold text-[#1E1B4B] mt-2">{st.title}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Clearly Labeled Sample Testimonials Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded-md">
                  Sample User Personas (Illustrative Showcase)
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#1E1B4B] mt-2">
                  Designed for Modern Organizers
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                *Clearly marked illustrative sample testimonials demonstrating target use cases.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote:
                    'Turning our ₹2 lakh student council grant into a balanced stage, sound, and hospitality plan took 90 seconds instead of three nights of spreadsheet guesswork.',
                  author: 'Diya N. — Cultural Secretary (Sample Persona)',
                  event: 'College Cultural Fest (500 Attendees)'
                },
                {
                  quote:
                    'The AI Budget Optimizer flagged how we could save ₹85,000 by repurposing ceremony floral installations for our reception banquet without touching our catering tier.',
                  author: 'Aarav & Meera — Wedding Couple (Sample Persona)',
                  event: 'Udaipur Heritage Reception (280 Guests)'
                },
                {
                  quote:
                    'Having risk mitigation checklists—like redundant Ethernet failover for live product demos—built right into the master plan kept our Bengaluru launch seamless.',
                  author: 'Vikram D. — Field Marketing Lead (Sample Persona)',
                  event: 'Enterprise SaaS Launch (220 Guests)'
                }
              ].map((t, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-indigo-950/10 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-500">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        Sample Content
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 italic leading-relaxed">"{t.quote}"</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-xs font-bold text-[#1E1B4B]">{t.author}</p>
                    <p className="text-[11px] text-indigo-700">{t.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA Banner */}
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#4338CA] text-white p-8 sm:p-12 text-center space-y-5 shadow-xl">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                Ready to Architect Your Next Unforgettable Event?
              </h2>
              <p className="text-sm sm:text-base text-indigo-100 max-w-xl mx-auto">
                Jump straight into the interactive dashboard, launch the 4-step wizard, or chat
                with the AI Event Planner right now.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={() => setActivePage('wizard')}
                  className="px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm hover:bg-amber-300 transition-colors"
                >
                  Start Event Creation Wizard
                </button>
                <button
                  onClick={() => setActivePage('dashboard')}
                  className="px-6 py-3 rounded-xl bg-white/15 text-white font-semibold text-sm border border-white/20 hover:bg-white/25 transition-colors"
                >
                  Explore Live Dashboard
                </button>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ====================================================================
          PAGE B: SUPABASE AUTHENTICATION VIEW
      ==================================================================== */}
      {activePage === 'auth' && (
        <main className="max-w-md mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl border border-indigo-950/10 shadow-xl p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-[#F3EFFE] text-[#4338CA] flex items-center justify-center mx-auto">
                <KeyRound className="w-6 h-6" />
              </div>
              <h1 className="font-serif text-2xl font-bold text-[#1E1B4B]">
                {authMode === 'signin'
                  ? 'Sign In to EventPilot AI'
                  : authMode === 'signup'
                  ? 'Create Your Organizer Account'
                  : 'Reset Your Password'}
              </h1>
              <p className="text-xs text-slate-500">
                Backed by Supabase Auth & Row Level Security (RLS)
              </p>
            </div>

            {authNotice && (
              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 font-medium">
                {authNotice}
              </div>
            )}

            {user.isAuthenticated && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900">Active Authenticated Session</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-200/70 text-emerald-900 font-semibold">
                    Protected Routes Unlocked
                  </span>
                </div>
                <p className="text-xs text-emerald-800">
                  Signed in as <strong>{user.name}</strong> ({user.email})
                </p>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => setActivePage('dashboard')}
                    className="px-3 py-1.5 rounded-lg bg-[#1E1B4B] text-white text-xs font-semibold"
                  >
                    Go to Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setUser((u) => ({ ...u, isAuthenticated: false }));
                      setAuthNotice('Signed out of current session. You can sign back in below.');
                      triggerToast('Signed out successfully.', 'info');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white border border-rose-300 text-rose-700 text-xs font-semibold inline-flex items-center gap-1"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (authMode === 'reset') {
                  setAuthNotice(`Password recovery link sent to ${authForm.email}.`);
                  triggerToast('Password reset link dispatched!', 'info');
                  return;
                }
                setUser({
                  id: 'usr-' + Date.now(),
                  name: authForm.name.trim() || 'Aarav Mehta',
                  email: authForm.email.trim() || 'aarav.mehta@eventpilot.ai',
                  role: 'Senior Event Producer',
                  isAuthenticated: true
                });
                triggerToast('Authenticated with EventPilot AI Workspace!', 'success');
                setActivePage('dashboard');
              }}
              className="space-y-4"
            >
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    placeholder="e.g., Aarav Mehta"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Work or Personal Email
                </label>
                <input
                  type="email"
                  required
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  placeholder="you@organization.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>

              {authMode !== 'reset' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#1E1B4B] text-white font-semibold text-sm hover:bg-indigo-900 transition-colors"
              >
                {authMode === 'signin'
                  ? 'Sign In to Workspace'
                  : authMode === 'signup'
                  ? 'Create Account & Continue'
                  : 'Send Password Reset Email'}
              </button>
            </form>

            <div className="flex items-center justify-between text-xs text-indigo-700 pt-2 border-t border-slate-100">
              {authMode !== 'signin' && (
                <button onClick={() => setAuthMode('signin')} className="hover:underline">
                  Back to Sign In
                </button>
              )}
              {authMode === 'signin' && (
                <button onClick={() => setAuthMode('signup')} className="hover:underline">
                  Create new account
                </button>
              )}
              {authMode !== 'reset' && (
                <button onClick={() => setAuthMode('reset')} className="hover:underline">
                  Forgot password?
                </button>
              )}
            </div>
          </div>
        </main>
      )}

      {/* ====================================================================
          PAGE C: PERSONALIZED DASHBOARD
      ==================================================================== */}
      {activePage === 'dashboard' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Welcome Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#4338CA] text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg">
            <div className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Organizer Command Center
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold">
                Welcome back, {user.name}
              </h1>
              <p className="text-xs sm:text-sm text-indigo-100 max-w-xl">
                You are managing {events.length} active events with a combined portfolio budget of{' '}
                {formatINR(events.reduce((s, e) => s + e.totalBudget, 0))}.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActivePage('wizard')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors"
              >
                <Plus className="w-4 h-4" /> Create New Event
              </button>
              <button
                onClick={() => setActivePage('ai-chat')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 text-white font-semibold text-xs border border-white/20 hover:bg-white/25 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-amber-300" /> Conversational AI Planner
              </button>
            </div>
          </div>

          {/* KPI Metric Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-indigo-950/10 shadow-sm">
              <p className="text-xs text-slate-500 font-medium">Managed Events</p>
              <p className="text-2xl font-bold text-[#1E1B4B] mt-1">{events.length}</p>
              <p className="text-[11px] text-emerald-700 mt-1">All synced with AI Master Plans</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-indigo-950/10 shadow-sm">
              <p className="text-xs text-slate-500 font-medium">Active Event Budget</p>
              <p className="text-2xl font-bold text-[#1E1B4B] mt-1">
                {formatINR(activeEvent.totalBudget)}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Remaining: {formatINR(budgetMetrics.remaining)}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-indigo-950/10 shadow-sm">
              <p className="text-xs text-slate-500 font-medium">Total Guest Capacity</p>
              <p className="text-2xl font-bold text-[#1E1B4B] mt-1">
                {events.reduce((acc, e) => acc + e.guestCount, 0).toLocaleString()} Pax
              </p>
              <p className="text-[11px] text-indigo-700 mt-1">
                Active: {activeEvent.guestCount} guests in {activeEvent.location}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-indigo-950/10 shadow-sm">
              <p className="text-xs text-slate-500 font-medium">Active Event Task Progress</p>
              <p className="text-2xl font-bold text-[#1E1B4B] mt-1">{taskMetrics.pct}%</p>
              <p className="text-[11px] text-slate-500 mt-1">
                {taskMetrics.completed} of {taskMetrics.total} tasks completed
              </p>
            </div>
          </div>

          {/* Search, Filter & Sort Controls */}
          <div className="bg-white p-4 rounded-2xl border border-indigo-950/10 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events by title, city, or type..."
                aria-label="Search events"
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {['All', 'Wedding', 'College Fest', 'Corporate', 'Conference', 'Birthday'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      typeFilter === t ? 'bg-[#1E1B4B] text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <select
                aria-label="Sort events"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-white"
              >
                <option value="date">Sort by Date</option>
                <option value="budget-desc">Sort by Budget: High to Low</option>
                <option value="guests-desc">Sort by Guests: High to Low</option>
              </select>
            </div>
          </div>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredEvents.map((ev) => {
              const isSelected = ev.id === activeEvent.id;
              const evSpent = ev.expenses.reduce((s, x) => s + x.actual, 0);
              return (
                <div
                  key={ev.id}
                  className={`rounded-2xl bg-white border p-5 transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-indigo-600 ring-2 ring-indigo-600/20 shadow-md'
                      : 'border-indigo-950/10 shadow-sm hover:border-indigo-300'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F3EFFE] text-[#4338CA]">
                        {ev.eventType}
                      </span>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {ev.status}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#1E1B4B]">{ev.title}</h3>

                    <div className="space-y-1 text-xs text-slate-600">
                      <p className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                        <span>
                          {ev.date} at {ev.time}
                        </span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{ev.location}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{ev.guestCount} Guests</span>
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Budget / Actual:</span>
                      <span className="font-bold text-[#1E1B4B]">
                        {formatINR(evSpent)} / {formatINR(ev.totalBudget)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedEventId(ev.id);
                        setActivePage('master-plan');
                      }}
                      className="flex-1 py-2 rounded-xl bg-[#1E1B4B] text-white text-xs font-semibold hover:bg-indigo-900 transition-colors"
                    >
                      Open Master Plan
                    </button>
                    <button
                      onClick={() => {
                        setSelectedEventId(ev.id);
                        setActivePage('budget');
                      }}
                      className="px-3 py-2 rounded-xl bg-[#F3EFFE] text-[#4338CA] text-xs font-semibold hover:bg-indigo-100"
                    >
                      Budget
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dashboard Bottom Row: Budget Overview Chart & Upcoming Priority Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-indigo-950/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-lg font-bold text-[#1E1B4B]">
                    Budget Breakdown — {activeEvent.title}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Estimated vs. Actual Spend by Category (INR)
                  </p>
                </div>
                <button
                  onClick={() => setActivePage('budget')}
                  className="text-xs font-semibold text-indigo-700 hover:underline"
                >
                  Full Budget Studio →
                </button>
              </div>

              <div className="relative h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={budgetMetrics.categoryData}>
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(val: number) => formatINR(val)} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="estimated" name="Estimated" fill="#6366F1" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="actual" name="Actual" fill="#D97706" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-indigo-950/10 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-lg font-bold text-[#1E1B4B]">
                    Upcoming Milestones & Tasks
                  </h2>
                  <button
                    onClick={() => setActivePage('agenda-tasks')}
                    className="text-xs font-semibold text-indigo-700 hover:underline"
                  >
                    Manage All →
                  </button>
                </div>

                <div className="space-y-2.5">
                  {activeEvent.tasks.map((tsk) => (
                    <div
                      key={tsk.id}
                      className="p-3 rounded-xl bg-[#FAF8F5] border border-slate-200/80 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={tsk.status === 'Completed'}
                          onChange={() => {
                            updateActiveEvent((evt) => ({
                              ...evt,
                              tasks: evt.tasks.map((item) =>
                                item.id === tsk.id
                                  ? {
                                      ...item,
                                      status: item.status === 'Completed' ? 'Todo' : 'Completed'
                                    }
                                  : item
                              )
                            }));
                          }}
                          className="mt-1 rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <div>
                          <p
                            className={`text-xs font-semibold ${
                              tsk.status === 'Completed'
                                ? 'line-through text-slate-400'
                                : 'text-slate-800'
                            }`}
                          >
                            {tsk.title}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Due {tsk.dueDate} • {tsk.assignee}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          tsk.priority === 'High'
                            ? 'bg-rose-100 text-rose-800'
                            : tsk.priority === 'Medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {tsk.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActivePage('agenda-tasks')}
                className="w-full py-2.5 rounded-xl bg-[#F3EFFE] text-[#4338CA] text-xs font-semibold hover:bg-indigo-100 transition-colors"
              >
                + Add Task or Agenda Slot
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ====================================================================
          PAGE D: MULTI-STEP EVENT CREATION WIZARD
      ==================================================================== */}
      {activePage === 'wizard' && (
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-white rounded-3xl border border-indigo-950/10 shadow-xl p-6 sm:p-10 space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  Interactive 4-Step Event Architect + Review
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1B4B] mt-1">
                  Create Your Event Master Plan
                </h1>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Autosaved Draft
              </span>
            </div>

            {/* Step Progress Indicator */}
            <div className="grid grid-cols-5 gap-2">
              {[
                { s: 1, label: '1. Type & Title' },
                { s: 2, label: '2. Date & Venue' },
                { s: 3, label: '3. Guests & Style' },
                { s: 4, label: '4. Budget & Goals' },
                { s: 5, label: '5. Review & AI' }
              ].map((item) => (
                <button
                  key={item.s}
                  onClick={() => {
                    if (item.s < wizardStep || validateWizardStep(wizardStep)) {
                      setWizardStep(item.s);
                    }
                  }}
                  className={`py-2 px-2 rounded-xl text-center text-xs font-semibold transition-all ${
                    wizardStep === item.s
                      ? 'bg-[#1E1B4B] text-white shadow-sm'
                      : wizardStep > item.s
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Step 1: Event Type & Title */}
            {wizardStep === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Select Event Archetype
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {(['Wedding', 'Birthday', 'College Fest', 'Conference', 'Corporate'] as EventType[]).map(
                      (t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => updateWizardDraft({ eventType: t })}
                          className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                            wizardDraft.eventType === t
                              ? 'bg-[#F3EFFE] border-indigo-600 text-[#1E1B4B] shadow-sm'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                          }`}
                        >
                          {t}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={wizardDraft.title}
                    onChange={(e) => updateWizardDraft({ title: e.target.value })}
                    placeholder="e.g., AURA 2026 Inter-College Cultural Fest or Rohan & Priya Sangeet Night"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600"
                  />
                  {wizardErrors.title && (
                    <p className="text-xs text-rose-600 mt-1">{wizardErrors.title}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Date, Time, and Location */}
            {wizardStep === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    value={wizardDraft.date}
                    onChange={(e) => updateWizardDraft({ date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                  {wizardErrors.date && (
                    <p className="text-xs text-rose-600 mt-1">{wizardErrors.date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    value={wizardDraft.time}
                    onChange={(e) => updateWizardDraft({ time: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    City / Venue Location *
                  </label>
                  <input
                    type="text"
                    value={wizardDraft.location}
                    onChange={(e) => updateWizardDraft({ location: e.target.value })}
                    placeholder="e.g., Vellore, Tamil Nadu or Udaipur, Rajasthan"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                  {wizardErrors.location && (
                    <p className="text-xs text-rose-600 mt-1">{wizardErrors.location}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Guest Count & Preferences */}
            {wizardStep === 3 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Expected Guest Count ({wizardDraft.guestCount} Guests) *
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={50000}
                    value={wizardDraft.guestCount}
                    onChange={(e) => updateWizardDraft({ guestCount: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                  {wizardErrors.guestCount && (
                    <p className="text-xs text-rose-600 mt-1">{wizardErrors.guestCount}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Visual Theme & Ambience Style *
                  </label>
                  <input
                    type="text"
                    value={wizardDraft.themeStyle}
                    onChange={(e) => updateWizardDraft({ themeStyle: e.target.value })}
                    placeholder="e.g., Soft Lavender & Warm Gold Heritage Courtyard"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                  {wizardErrors.themeStyle && (
                    <p className="text-xs text-rose-600 mt-1">{wizardErrors.themeStyle}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Catering & Hospitality Preference
                  </label>
                  <input
                    type="text"
                    value={wizardDraft.cateringPreference}
                    onChange={(e) => updateWizardDraft({ cateringPreference: e.target.value })}
                    placeholder="e.g., Multi-Cuisine Buffet + Live Chaat & Mocktail Bar"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Budget & Priorities */}
            {wizardStep === 4 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Total Event Budget (INR): {formatINR(wizardDraft.totalBudget)} *
                  </label>
                  <input
                    type="number"
                    min={5000}
                    step={5000}
                    value={wizardDraft.totalBudget}
                    onChange={(e) => updateWizardDraft({ totalBudget: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                  {wizardErrors.totalBudget && (
                    <p className="text-xs text-rose-600 mt-1">{wizardErrors.totalBudget}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Top Event Priorities (Select at least 1)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Venue & Ambience',
                      'Catering & Hospitality',
                      'Stage & Concert AV',
                      'Floral & Lighting Design',
                      'Photography & Aftermovie',
                      'Crowd Safety & QR Check-in',
                      'VIP & Speaker Experience'
                    ].map((prio) => {
                      const active = wizardDraft.priorities.includes(prio);
                      return (
                        <button
                          type="button"
                          key={prio}
                          onClick={() => {
                            const next = active
                              ? wizardDraft.priorities.filter((p) => p !== prio)
                              : [...wizardDraft.priorities, prio];
                            updateWizardDraft({ priorities: next });
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                            active
                              ? 'bg-[#1E1B4B] text-white border-[#1E1B4B]'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300'
                          }`}
                        >
                          {active ? '✓ ' : '+ '}
                          {prio}
                        </button>
                      );
                    })}
                  </div>
                  {wizardErrors.priorities && (
                    <p className="text-xs text-rose-600 mt-1">{wizardErrors.priorities}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Review & Confirm */}
            {wizardStep === 5 && (
              <div className="space-y-4 bg-[#FAF8F5] p-5 rounded-2xl border border-indigo-950/10">
                <h3 className="font-serif text-lg font-bold text-[#1E1B4B]">
                  Review Your Event Blueprint Parameters
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500">Title:</span>
                    <p className="font-bold text-slate-900">{wizardDraft.title}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Event Type:</span>
                    <p className="font-bold text-slate-900">{wizardDraft.eventType}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Date & Time:</span>
                    <p className="font-bold text-slate-900">
                      {wizardDraft.date} at {wizardDraft.time}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500">Location:</span>
                    <p className="font-bold text-slate-900">{wizardDraft.location}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Guest Count:</span>
                    <p className="font-bold text-slate-900">{wizardDraft.guestCount} Pax</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Total Budget:</span>
                    <p className="font-bold text-indigo-700">{formatINR(wizardDraft.totalBudget)}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500">Priorities:</span>
                    <p className="font-bold text-slate-900">{wizardDraft.priorities.join(' • ')}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Wizard Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                disabled={wizardStep === 1}
                onClick={() => setWizardStep((s) => Math.max(1, s - 1))}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 disabled:opacity-40"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              {wizardStep < 5 ? (
                <button
                  type="button"
                  onClick={handleWizardNext}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#1E1B4B] text-white text-xs font-semibold hover:bg-indigo-900"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCreateEventFromWizard}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#1E1B4B] to-[#4338CA] text-white text-xs font-bold shadow-lg hover:opacity-95"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate AI Master Plan & Create Event</span>
                </button>
              )}
            </div>
          </div>
        </main>
      )}

      {/* ====================================================================
          PAGE E: CONVERSATIONAL AI PLANNER
      ==================================================================== */}
      {activePage === 'ai-chat' && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-white rounded-3xl border border-indigo-950/10 shadow-xl overflow-hidden flex flex-col h-[78vh]">
            {/* Chat Header */}
            <div className="p-4 sm:px-6 bg-gradient-to-r from-[#1E1B4B] to-[#312E81] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h1 className="font-serif text-lg font-bold">Conversational AI Event Planner</h1>
                  <p className="text-[11px] text-indigo-200">
                    Natural language to structured event plan • Ask follow-ups or refine budgets
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30">
                {backendConfig.useLiveBackend ? 'Connected: Flask + Gemini' : 'Interactive Demo AI Mode'}
              </span>
            </div>

            {/* Messages Stream */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#FAF8F5]/60">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm space-y-3 ${
                      msg.role === 'user'
                        ? 'bg-[#1E1B4B] text-white rounded-br-none'
                        : 'bg-white border border-indigo-950/10 text-slate-800 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>

                    {/* Structured Proposal Card inside AI Message */}
                    {msg.generatedProposal && (
                      <div className="p-4 rounded-xl bg-[#F3EFFE]/70 border border-indigo-200 space-y-3 text-slate-900">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800">
                            Structured AI Plan Output
                          </span>
                          <span className="text-xs font-bold text-[#1E1B4B]">
                            {formatINR(msg.generatedProposal.totalBudget)} •{' '}
                            {msg.generatedProposal.guestCount} Pax
                          </span>
                        </div>
                        <p className="text-xs font-bold text-[#1E1B4B]">
                          {msg.generatedProposal.title} ({msg.generatedProposal.location})
                        </p>
                        <div className="space-y-1.5">
                          {msg.generatedProposal.allocations.map((al) => (
                            <div
                              key={al.category}
                              className="flex items-center justify-between text-xs bg-white px-2.5 py-1.5 rounded-lg border border-indigo-100"
                            >
                              <span className="font-medium">{al.category} ({al.pct}%)</span>
                              <span className="font-bold text-indigo-900">{formatINR(al.amount)}</span>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => applyChatProposalToWorkspace(msg.generatedProposal!)}
                          className="w-full py-2 rounded-lg bg-[#1E1B4B] text-white text-xs font-semibold hover:bg-indigo-900 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                          <span>Apply Plan to Active Workspace & View Master Plan</span>
                        </button>
                      </div>
                    )}

                    {/* Follow-up Question / Prompt Chips */}
                    {msg.followUpQuestions && msg.followUpQuestions.length > 0 && (
                      <div className="pt-2 space-y-1.5">
                        <p className="text-[11px] font-semibold text-slate-500">
                          Suggested prompts / refinements:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.followUpQuestions.map((q) => (
                            <button
                              key={q}
                              onClick={() => handleSendChatMessage(q)}
                              className="text-left text-[11px] px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 transition-colors"
                            >
                              "{q}"
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}

              {isAiThinking && (
                <div className="flex items-center gap-2 text-xs text-indigo-800 bg-white px-4 py-3 rounded-2xl border border-indigo-100 w-fit shadow-sm">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                  <span>EventPilot AI is synthesizing budget splits, timeline & venue parameters...</span>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChatMessage();
              }}
              className="p-4 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder='e.g., "I want to organize a college cultural fest for 500 people with a budget of ₹2 lakh."'
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-indigo-600"
              />
              <button
                type="submit"
                disabled={isAiThinking}
                className="px-5 py-3 rounded-xl bg-[#1E1B4B] text-white text-xs font-semibold hover:bg-indigo-900 disabled:opacity-50 inline-flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </main>
      )}

      {/* ====================================================================
          PAGE F: AI-GENERATED MASTER PLAN
      ==================================================================== */}
      {activePage === 'master-plan' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Header & AI Mode Notice */}
          <div className="bg-white p-6 rounded-2xl border border-indigo-950/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#F3EFFE] text-[#4338CA]">
                  AI-Generated Master Blueprint
                </span>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-300">
                  {activeEvent.masterPlan.modeLabel}
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1B4B]">
                {activeEvent.title}
              </h1>
              <p className="text-xs text-slate-500">
                {activeEvent.date} at {activeEvent.time} • {activeEvent.location} •{' '}
                {activeEvent.guestCount} Guests • Total Budget: {formatINR(activeEvent.totalBudget)}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  updateActiveEvent((evt) => ({
                    ...evt,
                    masterPlan: {
                      ...evt.masterPlan,
                      overview: `[Refreshed AI Synthesis — ${new Date().toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}] ${evt.title} is structured for ${evt.guestCount} guests in ${evt.location} under a ${formatINR(
                        evt.totalBudget
                      )} cap, prioritizing ${evt.priorities.join(', ')}.`
                    }
                  }));
                  triggerToast('Regenerated AI Master Plan overview & parameters!', 'success');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F3EFFE] text-[#4338CA] text-xs font-semibold hover:bg-indigo-100"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Regenerate with AI
              </button>
              <button
                onClick={() => setActivePage('exports')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1E1B4B] text-white text-xs font-semibold hover:bg-indigo-900"
              >
                <Download className="w-3.5 h-3.5" /> Export Master Plan
              </button>
            </div>
          </div>

          {/* Editable Executive Overview */}
          <div className="bg-white p-6 rounded-2xl border border-indigo-950/10 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-[#1E1B4B]">
                1. Executive Event Overview
              </h2>
              {!editingOverview ? (
                <button
                  onClick={() => {
                    setOverviewDraft(activeEvent.masterPlan.overview);
                    setEditingOverview(true);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-700 hover:underline"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Overview
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      updateActiveEvent((evt) => ({
                        ...evt,
                        masterPlan: { ...evt.masterPlan, overview: overviewDraft }
                      }));
                      setEditingOverview(false);
                      triggerToast('Saved custom Event Overview!', 'success');
                    }}
                    className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingOverview(false)}
                    className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {editingOverview ? (
              <textarea
                rows={3}
                value={overviewDraft}
                onChange={(e) => setOverviewDraft(e.target.value)}
                className="w-full p-3 rounded-xl border border-indigo-300 text-sm focus:outline-none"
              />
            ) : (
              <p className="text-sm text-slate-700 leading-relaxed">
                {activeEvent.masterPlan.overview}
              </p>
            )}
          </div>

          {/* Phased Planning Timeline & Venue Technical Requirements */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-indigo-950/10 shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#1E1B4B]">
                2. Phased Planning Timeline
              </h2>
              <div className="space-y-4">
                {activeEvent.masterPlan.timeline.map((phase) => (
                  <div
                    key={phase.id}
                    className="p-4 rounded-xl bg-[#FAF8F5] border border-indigo-950/10 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-[#1E1B4B]">{phase.phase}</h3>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900">
                        {phase.timeframe}
                      </span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside">
                      {phase.keyActions.map((act, idx) => (
                        <li key={idx}>{act}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-indigo-950/10 shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#1E1B4B]">
                3. Venue & Technical Specifications
              </h2>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#F3EFFE]/60 border border-indigo-200/70">
                  <span className="font-bold text-indigo-950 block">Minimum Safe Capacity (with 15% Buffer)</span>
                  <span className="text-slate-700">
                    {activeEvent.masterPlan.venueRequirements.minCapacity} Pax
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-slate-200">
                  <span className="font-bold text-slate-900 block">Recommended Spatial Layout</span>
                  <span className="text-slate-700">
                    {activeEvent.masterPlan.venueRequirements.layoutStyle}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-slate-200">
                  <span className="font-bold text-slate-900 block">Power, Acoustic & AV Needs</span>
                  <span className="text-slate-700">
                    {activeEvent.masterPlan.venueRequirements.powerAvNeeds}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-slate-200">
                  <span className="font-bold text-slate-900 block">Guest Accessibility & Logistics</span>
                  <span className="text-slate-700">
                    {activeEvent.masterPlan.venueRequirements.accessibility}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Vendors & Risk Considerations */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-indigo-950/10 shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#1E1B4B]">
                4. Recommended Vendor & Service Tiers
              </h2>
              <div className="space-y-3">
                {activeEvent.masterPlan.recommendedVendors.map((v) => (
                  <div
                    key={v.id}
                    className="p-4 rounded-xl bg-[#FAF8F5] border border-slate-200 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-[#1E1B4B]">{v.serviceType}</p>
                      <p className="text-xs text-slate-600">{v.specification}</p>
                      <p className="text-[11px] text-indigo-700 font-medium">
                        Target Lead Time: {v.bookingLeadTime}
                      </p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-[#1E1B4B] shrink-0">
                      {formatINR(v.estimatedCost)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-indigo-950/10 shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#1E1B4B]">
                5. Risk Considerations & Contingency Matrix
              </h2>
              <div className="space-y-3">
                {activeEvent.masterPlan.riskConsiderations.map((rk) => (
                  <div
                    key={rk.id}
                    className="p-4 rounded-xl bg-[#FAF8F5] border border-slate-200 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        {rk.risk}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          rk.severity === 'High'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {rk.severity} Risk
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      <strong>Mitigation:</strong> {rk.mitigation}
                    </p>
                  </div>
                ))}
              </div>

              {/* Add Custom Risk Mitigation */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newRiskForm.risk.trim() || !newRiskForm.mitigation.trim()) return;
                  updateActiveEvent((evt) => ({
                    ...evt,
                    masterPlan: {
                      ...evt.masterPlan,
                      riskConsiderations: [
                        ...evt.masterPlan.riskConsiderations,
                        {
                          id: 'rk-' + Date.now(),
                          risk: newRiskForm.risk.trim(),
                          severity: newRiskForm.severity,
                          mitigation: newRiskForm.mitigation.trim()
                        }
                      ]
                    }
                  }));
                  setNewRiskForm({ risk: '', severity: 'Medium', mitigation: '' });
                  triggerToast('Added risk mitigation item to Master Plan!', 'success');
                }}
                className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2"
              >
                <input
                  type="text"
                  value={newRiskForm.risk}
                  onChange={(e) => setNewRiskForm({ ...newRiskForm, risk: e.target.value })}
                  placeholder="New risk scenario..."
                  className="px-3 py-2 rounded-lg border border-slate-200 text-xs"
                />
                <input
                  type="text"
                  value={newRiskForm.mitigation}
                  onChange={(e) => setNewRiskForm({ ...newRiskForm, mitigation: e.target.value })}
                  placeholder="Mitigation plan..."
                  className="px-3 py-2 rounded-lg border border-slate-200 text-xs"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-lg bg-[#1E1B4B] text-white text-xs font-semibold hover:bg-indigo-900"
                >
                  + Add Risk Item
                </button>
              </form>
            </div>
          </div>
        </main>
      )}

      {/* ====================================================================
          PAGE G: BUDGET MANAGEMENT & AI OPTIMIZER
      ==================================================================== */}
      {activePage === 'budget' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                Financial Command & AI Optimization
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1B4B]">
                Budget Studio — {activeEvent.title}
              </h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleRunAiBudgetOptimizer}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1E1B4B] to-[#4338CA] text-white text-xs font-bold shadow-md hover:opacity-95"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Run AI Budget Optimizer</span>
              </button>
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* 4 Budget Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-indigo-950/10 shadow-sm">
              <p className="text-xs text-slate-500">Total Target Budget</p>
              <p className="text-2xl font-bold text-[#1E1B4B] mt-1">
                {formatINR(budgetMetrics.totalBudget)}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-indigo-950/10 shadow-sm">
              <p className="text-xs text-slate-500">Estimated Expenses</p>
              <p className="text-2xl font-bold text-indigo-700 mt-1">
                {formatINR(budgetMetrics.estimatedTotal)}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-indigo-950/10 shadow-sm">
              <p className="text-xs text-slate-500">Actual Committed Spend</p>
              <p className="text-2xl font-bold text-amber-700 mt-1">
                {formatINR(budgetMetrics.actualTotal)}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-indigo-950/10 shadow-sm">
              <p className="text-xs text-slate-500">Remaining Balance</p>
              <p
                className={`text-2xl font-bold mt-1 ${
                  budgetMetrics.remaining >= 0 ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {formatINR(budgetMetrics.remaining)}
              </p>
            </div>
          </div>

          {/* AI Budget Optimizer Panel (when triggered) */}
          {aiOptimizationResult && (
            <div className="p-6 rounded-2xl bg-[#F3EFFE] border border-indigo-300 shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#1E1B4B] text-amber-300">
                    AI Budget Optimizer Recommendation
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#1E1B4B] mt-1">
                    Potential Savings Identified: {formatINR(aiOptimizationResult.potentialSavings)}
                  </h3>
                  <p className="text-xs text-slate-700">{aiOptimizationResult.summary}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={applyAiBudgetOptimization}
                    className="px-4 py-2 rounded-xl bg-[#1E1B4B] text-white text-xs font-bold hover:bg-indigo-900"
                  >
                    Apply AI Optimization
                  </button>
                  <button
                    onClick={() => setAiOptimizationResult(null)}
                    className="px-3 py-2 rounded-xl bg-white text-slate-700 text-xs font-semibold border border-slate-200"
                  >
                    Dismiss
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {aiOptimizationResult.adjustments.map((adj) => (
                  <div
                    key={adj.id}
                    className="p-3.5 rounded-xl bg-white border border-indigo-200 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <p className="font-bold text-[#1E1B4B]">{adj.title}</p>
                      <p className="text-slate-600 text-[11px]">{adj.reason}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="line-through text-slate-400">{formatINR(adj.current)}</p>
                      <p className="font-bold text-emerald-700">{formatINR(adj.suggested)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-indigo-950/10 shadow-sm space-y-3">
              <h2 className="font-serif text-lg font-bold text-[#1E1B4B]">
                Estimated vs. Actual by Category
              </h2>
              <div className="relative h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={budgetMetrics.categoryData}>
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(val: number) => formatINR(val)} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="estimated" name="Estimated" fill="#4338CA" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="actual" name="Actual" fill="#D97706" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-indigo-950/10 shadow-sm space-y-3">
              <h2 className="font-serif text-lg font-bold text-[#1E1B4B]">
                Category Share Breakdown
              </h2>
              <div className="relative h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetMetrics.categoryData}
                      dataKey="actual"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {budgetMetrics.categoryData.map((_, idx) => (
                        <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val: number) => formatINR(val)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Add / Edit Expense Form + Interactive Table */}
          <div className="bg-white p-6 rounded-2xl border border-indigo-950/10 shadow-sm space-y-6">
            <h2 className="font-serif text-lg font-bold text-[#1E1B4B]">
              {editingExpenseId ? 'Edit Expense Line Item' : 'Add Expense Line Item'}
            </h2>

            <form onSubmit={handleSaveExpense} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
              <select
                aria-label="Expense category"
                value={expenseForm.category}
                onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
              >
                <option>Venue & Rentals</option>
                <option>Catering & Hospitality</option>
                <option>Decor & Florals</option>
                <option>Audio, Visual & Lighting</option>
                <option>Photography & Film</option>
                <option>Guest Logistics & Gifting</option>
                <option>Contingency & Operations</option>
              </select>

              <input
                type="text"
                value={expenseForm.title}
                onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })}
                placeholder="Expense item title..."
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />

              <input
                type="text"
                value={expenseForm.vendor}
                onChange={(e) => setExpenseForm({ ...expenseForm, vendor: e.target.value })}
                placeholder="Vendor name..."
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />

              <input
                type="number"
                value={expenseForm.estimated}
                onChange={(e) => setExpenseForm({ ...expenseForm, estimated: e.target.value })}
                placeholder="Estimated (₹)"
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />

              <input
                type="number"
                value={expenseForm.actual}
                onChange={(e) => setExpenseForm({ ...expenseForm, actual: e.target.value })}
                placeholder="Actual (₹)"
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />

              <select
                aria-label="Payment status"
                value={expenseForm.status}
                onChange={(e) =>
                  setExpenseForm({
                    ...expenseForm,
                    status: e.target.value as typeof expenseForm.status
                  })
                }
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
              >
                <option value="Pending">Pending</option>
                <option value="Deposit Paid">Deposit Paid</option>
                <option value="Paid">Paid</option>
              </select>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#1E1B4B] text-white text-xs font-semibold hover:bg-indigo-900"
              >
                {editingExpenseId ? 'Update Item' : '+ Add Expense'}
              </button>
            </form>

            {/* Expenses Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase">
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Expense Item</th>
                    <th className="py-3 px-3">Vendor</th>
                    <th className="py-3 px-3">Priority</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Estimated</th>
                    <th className="py-3 px-3 text-right">Actual</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeEvent.expenses.map((exp) => (
                    <tr key={exp.id} className="hover:bg-slate-50/80">
                      <td className="py-3 px-3 font-medium text-indigo-900">{exp.category}</td>
                      <td className="py-3 px-3 font-bold text-slate-900">{exp.title}</td>
                      <td className="py-3 px-3 text-slate-600">{exp.vendor}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            exp.priority === 'High'
                              ? 'bg-rose-100 text-rose-800'
                              : exp.priority === 'Medium'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {exp.priority}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {exp.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-medium">{formatINR(exp.estimated)}</td>
                      <td className="py-3 px-3 text-right font-bold text-[#1E1B4B]">
                        {formatINR(exp.actual)}
                      </td>
                      <td className="py-3 px-3 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingExpenseId(exp.id);
                            setExpenseForm({
                              category: exp.category,
                              title: exp.title,
                              vendor: exp.vendor,
                              estimated: String(exp.estimated),
                              actual: String(exp.actual),
                              priority: exp.priority,
                              status: exp.status
                            });
                          }}
                          className="text-indigo-700 hover:underline font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            updateActiveEvent((evt) => ({
                              ...evt,
                              expenses: evt.expenses.filter((i) => i.id !== exp.id)
                            }));
                            triggerToast('Deleted expense item.', 'info');
                          }}
                          className="text-rose-600 hover:underline font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}

      {/* ====================================================================
          PAGE H: VENUE RECOMMENDATIONS
      ==================================================================== */}
      {activePage === 'venues' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-indigo-950/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  Transparency Notice: Illustrative AI Venue Recommendations (Live Venue Inventory Not Connected)
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1B4B] pt-1">
                Venue Contenders & Match Analysis
              </h1>
              <p className="text-xs text-slate-500">
                Scored transparently against {activeEvent.guestCount} guests, {activeEvent.location},
                and a target 30% venue budget ratio ({formatINR(Math.round(activeEvent.totalBudget * 0.3))}).
              </p>
            </div>

            <button
              onClick={() => setShowAddVenue((s) => !s)}
              className="px-4 py-2.5 rounded-xl bg-[#1E1B4B] text-white text-xs font-semibold hover:bg-indigo-900 shrink-0"
            >
              {showAddVenue ? 'Close Form' : '+ Add Custom Venue Option'}
            </button>
          </div>

          {showAddVenue && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!venueForm.name.trim()) return;
                const cap = Number(venueForm.capacity) || activeEvent.guestCount;
                const price = Number(venueForm.estimatedPrice) || 100000;
                const newV: VenueOption = {
                  id: 'ven-' + Date.now(),
                  name: `${venueForm.name.trim()} (User Added)`,
                  location: venueForm.location.trim() || activeEvent.location,
                  capacity: cap,
                  estimatedPrice: price,
                  amenities: venueForm.amenities.split(',').map((s) => s.trim()),
                  pros: ['Matches organizer location preference', `Accommodates ${cap} guests`],
                  cons: ['Pending on-site acoustic and power inspection'],
                  matchScore: 91,
                  matchCriteria: `Capacity ${cap} vs ${activeEvent.guestCount} Needed • Custom Shortlist`,
                  isIllustrative: false,
                  shortlisted: true
                };
                updateActiveEvent((evt) => ({ ...evt, venues: [newV, ...evt.venues] }));
                setShowAddVenue(false);
                setVenueForm({ name: '', location: '', capacity: '300', estimatedPrice: '150000', amenities: '' });
                triggerToast('Added venue contender to comparison!', 'success');
              }}
              className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-sm grid grid-cols-1 sm:grid-cols-5 gap-3"
            >
              <input
                type="text"
                required
                value={venueForm.name}
                onChange={(e) => setVenueForm({ ...venueForm, name: e.target.value })}
                placeholder="Venue Name..."
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
              <input
                type="text"
                value={venueForm.location}
                onChange={(e) => setVenueForm({ ...venueForm, location: e.target.value })}
                placeholder="Neighborhood / City..."
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
              <input
                type="number"
                value={venueForm.capacity}
                onChange={(e) => setVenueForm({ ...venueForm, capacity: e.target.value })}
                placeholder="Capacity (Pax)"
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
              <input
                type="number"
                value={venueForm.estimatedPrice}
                onChange={(e) => setVenueForm({ ...venueForm, estimatedPrice: e.target.value })}
                placeholder="Estimated Price (₹)"
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold"
              >
                Save Venue
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeEvent.venues.map((ven) => (
              <div
                key={ven.id}
                className={`rounded-2xl bg-white border p-6 space-y-4 transition-all ${
                  ven.shortlisted
                    ? 'border-indigo-600 ring-2 ring-indigo-600/15 shadow-md'
                    : 'border-indigo-950/10 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                      {ven.isIllustrative ? 'Illustrative AI Recommendation' : 'Custom Organizer Entry'}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#1E1B4B] mt-1">{ven.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-indigo-600" /> {ven.location}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block px-3 py-1 rounded-xl bg-[#F3EFFE] text-[#4338CA] font-bold text-sm">
                      {ven.matchScore}% Match
                    </span>
                    <p className="text-xs font-bold text-slate-800 mt-1">
                      {formatINR(ven.estimatedPrice)}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-slate-200/80 text-xs text-indigo-950 font-medium">
                  <strong>Match Criteria:</strong> {ven.matchCriteria}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800">
                    Capacity: {ven.capacity} Pax
                  </span>
                  {ven.amenities.map((am) => (
                    <span
                      key={am}
                      className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-900 border border-indigo-100"
                    >
                      {am}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                    <p className="font-bold text-emerald-900">Pros</p>
                    <ul className="list-disc list-inside text-emerald-800 space-y-0.5">
                      {ven.pros.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1">
                    <p className="font-bold text-rose-900">Cons / Watchouts</p>
                    <ul className="list-disc list-inside text-rose-800 space-y-0.5">
                      {ven.cons.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <button
                    onClick={() => {
                      updateActiveEvent((evt) => ({
                        ...evt,
                        venues: evt.venues.map((v) =>
                          v.id === ven.id ? { ...v, shortlisted: !v.shortlisted } : v
                        )
                      }));
                      triggerToast(
                        ven.shortlisted ? 'Removed from shortlist.' : `Shortlisted ${ven.name}!`,
                        'info'
                      );
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      ven.shortlisted
                        ? 'bg-[#1E1B4B] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-indigo-50'
                    }`}
                  >
                    {ven.shortlisted ? '★ Shortlisted Primary Venue' : '☆ Shortlist Venue'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ====================================================================
          PAGE I: AGENDA & TASK MANAGEMENT
      ==================================================================== */}
      {activePage === 'agenda-tasks' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Event Day Run-of-Show Agenda */}
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-indigo-950/10 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                    Run-of-Show Timeline
                  </span>
                  <h2 className="font-serif text-xl font-bold text-[#1E1B4B]">
                    Event Day Agenda ({activeEvent.date})
                  </h2>
                </div>
                <button
                  onClick={handleExportICS}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F3EFFE] text-[#4338CA] text-xs font-semibold"
                >
                  <CalendarPlus className="w-3.5 h-3.5" /> .ICS
                </button>
              </div>

              <div className="space-y-3">
                {activeEvent.agenda.map((slot) => (
                  <div
                    key={slot.id}
                    className="p-4 rounded-xl bg-[#FAF8F5] border border-slate-200 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#1E1B4B] text-amber-300">
                          {slot.startTime} – {slot.endTime}
                        </span>
                        <span className="text-xs font-semibold text-indigo-800">{slot.zone}</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">{slot.title}</h3>
                      <p className="text-xs text-slate-600">{slot.description}</p>
                      <p className="text-[11px] text-slate-500 font-medium">{slot.lead}</p>
                    </div>
                    <button
                      onClick={() => {
                        updateActiveEvent((evt) => ({
                          ...evt,
                          agenda: evt.agenda.filter((a) => a.id !== slot.id)
                        }));
                        triggerToast('Removed agenda time slot.', 'info');
                      }}
                      aria-label="Delete agenda slot"
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Agenda Slot Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!agendaForm.title.trim()) return;
                  const newSlot: AgendaSlot = {
                    id: 'ag-' + Date.now(),
                    startTime: agendaForm.startTime,
                    endTime: agendaForm.endTime,
                    title: agendaForm.title.trim(),
                    description: agendaForm.description.trim() || 'Scheduled session block',
                    zone: agendaForm.zone.trim() || 'Main Stage',
                    lead: agendaForm.lead.trim() || user.name
                  };
                  updateActiveEvent((evt) => ({ ...evt, agenda: [...evt.agenda, newSlot] }));
                  setAgendaForm({ ...agendaForm, title: '', description: '' });
                  triggerToast('Added time slot to Event Agenda!', 'success');
                }}
                className="pt-4 border-t border-slate-100 space-y-3"
              >
                <p className="text-xs font-bold text-[#1E1B4B]">+ Add Run-of-Show Time Slot</p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="time"
                    value={agendaForm.startTime}
                    onChange={(e) => setAgendaForm({ ...agendaForm, startTime: e.target.value })}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                  <input
                    type="time"
                    value={agendaForm.endTime}
                    onChange={(e) => setAgendaForm({ ...agendaForm, endTime: e.target.value })}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={agendaForm.title}
                    onChange={(e) => setAgendaForm({ ...agendaForm, title: e.target.value })}
                    placeholder="Session / Segment Title..."
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                  <input
                    type="text"
                    value={agendaForm.zone}
                    onChange={(e) => setAgendaForm({ ...agendaForm, zone: e.target.value })}
                    placeholder="Stage / Zone..."
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#1E1B4B] text-white text-xs font-semibold hover:bg-indigo-900"
                >
                  Add Session to Agenda
                </button>
              </form>
            </div>

            {/* Right Column: Task & Milestone Management */}
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-indigo-950/10 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                    Execution Checklist ({taskMetrics.pct}% Complete)
                  </span>
                  <h2 className="font-serif text-xl font-bold text-[#1E1B4B]">
                    Tasks, Deadlines & Milestones
                  </h2>
                </div>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
                  {(['All', 'Todo', 'In Progress', 'Completed'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setTaskFilter(st)}
                      className={`px-2 py-1 rounded-lg text-[11px] font-semibold ${
                        taskFilter === st ? 'bg-[#1E1B4B] text-white' : 'text-slate-600'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#4338CA] to-emerald-500 transition-all"
                  style={{ width: `${taskMetrics.pct}%` }}
                />
              </div>

              <div className="space-y-2.5">
                {activeEvent.tasks
                  .filter((t) => taskFilter === 'All' || t.status === taskFilter)
                  .map((tsk) => (
                    <div
                      key={tsk.id}
                      className="p-3.5 rounded-xl bg-[#FAF8F5] border border-slate-200 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={tsk.status === 'Completed'}
                          onChange={() => {
                            updateActiveEvent((evt) => ({
                              ...evt,
                              tasks: evt.tasks.map((item) =>
                                item.id === tsk.id
                                  ? {
                                      ...item,
                                      status: item.status === 'Completed' ? 'Todo' : 'Completed'
                                    }
                                  : item
                              )
                            }));
                          }}
                          className="mt-1 rounded text-indigo-600"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            {tsk.isMilestone && (
                              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                            )}
                            <span
                              className={`text-xs font-bold ${
                                tsk.status === 'Completed'
                                  ? 'line-through text-slate-400'
                                  : 'text-slate-900'
                              }`}
                            >
                              {tsk.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">
                            {tsk.category} • Due: {tsk.dueDate} • Assignee: {tsk.assignee}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          aria-label="Task status"
                          value={tsk.status}
                          onChange={(e) => {
                            const val = e.target.value as TaskItem['status'];
                            updateActiveEvent((evt) => ({
                              ...evt,
                              tasks: evt.tasks.map((item) =>
                                item.id === tsk.id ? { ...item, status: val } : item
                              )
                            }));
                          }}
                          className="text-[11px] px-2 py-1 rounded border border-slate-200 bg-white font-medium"
                        >
                          <option value="Todo">Todo</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                        <button
                          onClick={() => {
                            updateActiveEvent((evt) => ({
                              ...evt,
                              tasks: evt.tasks.filter((i) => i.id !== tsk.id)
                            }));
                          }}
                          aria-label="Delete task"
                          className="text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Add Task Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!taskForm.title.trim()) return;
                  const nextTask: TaskItem = {
                    id: 'tsk-' + Date.now(),
                    title: taskForm.title.trim(),
                    category: taskForm.category,
                    dueDate: taskForm.dueDate,
                    priority: taskForm.priority,
                    status: 'Todo',
                    assignee: taskForm.assignee.trim() || user.name,
                    isMilestone: taskForm.isMilestone
                  };
                  updateActiveEvent((evt) => ({ ...evt, tasks: [...evt.tasks, nextTask] }));
                  setTaskForm({ ...taskForm, title: '' });
                  triggerToast('Added new task to checklist!', 'success');
                }}
                className="pt-4 border-t border-slate-100 space-y-3"
              >
                <p className="text-xs font-bold text-[#1E1B4B]">+ Add Task or Milestone</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                    placeholder="Task description..."
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                  <input
                    type="text"
                    value={taskForm.assignee}
                    onChange={(e) => setTaskForm({ ...taskForm, assignee: e.target.value })}
                    placeholder="Assignee name..."
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 items-center">
                  <input
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                  <select
                    aria-label="Task priority"
                    value={taskForm.priority}
                    onChange={(e) =>
                      setTaskForm({
                        ...taskForm,
                        priority: e.target.value as TaskItem['priority']
                      })
                    }
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={taskForm.isMilestone}
                      onChange={(e) => setTaskForm({ ...taskForm, isMilestone: e.target.checked })}
                      className="rounded text-indigo-600"
                    />
                    <span>Milestone</span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#1E1B4B] text-white text-xs font-semibold hover:bg-indigo-900"
                >
                  Add Task to Checklist
                </button>
              </form>
            </div>
          </div>
        </main>
      )}

      {/* ====================================================================
          PAGE J: EXPORT & SHARING CENTER
      ==================================================================== */}
      {activePage === 'exports' && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-indigo-950/10 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                Production Deliverables & Hand-off
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1B4B] mt-1">
                Export & Share — {activeEvent.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Download your complete event blueprint in standard formats for vendors, finance
                teams, calendar apps, and stakeholders.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <FileText className="w-6 h-6 text-indigo-700" />
                  <h3 className="font-serif font-bold text-base text-[#1E1B4B]">
                    PDF / Printable Event Master Plan
                  </h3>
                  <p className="text-xs text-slate-600">
                    Formatted executive dossier containing overview, phased timeline, vendor specs,
                    budget table, and risk matrix.
                  </p>
                </div>
                <button
                  onClick={handleExportPrintablePDF}
                  className="w-full py-2.5 rounded-xl bg-[#1E1B4B] text-white text-xs font-semibold hover:bg-indigo-900"
                >
                  Print / Save as PDF Dossier
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <FileSpreadsheet className="w-6 h-6 text-emerald-700" />
                  <h3 className="font-serif font-bold text-base text-[#1E1B4B]">
                    CSV Budget Spreadsheet
                  </h3>
                  <p className="text-xs text-slate-600">
                    Itemized expense ledger with categories, vendor names, priorities, payment
                    statuses, and estimated vs. actual totals.
                  </p>
                </div>
                <button
                  onClick={handleExportCSV}
                  className="w-full py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800"
                >
                  Download CSV Budget (.csv)
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <FileJson className="w-6 h-6 text-amber-600" />
                  <h3 className="font-serif font-bold text-base text-[#1E1B4B]">
                    JSON Structured Event Package
                  </h3>
                  <p className="text-xs text-slate-600">
                    Complete machine-readable JSON snapshot of your event plan, venues, agenda
                    slots, and tasks for API or backup use.
                  </p>
                </div>
                <button
                  onClick={handleExportJSON}
                  className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400"
                >
                  Download JSON Data (.json)
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <CalendarPlus className="w-6 h-6 text-purple-700" />
                  <h3 className="font-serif font-bold text-base text-[#1E1B4B]">
                    ICS Calendar Run-of-Show File
                  </h3>
                  <p className="text-xs text-slate-600">
                    Import all {activeEvent.agenda.length} scheduled event agenda slots directly into
                    Google Calendar, Apple Calendar, or Outlook.
                  </p>
                </div>
                <button
                  onClick={handleExportICS}
                  className="w-full py-2.5 rounded-xl bg-purple-700 text-white text-xs font-semibold hover:bg-purple-800"
                >
                  Download Calendar File (.ics)
                </button>
              </div>
            </div>

            {/* Shareable Event Summary Card */}
            <div className="p-5 rounded-2xl bg-[#F3EFFE]/70 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#1E1B4B]">
                  Shareable Stakeholder Summary Brief
                </h3>
                <p className="text-xs text-slate-600">
                  Copy a clean executive summary brief of {activeEvent.title} to share via email,
                  WhatsApp, or Slack.
                </p>
              </div>
              <button
                onClick={copyShareSummary}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1E1B4B] text-white text-xs font-semibold shrink-0"
              >
                <Copy className="w-3.5 h-3.5" /> Copy Summary Brief
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ====================================================================
          PAGE K: FULL-STACK ARCHITECTURE, SUPABASE SQL & DEPLOYMENT BLUEPRINT
      ==================================================================== */}
      {activePage === 'architecture' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-indigo-950/10 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                Full-Stack Engineering Blueprint
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1B4B] mt-1">
                System Architecture, Supabase RLS Schema & Deployment Guide
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                All source files—including the Python Flask REST backend (`app.py`, `gemini_service.py`),
                Supabase SQL schema (`supabase/schema.sql`), `.env.example` templates, and Vercel/Render
                configs—are packaged in the accompanying project archive.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs">
                  <Globe className="w-4 h-4" /> Frontend (Vercel)
                </div>
                <p className="text-xs text-slate-600">
                  Next.js 14 App Router + TypeScript, Tailwind CSS, shadcn/ui, Recharts, React Hook
                  Form + Zod validation.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs">
                  <Server className="w-4 h-4" /> Backend API (Render)
                </div>
                <p className="text-xs text-slate-600">
                  Python Flask 3.0 REST API + Gunicorn + `google-genai` SDK (`gemini-2.5-flash`) with
                  server-side secret storage and labeled Mock fallback.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs">
                  <Database className="w-4 h-4" /> Database & Auth (Supabase)
                </div>
                <p className="text-xs text-slate-600">
                  PostgreSQL tables (`profiles`, `events`, `event_plans`, `expenses`, `venues`,
                  `agenda_items`, `tasks`) protected by Row Level Security (`auth.uid() = user_id`).
                </p>
              </div>
            </div>

            {/* REST API Endpoint Reference */}
            <div className="space-y-3">
              <h2 className="font-serif text-lg font-bold text-[#1E1B4B]">
                Flask Backend REST API Endpoints
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 uppercase">
                      <th className="py-2.5 px-3">Method</th>
                      <th className="py-2.5 px-3">Endpoint</th>
                      <th className="py-2.5 px-3">Purpose & Gemini / Supabase Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">GET</td>
                      <td className="py-2.5 px-3 font-mono">/api/health</td>
                      <td className="py-2.5 px-3">Render health check + reports AI & DB configuration status</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-indigo-700">GET / POST</td>
                      <td className="py-2.5 px-3 font-mono">/api/events</td>
                      <td className="py-2.5 px-3">List or create user events with input validation</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-amber-700">POST</td>
                      <td className="py-2.5 px-3 font-mono">/api/ai/plan</td>
                      <td className="py-2.5 px-3">Generates structured JSON Master Plan via Gemini (`gemini-2.5-flash`)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-amber-700">POST</td>
                      <td className="py-2.5 px-3 font-mono">/api/ai/chat</td>
                      <td className="py-2.5 px-3">Conversational AI planner with clarifying follow-up questions</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-amber-700">POST</td>
                      <td className="py-2.5 px-3 font-mono">/api/ai/optimize-budget</td>
                      <td className="py-2.5 px-3">AI budget optimizer respecting high-priority expense categories</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-purple-700">POST</td>
                      <td className="py-2.5 px-3 font-mono">/api/exports/csv | /api/exports/ics</td>
                      <td className="py-2.5 px-3">Server-side CSV and ICS calendar file stream generators</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ====================================================================
          SHAREABLE EVENT SUMMARY MODAL
      ==================================================================== */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-indigo-950/10">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#1E1B4B]">
                Share Event Summary — {activeEvent.title}
              </h3>
              <button
                onClick={() => setShareModalOpen(false)}
                aria-label="Close share modal"
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-slate-200 text-xs space-y-1.5 text-slate-700">
              <p className="font-bold text-[#1E1B4B] text-sm">{activeEvent.title}</p>
              <p>
                <strong>Type:</strong> {activeEvent.eventType} • <strong>Date:</strong>{' '}
                {activeEvent.date} at {activeEvent.time}
              </p>
              <p>
                <strong>Location:</strong> {activeEvent.location} • <strong>Capacity:</strong>{' '}
                {activeEvent.guestCount} Guests
              </p>
              <p>
                <strong>Total Budget:</strong> {formatINR(activeEvent.totalBudget)} (Actual Committed:{' '}
                {formatINR(budgetMetrics.actualTotal)})
              </p>
              <p className="pt-1 text-slate-600">{activeEvent.masterPlan.overview}</p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={copyShareSummary}
                className="px-4 py-2 rounded-xl bg-[#1E1B4B] text-white text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" /> Copy Summary
              </button>
              <button
                onClick={() => setShareModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          BACKEND & GEMINI MODE CONFIGURATION MODAL
      ==================================================================== */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-indigo-950/10">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#1E1B4B]">
                AI & Backend Environment Settings
              </h3>
              <button
                onClick={() => setShowConfigModal(false)}
                aria-label="Close settings modal"
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              In compliance with security best practices, Google Gemini API keys are stored strictly
              in backend environment variables (`backend/.env`). When running inside this browser
              sandbox without a live Flask server, EventPilot AI runs in clearly labeled{' '}
              <strong>Interactive Demo/Mock AI Mode</strong>.
            </p>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Flask Backend URL (`NEXT_PUBLIC_API_URL`)
                </label>
                <input
                  type="text"
                  value={backendConfig.flaskApiUrl}
                  onChange={(e) =>
                    setBackendConfig({ ...backendConfig, flaskApiUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Supabase Project URL (`NEXT_PUBLIC_SUPABASE_URL`)
                </label>
                <input
                  type="text"
                  value={backendConfig.supabaseUrl}
                  onChange={(e) =>
                    setBackendConfig({ ...backendConfig, supabaseUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>
              <label className="flex items-center gap-2 pt-1 font-medium text-slate-800">
                <input
                  type="checkbox"
                  checked={backendConfig.useLiveBackend}
                  onChange={(e) =>
                    setBackendConfig({ ...backendConfig, useLiveBackend: e.target.checked })
                  }
                  className="rounded text-indigo-600"
                />
                <span>Attempt live Flask REST API calls before falling back to Demo Mode</span>
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setShowConfigModal(false);
                  triggerToast('Saved runtime connection preferences.', 'success');
                }}
                className="px-4 py-2 rounded-xl bg-[#1E1B4B] text-white text-xs font-semibold"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Polished Footer */}
      <footer className="border-t border-indigo-950/10 bg-white/80 py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-700" />
            <span className="font-serif font-bold text-[#1E1B4B]">EventPilot AI</span>
            <span>— Your Event. Your Vision. Perfectly Planned.</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setActivePage('dashboard')} className="hover:text-indigo-800">
              Dashboard
            </button>
            <button onClick={() => setActivePage('wizard')} className="hover:text-indigo-800">
              Event Wizard
            </button>
            <button onClick={() => setActivePage('ai-chat')} className="hover:text-indigo-800">
              AI Planner
            </button>
            <button onClick={() => setActivePage('architecture')} className="hover:text-indigo-800">
              SQL & Deployment Docs
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
