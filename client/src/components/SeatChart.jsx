import React, { useState, useEffect } from 'react';
import Seat from './Seat';
import close from "../assets/close.svg";
import '../styles/SeatChart.css';

const SeatChart = ({ occasion, state, setToggle }) => {
  console.log('Occasion:', occasion);
  const { ticketContract } = state;
  const [seatsTaken, setSeatsTaken] = useState([]);
  const [hasSold, setHasSold] = useState(false);

  const getSeatsTaken = async () => {
    try {
      const seats = await ticketContract.getSeatsTaken(occasion[0]);
      setSeatsTaken(seats.map(seat => Number(seat)));
    } catch (error) {
      console.error('Error fetching seats:', error);
    }
  };

  const buyHandler = async (seatNumber) => {
    setHasSold(false);
    try {
      const tx = await ticketContract.mint(occasion[0], seatNumber, { value: occasion[2] });
      await tx.wait();
      setHasSold(true);
    } catch (error) {
      console.error('Error buying ticket:', error);
    }
  };

  useEffect(() => {
    getSeatsTaken();
  }, [hasSold]);

  const totalSeats = Number(occasion.maxTickets) || 0;
  const middleSectionSeats = Math.max(0, totalSeats - 50);

  console.log('Middle section seats:', middleSectionSeats);

  return (
    <div className="occasion">
      <div className="occasion__seating">
        <h1>{occasion.name} Seating Map</h1>

        <button onClick={() => setToggle(false)} className="occasion__close">
          <img src={close} alt="Close" />
        </button>

        <div className="occasion__stage">
          <strong>STAGE</strong>
        </div>

        {/* First section of seats */}
        {Array(25).fill(1).map((e, i) => (
          <Seat
            i={i}
            step={1}
            columnStart={0}
            maxColumns={5}
            rowStart={2}
            maxRows={5}
            seatsTaken={seatsTaken}
            buyHandler={buyHandler}
            key={`first-${i}`}
          />
        ))}

        <div className="occasion__spacer--1">
          <strong>WALKWAY</strong>
        </div>

        {/* Middle section of seats */}
        {middleSectionSeats > 0 && Array(middleSectionSeats).fill(1).map((e, i) => (
          <Seat
            i={i}
            step={1} // Adjust if necessary
            columnStart={6} // Adjust if necessary
            maxColumns={15}
            rowStart={2}
            maxRows={15}
            seatsTaken={seatsTaken}
            buyHandler={buyHandler}
            key={`middle-${i}`}
          />
        ))}

        <div className="occasion__spacer--2">
          <strong>WALKWAY</strong>
        </div>

        {/* Last section of seats */}
        {Array(25).fill(1).map((e, i) => (
          <Seat
            i={i}
            step={totalSeats - 24}
            columnStart={22}
            maxColumns={5}
            rowStart={2}
            maxRows={5}
            seatsTaken={seatsTaken}
            buyHandler={buyHandler}
            key={`last-${i}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SeatChart;
