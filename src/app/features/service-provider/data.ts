// Dashboard general stats
export const generalStats = [
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
    icon: '../../../../../assets/bookings.svg',
    name: 'Completed Bookings',
    number: 9450,
    percentage: 6.5,
    type: 'decrease',
  },
  {
    icon: '../../../../../assets/revenue.svg',
    name: 'Revenue',
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
    serviceName: 'Website Development',
    requirements: 'Responsive design, e-commerce integration, CMS setup',
    dateTime: '2024-11-08T10:30:00',
  },
  {
    serviceName: 'Digital Marketing',
    requirements: 'SEO optimization, social media management, ad campaigns',
    dateTime: '2024-11-09T14:00:00',
  },
  {
    serviceName: 'Graphic Design',
    requirements: 'Logo design, branding, promotional materials',
    dateTime: '2024-11-10T09:15:00',
  },
  {
    serviceName: 'Mobile App Development',
    requirements:
      'iOS and Android support, user authentication, payment gateway',
    dateTime: '2024-11-11T13:45:00',
  },
  {
    serviceName: 'Content Writing',
    requirements: 'Blog posts, website copy, product descriptions',
    dateTime: '2024-11-12T11:20:00',
  },
  {
    serviceName: 'Video Production',
    requirements: 'Promotional video, scriptwriting, voice-over',
    dateTime: '2024-11-13T16:30:00',
  },
  {
    serviceName: 'IT Support',
    requirements: 'Network setup, troubleshooting, software installation',
    dateTime: '2024-11-14T08:00:00',
  },
  {
    serviceName: 'Cybersecurity',
    requirements: 'Vulnerability assessment, firewall setup, training',
    dateTime: '2024-11-15T17:45:00',
  },
  {
    serviceName: 'Cloud Services',
    requirements: 'Cloud migration, data backup, SaaS setup',
    dateTime: '2024-11-16T14:30:00',
  },
  {
    serviceName: 'Consulting',
    requirements: 'Market research, feasibility analysis, strategic planning',
    dateTime: '2024-11-17T15:00:00',
  },
];
