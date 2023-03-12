import React, { useContext, useEffect, useState } from "react";
import { Chart, Header, Details, Overview } from "./_index.js";
import { fetchStockDetails, fetchQuote } from "../utils/api/stock-api";

import AppContext from "../context/AppContext";

const Dashboard = () => {
  // Get the stock symbol from the context
  const { stockSymbol } = useContext(AppContext);

  // Set the state for the stock details and quote
  const [stockDetails, setStockDetails] = useState({});
  const [quote, setQuote] = useState({});

  // Fetch the stock details and quote when the stock symbol changes
  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stockSymbol);
        setStockDetails(result);
      } catch (error) {
        setStockDetails({});
        console.log(error);
      }
    };

    const updateStockOverview = async () => {
      try {
        const result = await fetchQuote(stockSymbol);
        setQuote(result);
      } catch (error) {
        setQuote({});
        console.log(error);
      }
    };

    updateStockDetails();
    updateStockOverview();
  }, [stockSymbol]);

  return (
    // The grid is responsive and will change based on the screen size
    <div className="bg-neutral-100 dark:bg-gray-900 dark:text-gray-300 h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand">

      {/* // Header component */}
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        <Header name={stockDetails.name} />
      </div>

      {/* // Chart component */}
      <div className="md:col-span-2 row-span-4">
        <Chart />
      </div>

      {/* // Overview component */}
      <div>
        <Overview
          symbol={stockSymbol}
          price={quote.pc}
          change={quote.d}
          changePercent={quote.dp}
          currency={stockDetails.currency}
        />
      </div>

      {/* // Details component */}
      <div className="row-span-2 xl:row-span-3">
        <Details details={stockDetails} />
      </div>
    </div>
  );
};

export default Dashboard;
