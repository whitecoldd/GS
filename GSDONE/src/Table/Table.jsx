import React, { useState, useEffect } from "react";
import { Row, Container, Col } from "react-bootstrap";
import dayjs from "dayjs";
import axios from "axios";
import randoms from "generate-random-data";

import "./table.css";

const TableComponent = () => {
  const [Items, setItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await axios.get(
          `https://giftspace.herokuapp.com/api/table/find`
        );
        setItems(res.data);
      } catch (e) {}
    };
    getItems();
  }, []);
  const [rand, setRand] = useState(randoms.int(0, 11));
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

  return (
    <Container className="clutch" id="table">
      <div className="title"><span>Our </span>winners</div>
      {Items.slice(rand, rand1).map((data, i) => (
        <Container key={i} className="clutch">
          <Row className="clutch">
            <Col className="row-like">
              <span className="bold">#{i + 1}</span>
              <span className="start">{data.company}</span>
              <span>{data.win_check}$</span>
              <span>{dayjs(data.createdAt).format("DD.MM.YYYY")}</span>
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
