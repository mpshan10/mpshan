export const profile = {
  name: 'Myat Phone Swe Han',
  headline: ['Ideas into', 'interfaces.'],
  intro: 'A portfolio for digital projects, experiments, and the thinking behind them.',
  bio: 'I am Myat Phone Swe Han, a third-year student at the University of Information Technology. Through academic and team projects, I apply my studies to practical software development, including leading the development of Bliss & Beyond for our Enterprise Application Development course.',
  photo: '',
  photoAlt: '',
  email: 'myatphoneswehan@gmail.com',
  links: [
    { label: 'GitHub · mpshan10', url: 'https://github.com/mpshan10' },
  ],
};

export const certificates = [
  {
    title: 'ITPEC Information Technology Passport Examination certificate',
    image: '/certificates/itpec-it-passport.png',
    url: '/certificates/itpec-it-passport.png',
  },
  {
    title: 'NASA Space Apps Challenge 2026 participation certificate',
    image: '/certificates/nasa-space-apps-2026.jpeg',
    url: '/certificates/nasa-space-apps-2026.jpeg',
  },
  {
    title: 'Cursor AI Hackathon Myanmar 2026 participation certificate',
    image: '/certificates/cursor-hackathon-2026.png',
    url: '/certificates/cursor-hackathon-2026.png',
  },
  {
    title: 'Into the AI Ocean: From Idea to Product Buildathon 2026 certificate of appreciation',
    image: '/certificates/uxmm.png',
    url: '/certificates/uxmm.pdf',
  },
];
export const achievements = [
  {
    title: 'AI Ocean Award Winner 2026 · CoralCode · Shay Sett',
    image: '/achievements/ai-ocean-winner.png',
    url: '/achievements/ai-ocean-winner.png',
  },
  {
    title: 'Best Pitch 2026 · CoralCode · Shay Sett',
    image: '/achievements/ai-ocean-best-pitch.png',
    url: '/achievements/ai-ocean-best-pitch.png',
  },
];

