import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";

const Contact: NextPage = (props: any) => {
  const { Phone, Mail, Address } = props.info;
  const [contact, setContact] = useState<boolean>(false);
  return (
    <div>
      <Seo metadata={props.metadata}/>
      <Navbar/>
      <div className="h-screen bg-primary lg:snap-center snap-none flex items-center justify-between xl:px-margin-lg lg:px-margin-base sm:px-margin-sm px-margin-xs font-fontRegular text-tertiary">
        <div className="flex flex-col lg:w-[60%] w-full lg:space-y-6 space-y-4 pt-navbar">
          <h2 className="lg:text-6xl text-4xl font-fontExtra">Contact Us</h2>
          <h1 className="lg:w-[65%] w-full pb-10 lg:text-base text-sm">We love to hear what you think – Fill in the form below or mail us at <a href={`mailto:${Mail}`} className="text-secondary">{Mail}</a> and we’ll get back to you as soon as we can!</h1>
          <div className="flex space-x-0 pb-16">
            <div className="flex space-x-2 w-1/2">
              <img src="/statics/MapPinLine.svg" alt="" className="md:h-6 h-4 md:w-6 w-4" />
              <div>
                <h3 className="font-fontSemi mb-2 lg:text-lg text-base">Corporate Office</h3>
                <h4 className="font-fontLight lg:text-base text-sm w-3/4">{Address}</h4>
              </div>
            </div>
            <div className="flex space-x-2 w-1/3">
              <img src="/statics/Phone.svg" alt="" className="md:h-6 h-4 md:w-6 w-4" />
              <div>
                <h3 className="font-fontSemi mb-2 lg:text-lg text-base">Phone No.</h3>
                <Link href={`tel:+91${Phone}`} className="font-fontLight hover:text-secondary/80 transition-all duration-300 lg:text-base text-sm whitespace-nowrap">(+91) {Phone}</Link>
              </div>
            </div>
            {!contact && <button onClick={() => setContact(!contact)} className={`fixed lg:hidden right-5 bottom-5 z-10 flex text-tertiary items-center h-9 bg-secondary rounded-full outline px-4 active:mb-0 active:shadow-none hover:mb-1 hover:shadow-md transition-all duration-300`}>
              <span className="font-fontSemi text-xs">Contact Us</span>
            </button>}
          </div>
          <div>
            <h3 className="lg:text-xl text-lg font-fontSemi">Looking for something else?</h3>
            <ul className="flex space-x-10 mt-4 lg:text-base text-sm">
              <Link className="text-secondary" href="/franchise">Franchise</Link>
              <Link className="text-secondary" href="/branches">Branches</Link>
            </ul>
          </div>
        </div>
        <ContactForm show={contact} setShow={setContact}/>
      </div>
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
        seos(filters: {page: {eq: "contact"}}) {
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
        contact {
          data {
            attributes {
              Phone
              Address
              Mail
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
      info: data.data.contact.data.attributes,

      metadata: data.data.seos.data[0].attributes
    }
  };
};

export default Contact;