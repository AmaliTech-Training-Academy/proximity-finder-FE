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

//Call Requests
export const calls = [
  {
    clientName: 'Missy Cooper',
    phoneNumber: '(234) 567-8910',
    email: 'VYmO1@example.com',
    status: 'pending',
  },
  {
    clientName: 'Isabella Hill',
    phoneNumber: '(234) 567-8910',
    email: 'VYmO1@example.com',
    status: 'completed',
  },
  {
    clientName: 'Missy Cooper',
    phoneNumber: '(234) 567-8910',
    email: 'VYmO1@example.com',
    status: 'pending',
  },
  {
    clientName: 'Missy Cooper',
    phoneNumber: '(234) 567-8910',
    email: 'VYmO1@example.com',
    status: 'pending',
  },
  {
    clientName: 'Missy Cooper',
    phoneNumber: '(234) 567-8910',
    email: 'VYmO1@example.com',
    status: 'pending',
  },
  {
    clientName: 'Missy Cooper',
    phoneNumber: '(234) 567-8910',
    email: 'VYmO1@example.com',
    status: 'completed',
  },
  {
    clientName: 'Missy Cooper',
    phoneNumber: '(234) 567-8910',
    email: 'VYmO1@example.com',
    status: 'completed',
  },
  {
    clientName: 'Missy Cooper',
    phoneNumber: '(234) 567-8910',
    email: 'VYmO1@example.com',
    status: 'pending',
  },
  {
    clientName: 'Missy Cooper',
    phoneNumber: '(234) 567-8910',
    email: 'VYmO1@example.com',
    status: 'pending',
  },
  {
    clientName: 'Missy Cooper',
    phoneNumber: '(234) 567-8910',
    email: 'VYmO1@example.com',
    status: 'pending',
  },
  {
    clientName: 'Missy Cooper',
    phoneNumber: '(234) 567-8910',
    email: 'VYmO1@example.com',
    status: 'pending',
  },
  {
    clientName: 'Missy Cooper',
    phoneNumber: '(234) 567-8910',
    email: 'VYmO1@example.com',
    status: 'pending',
  },
  {
    clientName: 'Missy Cooper',
    phoneNumber: '(234) 567-8910',
    email: 'VYmO1@example.com',
    status: 'pending',
  },
  {
    clientName: 'Missy Cooper',
    phoneNumber: '(234) 567-8910',
    email: 'VYmO1@example.com',
    status: 'pending',
  },
  {
    clientName: 'Missy Cooper',
    phoneNumber: '(234) 567-8910',
    email: 'VYmO1@example.com',
    status: 'pending',
  },
  {
    clientName: 'Missy Cooper',
    phoneNumber: '(234) 567-8910',
    email: 'VYmO1@example.com',
    status: 'pending',
  },
  {
    clientName: 'Missy Cooper',
    phoneNumber: '(234) 567-8910',
    email: 'VYmO1@example.com',
    status: 'pending',
  },
  {
    clientName: 'Missy Cooper',
    phoneNumber: '(234) 567-8910',
    email: 'VYmO1@example.com',
    status: 'pending',
  },
  {
    clientName: 'Missy Cooper',
    phoneNumber: '(234) 567-8910',
    email: 'VYmO1@example.com',
    location: 'Kumasi',
  },
  {
    clientName: 'Missy Cooper',
    phoneNumber: '(234) 567-8910',
    email: 'VYmO1@example.com',
    status: 'pending',
  },
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
    reviewerName: 'Spencer James',
    reviewerImage: 'assets/images/core.png',
    reason: 'This app is a lifesaver! I needed an electrician urgently, and within 15 minutes, someone was at my door. The interface is user-friendly, and I love the real-time tracking feature. Highly recommend it to anyone who values convenience!',
    ratings: 5,
  },
  {
    reviewerName: 'Jane Smith',
    reviewerImage: 'assets/images/occupation.png',
    reason: 'I can’t imagine my life without this app. From plumbers to tutors, I’ve found reliable professionals every time. The reviews from other users help me make confident choices. It’s like having a trusted local guide in my pocket.',
    ratings: 4,
  },
  {
    reviewerName: 'Michael Brown',
    reviewerImage: 'assets/images/luna.jpg',
    reason: 'Great service overall! The app is intuitive, and I found a dog walker within 10 minutes. My only suggestion would be to add more payment options. Otherwise, everything else works seamlessly.',
    ratings: 3,
  },
  {
    reviewerName: 'Emily Davis',
    reviewerImage: 'assets/images/max.jpg',
    reason: 'I run a small business and often need last-minute help. This app has connected me with skilled professionals in minutes. The support team is also very responsive, which adds to the great experience.',
    ratings: 5,
  },
  {
    reviewerName: 'Daniel Wilson',
    reviewerImage: 'assets/images/brownbag.jpg',
    reason: 'Amazing app! The ratings and reviews for service providers are accurate, and I’ve never had a bad experience. The added feature of scheduling appointments ahead of time is a big plus.',
    ratings: 4,
  },
  {
    reviewerName: 'Sophia Taylor',
    reviewerImage: 'assets/images/heels.jpg',
    reason: 'I needed a reliable babysitter, and this app delivered! I loved how I could see certifications and past reviews for each candidate. It made me feel secure in my choice. Excellent service!',
    ratings: 3,
  },
  {
    reviewerName: 'Liam Johnson',
    reviewerImage: 'assets/images/buddy.jpg',
    reason: 'The app is fantastic for finding local services. I booked a cleaning service last week, and they did a great job. The only downside is that some providers are slightly pricey, but the quality makes up for it.',
    ratings: 5,
  },
  {
    reviewerName: 'Olivia Anderson',
    reviewerImage: 'assets/images/default-avatar.png',
    reason: 'Super efficient and reliable! I’ve used this app multiple times for home repairs, and it never disappoints. The booking process is smooth, and I appreciate the follow-up notifications.',
    ratings: 3,
  },
  {
    reviewerName: 'William Martinez',
    reviewerImage: 'assets/images/charlie.jpg',
    reason: 'This app helped me find a yoga instructor nearby, and I couldn’t be happier! The filters for narrowing down specific needs are incredibly helpful. 10/10 would recommend.',
    ratings: 4,
  }
];

export const linkedAccounts = [
  {
    name: 'American Express',
  },
  {
    name: 'Fidelity Bank - EUR',
  },
  {
    name: 'MTN Mobile Money',
  },
  {
    name: 'Stanbic Bank',
  },
];


