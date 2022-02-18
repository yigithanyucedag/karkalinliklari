import type { GetServerSideProps, NextPage } from "next";
import Emoji from "../components/Emoji";
import Item from "../components/Item";
import { ResortItem } from "../types/resortItem";
import Link from "next/link";
import { useState } from "react";
import Dropdown from "../components/Dropdown";
import Head from "next/head";
import getPosition from "../utils/getPosition";
import distance from "../utils/distance";

const Home: NextPage<{ data: ResortItem[] }> = ({ data }) => {
  const [currentSelectedSortIndex, setCurrentSelectedSortIndex] = useState(0);
  const [position, setPosition] = useState<GeolocationPosition>({
    timestamp: 0,
    coords: {
      latitude: 0,
      longitude: 0,
      altitude: 0,
      accuracy: 0,
      altitudeAccuracy: 0,
      heading: 0,
      speed: 0,
    },
  });

  const sortInfo = [
    {
      index: 0,
      label: "Kar Yüksekliği: Azalan",
      func: (a: ResortItem, b: ResortItem) => b.karYukseklik - a.karYukseklik,
    },
    {
      index: 1,
      label: "Kar Yüksekliği: Artan",
      func: (a: ResortItem, b: ResortItem) => a.karYukseklik - b.karYukseklik,
    },
    {
      index: 2,
      label: "Güncelleme: En Yeni",
      func: (a: ResortItem, b: ResortItem) =>
        new Date(b.veriZamani).getTime() - new Date(a.veriZamani).getTime(),
    },
    {
      index: 3,
      label: "Güncelleme: En Eski",
      func: (a: ResortItem, b: ResortItem) =>
        new Date(a.veriZamani).getTime() - new Date(b.veriZamani).getTime(),
    },
    {
      index: 4,
      label: "Konum: En Yakın",
      func: (a: ResortItem, b: ResortItem) => {
        const posLat = position.coords.latitude;
        const posLon = position.coords.longitude;

        const aLat = a.enlem;
        const aLon = a.boylam;
        const bLat = b.enlem;
        const bLon = b.boylam;

        const distanceA = distance(posLat, posLon, aLat, aLon);
        const distanceB = distance(posLat, posLon, bLat, bLon);
        return distanceA - distanceB;
      },
    },
    {
      index: 5,
      label: "Konum: En Uzak",
      func: (a: ResortItem, b: ResortItem) => {
        const posLat = position.coords.latitude;
        const posLon = position.coords.longitude;

        const aLat = a.enlem;
        const aLon = a.boylam;
        const bLat = b.enlem;
        const bLon = b.boylam;

        const distanceA = distance(posLat, posLon, aLat, aLon);
        const distanceB = distance(posLat, posLon, bLat, bLon);
        return distanceB - distanceA;
      },
    },
  ];

  let sortedData = data.sort(sortInfo[currentSelectedSortIndex].func);

  return (
    <>
      <Head>
        <title>Kar Kalınlıkları - Kayak Merkezleri</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Türkiye'deki tüm kayak merkezlerinin güncel kar yüksekliği durumu."
        />
      </Head>
      <div className="max-w-4xl p-5 overflow-x-hidden mx-auto">
        <div className="absolute -z-10 inset-0 bg-grid [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
        <div className="text-center mt-5 flex flex-row items-center justify-center space-x-3 mx-5">
          <Emoji label="Ski man" symbol="🎿" className="text-4xl" />
          <h1 className="font-semibold text-xl md:text-2xl lg:text-4xl dark:text-white">
            Kayak Merkezleri Kar Kalınlıkları
          </h1>
          <Emoji label="Ski man" symbol="🎿" className="text-4xl" />
        </div>
        <div className="flex items-center justify-between mt-8">
          <Link href="https://github.com/yigithanyucedag/karkalinliklari">
            <a target="_blank" rel="noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="w-8 h-8 fill-current dark:text-white dark:hover:text-sky-400 hover:text-sky-500"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </Link>
          <Dropdown
            label={sortInfo[currentSelectedSortIndex].label}
            onClick={async (index) => {
              if (index === 4 || index === 5) {
                try {
                  const position = await getPosition();
                  setPosition(position);
                  setCurrentSelectedSortIndex(index);
                } catch (error) {
                  alert((error as Error).message);
                }
                return;
              }
              setCurrentSelectedSortIndex(index);
            }}
            items={sortInfo}
          />
        </div>
        <div className="flex flex-col mt-3">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow-none lg:shadow-md rounded-lg">
                <table className="min-w-full">
                  <thead className="dark:bg-slate-700 bg-gray-200 bg-opacity-60">
                    <tr>
                      <th scope="col" className="py-3 pl-6 list-table-cell">
                        #
                      </th>
                      <th
                        scope="col"
                        className="py-3 pl-3 pr-6 list-table-cell"
                      >
                        Yer
                      </th>
                      <th scope="col" className="py-3 px-6 list-table-cell">
                        Son Güncelleme
                      </th>
                      <th scope="col" className="py-3 px-6 list-table-cell">
                        Kar Yüksekliği
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.map((resort, index) => (
                      <Item
                        resort={resort}
                        isLastItem={data.length - 1 === index}
                        key={index}
                        index={index}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <span className="dark:text-slate-500 text-gray-500 text-sm">
            Tüm veriler{" "}
            <Link href="https://www.mgm.gov.tr/">
              <a
                className="font-bold dark:text-sky-400 text-sky-500"
                target="_blank"
                rel="noreferrer"
              >
                Meteoroloji Genel Müdürlüğü
              </a>
            </Link>
            nden alınmıştır.
          </span>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=59"
  );
  const res = await fetch(`https://servis.mgm.gov.tr/web/sondurumlar/kar`, {
    headers: { Origin: "https://www.mgm.gov.tr" },
  });
  const data = await res.json();
  let filteredData = data.filter((item: ResortItem) => {
    return /KAYAK/.test(item.istAd);
  });

  return {
    props: { data: filteredData },
  };
};

export default Home;
