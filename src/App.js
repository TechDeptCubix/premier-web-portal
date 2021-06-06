import logo from "./logo.svg";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import CreateEnquiry from "./components/CreateEnquiry";
import ListOfEnquiry from "./components/ListOfEnquiry";
import ListOfOrder from "./components/ListOfOrder";
import ListOfReturn from "./components/ListOfReturn";
import ViewReturnRequest from "./components/ViewReturnRequest";
import ViewOrder from "./components/ViewOrder";
import ViewEnquiry from "./components/ViewEnquiry";
import ReturnRequest from "./components/ReturnRequest";
import OrderPlacing from "./components/OrderPlacing";
import OrderPlacingStatus from "./components/OrderPlacingStatus";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ViewOrderStatistics from "./components/ViewOrderStatistics";
import Contact from "./components/Contact";
import Help from "./components/Help";

function App() {
  return (
    <Router>
      <Header />

      <Route path="/" exact component={Login} />
      <Route path="/home" exact component={HomePage} />
      <Route path="/createEnquiry" component={CreateEnquiry} />
      <Route path="/listOfEnquiry" component={ListOfEnquiry} />
      <Route path="/listOfOrder" component={ListOfOrder} />
      <Route path="/listOfReturn" component={ListOfReturn} />
      <Route path="/viewReturnRequest" component={ViewReturnRequest} />
      <Route path="/viewOrder" component={ViewOrder} />
      <Route path="/viewEnquiry" component={ViewEnquiry} />
      <Route path="/returnRequest" component={ReturnRequest} />
      <Route path="/orderPlacing" component={OrderPlacing} />
      <Route path="/orderPlacingStatus" component={OrderPlacingStatus} />
      <Route path="/viewOrderStatistics" component={ViewOrderStatistics} />
      <Route path="/help" component={Help} />
      <Route path="/contact" component={Contact} />
      <Route path="/logout" component={ViewOrderStatistics} />

      <Footer />
    </Router>
  );
}

export default App;
