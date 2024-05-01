import { GetServerSideProps } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import linkCase from "../../utils/linkCase";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const fetchParams = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            query: 
            `{
                branches(pagination: {limit: 100}) {
                    data {
                    attributes {
                        Name
                    }
                }
            }`
        })
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_PANEL}/graphql`, fetchParams);
    const data = await res.json();
    const fields: ISitemapField[] = data.data.branches.data.map((page: any) => (({loc: `https://thebbq.company/${linkCase(page.attributes.Name)}`, lastmod: new Date().toISOString()})));

    return getServerSideSitemap(ctx, fields);
}

export default function Site() {}