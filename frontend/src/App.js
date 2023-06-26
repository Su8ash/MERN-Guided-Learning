import axios from 'axios';
import { ActivationPage, BestSellingPage, EventsPage, FAQPage, HomePage, LoginPage, ProductsPage, SignupPage } from './Routes';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { server } from './server';
import Store from './redux/store';
import { loadUser } from './redux/actions/user';

function App() {

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${server}/user/getuser`,
  //       { withCredentials: true }
  //     )
  //     .then((res) => {

  //       console.log(res.data);
  //       alert("Correct Success!");
  //       // navigate("/");
  //       // window.location.relaoad();
  //     })
  //     .catch((err) => {  
  //       alert(err.response.data.message);
  //     });
  // }, [])


  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/activation/:activation_token" element={<ActivationPage />} />


        <Route path="/products" element={<ProductsPage />} />

        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
