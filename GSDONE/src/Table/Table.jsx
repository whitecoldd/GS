import React, { useState, useEffect } from "react";
import { Row, Container, Col } from "react-bootstrap";
import dayjs from "dayjs";
import axios from "axios";

import "./table.css";

const TableComponent = (currAmount, setcurrAmount) => {
  const [Items, setItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await axios.get(
          `https://giftspace.herokuapp.com/api/table/find/`
        );
        setItems(res.data);
      } catch (e) {}
    };
    getItems();
  }, []);
  const [rand, setRand] = useState(Math.floor(Math.random() * 12));
  const [rand1, setRand1] = useState(rand + 7);
  //   useEffect(() => {
  //     if (random2 - random1 === 7) {
  //       return [random2, random1];
  //     } else {
  //       random1 = randoms.int(0, 50);
  //       random2 = randoms.int(0, 50);
  //     }
  //     return [random2, random1];
  //   }, [random2, random1]);

  // const tableAmount =() =>{
  //   for (let i = currAmount-7; i < currAmount; i++) {
  //       return i
  //   }
  // }
  console.log(typeof currAmount.currAmount);
  console.log(currAmount.currAmount);
  let num = Number(currAmount.currAmount);
  return (
    <Container className="clutch" id="table">
      <div className="title">
        <span>Our </span>winners
      </div>
      {Items.slice(rand, rand + 7).map((data, i) => (
        <Container key={i} className="clutch">
          <Row className="clutch">
            <Col className="row-like">
              <span className="bold">#{currAmount.currAmount - 7 + i}</span>
              <span className="start">{data.company}</span>
              <span>{data.win_check}$</span>
              <span>{dayjs(Date.now()).format("DD.MM.YYYY")}</span>
              <span>
                Multiplier:{" "}
                <span className="purple bold">x{data.multiplier}</span>
              </span>
              <span className="purple bold">
                {data.win_check * data.multiplier}$
              </span>
            </Col>
          </Row>
        </Container>
      ))}
    </Container>
  );
};

export default TableComponent;
