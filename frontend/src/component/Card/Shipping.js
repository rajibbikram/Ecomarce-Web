import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShipingInfo } from "../../actions/cardAction";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
import CheckOutStep from "./checkOutStep";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo?.address || "");
  const [city, setCity] = useState(shippingInfo?.city || "");
  const [pinCode, setPinCode] = useState(shippingInfo?.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo || "");
  const [country, setCountry] = useState(shippingInfo?.country || "");
  const [state, setState] = useState(shippingInfo?.state || "");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipingInfo({ address, city, state, country, pinCode, phoneNo }));
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title="Shipping Details" />

      <CheckOutStep activeStep={0} />
      <div className="shippingContainer">
        <form className="shippingForm" onSubmit={submitHandler}>
          <h2 className="shippingHeading">Shipping Details</h2>
          <div className="shippingInput">
            <HomeIcon />
            <input
              type="text"
              placeholder="Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="shippingInput">
            <LocationCityIcon />
            <input
              type="text"
              placeholder="City"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="shippingInput">
            <PinDropIcon />
            <input
              type="text"
              placeholder="Pin Code"
              required
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>
          <div className="shippingInput">
            <PhoneIcon />
            <input
              type="text"
              placeholder="Phone Number"
              required
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              maxLength={15}
            />
          </div>
          <div className="shippingInput">
            <PublicIcon />
            <select
              required
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setState("");
              }}
            >
              <option value="">Country</option>
              {Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {country && (
            <div className="shippingInput">
              <TransferWithinAStationIcon />
              <select
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">State</option>
                {State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button type="submit" className="shippingBtn" disabled={!state}>
            Continue
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Shipping;
