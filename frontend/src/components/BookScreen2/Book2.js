import React, { useEffect, useState } from "react";
import "../BookScreen1/book1.css";
import axios from "axios";
import { ProgressBar } from 'react-loader-spinner'

let sample = [
  { number: 1 },
  { number: 2 },
  { number: 3 },
  { number: 4 },
  { number: 5 },
  { number: 6 },
  { number: 7 },
  { number: 8 },
  { number: 9 },
  { number: 10 },
];

const headers={
  "client_id": "78d0f100f9af4f0a98256a26d92879fb",
  "client_secret": "3Db5751AE6aa4A93b5F1ceaC22348dF8"
}

const myHeaders={
  "client_id": "0206f61000c84dd7a8a1fff87a6362c7",
  "client_secret": "064D86f632754cc1Be586EC4851a56FF"
}


export default function Book2() {
  const [noOfSeats, setNoOfSeats] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [available, setAvailable] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const [inputEmail, setEmail] = useState("");

  useEffect(() => {
    axios
      .get("http://ticket-movie-booking.us-e2.cloudhub.io/screen2",{
        headers: myHeaders
      })
      .then((response) => {
        const availableSeats = response.data[0].available_seats;
        setAvailable(availableSeats);
      })
      .catch((error) => {
        console.error("Error fetching available seats:", error);
      });
  }, [available, bookingSuccess]);

  const handleCancel = () => {
    setNoOfSeats("");
  };

  const clickedSeat = (e) => {
    const selectedSeat = e.target.textContent;
    setNoOfSeats(selectedSeat);
  };

  const handleConformBooking = () => {
    if (inputEmail.includes(".com")) {
      setLoading(true);

      axios
        .post("http://ticket-movie-booking.us-e2.cloudhub.io/booked", {
          phone_number: inputVal,
          email: inputEmail,
          screen: 2,
          noOfSeats: parseInt(noOfSeats),
        },{
          headers: myHeaders
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("Booking confirmed");
            const newAvailable = available - noOfSeats;
            setAvailable(newAvailable);
            setBookingSuccess(true);
          }
          console.log(response);
        })
        .catch((error) => {
          console.error("Error confirming booking:", error);
        })
        .finally(() => {
          setLoading(false);
        })
        axios
        .post("http://event-2-nikitha.us-e2.cloudhub.io/event",{

	"start":{
		"dateTime": "2023-09-14T13:00:00+05:30",
		"timeZone": "Asia/Kolkata"
		},
	
		"end":{
		"dateTime": "2023-09-14T14:00:00+05:30",
		"timeZone": "Asia/Kolkata"
		},
        "summary": "Your Booking Successfull!!",
        "description": `Your Ticket Booking is Done for Guntur Kaaram, Successfully Booked ${noOfSeats}  Tickets .Have Fun!!`,
		"location": "Remote/Location",
        "dataversion": 0,
        "calendarid": "nikitha.ramayanapu@inheritcloud.com",
        "attendees":
        [     
        {
           "email": inputEmail
        }
        ]
		},{
      headers: headers
    })
        .then((response) => {
          console.log(inputEmail)
          if (response.status === 200) {
            console.log("Booking confirmed");
            const newAvailable = available - noOfSeats;
            setAvailable(newAvailable);
            setBookingSuccess(true);
          }
          console.log(response);
        })
        .catch((error) => {
          console.error("Error confirming booking:", error);
        }).finally(()=>{
          setLoading(false)
        })
    }
  };

  return (
    <div className="cont">
      <h1 style={{ fontFamily: "cursive", margin: "10px" }}>
        Watch Trailer Here...
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "10px",
        }}
      >
        <img
          src="https://th.bing.com/th/id/OIP.2L9izVA4EkEj--zpmzEFYQHaEK?w=328&h=184&c=7&r=0&o=5&dpr=1.5&pid=1.7"
          width="500px"
        />
      </div>
      <h1>Seats Available: {available}</h1>
      <div className="boxes">
        {sample.map((each) => (
          <div
            style={{ color: "white" }}
            onClick={clickedSeat}
            className="box"
            key={each.number}
          >
            {each.number}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={clickedSeat}
          style={{ width: "200px" }}
          className={noOfSeats === "" ? "" : "highlight"}
        >
          {loading ?
          <div style={{display:"flex",justifyContent:"center"}}>
<ProgressBar
                height={80}
                width={80}
                ariaLabel="progress-bar-loading"
                wrapperStyle={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                wrapperClass="progress-bar-wrapper"
                borderColor='#F4442E'
                barColor='#51E5FF'
                visible={true}
              />
          </div>  : bookingSuccess ? "Success" : `Select ${noOfSeats} Seats`}
        </button>
        {noOfSeats !== "" && !bookingSuccess && (
          <div>
            <div className={noOfSeats === "" ? "none" : ""}>
              <button onClick={handleCancel}>Cancel Selected Seats</button> <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="details">
                  <h5 style={{ color: "white" }}>Enter Mobile Number</h5>
                  <input
                    type="number"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                  />
                </div>
                <div className="details">
                  <h5 style={{ color: "white" }}>Enter Mail</h5>
                  <input
                    value={inputEmail}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>{" "}
                <br />
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <button onClick={handleConformBooking}>
                    Click to Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {bookingSuccess && (
          <div>
            <p>Booking successful!</p>
          </div>
        )}
      </div>
    </div>
  );
}
