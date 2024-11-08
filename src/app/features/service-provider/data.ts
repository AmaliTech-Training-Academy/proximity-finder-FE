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

// Earnings Data
export const earnings = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgba(64, 142, 253, 1)',
      tension: 0.4,
    },
  ],
};

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
