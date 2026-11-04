// Name, role and links shown across the site.

export const PROFILE = {
  name: 'Kazuki Toma',
  role: ['Ph.D. Student at Texas A&M University', 'Aerospace Engineering'],
  email: 'kazengtoma@tamu.edu',
  phone: '+1-979-326-3668',
  linkedin: 'https://www.linkedin.com/in/toma-kazuki/',
  researchgate: 'https://www.researchgate.net/profile/Kazuki-Toma',
  // Replace with your Scholar profile URL once you have one to link.
  scholar: 'https://scholar.google.com/citations?view_op=search_authors&mauthors=Kazuki+Toma',
};

export const SOCIALS = [
  { icon: 'linkedin', label: 'LinkedIn', href: PROFILE.linkedin },
  { icon: 'github', label: 'Github', href: 'https://github.com/toma-kazuki' },
  { icon: 'mail', label: 'Email', href: `mailto:${PROFILE.email}` },
  { icon: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100006443952588' },
  { icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/tu_ma.guitar/' },
  { icon: 'scholar', label: 'Google Scholar', href: PROFILE.scholar },
];
