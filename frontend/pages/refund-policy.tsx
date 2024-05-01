import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const refundPolicy = () => {
    return (
        <div>
          <Navbar/>
          <div className="h-full pt-navbar bg-primary lg:text-sm text-xs lg:snap-center snap-none relative xl:px-margin-lg lg:px-margin-base sm:px-margin-sm px-margin-xs font-fontRegular text-tertiary">
            <h1 className='font-fontExtra lg:text-3xl text-xl text-center lg:mt-12 mt-6 mb-12'>Refund Policy</h1>
            <p>The barbeque company is proud to offer its hospitality to the guest who visit our outlets. We always like to impress you with our food and our services. We hope that we you will never let us miss you and keep visiting us.</p><br />

            <p>We understand there may be times when you may do a booking with us and get into a unavoidable situation and you may to postpose or reschedule your visit. To assist you we have set out below our refund &amp; Cancellation policy.</p><br />

            <p>As a modern casual dining restaurant, we accept online bookings at our outlets. You&rsquo;re your booking is confirmed we always communicate you after reserving your seats as per your schedule. Bookings are not confirmed until you receive a confirmation from us. Reservations can be made up to 1 months in advance and up to 4 hours prior to your desired dining time. The same will be confirmed based on the availability.</p><br />

            <p>Due to overwhelming response from guest at our we require guests to make advance payment for their booking pay after choosing their veg or non veg buffet package. At least 24 hours&apos; notice of cancellation, or reduction in numbers, is required in order to avoid a cancellation fee. If a guest wishes to cancel or reduce its booking the same shall be communicated to the outlet in which the booking has been made before 24 hours. if the guest informs us before 24 hours from the booked schedule, then 100% refund will be made to the guest against their cancelled booking. If the same is communicated after 24 hours but before 12 hours 50% refund will be made to the guest against their cancelled booking. If the same is communicated if less than 12 hours are left the company is not liable to refund any amount.</p><br />

            <p>In some of the exceptional circumstances the restaurant may on its discretion refund full amount even in the cases where the communication of cancellation was made after 24 hours.</p><br />

            <p>The company is also not liable to make refund of any sort in case you order food from any third-party vendor. In that case we request you to kindly approach the vendor platform to seek refund or to make complaint against the vendor.</p><br />

            <p>For Your queries you can reach us on email : <a href="mailto:Feedback@thebbq.company" className="text-secondary">Feedback@thebbq.company</a></p><br />
          </div>
          <Footer/>
        </div>
      )
}

export default refundPolicy;
