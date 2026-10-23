/**
 * Adsterra High-CPM Smart Links & Monetization Service
 * User configured smart links for maximum CPM and global revenue.
 */

export const ADSTERRA_CONFIG = {
  smartLinks: [
    {
      id: 'smart1',
      name: 'High-Speed 4K Cloud Download (Server 1)',
      url: 'https://www.profitableratecpmnetwork.com/hr65xsh7?key=dc01c1237bd130c5ef9bcfef4f0928ed',
      badge: 'Highest CPM',
      cpmRate: '$8.50'
    },
    {
      id: 'smart2',
      name: 'VIP Buffer-Free Direct Stream Mirror (Server 2)',
      url: 'https://www.profitableratecpmnetwork.com/sa8mca36sv?key=3711015d24018cf89ccb362976c4a2e0',
      badge: 'Ultra Fast',
      cpmRate: '$7.80'
    },
    {
      id: 'smart3',
      name: 'Premium 1080p/4K Direct Mega Link (Server 3)',
      url: 'https://www.profitableratecpmnetwork.com/x0wcj4zk?key=c2b46070b44982014166acafd6074c3d',
      badge: 'Instant Access',
      cpmRate: '$9.20'
    }
  ],
  /**
   * Helper to trigger smartlink in background / new tab
   */
  openSmartLink: (index: number = 0) => {
    const link = ADSTERRA_CONFIG.smartLinks[index % ADSTERRA_CONFIG.smartLinks.length];
    if (link && typeof window !== 'undefined') {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    }
  }
};
