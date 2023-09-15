import React, { useEffect, useState } from "react";
import "./book1.css";
//import ReactPlayer from "react-player";
import axios from "axios";
//import { faL } from "@fortawesome/free-solid-svg-icons";
import { ProgressBar } from "react-loader-spinner";
import { config } from "@fortawesome/fontawesome-svg-core";

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

export default function Book1() {
  const [noOfSeats, setNoOfSeats] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [available, setAvailable] = useState(""); // Initialize available state
  const [inputEmail,setEmail]= useState("")
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://ticket-movie-booking.us-e2.cloudhub.io/screen1",{
        headers: myHeaders
      })
      .then((response) => {
        const availableSeats= response.data[0].available_seats
        setAvailable(availableSeats)
      })
      .catch((error) => {
        console.error("Error fetching available seats:", error);
      });
  }, [available,bookingSuccess]);

  
  const handleConformBooking = () => {
    if (inputEmail.includes(".com")) {
      setLoading(true); 
      axios
        .post("http://ticket-movie-booking.us-e2.cloudhub.io/booked", {
          phone_number: inputVal,
          email: inputEmail,
          screen: 1,
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
        }).finally(()=>{
          setLoading(false)
        })

        axios
        .post("http://event-2-nikitha.us-e2.cloudhub.io/event",{

	"start":{
		"dateTime": "2023-09-14T19:00:00+05:30",
		"timeZone": "Asia/Kolkata"
		},
	
		"end":{
		"dateTime": "2023-09-14T20:00:00+05:30",
		"timeZone": "Asia/Kolkata"
		},
        "summary": "Your Booking Successfull!!",
        "description": `Your Ticket Booking is Done for LEO, Successfully Booked ${noOfSeats}  Tickets .Have Fun!!`,
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
  const handleCancel = () => {
    setNoOfSeats("");
  };

  const clickedSeat = (e) => {
    const selectedSeat = e.target.textContent;
    setNoOfSeats(selectedSeat);
  };

  /*const submitFinal = () => {
    console.log(inputVal);
    if (inputVal.length > 5) {
      axios
        .post("http://localhost:8081/api/book", { number: inputVal })
        .then(() => {
          setBookingSuccess(true);
          setNoOfSeats("");
        })
        .catch((error) => {
          console.error("Error booking seats:", error);
        });

      axios
        .post("http://localhost:8081/api/updated", {
          seatsUpdated: parseInt(available) - parseInt(noOfSeats),
        });
    }
  };**/

  return (
    <div className="cont">
      <h1 style={{ fontFamily: "cursive", margin: "10px" }}>
        Watch Trailer Here...
      </h1>
      <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
        <img src="https://linksind.net/leo/featured.jpg
" width="500px"/>
      </div>
      <h1>Seats Available: {available}</h1>
      <div className="boxes">
        {sample.map((each) => (
          <div onClick={clickedSeat} className="box" key={each.number}>
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
          className={noOfSeats === 0 ? "" : "highlight"}
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
          </div>  : bookingSuccess ? "Success" : `Select ${noOfSeats} Seats`}        </button> <br/>
        {noOfSeats !== "" && !bookingSuccess && (
          <div>
            <div className={noOfSeats === "" ? "none" : ""}>
              <button onClick={handleCancel}>Cancel Selected Seats</button> <br />
              </div>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
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
                              </div> <br/>
<div style={{display: "flex",justifyContent: "center", alignItems: "center"}}>
                <button onClick={handleConformBooking}>Click to Confirm Booking</button>
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
