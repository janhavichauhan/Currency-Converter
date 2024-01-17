import React, { useState, useEffect } from "react";
import LordIcon from "react-lordicon";
import "./App.css";

const CurrencyConverter = () => {
  // State variables
  const [exchangeRates, setExchangeRates] = useState({});
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState("");

  // Fetch exchange rates on component mount
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch("https://open.er-api.com/v6/latest");
        const data = await response.json();
        setExchangeRates(data.rates);
        console.log("Exchange Rates:", data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
        setError("Error fetching exchange rates. Please try again.");
      }
    };

    fetchExchangeRates();
  }, []);

  // Function to convert currency
  const convertCurrency = () => {
    if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
      const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
      const result = (amount * rate).toFixed(2);

      if (result < 0) {
        setError("Conversion can't be in negative amount.");
        setConvertedAmount(null);
      } else {
        setError("");
        setConvertedAmount(result);
      }
    }
  };

  // Event handler for amount input
  const handleCurrencyChange = (event) => {
    const inputAmount = event.target.value;
    setAmount(inputAmount);
  };

  // Event handler for "From Currency" selection
  const handleFromCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    setFromCurrency(selectedCurrency);
  };

  // Event handler for "To Currency" selection
  const handleToCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    setToCurrency(selectedCurrency);
  };

  // Effect to trigger currency conversion when dependencies change
  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  // Render the component
  return (
     <>
      <h1>Currency Converter</h1>
       <div className="BOX">
        
       <div>
        <lord-icon
        src="https://cdn.lordicon.com/qnwzeeae.json"
        trigger="loop"
        delay="1500"
        state="in-reveal"
        style={{ width: "350px", height: "350px" }}
       ></lord-icon>
       </div>
       <div className="CONVERT">
    
      {/* Input for Amount */}
      <label className="AMOUNT">
        Amount:
        <input type="number" className="INPUT" value={amount} onChange={handleCurrencyChange} placeholder="Enter amount"  />
      </label>
      <br />
      <hr />
      {/* Dropdown for "From Currency" */}
      <label className="FROM">
        From Currency:
        <select value={fromCurrency} onChange={handleFromCurrencyChange} className="SELECT">
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </label>
      <br />
      <br/>
      {/* Dropdown for "To Currency" */}
      <label className="TO">
        To Currency:
        <select value={toCurrency} onChange={handleToCurrencyChange} className="SELECT">
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </label>
      <br />
      <hr/>
      {/* Display converted amount */}
      <p className="RESULT">Converted Amount: {convertedAmount}</p>
      {/* Display conversion details */}
      <p className="FINAL">
        {amount} {fromCurrency} = {convertedAmount} {toCurrency}
      </p>
      {/* Display error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>

       </div>
   </>
  );
};

export default CurrencyConverter;
