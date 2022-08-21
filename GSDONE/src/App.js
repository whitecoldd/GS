import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import TopForm from "./components/topForm/TopForm";

import Roadmap from "../src/Roadmap/Roadmap";
import TableComponent from "../src/Table/Table";
import Modal from "react-modal";
import WheelOfFortune from "../src/Wheel/WheelOfFortune";
import { useEffect, useState } from "react";

function App() {
  const [Open, setOpen] = useState(false);
  const [Data, setData] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "20%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "auto",
      color: "white",
      background: "linear-gradient(269.39deg, #141620 1.86%, #102B46 97.36%)",
      borderRadius: "20px",
    },
    overlay: {
      zIndex: 1000,
    },
  };
  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === "Escape") {
        setOpen(!Open);
      }
    }

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);

  let [totalAmount, settotalAmount] = useState(1000);
  let [currAmount, setcurrAmount] = useState(0);
  let interval = (24 / totalAmount) * 60 * 60 * 1000;

  const func = () => {
    let date = new Date();
    let currDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    let newCurrDate = Date.parse(currDate.toString());
    let newTime = new Date(newCurrDate).getTime();
    let AmountNow = (Date.now() - newTime) / interval; /*  / 1000 / 60 / 60 */
    setcurrAmount(parseInt(AmountNow));
  };
  console.log(typeof currAmount);
  // const func = () => {
  //   let date = new Date();
  //   let currDate =
  //     date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  //   let newCurrDate = Date.parse(currDate.toString());
  //   let newTime = new Date(newCurrDate).getTime();
  //   let AmountNow = (Date.now() - newTime) / interval; /*  / 1000 / 60 / 60 */
  //   setcurrAmount(parseInt(AmountNow));
  // };
  // console.log(typeof currAmount);
  return (
    <div className="App">
      <Header />
      <main className="main">
        <TopForm
          Open={Open}
          Data={Data}
          setcurrAmount={setcurrAmount}
          interval={interval}
          func={func}
          currAmount={currAmount}
          setData={setData}
          setOpen={setOpen}
          totalAmount={totalAmount}
        />
        <Roadmap />
        <TableComponent currAmount={currAmount} setcurrAmount={setcurrAmount} />
        <Modal isOpen={Open} style={customStyles}>
          <WheelOfFortune
            Open={Open}
            Data={Data}
            setData={setData}
            setOpen={setOpen}
          />
        </Modal>

        <div className="blurCircle blurCircle_1"></div>
        <div className="blurCircle blurCircle_2"></div>
        <div className="blurCircle blurCircle_3"></div>
        <div className="blurCircle blurCircle_4"></div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
