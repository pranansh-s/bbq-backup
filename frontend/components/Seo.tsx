import { NextSeo } from 'next-seo';
import React from 'react';
import { FC } from 'react';

const Seo: FC<{metadata: any}> = ({ metadata }) => {
  return (
    <NextSeo
    title={metadata.title}
    description={metadata.description}
    canonical={metadata.canonical}
    openGraph={{
        url: metadata.ogUrl,
        title: metadata.ogTitle,
        description: metadata.ogDescription,
        images: [
            {
              url: metadata.ogImage.data.attributes.url,
              alt: 'Og Image alt',
            },
          ],
        site_name: metadata.siteName,
        type: metadata.ogType
    }}
    />
  );
};

export default Seo;
