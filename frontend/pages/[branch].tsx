import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import AboutRestaurant from "../components/AboutRestaurant";
import CustomerReviews from "../components/CustomerReviews";
import ExploreOutlets from "../components/ExploreOutlets";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Navbar from "../components/Navbar";
import OutletHero from "../components/OutletHero";
import PriceCard from "../components/PriceCard"
import Seo from "../components/Seo";
import titleCase from "../utils/titleCase";

const Branch = (props: any) => {
  const { branches, reviews, opening_hours, menus, images, description, branchName, prices, comingSoon } = props;
  return (
    <div>
      <Seo metadata={props.metadata}/>
      <Navbar/>
      <OutletHero opening={opening_hours} branches={branches}/>
      <Gallery menus={menus} images={images}/>
      <CustomerReviews reviews={reviews}/>
      <AboutRestaurant descr={description}/>
      {!comingSoon && <div className="h-max bg-primary font-fontRegular pb-16 items space-y-10 xl:px-margin-lg lg:px-margin-base sm:px-margin-sm px-margin-xs text-tertiary">
        <h3 className="font-fontBold lg:text-5xl text-3xl">Price per Head</h3>
        <PriceCard item={prices.attributes}/>
      </div>}
      <div className="h-0 bg-primary w-full outline outline-secondary outline-1"/>
      <ExploreOutlets name={branchName} branches={branches}/>
      <Footer/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
  const { params } = context;
  const link = params!.branch;
  
  let name = "";
  if(typeof link === 'string') name = titleCase(link);

  const fetchParams = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      query: 
      `{
        seos(filters: {page: {eq: "${name}"}}) {
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
        branches(pagination: {limit: 100}) {
          data {
            id
            attributes {
              ComingSoon
              Name
              Address
              Google_Maps
              Email
              Description
              Contact
              Whatsapp
              ChildPrice
              Currency
              GST
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
              Backdrop {
                data {
                  attributes {
                    url
                  }
                }
              }
              Prices(pagination: {limit: 14}) {
                Day
                Session
                Veg
                NonVeg
              }
            }
          }
        }
        thisBranch: branches(filters: { Name: { eq: "${name}" } }) {
          data {
            attributes {
              ComingSoon
              Name
              Description
              Cover {
                data {
                  attributes {
                    url
                  }
                }
              }
              Weekdays
              Weekends
              ChildPrice
              Currency
              GST
              Prices(pagination: {limit: 14}) {
                Day
                Session
                Veg
                NonVeg
              }
              Images {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
        menu {
          data {
           attributes {
             images {
               data {
                 attributes {
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
              Opening_Hours
            }
          }
        }
        reviews(pagination: {limit: 100}) {
          data {
            attributes {
              Name
              Rating
              Comment
            }
          }
        }
      }`
    })
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_PANEL}/graphql`, fetchParams);
  const data = await res.json();
  if(data.data.thisBranch.data.length === 0) {
    return {
      notFound: true
    }
  }
  
  return { 
    props: {
      branches: data.data.branches.data,
      comingSoon: data.data.thisBranch.data[0].attributes.ComingSoon,
      branchName: data.data.thisBranch.data[0].attributes.Name,
      images: data.data.thisBranch.data[0].attributes.Images.data,
      description: data.data.thisBranch.data[0].attributes.Description,
      prices: data.data.thisBranch.data[0],
      reviews: data.data.reviews.data,
      menus: data.data.menu.data.attributes.images.data,
      opening_hours: data.data.global.data.attributes.Opening_Hours,

      metadata: data.data.seos.data[0].attributes
    }
  };
};

export default Branch;