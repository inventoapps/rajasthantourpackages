'use client';

import { useEffect, useRef, useState } from 'react';
import EnquiryDialog from '@/components/shared/EnquiryDialog';

const POPUP_DELAY_MS = 15000;

export default function GlobalEnquiryPopup() {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => setOpen(true), POPUP_DELAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return <EnquiryDialog open={open} onOpenChange={setOpen} />;
}

