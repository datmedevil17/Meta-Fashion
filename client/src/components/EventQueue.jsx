import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import SeatChart from './SeatChart';

const EventQueue = ({ state }) => {
  const { ticketContract } = state;
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [toggle, setToggle] = useState(false);

  const togglePop = (event) => {
    setSelectedEvent(event);
    setToggle(!toggle);
  };

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/ethereum/all-events");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
      }
      const data = await response.json();
      setEvents(data.events); // Adjust based on the actual API response structure
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {error && <p className="error">Error: {error}</p>}
      {events.map(event => (
        <div key={event[0]} className="bg-white border rounded-lg shadow-lg p-4 w-80">
          <h3 className="text-lg font-semibold mb-2">Event {event[0]}</h3>
          <p><strong>Name:</strong> {event[1]}</p>
          <p><strong>Cost:</strong> {ethers.formatEther(event[2])} ETH</p>
          <p><strong>Tickets:</strong> {event[3] === '0' ? 'Sold Out' : event[3]}</p>
          <p><strong>Max Tickets:</strong> {event[4]}</p>
          <p><strong>Date:</strong> {event[5]}</p>
          <p><strong>Time:</strong> {event[6]}</p>
          <p><strong>Location:</strong> {event[7]}</p>
          <button 
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => togglePop(event)}
          >
            View Seats
          </button>
        </div>
      ))}
      {toggle && (
        <SeatChart
          occasion={selectedEvent}
          state={state}
          setToggle={setToggle}
        />
      )}
    </div>
  );
};

export default EventQueue;
