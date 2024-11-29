// Dashboard general stats
export const generalStats = [
  {
    icon: '../../../../../assets/users.svg',
    name: 'Total Projects',
    number: 12450,
    percentage: 15.8,
    type: 'increase',
  },
  {
    icon: '../../../../../assets/services.svg',
    name: 'Total Services',
    number: 10450,
    percentage: 19.9,
    type: 'increase',
  },
  {
    icon: '../../../../../assets/appointments.svg',
    name: 'Completed Bookings',
    number: 9450,
    percentage: 6.5,
    type: 'decrease',
  },
  {
    icon: '../../../../../assets/revenue.svg',
    name: 'Total Revenue',
    number: 363.95,
    percentage: 36.5,
    type: 'decrease',
  },
];

export const adminGeneralStats = [
  {
    icon: '../../../../../assets/users.svg',
    name: 'Total Users',
    number: 12450,
    percentage: 15.8,
    type: 'increase',
  },
  {
    icon: '../../../../../assets/users.svg',
    name: 'Service Providers',
    number: 10450,
    percentage: 19.9,
    type: 'increase',
  },
  {
    icon: '../../../../../assets/appointments.svg',
    name: 'Completed Bookings',
    number: 9450,
    percentage: 6.5,
    type: 'decrease',
  },
  {
    icon: '../../../../../assets/revenue.svg',
    name: 'Total Revenue',
    number: 363.95,
    percentage: 36.5,
    type: 'decrease',
  },
];

// Quote Requests Data
export const quoteRequests = {
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  datasets: [
    {
      label: 'Quote Requests',
      data: [100, 200, 250, 150, 150, 225, 75, 125, 125, 200, 175, 75],
      backgroundColor: ['rgba(224, 242, 254, 1)'],
      hoverBackgroundColor: ['rgba(64, 142, 253, 1)'],
    },
  ],
};

