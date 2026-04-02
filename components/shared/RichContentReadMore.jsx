'use client';

import { useState } from 'react';

export default function RichContentReadMore({
  html = '',
  contentClassName = '',
  buttonClassName = 'mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-800',
}) {
  const [expanded, setExpanded] = useState(false);

  if (!html) return null;

  return (
    <div className="mt-4">
      <div className="relative">
        <div
          className={`rich-readmore-body ${expanded ? '' : 'is-collapsed'} ${contentClassName}`.trim()}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {!expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className={buttonClassName}
      >
        {expanded ? 'Read less' : 'Read more'}
      </button>
    </div>
  );
}

