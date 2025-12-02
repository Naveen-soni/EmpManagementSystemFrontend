// components/GoldRateTicker.jsx
import { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";

const GoldRateTicker = () => {
  const [price, setPrice] = useState(98615); 
  const [change, setChange] = useState(0.0);

  useEffect(() => {
    const interval = setInterval(() => {
      const fluctuation = (Math.random() * 10 - 5).toFixed(2);
      const newPrice = parseFloat((price + parseFloat(fluctuation)).toFixed(2));
      setChange(fluctuation);
      setPrice(newPrice);
    }, 5000);

    return () => clearInterval(interval);
  }, [price]);

  return (
    <div className="bg-yellow-200 text-black rounded-full shadow px-4 py-1 flex items-center space-x-2 animate-pulse text-xs md:text-sm font-semibold">
      <FaRupeeSign className="text-yellow-800" />
      <span>{price.toFixed(2)} /gm</span>
      <span className={parseFloat(change) >= 0 ? "text-green-600" : "text-red-600"}>
        {parseFloat(change) >= 0 ? `▲ ${change}` : `▼ ${Math.abs(change)}`}
      </span>
    </div>
  );
};

export default GoldRateTicker;
