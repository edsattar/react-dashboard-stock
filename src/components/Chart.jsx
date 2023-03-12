import React, { useContext, useEffect, useState } from "react";

import AppContext from "../context/AppContext";
import ChartFilter from "./ChartFilter";
import Card from "./Card";

import { Area, XAxis, YAxis, ResponsiveContainer, AreaChart, Tooltip } from "recharts";

import { createDate, convertDateToUnixTimestamp, convertUnixTimestampToDate } from "../utils/helpers/date-helper";
import { fetchHistoricalData } from "../utils/api/stock-api";
import { chartConfig } from "../constants/config";


const Chart = () => {
  // Get the dark mode status and stock symbol from the context
  const { darkMode, stockSymbol } = useContext(AppContext);

  // Set the state for the chart data and filter selection (1D, 1W, 1M, 1Y)
  const [data, setData] = useState([]);
  const [filterSelection, setFilterSelection] = useState("1W");

  // Format the data for the chart component and 
  // convert the unix timestamp to a date string 
  // for the x-axis label (date) and y-axis label (price) 
  const formatData = (data) => {
    return data.c.map((item, index) => {
      return {
        value: item.toFixed(2),
        date: convertUnixTimestampToDate(data.t[index]),
      };
    });
  };

  // Fetch the historical data when the stock symbol or filter selection changes 
  useEffect(() => {

    // Get the start and end date based on the filter selection
    function getDateRange() {
      const { days, weeks, months, years } = chartConfig[filterSelection];

      const endDate = new Date();
      const startDate = createDate(endDate, -days, -weeks, -months, -years); // @TODO: Fix this

      const startTimestampUnix = convertDateToUnixTimestamp(startDate);
      const endTimestampUnix = convertDateToUnixTimestamp(endDate);
      return { startTimestampUnix, endTimestampUnix };
    }

    // Fetch the historical data and format the data for the chart component
    const updateChartData = async () => {
      try {
        const { startTimestampUnix, endTimestampUnix } = getDateRange();
        const resolution = chartConfig[filterSelection].resolution;
        const result = await fetchHistoricalData(stockSymbol, resolution, startTimestampUnix, endTimestampUnix);
        setData(formatData(result));
      } catch (error) {
        setData([]);
        console.log(error);
      }
    };

    updateChartData();
  }, [stockSymbol, filterSelection]);

  return (

    // The chart component is wrapped in a Card component
    <Card>
      <ul className="flex absolute top-2 right-2 z-40">

        {/* // Map through the chart config and render a ChartFilter component for each item */}
        {Object.keys(chartConfig).map((item) => (
          <li key={item}>
            <ChartFilter
              text={item}
              active={filterSelection === item}
              onClick={() => {
                setFilterSelection(item);
              }}
            />
          </li>
        ))}
      </ul>

      {/* // Render the chart component */}
      <ResponsiveContainer>

        
        <AreaChart data={data}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"} stopOpacity={0.8} />
              <stop offset="95%" stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fill="url(#chartColor)"
            fillOpacity={1}
            strokeWidth={0.5}
          />
          <Tooltip
            contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
            itemStyle={darkMode ? { color: "#818cf8" } : null}
          />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
