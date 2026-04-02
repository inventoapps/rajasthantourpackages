'use client';

import { useState } from 'react';
import PackageCard from '@/components/shared/PackageCard';
import EnquiryDialog from '@/components/shared/EnquiryDialog';

export default function PackageCardsGridWithEnquiry({ packages = [], gridClassName = 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6' }) {
  const [enquiryPkg, setEnquiryPkg] = useState(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const openEnquiry = (pkg) => {
    setEnquiryPkg(pkg);
    setIsEnquiryOpen(true);
  };

  return (
    <>
      <div className={gridClassName}>
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} onEnquire={openEnquiry} />
        ))}
      </div>
      <EnquiryDialog
        open={isEnquiryOpen}
        onOpenChange={(open) => {
          setIsEnquiryOpen(open);
          if (!open) setEnquiryPkg(null);
        }}
        packageId={enquiryPkg?.id}
        packageTitle={enquiryPkg?.title}
      />
    </>
  );
}

