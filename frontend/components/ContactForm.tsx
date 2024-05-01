import axios from "axios";
import { FC, useEffect, useState } from "react";
import Input from "./Input";
import PopupContact from "./PopupContact";
import animationData from '../public/statics/lottie-form.json';
import Lottie from "lottie-react";

const ContactForm: FC<{show: boolean, setShow: any}> = ({show, setShow}) => {
  const [Pname, setPname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [empty, setEmpty] = useState<boolean>(false);
  const [invalidPhone, setInvalidPhone] = useState<boolean>(false);

  const [popup, setPopup] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

  useEffect(() => {
    if (show) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }, [show]);

  useEffect(() => {
    if(phone.length === 0){
      setInvalidPhone(false);
      return;
    }

    if(phone.length === 10 && phone.match(/^[0-9]+$/)) setInvalidPhone(false);
    else setInvalidPhone(true);
  }, [phone]);

  useEffect(() => {
    if(empty && message) setEmpty(false);
  }, [message]);

  const lore = (e: any) => {
    e.preventDefault();

    setEmpty(false);
    if(!Pname || !email || !phone || !city || !message) {
      setEmpty(true);
      return;
    }

    if(invalidPhone) return;

    setSending(true);
    const formData = new FormData();
    formData.append("name", Pname);
    formData.append("email", email);
    formData.append("phone",'+91' + phone);
    formData.append("city", city);
    formData.append("message", message);

    axios.post(('https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NmMwNTZlMDYzMTA0MzE1MjZmNTUzMyI_3D_pc'), formData)
      .then(() => {
        setSending(false);
        setPopup(true);
        setShow(false);
    });
  } 

  return (
    <>
    {popup && <PopupContact setState={setPopup}/>}
    <div className={`lg:w-[28rem] w-[95vw] h-max max-h-[88vh] overflow-x-hidden overflow-y-auto lg:mt-navbar mt-0 py-12 ${show ? 'block' : 'hidden'} lg:block lg:static fixed lg:top-0 lg:left-0 lg:translate-x-0 lg:translate-y-0 left-1/2 -translate-x-1/2 top-[55%] -translate-y-1/2 bg-tertiary/80 backdrop-blur-sm shadow-[0_0_60px_rgba(255,255,255,0.15)] rounded-lg text-primary text-center lg:p-8 p-6 z-30`}>
        <h4 className="font-fontBold text-3xl mb-4">Contact Form</h4>
        <img src="/statics/Cross.svg" alt="" className="h-6 absolute lg:hidden block cursor-pointer right-6 top-6" onClick={() => setShow(false)} />
        <form onSubmit={lore} className="flex flex-col items-center space-y-6">
            <Input empty={empty} setEmpty={setEmpty} setState={setPname} label="Name" placeholder="Enter your name" type="text" outline="black"/>
            <Input empty={empty} setEmpty={setEmpty} setState={setEmail} label="Email" placeholder="Enter your email address" type="email" outline="black"/>
            <Input empty={empty} setEmpty={setEmpty} invalidPhone={invalidPhone} setState={setPhone} label="Phone number" placeholder="XXXX-XXXX-XX" type="tel" outline="black"/>
            <Input empty={empty} setEmpty={setEmpty} setState={setCity} label="City" placeholder="Enter your city" type="text" outline="black"/>
            <div className="text-left border-primary border-b-2 space-y-1 w-full">
                <label className="text-sm font-fontLight" htmlFor="">Message</label>
                <textarea onChange={(e) => setMessage(e.target.value)} className={`bg-transparent ${(empty && message.trim() === "") ? "animate-shake-fast placeholder:text-red-600" : "animate-none placeholder:text-primary/20"} focus:outline-none w-full px-2 py-1 lg:text-base text-sm placeholder:font-fontLight placeholder:italic resize-none`} rows={2} placeholder="Enter your message"/>
            </div>
            
            {!sending ? <button className="flex lg:space-x-3 space-x-1 items-center lg:h-10 h-9 w-max bg-secondary rounded-full outline outline-primary lg:px-6 px-5 active:mb-0 active:shadow-none hover:mb-1 hover:shadow-md hover:shadow-primary transition-all duration-300">
                <span className="font-fontSemi lg:text-sm text-xs">Submit</span>
            </button> : 
            <div className="w-24 h-10 flex items-center cursor-progress bg-secondary/80 rounded-full outline outline-primary">
              <Lottie
                loop={true}
                autoplay={true}
                animationData={animationData}
                height={40}
                width={100}
              />
            </div>}
        </form>
    </div>
    </>
  )
}

export default ContactForm;