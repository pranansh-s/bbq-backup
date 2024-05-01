import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import BranchesHero from "../components/BranchesHero";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import OutletsList from "../components/OutletsList";
import Seo from "../components/Seo";

const Branches: NextPage = (props: any) => {
  return (
    <div>
      <Seo metadata={props.metadata}/>
      <Navbar/>
      <BranchesHero branches={props.branches}/>
      <OutletsList branches={props.branches}/>
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
        seos(filters: {page: {eq: "branches"}}) {
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
              Name
              Prices(pagination: {limit: 14}) {
                Day
                Session
                Veg
                NonVeg
              }
              ChildPrice
              GST
              Currency
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
      branches: data.data.branches.data,

      metadata: data.data.seos.data[0].attributes
    }
  };
};


export default Branches;