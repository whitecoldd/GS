import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import ReactModal from "react-modal";
import { Container } from "react-bootstrap";

import "./wheelStyles.css";
import spinStatic from "../assets/SpinStatic.png";
import circleRing from "../assets/circleRing.png";

const data = [
  { id: 1, option: "x2", style: { backgroundColor: "#000" } },
  { id: 2, option: "x3" },
  { id: 3, option: "x5" },
  { id: 4, option: "x4" },
  { id: 5, option: "x6" },
  { id: 6, option: "x7" },
  { id: 7, option: "x2" },
  { id: 8, option: "x3" },
  { id: 9, option: "x5" },
  { id: 10, option: "x4" },
  { id: 11, option: "x6" },
  { id: 12, option: "x7" },
  { id: 13, option: "x2" },
  { id: 14, option: "x3" },
  { id: 15, option: "x5" },
  { id: 16, option: "x4" },
  { id: 17, option: "x6" },
  { id: 18, option: "x7" },
];

export default function WheelOfFortune({ Open, setOpen, Data, setData }) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  useEffect(() => {
    if (Open === true && Data === true) {
      handleSpinClick();
    }
  }, [Open]);

  const handleOdds = () => {
    setOpen(false);
    setData(false);
  };

  return (
    <>
      <Container className="end">
        <button className="button" onClick={() => setOpen(false)}>
          X
        </button>
      </Container>
      <Container className="modal-window">
        <div align="center" className="bg" id="centerBg">
          <div className="spinStatic">
            <img src={spinStatic} alt="" />
          </div>
          <div className="circleRing">
            <img src={circleRing} alt="" />
          </div>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            outerBorderColor={"linear-gradient(35deg, red, green)"}
            outerBorderWidth={[30]}
            innerBorderColor={["rgba(255, 255, 255, 1)"]}
            innerBorderWidth={[30]}
            radiusLineColor={["transparent"]}
            radiusLineWidth={[0]}
            innerRadius={0}
            textColors={["#ffffff", "#000000"]}
            fontSize={[20]}
            perpendicularText={false}
            textDistance={75}
            backgroundColors={["#D00374", "#EFF0D1"]}
            onStopSpinning={() => {
              setMustSpin(false);
            }}
          />
        </div>
        {Data ? (
          <Container className="winning-text">
            <h2 className="modal-header">
              Our <span className="purple">congratulations</span>
            </h2>
            <Container className="win-combo">
              <h4 className="win-text">You Won :</h4>
              <h1 className="purple win-amount">{!mustSpin ? data[prizeNumber].option : <p> </p>}</h1>
            </Container>
            <p className="win-msg">
              In accordance with your coefficient, E-Gifts will be sent to your
              mail within 20 minutes
            </p>
            <button className="button2 ps-2">Increase more amount</button>
          </Container>
        ) : (
          <Container className="modal-text">
            <h2 className="modal-header">
              <span className="purple">Get</span> your bonus
            </h2>
            <ol className="m-2">
              <li>
                In order to be able to multiply your E-Gift cards, you need to
                fill out the form and click on the button.
              </li>
              <li>The wheel shows expected multipliers that you can win.</li>{" "}
              <li>
                After you win one of the odds, E-gifts will be sent to your mail
                in accordance with your winnings.
              </li>
            </ol>
            <button onClick={handleOdds} className="button2 ps-2">
              Fill in the form
            </button>
          </Container>
        )}
      </Container>
    </>
  );
}