export const projects = [
  {
    id: 'bliss-beyond',
    title: 'Bliss & Beyond',
    category: 'Events & catering website',
    description: 'An event planning application that integrates venue discovery, package comparison, and booking initiation.',
    details: 'Bliss & Beyond brings the decisions involved in planning a celebration into one place. Customers can choose a ready-made package or customize their event around a venue and selected services. The application supports booking management, quotations, payment workflows, and dedicated customer and administrator functions.',
    context: 'I served as team leader in the development of Bliss & Beyond, a Java-based application created as part of our Enterprise Application Development course. This collaborative project applied the concepts covered in the course to an event planning system that integrates venue selection, catering packages, and booking management.',
    features: [
      { title: 'Browse packages and venues', text: 'Explore curated event packages, venue options, and services such as catering, décor, and coordination.' },
      { title: 'Plan around the event', text: 'The booking flow asks for a date, time, and guest count before visitors review their choices.' },
      { title: 'Follow the booking', text: 'A customer portal illustrates where visitors would find quotations and track their booking.' },
    ],
    tags: ['Full-stack development', 'Event management', 'Venue booking', 'Catering customization', 'Quotation management', 'Payment workflows', 'Role-based access', 'REST API'],
    technologies: ['React', 'TypeScript', 'HTML', 'CSS', 'JavaScript', 'Bootstrap 5', 'Java 21', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'MySQL'],
    image: '/images/bliss-beyond.jpg',
    imageAlt: 'A candlelit banquet hall with long tables and floral arrangements',
    demo: 'https://bliss-beyond.vercel.app/',
    source: 'https://github.com/mpshan10/BlissBeyond',
  },
  {
    id: 'shay-sett',
    title: 'Shay Sett',
    category: 'Business financial insights',
    description: 'A financial insights application that transforms Excel business records into cash-flow analysis, working-capital insights, and credit-readiness assessments.',
    details: 'Shay Sett helps business owners understand their financial position through a connected workspace. Users import Excel records and review financial health, working capital, and credit information through dedicated dashboards. AI-assisted analysis explains aggregate findings, while authenticated workspaces keep each business’s records separate.',
    context: 'I developed Shay Sett with team CoralCode for the Into the AI Ocean: From Idea to Product Buildathon 2026. Our project received the AI Ocean Award and Best Pitch recognition.',
    features: [
      { title: 'Import business records', text: 'Download a business workbook, upload completed Excel records, and validate the data before importing it into a workspace.' },
      { title: 'Understand financial health', text: 'Review cash flow, working capital, and credit information through financial dashboards based on the imported records.' },
      { title: 'Explore AI-assisted findings', text: 'Request explanations of aggregate financial findings, with rules-based analysis available when AI wording is unavailable.' },
    ],
    tags: ['Full-stack development', 'Financial dashboards', 'Excel integration', 'Cash-flow analysis', 'Working capital', 'AI-assisted insights', 'Business workspaces', 'Award-winning project'],
    technologies: ['React', 'TypeScript', 'TanStack Start', 'Tailwind CSS', 'Python', 'FastAPI', 'SQLAlchemy', 'Supabase', 'PostgreSQL', 'openpyxl'],
    image: '/images/shay-sett.png',
    imageAlt: 'Shay Sett project presentation cover with its orange arrow logo and Team AI04 CoralCode name',
    demo: 'https://shaysett-team4.vercel.app/',
    source: 'https://github.com/AI-Ocean-UXMM-2026/Team-4',
  },
  {
    id: 'ignis',
    title: 'IGNIS',
    category: 'Microgravity combustion research',
    description: 'An evidence-based research application that connects spacecraft fire scenarios with verified NASA microgravity combustion experiments.',
    details: 'IGNIS helps users explore NASA combustion research by describing a spacecraft fire scenario in mission terms. It retrieves relevant verified experiments, presents source quotations and report locations, and identifies gaps where the catalog does not contain matching evidence. Its briefing workflow checks generated claims against the recorded source values.',
    context: 'I participated in NASA Space Apps Challenge 2026 with Team AstroFlare on IGNIS, developed for the Flame in Freefall challenge. The project explores how verified microgravity combustion research can inform the study of fire safety in human spaceflight.',
    features: [
      { title: 'Describe a mission scenario', text: 'Translate a natural-language spacecraft fire scenario into structured criteria for searching the experiment catalog.' },
      { title: 'Trace findings to NASA sources', text: 'Explore human-reviewed experiment records with source quotations, report links, and page or figure references where available.' },
      { title: 'Review evidence coverage', text: 'Read evidence-linked briefings, inspect unsupported claims, and export published catalog records for further research.' },
    ],
    tags: ['NASA Space Apps', 'Research application', 'Evidence retrieval', 'Microgravity combustion', 'AI-assisted briefings', 'Claim validation', 'Data provenance', 'Team collaboration'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Supabase', 'PostgreSQL', 'Zod', 'Vercel Functions'],
    image: '/images/ignis.png',
    imageAlt: 'IGNIS flame logo and title on the project’s dark navy cover',
    demo: 'https://ignis-nasa-2026.vercel.app/',
    source: 'https://github.com/Harry-Pyae/IGNIS-NASA-2026',
  },
  {
    id: 'cyclelink',
    title: 'CycleLink MM',
    category: 'Circular B2B marketplace',
    description: 'A circular marketplace connecting Myanmar businesses with surplus materials and reusable production inputs.',
    details: 'CycleLink MM connects businesses that have surplus inventory with businesses seeking affordable materials. Public listings organize materials into industrial categories, while wanted requests help businesses communicate their needs. The platform also presents material and estimated environmental impact information.',
    features: [
      { title: 'Discover reusable materials', text: 'Browse surplus listings across categories such as textiles, plastics, metal, wood, and construction materials, with material and city filters.' },
      { title: 'Connect supply with demand', text: 'Businesses can register, list surplus inventory, post wanted materials, and send inquiries about available resources.' },
      { title: 'Explore circular impact', text: 'An impact page summarizes listed material quantities and provides an estimated CO₂e measure to illustrate resource reuse.' },
    ],
    tags: ['Circular economy', 'B2B marketplace', 'Material reuse', 'Surplus inventory', 'Business inquiries', 'Impact estimates'],
    image: '/images/cyclelink.jpg',
    imageAlt: 'CycleLink MM homepage with its green warehouse backdrop and Waste Less. Reuse more. heading',
    demo: 'https://cyclelink-mm.netlify.app/',
  },
  {
    id: 'pixelpop',
    title: 'PixelPop Studio',
    category: 'Browser photobooth',
    description: 'A browser-based photobooth for capturing photos, customizing layouts and frames, and downloading creative photo compositions.',
    details: 'PixelPop Studio combines webcam capture with photo customization in the browser. Users can select layouts, apply filters and borders, and create framed compositions using Canvas. The interface also includes printing, QR-code sharing, and account-gated gallery controls.',
    features: [
      { title: 'Capture in the browser', text: 'Use the webcam with a countdown timer and arrange captured photos into a selected layout.' },
      { title: 'Personalize each composition', text: 'Choose filters, borders, and themed frames to customize a photo composition using browser Canvas rendering.' },
      { title: 'Save and share', text: 'Explore download, print, QR-code, and gallery controls, with saving actions gated by sign-in.' },
    ],
    tags: ['Webcam capture', 'Photo editing', 'Canvas rendering', 'Custom frames', 'Image downloads', 'QR-code sharing'],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Canvas API', 'MediaDevices API', 'Node.js', 'Express'],
    image: '/images/pixelpop.png',
    imageAlt: 'PixelPop pink camera illustration and wordmark',
    source: 'https://github.com/cigarePhyoPyaePyaeKhaing/pixelpop-server',
  },
];

