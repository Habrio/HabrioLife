// MDX components can be rendered on the server, so no client directive is needed
import { publicImageUrl } from '@/lib/supabase';

export const mdxComponents = {
  img: (props: any) => {
    const { src, alt = '', ...rest } = props ?? {};
    const finalSrc = !src ? '' : src.startsWith('http') ? src : publicImageUrl(src);
    // Keep rounding/shadow consistent with site
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...rest} src={finalSrc} alt={alt} className={`my-6 rounded-2xl shadow ${rest.className ?? ''}`} />;
  },
  h2: (props: any) => (
    <h2 {...props} className={`text-2xl font-semibold mt-8 mb-3 ${props.className ?? ''}`} />
  ),
  p: (props: any) => <p {...props} className={`leading-relaxed mb-4 ${props.className ?? ''}`} />,
  a: (props: any) => <a {...props} className={`underline underline-offset-4 ${props.className ?? ''}`} />,
};

