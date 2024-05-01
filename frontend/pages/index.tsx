import { GetServerSideProps, NextPage } from "next"
import DiscountPopup from "../components/DiscountPopup";
import Discounts from "../components/Discounts";
import Explore from "../components/Explore";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Latest from "../components/Latest";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";

const Home: NextPage = (props: any) => {
  return (
    <div>
      <Seo metadata={props.metadata}/>
      <Navbar/>
      <Hero branches={props.explore}/>
      <Discounts images={props.discounts} link={props.whatsapp_link}/>
      <Explore branches={props.explore}/>
      <Latest/>
      <Footer/>
      <DiscountPopup data={props.discount_popup} link={props.whatsapp_link}/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
  const fetchParams = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      query: 
      `{
        seos(filters: {page: {eq: "root"}}) {
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
        global { 
          data {
            attributes {
              Whatsapp_Link
            }
          }
        }
        discountPopup {
          data {
            attributes {
              Title
              Subtext
              Toggle
              Image {
                data {
                  attributes {
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
              Prices(pagination: {limit: 14}) {
                Day
                Session
                Veg
                NonVeg
              }
              Coupons(pagination: {limit: 100}) {
                CouponCode
                Discount
                Percent
                CurrentUses
                MaximumUses
              }
              Lunch_12_2
              Lunch_2_3
              Dinner_7_9
              Dinner_9_10
              ChildPrice
              GST
              Currency
              Name
              Cover {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
        discount {
          data {
            attributes {
              Discount_1 {
                data {
                  attributes {
                    url
                  }
                }
              }
              Discount_2 {
                data {
                  attributes {
                    url
                  }
                }
              }
              Discount_3 {
                data {
                  attributes {
                    url
                  }
                }
              }
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
      discounts: data.data.discount.data.attributes,
      whatsapp_link: data.data.global.data.attributes.Whatsapp_Link,
      discount_popup: data.data.discountPopup.data.attributes,

      metadata: data.data.seos.data[0].attributes
    }
  };
};

export default Home;