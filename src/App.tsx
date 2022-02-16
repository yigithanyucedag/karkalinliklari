import { useEffect, useState } from "react";
import Emoji from "./components/Emoji";

function App() {
  const [loading, setLoading] = useState(true);

  const requestData = async () => {
    fetch("https://servis.mgm.gov.tr/web/sondurumlar/kar", {
      headers: {
        Host: "servis.mgm.gov.tr",
        Origin: "https://www.mgm.gov.tr",
        Referer: "https://www.mgm.gov.tr/",
      },
    });

    // console.log(response);
  };

  useEffect(() => {
    requestData();
  }, []);
  return (
    <div className="container mx-auto">
      <div className="text-center mt-10 flex flex-row items-center justify-center space-x-3 mx-5">
        <Emoji label="Ski man" symbol="🎿" className="text-4xl" />
        <h1 className="font-semibold text-4xl text-white">
          Kayak Merkezleri Kar Kalınlıkları
        </h1>
        <Emoji label="Ski man" symbol="🎿" className="text-4xl" />
      </div>
    </div>
  );
}

export default App;