export const quoteRequestsOptions = {
  plugins: {
    legend: {
      display: false,
      labels: {
        color: 'rgba(37, 44, 50, 1)',
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: 'rgba(119, 135, 143, 1)',
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
    x: {
      ticks: {
        color: 'rgba(119, 135, 143, 1)',
      },
      grid: {
        // color: 'none',
        display: false,
        drawBorder: false,
      },
    },
  },
};

export const quoteDataInterval = [
  { name: 'Quarterly' },
  { name: 'Monthly' },
  { name: 'Annually' },
];

// Earnings Data
export const earnings = {
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  datasets: [
    {
      label: 'First Dataset',
      data: [
        343900, 273876, 366019, 4152, 272774, 174694, 363146, 174710, 362970,
        70505, 7419, 359507,
      ],

      fill: false,
      borderColor: 'rgba(64, 142, 253, 1)',
      backgroundColor: 'rgba(64, 142, 253, 0.16)',
      tension: 0.4,
    },
  ],
};

export const earningsOptions = {
  maintainAspectRatio: false,
  aspectRatio: 0.6,
  plugins: {
    legend: {
      display: false,
      labels: {
        color: 'rgba(37, 44, 50, 1)',
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: 'rgba(119, 135, 143, 1)',
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
    y: {
      min: 0, // Set minimum value
      max: 400000, // Set maximum value
      ticks: {
        stepSize: 100000, // Set step size
        color: 'rgba(119, 135, 143, 1)',
        callback: (value: number) => `$${value / 1000}K`, // Format as currency
      },
      grid: {
        drawBorder: false,
      },
    },
  },
};

export const months = [
  { name: 'January' },
  { name: 'February' },
  { name: 'March' },
  { name: 'April' },
  { name: 'May' },
  { name: 'June' },
  { name: 'July' },
  { name: 'August' },
  { name: 'September' },
  { name: 'October' },
  { name: 'November' },
  { name: 'December' },
];

// Popular Services Data
export const popularServices = {
  labels: ['Painting', 'Appliance Fixing', 'Plumbing', 'Cleaning'],
  datasets: [
    {
      data: [300, 50, 100, 200],
      backgroundColor: [
        'rgba(64, 142, 253, 0.8)',
        'rgba(148, 186, 239, 0.8)',
        'rgba(200, 217, 242, 0.8)',
        'rgba(227, 236, 249, 0.8)',
      ],
      hoverBackgroundColor: [
        'rgba(64, 142, 253, 1)',
        'rgba(148, 186, 239, 1)',
        'rgba(200, 217, 242, 1)',
        'rgba(227, 236, 249, 1)',
      ],
    },
  ],
};

export const popularServicesOptions = {
  cutout: '60%',
  plugins: {
    legend: {
      display: false,
      labels: {
        color: 'rgba(37, 44, 50, 1)',
      },
    },
  },
};

export const popularSerivcesDataInterval = [
  { name: 'Quarterly' },
  { name: 'Monthly' },
  { name: 'Annually' },
];

// Quote Requests
export const quotes = [
  {
    clientName: 'Missy Cooper',
    requirements: 'Responsive design, e-commerce integration, CMS setup',
    email: 'VYmO1@example.com',
    dateTime: '2024-11-08T10:30:00',
  },
  {
    clientName: 'Isabella Hill',
    requirements: 'SEO optimization, social media management, ad campaigns',
    email: 'VYmO1@example.com',
    dateTime: '2024-11-09T14:00:00',
  },
  {
    clientName: 'Joshua Young',
    requirements: 'Logo design, branding, promotional materials',
    email: 'VYmO1@example.com',
    dateTime: '2024-11-10T09:15:00',
  },
  {
    clientName: 'Sophia Turner',
    requirements:
      'iOS and Android support, user authentication, payment gateway',
      email: 'VYmO1@example.com',
    dateTime: '2024-11-11T13:45:00',
  },
  {
    clientName: 'Andrew Lewis',
    requirements: 'Blog posts, website copy, product descriptions',
    email: 'VYmO1@example.com',
    dateTime: '2024-11-12T11:20:00',
  },
  {
    clientName: 'Hannah Hall',
    requirements: 'Promotional video, scriptwriting, voice-over',
    email: 'VYmO1@example.com',
    dateTime: '2024-11-13T16:30:00',
  },
  {
    clientName: 'Matthew Clark',
    requirements: 'Network setup, troubleshooting, software installation',
    email: 'VYmO1@example.com',
    dateTime: '2024-11-14T08:00:00',
  },
  {
    clientName: 'Olivia Davis',
    requirements: 'Vulnerability assessment, firewall setup, training',
    email: 'VYmO1@example.com',
    dateTime: '2024-11-15T17:45:00',
  },
  {
    clientName: 'Christopher Harris',
    requirements: 'Cloud migration, data backup, SaaS setup',
    email: 'VYmO1@example.com',
    dateTime: '2024-11-16T14:30:00',
  },
  {
    clientName: 'Ashley White',
    requirements: 'Market research, feasibility analysis, strategic planning',
    dateTime: '2024-11-17T15:00:00',
  },
  {
    clientName: 'James Robinson',
    requirements: 'Responsive layout, modern design, SEO optimized',
    email: 'VYmO1@example.com',
    dateTime: 'September 19, 2021',
  },
  {
    clientName: 'Amanda Garcia',
    requirements:
      'iOS and Android versions, user authentication, in-app payments',
      email: 'VYmO1@example.com',
    dateTime: 'October 5, 2021',
  },
  {
    clientName: 'Daniel Walker',
    requirements: 'Social media management, email marketing, analytics setup',
    email: 'VYmO1@example.com',
    dateTime: 'November 12, 2021',
  },
  {
    clientName: 'Jessica Lee',
    requirements: 'Logo design, brand identity, and social media graphics',
    email: 'VYmO1@example.com',
    dateTime: 'December 8, 2021',
  },
  {
    clientName: 'David Martinez',
    requirements: 'Blog posts, SEO-focused articles, and website content',
    email: 'VYmO1@example.com',
    dateTime: 'January 23, 2022',
  },
  {
    clientName: 'Emily Johnson',
    requirements: 'Product videos, animations, and editing',
    email: 'VYmO1@example.com',
    dateTime: 'February 15, 2022',
  },
  {
    clientName: 'Michael Rodriguez',
    requirements: 'On-page SEO, backlink building, keyword research',
    email: 'VYmO1@example.com',
    dateTime: 'March 4, 2022',
  },
  {
    clientName: 'Sarah Thompson',
    requirements: 'Payment gateway integration, product pages, shopping cart',
    email: 'VYmO1@example.com',
    dateTime: 'April 10, 2022',
  },
  {
    clientName: 'William Anderson',
    requirements: 'Network setup, troubleshooting, and server maintenance',
    email: 'VYmO1@example.com',
    dateTime: 'May 18, 2022',
  },
  {
    clientName: 'Kwasi Amponsah',
    requirements: 'Product photography, editing, and image retouching',
    email: 'VYmO1@example.com',
    dateTime: 'June 30, 2022',
  },
];

export const services = [
  {
    serviceName: 'Website Development',
    description: 'Responsive design, e-commerce integration, CMS setup',
    pricing: 'GHC 500',
  },
  {
    serviceName: 'Digital Marketing',
    description: 'SEO optimization, social media management, ad campaigns',
    pricing: 'GHC 1000',
  },
  {
    serviceName: 'Graphic Design',
    description: 'Logo design, branding, promotional materials',
    pricing: 'GHC 700',
  },
  {
    serviceName: 'Mobile App Development',
    description:
      'iOS and Android versions, user authentication, in-app payments',
    pricing: 'GHC 1200',
  },
  {
    serviceName: 'Content Writing',
    description: 'Blog posts, SEO-focused articles, and website content',
    pricing: 'GHC 300',
  },
  {
    serviceName: 'Video Production',
    description: 'Product videos, animations, and editing',
    pricing: 'GHC 800',
  },
  {
    serviceName: 'SEO Optimization',
    description: 'On-page SEO, backlink building, keyword research',
    pricing: 'GHC 400',
  },
  {
    serviceName: 'E-commerce Development',
    description: 'Payment gateway integration, product pages, shopping cart',
    pricing: 'GHC 600',
  },
];

export const accountPreferences = [
  { name: 'MTN Mobile Money' },
  { name: 'AirtelTigo Cash' },
  { name: 'T-Cash' },
  { name: 'PayPal' },
  { name: 'Bank Transfer' },
];



export const serviceCategories = [
  { name: 'Painting' },
  { name: 'Cleaning' },
  { name: 'Plumbing' },
  { name: 'Painting' },
];

export const bookingDays = [
  { name: 'Sunday' },
  { name: 'Monday' },
  { name: 'Tuesday' },
  { name: 'Wednesday' },
  { name: 'Thursday' },
  { name: 'Friday' },
  { name: 'Saturday' },
];


export const reviews = [
  {
    reviewerName: 'John Doe',
    providerName: 'Ama Yawson',
    message: 'Great service, I will definitely use this service again!',
    ratings: 5,
  },
  {
    reviewerName: 'Jane Smith',
    providerName: 'Kojo Mensah',
    message: 'Quick response time and very professional.',
    ratings: 4,
  },
  {
    reviewerName: 'Michael Brown',
    providerName: 'Kwame Agyeman',
    message: 'Satisfactory service, but there is room for improvement.',
    ratings: 3,
  },
  {
    reviewerName: 'Emily Davis',
    providerName: 'Efua Asantewaa',
    message: 'Excellent experience! Highly recommended.',
    ratings: 5,
  },
  {
    reviewerName: 'Daniel Wilson',
    providerName: 'Yaw Kofi',
    message: 'Affordable and efficient. I’m really impressed!',
    ratings: 4,
  },
  {
    reviewerName: 'Sophia Taylor',
    providerName: 'Adwoa Sarfo',
    message: 'The service was good, but it took longer than expected.',
    ratings: 3,
  },
  {
    reviewerName: 'Liam Johnson',
    providerName: 'Esi Oforiwaa',
    message: 'Absolutely amazing! Exceeded my expectations.',
    ratings: 5,
  },
  {
    reviewerName: 'Olivia Anderson',
    providerName: 'Kweku Baah',
    message: 'Fairly decent service for the price paid.',
    ratings: 3,
  },
  {
    reviewerName: 'William Martinez',
    providerName: 'Ama Agyapong',
    message: 'The provider was friendly and very helpful.',
    ratings: 4,
  },
  {
    reviewerName: 'Isabella White',
    providerName: 'Kojo Antwi',
    message: 'Fantastic! I’ll definitely recommend to my friends.',
    ratings: 5,
  },
];
