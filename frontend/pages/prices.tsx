import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PricesHero from "../components/PricesHero";
import PricesList from "../components/PricesList";
import Seo from "../components/Seo";

const Prices: NextPage = (props: any) => {
  return (
    <div>
      <Seo metadata={props.metadata}/>
      <Navbar/>
      <PricesHero branches={props.explore}/>
      <PricesList branches={props.explore}/>
      <Footer/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async() => {
    const fetchParams = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            query: 
            `{
                seos(filters: {page: {eq: "prices"}}) {
                    data {
                      attributes {
                        title
                        description
                        canonical
                        ogUrl
                        ogTitle
                        ogDescription
                        siteName
                        ogType
                        ogImage {
                          data {
                            attributes{
                              url
                            }
                          }
                        }
                      }
                    }
                  }
                branches(pagination: { limit: 100 }) {
                  data {
                    id
                    attributes {
                        ComingSoon
                        Coupons(pagination: {limit: 100}) {
                            CouponCode
                            Discount
                            Percent
                            CurrentUses
                            MaximumUses
                        }
                        Cover {
                            data {
                                attributes {
                                    url
                                }
                            }
                        }
                        Weekdays
                        Weekends
                        Prices(pagination: {limit: 14}) {
                            Day
                            Session
                            Veg
                            NonVeg
                        }
                        ChildPrice
                        GST
                        Currency
                        Name
                    }
                }
                }
            }`
        })
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_PANEL}/graphql`, fetchParams);
    const data = await res.json();
    if(data.errors) {
        return {
            notFound: true
        }
    }

    return { 
        props: {
            explore: data.data.branches.data,

            metadata: data.data.seos.data[0].attributes
        }
    };
};

export default Prices;
