import React, { useEffect, useState } from 'react';
import { getClient } from '../../services/clientService';
import "./Clients.css";
import { Fade } from "react-awesome-reveal";
import circleImg from '../../Assets/Clients/team-circle.png'
const Clients = () => {

  const [client, setClient] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    if (!isDataFetched) {
      fetchClient();
    }
  }, [isDataFetched]);

  const fetchClient = async () => {
    try {
      const clientData = await getClient();
      setClient(clientData.data);
      setIsDataFetched(true);
      console.log(clientData.data, "clients");
    } catch (error) {
      console.error('Error fetching client:', error);
    }
  };

  return (
    <div className="client relative pt-24 pb-8" id="clients">
      <img src={circleImg} className="circleImg absolute top-36" />
      <Fade>
        <h2 className="text-center font-primary font-thin">
          Our <span>Clientele</span>
        </h2>
        {/* <p className="clientText text-center ">
          More than 100 clients have trusted us…
        </p> */}
      </Fade>
      <div className="flex gap-14 justify-center items-center w-3/4 relative left-2/4 -translate-x-2/4">
        {client.map((clientItem, index) => (
          <div
            key={clientItem._id}
            className="brandCol w-1/4 flex flex-col justify-center items-center"
          >
            <img src={clientItem.logoUrl} alt={`Client Logo ${index}`} />
          </div>
        ))}
      </div>

      <p className="clientText mt-6 text-center w-3/4 relative left-2/4 -translate-x-2/4 ">
        We are not your advertisers next door, we are a team of creative
        thinkers who thrive on innovation. We just don’t take projects, we
        collaborate. We don’t just believe in serving our clients, we believe in
        growing with them.{" "}
      </p>
    </div>
  );
};

export default Clients;
