'use client';

import React from 'react';
import { publicImageUrl } from '@/src/lib/supabase';

export const mdxComponents = {
  img: (props: any) => {
    const src: string | undefined = props?.src;
    const finalSrc = !src ? '' : src.startsWith('http') ? src : publicImageUrl(src);
    // Keep rounding/shadow consistent with site
    return <img {...props} src={finalSrc} className={`my-6 rounded-2xl shadow ${props.className ?? ''}`} />;
  },
  h2: (props: any) => (
    <h2 {...props} className={`text-2xl font-semibold mt-8 mb-3 ${props.className ?? ''}`} />
  ),
  p: (props: any) => <p {...props} className={`leading-relaxed mb-4 ${props.className ?? ''}`} />,
  a: (props: any) => <a {...props} className={`underline underline-offset-4 ${props.className ?? ''}`} />,
};

