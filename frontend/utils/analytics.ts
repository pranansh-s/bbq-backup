import { createBrowserHistory } from "history";
import ReactGA from "react-ga";

const trackingId = "G-8C6MB30ELP%22%3E";
ReactGA.initialize(trackingId);

const pageview = () => {
    const history = createBrowserHistory();
    ReactGA.pageview(history.location.pathname + history.location.search);
};
  
export { ReactGA, pageview };
