import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import BuyFranchise from "../components/BuyFranchise";
import Footer from "../components/Footer";
import FranchiseAdvantage from "../components/FranchiseAdvantage";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";

const Franchise: NextPage = (props: any) => {
  return (
    <div>
      <Seo metadata={props.metadata}/>
      <Navbar/>
      <div className="h-screen bg-primary lg:snap-center snap-none flex lg:flex-row flex-col-reverse items-center xl:px-margin-lg lg:px-margin-base sm:px-margin-sm px-margin-xs justify-center text-tertiary">
        <div className="w-full flex flex-col lg:space-y-8 space-y-3">
            <h2 className="font-fontExtra lg:text-6xl text-4xl md:leading-[5rem] leading-[3rem] lg:mt-0 mt-10 whitespace-nowrap">Franchise with Us</h2>
            <h1 className="lg:text-base text-sm lg:w-[80%] w-full">The Barbeque Company establishment was begun in 2015, and presently 4 effective Barbeque Company outlets are stumbling into Delhi. <br /> The brand is presently hoping to spread out its name in different pieces of the nation and is welcoming hopeful business visionaries to connect with it.</h1>
        </div>
        <img src="/statics/franchise.png" alt="" className="lg:w-1/3 md:w-[60vw] w-full lg:h-[50vh] h-[40vh] lg:mt-10 -mt-20" />
      </div>
      <FranchiseAdvantage/>
      {/* Add later when provided */}
      {/* <Awards/> */}
      <BuyFranchise/>
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
        seos(filters: {page: {eq: "franchise"}}) {
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
      metadata: data.data.seos.data[0].attributes
    }
  };
};


export default Franchise;