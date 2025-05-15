import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from '@mui/material/TextField';
import { FC, useEffect, useRef, useState } from "react"
import Input from "./Input"
import moment from "moment";
import Popup from "./Popup";
import PopupFail from "./PopupFail";
import initiatePayment from "../utils/initiatePayment";
import Image from "next/image";
import Counter from "./Counter";
import getDayfromIndex from "../utils/getDayfromIndex";
import Lottie from "lottie-react";
import animationData from '../public/statics/lottie-form.json';

const Form: FC<{show: boolean, setShow: any, branches: any}> = ({show, setShow, branches}) => {
  const today = new Date();
  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  const [loading, setLoading] = useState<boolean>(false);

  const [currentBranch, setCurrentBranch] = useState<string>("Gurugram Sector 29");
  const [currentSessionPrices, setCurrentSessionPrices] = useState<any>();

  const [Pname, setPname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [session, setSession] = useState<string>("");
  const [timeBlock, setTimeBlock] = useState<string>("");

  const [veg, setVeg] = useState<number>(0);
  const [nonVeg, setNonVeg] = useState<number>(0);
  const [children, setChildren] = useState<number>(0);
  const [birthdayDate, setBirthdayDate] = useState<Date>();
  const [anniversaryDate, setAnniversaryDate] = useState<Date>();
  const [couponCode, setCouponCode] = useState<string>();

  const [empty, setEmpty] = useState<boolean>(false);
  const [invalidPhone, setInvalidPhone] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const couponRef = useRef<HTMLInputElement>(null);

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

  const [popup, setPopup] = useState<boolean>(false);
  const [failPopup, setFailPopup] = useState<boolean>(false);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [discounted, setDiscounted] = useState<number>(0);
  const [amount, setAmount] = useState<number>(1);

  const lore = (e: any) => {
    e.preventDefault();

    setEmpty(false);
    if(!Pname || !email || !phone || !timeBlock || !date) {
      setEmpty(true);
      return;
    }
    
    if(invalidPhone) return;
    setPage(1);
  }

  useEffect(() => {
    let discount = branches.find((x: any) => x.attributes.Name === currentBranch).attributes.Coupons?.find((y: any) => y.CouponCode === couponCode);
    if(!discount || discount.CurrentUses === discount.MaximumUses){
      setDiscounted(0);
      return;
    }
    setDiscounted(discount.Percent ? (discount.Discount/100 * subTotal) : (discount.Discount));
  }, [couponCode]);

  useEffect(() => {
    let total: number = (subTotal - discounted) * (branches.find((x: any) => x.attributes.Name === currentBranch).attributes.GST ? 105/100 : 1);
    total = parseFloat(total.toFixed(2));
    setAmount(total);
  }, [subTotal, discounted])

  useEffect(() => {
    if(page == 0) return;
    if(veg == 0 && nonVeg == 0 && children == 0){
      setDiscounted(0);
      setCouponCode("");
    }
    setSubTotal(veg * currentSessionPrices.Veg + nonVeg * currentSessionPrices.NonVeg + children * branches.find((x: any) => x.attributes.Name === currentBranch).attributes.ChildPrice);
  }, [veg, nonVeg, children]);

  useEffect(() => {
    setSubTotal(0)
    setDiscounted(0);
    setCouponCode("");
    setChildren(0);
    setNonVeg(0)
    setVeg(0);
    let branchPrices = branches.find((x: any) => x.attributes.Name == currentBranch).attributes.Prices
    setCurrentSessionPrices(branchPrices.find((x: any) => x.Day === getDayfromIndex(date.getDay()) && x.Session === session));
  }, [currentBranch, session, date]);

  const payment = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    setTimeout(() => setLoading(false), 5000);
    if(veg == 0 && nonVeg == 0 && children == 0) return;
    const success = await initiatePayment(email, amount, Pname, currentBranch, moment(date).format('DD/MM/yyyy') + " " + timeBlock, phone, veg, nonVeg, children, moment(date).format('DD/MM/yyyy'), timeBlock, branches.find((x: any) => x.attributes.Name == currentBranch).attributes.Email, branches.find((x: any) => x.attributes.Name == currentBranch).attributes.Whatsapp);
    setPopup(success == true);
    setFailPopup(success == false);
  }

  return (
    <>
      {failPopup && <PopupFail popup={failPopup} setState={setFailPopup}/>}
      {popup && <Popup popup={popup} setState={setPopup}/>}
      <div className={`sm:w-[26rem] w-screen overflow-y-auto overflow-x-hidden outline-1 max-h-[88vh] outline-white lg:outline-none outline mt-navbar ${show ? 'block' : 'hidden'} lg:block lg:static fixed bg-primary/30 lg:backdrop-blur-sm backdrop-blur-xl shadow-[0_0_60px_rgba(255,255,255,0.15)] rounded-lg top-[40%] left-1/2 lg:translate-x-0 -translate-x-1/2 lg:translate-y-0 -translate-y-1/2 text-tertiary text-center font-fontRegular z-40`}>

        <div className={`sm:w-[52rem] w-[200vw] h-max flex ${page == 0 ? 'ml-0' : '-ml-[99.5%]'} transition-all duration-500`}>
            <div className="w-1/2 flex flex-col items-center lg:p-10 p-5 relative">
              <h4 className="font-fontBold lg:text-3xl text-2xl lg:mt-4 mt-10">Reserve a Table</h4>
              <img src="/statics/CrossWhite.svg" alt="" className="h-5 absolute lg:hidden block cursor-pointer right-8 top-4" onClick={() => setShow(false)} />
              <form className="flex flex-col items-center space-y-5">
                  <div className="text-left border-secondary border-b-2 space-y-1 w-full">
                    <label className="text-sm font-fontLight" htmlFor="">Locations</label>
                    <div className="flex items-center px-1">
                      <img src='/statics/MapPinLine.svg' alt="" className="h-5" />
                      <select onChange={(val: any) => setCurrentBranch(val.target.value)} className="bg-transparent focus:outline-none w-full px-2 py-1" defaultValue={"Gurugram Sector 29"}>
                        {branches.map((item: any, index: number) => !(item.attributes.Name === "Dubai") && !(item.attributes.ComingSoon) && <option key={index} className="font-fontRegular lg:text-base text-sm text-primary" value={item.attributes.Name}>{item.attributes.Name}</option>)}
                      </select>
                    </div>
                  </div>
                  <Input empty={empty} setEmpty={setEmpty} i="/User.svg" setState={setPname} label="Name" placeholder="Enter your name" type="text"/>
                  <div className="flex space-x-5">
                    <Input empty={empty} setEmpty={setEmpty} i="/Phone.svg" invalidPhone={invalidPhone} setState={setPhone} label="Phone number" placeholder="XXXX-XXXX-XX" type="tel"/>
                    <Input empty={empty} setEmpty={setEmpty} i="/Envelope.svg" setState={setEmail} label="Email" placeholder="test@gmail.com" type="email"/>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <label className="text-sm font-fontLight text-tertiary/90" htmlFor="">Date</label>
                    <div className="flex items-center justify-between w-full mt-3">
                        <div className="space-x-2">
                          <label className={`cursor-pointer h-max ${date.toDateString() === today.toDateString() ? 'bg-secondary text-primary' : 'bg-transparent text-tertiary'} transition-all duration-300 rounded-full border-secondary lg:text-sm text-xs border-2 px-3 py-2`} onClick={() => setDate(today)}>Today</label>
                          <label className={`cursor-pointer h-max ${date.toDateString() === tomorrow.toDateString() ? 'bg-secondary text-primary' : 'bg-transparent text-tertiary'} transition-all duration-300 rounded-full border-secondary lg:text-sm text-xs border-2 px-3 py-2`} onClick={() => setDate(tomorrow)}>Tomorrow</label>
                        </div>
                        <DatePicker
                          value={date}
                          onChange={(newValue) => setDate(moment(newValue).toDate())}
                          inputFormat="DD/MM/yyyy"
                          minDate={today}
                          renderInput={(params) => <TextField {...params}
                          variant="standard"
                          className="!pl-3 w-44 text-sm"
                          sx={{
                            border: 0,
                            borderBottom: 1,
                            borderColor: '#FC5C2C',
                            svg: { color: '#FC5C2C' },
                            input: { color: '#fff' },
                          }}/>}
                          />
                    </div>
                  </div>
                  <div className="flex flex-col items-start w-full pb-6">
                    <label className="text-sm font-fontLight text-tertiary/90" htmlFor="">Session</label>
                    <div className="flex items-center justify-between w-full mt-3">
                        <div className="space-x-2">
                          <label className={`cursor-pointer ${session === 'Lunch' ? 'bg-secondary text-primary' : 'bg-transparent text-tertiary'} transition-all duration-300 rounded-full border-secondary lg:text-sm text-xs border-2 px-3 py-2`} onClick={() => setSession("Lunch")}>Lunch</label>
                          <label className={`cursor-pointer ${session === 'Dinner' ? 'bg-secondary text-primary' : 'bg-transparent text-tertiary'} transition-all duration-300 rounded-full border-secondary lg:text-sm text-xs border-2 px-3 py-2`} onClick={() => setSession("Dinner")}>Dinner</label>
                        </div>
                        <div className="w-44 pb-1 flex justify-between border-b-[1px] border-secondary relative">
                          <select onChange={(val: any) => setTimeBlock(val.target.value)} className="bg-transparent focus:outline-none" defaultValue="select" disabled={session === ""}>
                            <option className="font-fontLight lg:text-base text-sm" disabled hidden value="select"> Select Session </option>
                            {session === "Lunch" ?
                            <>
                              <option disabled={!branches.find((x: any) => x.attributes.Name === currentBranch).attributes.Lunch_12_2} className="font-fontRegular lg:text-base text-sm text-primary" value="12:00 - 02:00 PM"> 12:00 - 02:00 PM </option>
                              <option disabled={!branches.find((x: any) => x.attributes.Name === currentBranch).attributes.Lunch_2_3} className="font-fontRegular lg:text-base text-sm text-primary" value="02:30 - 03:30 PM"> 02:30 - 03:30 PM </option>
                            </>
                            : 
                            <>
                              <option disabled={!branches.find((x: any) => x.attributes.Name === currentBranch).attributes.Dinner_7_9} className="font-fontRegular lg:text-base text-sm text-primary" value="07:00 - 09:00 PM"> 07:00 - 09:00 PM </option>
                              <option disabled={!branches.find((x: any) => x.attributes.Name === currentBranch).attributes.Dinner_9_10} className="font-fontRegular lg:text-base text-sm text-primary" value="09:30 - 10:30 PM"> 09:30 - 10:30 PM </option>
                            </>}
                          </select>
                          <img src="/statics/Clock.svg" alt="" className="h-6 absolute -right-1"/>
                        </div>
                    </div>
                  </div>
                  <button onClick={lore} className="flex lg:space-x-3 space-x-1 items-center lg:h-10 h-9 w-max bg-secondary rounded-full outline outline-tertiary lg:px-6 px-4 active:mb-0 active:shadow-none hover:mb-1 hover:shadow-md hover:shadow-white transition-all duration-300">
                      <span className="font-fontSemi lg:text-sm text-xs">Book a table</span>
                  </button>
              </form>
            </div>










            <div className="w-1/2 flex flex-col items-center lg:p-12 p-5 relative">
              <h4 className="font-fontBold text-3xl lg:mt-0 mt-6 mb-10">Booking Information</h4>
              <img src="/statics/ArrowLeft.svg" alt="" className="h-6 absolute cursor-pointer sm:left-6 left-3 sm:top-6 top-3" onClick={() => setPage(0)} />
              <form className="flex flex-col items-center space-y-5">
                  <div className="flex items-center space-x-2 text-left text-xs whitespace-nowrap">
                    <div className="p-3 outline outline-secondary outline-2 rounded-md grid grid-cols-2 grid-rows-3 gap-[0.1rem]">
                      <Image width={40} height={40} alt="" src="/statics/Veg.svg" className="row-span-2 mr-3"/>
                      <span className="font-fontBold text-secondary h-max">Veg</span>
                      {currentSessionPrices && <span className="font-fontRegular text-tertiary h-max -mt-2">{currentSessionPrices.Veg} {branches.find((x: any) => x.attributes.Name === currentBranch).attributes.Currency}</span>}
                      <Counter count={veg} setCount={setVeg}/>
                    </div>
                    <div className="p-3 outline outline-secondary outline-2 rounded-md grid grid-cols-2 grid-rows-3 gap-[0.1rem]">
                      <Image width={40} height={40} alt="" src="/statics/NonVeg.svg" className="row-span-2 mr-3"/>
                      <span className="font-fontBold text-secondary h-max">Non Veg</span>
                      {currentSessionPrices && <span className="font-fontRegular text-tertiary h-max -mt-2">{currentSessionPrices.NonVeg} {branches.find((x: any) => x.attributes.Name === currentBranch).attributes.Currency}</span>}
                      <Counter count={nonVeg} setCount={setNonVeg}/>
                    </div>
                    <div className="p-3 outline outline-secondary outline-2 rounded-md grid grid-cols-2 grid-rows-3 gap-[0.1rem]">
                      <Image width={40} height={40} alt="" src="/statics/Baby.svg" className="row-span-2"/>
                      <span className="font-fontBold text-secondary h-max">Kids</span>
                      <span className="font-fontRegular text-tertiary h-max -mt-2">{branches.find((x: any) => x.attributes.Name === currentBranch).attributes.ChildPrice} {branches.find((x: any) => x.attributes.Name === currentBranch).attributes.Currency}</span>
                      <Counter count={children} setCount={setChildren}/>
                    </div>
                  </div>
                  <div className="flex justify-between pb-8">
                    <label className="text-sm font-fontLight text-tertiary/90 absolute" htmlFor="">Date of Birthday</label>
                    <div className="flex items-center justify-between w-full mt-6">
                        <DatePicker
                          value={birthdayDate || null}
                          onChange={(newValue) => setBirthdayDate(moment(newValue).toDate())}
                          inputFormat="DD/MM/yyyy"
                          renderInput={(params) => <TextField {...params}
                          variant="standard"
                          className="w-40 text-sm"
                          sx={{
                            border: 0,
                            borderBottom: 1,
                            borderColor: '#FC5C2C',
                            svg: { color: '#FC5C2C' },
                            input: { color: '#fff' },
                          }}/>}
                        />
                    </div>

                    <label className="text-sm font-fontLight text-tertiary/90 absolute pl-48" htmlFor="">Date of Anniversary</label>
                    <div className="flex items-center ml-10 justify-between w-full mt-6">
                        <DatePicker
                          value={anniversaryDate || null}
                          onChange={(newValue) => setAnniversaryDate(moment(newValue).toDate())}
                          inputFormat="DD/MM/yyyy"
                          renderInput={(params) => <TextField {...params}
                          variant="standard"
                          className="w-40 text-sm"
                          sx={{
                            border: 0,
                            borderBottom: 1,
                            borderColor: '#FC5C2C',
                            svg: { color: '#FC5C2C' },
                            input: { color: '#fff' },
                          }}/>}
                        />
                    </div>
                  </div>
                  <div className="w-[calc(100%+0.5rem)] outline-dashed outline-1 outline-tertiary/60"/>
                  <div className="flex w-full space-x-5 pb-6">
                    <div className="text-left border-secondary border-b-2 space-y-1 w-full">
                        <div className="flex items-center px-1">
                          <input ref={couponRef} className="bg-transparent placeholder:text-tertiary/60 focus:outline-none w-full px-2 py-1 placeholder:font-fontLight lg:text-base text-sm placeholder:italic" type="text" placeholder="Enter Coupon Code" />
                        </div>
                    </div>
                    <button onClick={(e: any) => {e.preventDefault(); setCouponCode(couponRef.current!.value); couponRef.current!.value = "" }} className="flex lg:space-x-3 space-x-1 items-center lg:h-10 h-9 w-max bg-transparent rounded-full outline outline-tertiary lg:px-6 px-4 hover:bg-tertiary hover:text-primary  transition-all duration-300">
                      <span className="font-fontSemi lg:text-sm text-xs">Apply</span>
                    </button>
                  </div>
                  <div className="flex flex-col items-start w-full font-fontSemi space-y-2 text-sm">
                    <div className="flex w-full justify-between">
                      <label htmlFor="">Sub Total</label>
                      <span>{subTotal} {branches.find((x: any) => x.attributes.Name === currentBranch).attributes.Currency}</span>
                    </div>
                    <div className="flex w-full justify-between">
                      <label htmlFor="">Discount</label>
                      <span className="text-red-500">-{discounted} {branches.find((x: any) => x.attributes.Name === currentBranch).attributes.Currency}</span>
                    </div>
                    <div className="flex w-full justify-between">
                      <label htmlFor="">Total {branches.find((x: any) => x.attributes.Name === currentBranch).attributes.GST && <span className="font-fontLight text-[0.6rem]">(INC 5% GST)</span>}</label>
                      <span className="text-green-500">{amount} {branches.find((x: any) => x.attributes.Name === currentBranch).attributes.Currency}</span>
                    </div>
                  </div>
                  {!loading ? <button onClick={payment} className="flex lg:space-x-3 space-x-1 items-center lg:h-10 h-9 w-max bg-secondary rounded-full outline outline-tertiary lg:px-6 px-4 active:mb-0 active:shadow-none hover:mb-1 hover:shadow-md hover:shadow-white transition-all duration-300">
                    <span className="font-fontSemi lg:text-sm text-xs">Proceed To Payment</span>
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
        </div>
      </div>
    </>
  )
}

export default Form