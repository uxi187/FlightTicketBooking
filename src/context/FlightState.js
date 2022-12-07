import React,{useState,useEffect} from 'react'
import flightContent from './FlightContext'
import { saveAs } from 'file-saver';

const FlightState = (props) => {

    const host = "http://localhost:4000"


    const Airports = [
        {
            "name":"Kempegowda International Airport",
            "city":"Bengaluru",
            "id":"BLR",
            "country":"India"
        },
        {
            "name":"Chennai International Airport",
            "city":"Chennai",
            "id":"CHE",
            "country":"India"
        },
        {
            "name":"Indira Gandhi International Airport",
            "city":"Delhi",
            "id":"DEL",
            "country":"India"
        },
        {
            "name":"Dabolim Airport",
            "city":"Goa",
            "id":"GOI",
            "country":"India"
        },
        {
            "name":"Rajiv Gandhi International Airport",
            "city":"Hyderabad",
            "id":"HYD",
            "country":"India"
        },
        {
            "name":"Netaji Subhash Chandra Bose International Airport",
            "city":"Kolkata",
            "id":"CCU",
            "country":"India"
        },
        {
            "name":"Chattrapati Shivaji Maharaj International Airport",
            "city":"Mumbai",
            "id":"BOM",
            "country":"India"
        }

    ]


    const[historyobject,setHistoryobject] = useState({})



    // Navbar

    const [search,setSearch] = useState('')
    const [searchdate, setSearchDate] = useState()

    // Home

    const[searchflights, setSearchFlights] = useState([
        {'departure':'','departurecode':''},
        {'arrival':'','arrivalcode':''},
        {'tripValue':'One-way'},
        null,
        {},
        {
            'passengerCount':1,
            'adultCount':1,
            'childCount':0,
            'infantCount':0,
            'passengerClass':'Economy'
        },
    ])

    const updateSearchFlights = (index, value) => {
        const utf = searchflights.map((c, i) => {
            if (i === index) {
              return value ;
            } else {
              return c;
            }
        });
        // console.log(utf)
        setSearchFlights(utf);
    }


    const [filter, setFilter] = useState(Airports)
    const [user,setUser] = useState([])


    const filterDest = (value) =>{
      const result = Airports.filter((element)=> {
          const {name,city} = element
          var cityfilter = city.toLowerCase()
          var namefilter = name.toLowerCase()
          if(cityfilter.indexOf(value.toLowerCase()) > -1 || namefilter.indexOf(value.toLowerCase()) > -1){
              return element
            }
        })
        setFilter(result)
    }


    const [flights, setFlights] = useState([])
    const [rflights, setRflights] = useState([])

    const getFlights = async(from,to,signal) => {
        const response = await fetch(`${host}/api/v1/flights?departurecode=${from}&destinationcode=${to}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            signal
        })
        return response.json()
    } 

  // Flightitem
    const[ selectedflight, setSelectedflight]= useState([])

 // fetch users data 
 
    const getUsersdata = async (authtoken,signal) => {
        const response = await fetch(`${host}/api/v1/auth/getuser`, {
            method: 'POST',
            headers:{
                'Content-type':'application/json',
                'auth-token':authtoken || localStorage.getItem('token')
            },
            signal
        });
        const usersdata = await response.json()
        return usersdata
    } 

    // Booking a flight
    let initialFlights = [{},{}];
    const [tripFlights, setTripFlights] = useState(initialFlights)
    const [condition, setCondition] = useState(0)


    
    // saving passenger details in local
    
    const [pdinitial,setPdInitial] = useState([{}])
    
    const [localpassengers, setLocalPassengers] = useState(pdinitial)
    const [localpassenger, setLocalPassenger] = useState({})
    
    // const [passengerdetails,setPassengerDetails] = useState({})
    // const [passengersdetails,setPassengersDetails] = useState(pdinitial)



    const updatePassengerDetails = (index, value) => {
        const upd = localpassengers.map((c, i) => {
            if (i === index) {
              return value ;
            } else {
              return c;
            }
        });
        console.log(upd)
        setLocalPassengers(upd);
    }
    // deatils of passengers
    const [personaldetails, setPersonaldetials] = useState({title:"",firstname:"",lastname:"",dateofbirth:"",nationality:"",gender:"",passport:"",passportexpirydate:""})
    const [contactdetails,setContactdetails] = useState({mobilenumber:"",email:""})
    const [primarycd,setPrimaryCd] = useState([])

    // passengers info 

    const [passengersinfo, setPassengersinfo] = useState([])
    const [contactinfo, setContactinfo] = useState([])
    const [bookingstatus, setBookingStatus] = useState(true)
    const [primarypassenger, setPrimarypassenger] = useState("Select Primary Contact");

    // createpdf 
    const createPdf = async(bookingid,passengersinfo,tripFlights ) => {
        const createpdf = await fetch(`${host}/api/v1/createpdf`,{
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            body: JSON.stringify({ 
                    bookingid:bookingid,
                    passengersinfo:passengersinfo,
                    tripFlights:tripFlights
                })
          })
          const createdpdf = await createpdf.json()
          return  createdpdf
    }
    const getPdf = async() => {
        const getpdf = await fetch(`${host}/api/v1/getpdf`,{
            method:'GET',
          })
          return getpdf.blob().then((myBlob)=>{
            const pdfBlob = new Blob([myBlob], { type: 'application/pdf' });
            saveAs(pdfBlob, 'newPdf.pdf');
          })
    }

    // Get booked flights with user
    const[bookings,setBookings] = useState([])

    const getBookingsWU = async () => {
        console.log('ho')
        const response = await fetch(`${host}/api/v1/auth/myflights`,{
            method:'GET',
            headers:{
                'Content-type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
        })
        const getbookingswc = await response.json()
        console.log(getbookingswc)
        setBookings(getbookingswc.flights)
    }
    

    // 

    const [fetchbooking,setFetchBooking] = useState([])
    const [fetchpassenger,setFetchPassenger] = useState([])


    //



    const getPassengers = async(signal) => {
        const response = await fetch(`${host}/api/v1/auth/getpassengers`, {
            method: 'GET',
            headers:{
                'Content-type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            signal
        });
        const dbpassengers = await response.json()
        console.log(dbpassengers)
        return dbpassengers
    }

    const[passarray,setPassarray] = useState([])
    const[pwcd,setPwcd] = useState([])
  return (
    <flightContent.Provider value={
        {   filter, setFilter, Airports, 
            getFlights, flights, setFlights, rflights, setRflights,filterDest,
            
            search, setSearch, searchdate, setSearchDate,
            passarray,setPassarray,
            tripFlights, setTripFlights, condition, setCondition, selectedflight, setSelectedflight,
            user, setUser, getUsersdata,
            localpassengers, setLocalPassengers,localpassenger, setLocalPassenger,
            updatePassengerDetails, pdinitial, setPdInitial,
            personaldetails, setPersonaldetials,contactdetails,setContactdetails,primarycd,setPrimaryCd,
            passengersinfo, setPassengersinfo, contactinfo, setContactinfo,
            bookingstatus, setBookingStatus , createPdf, getPdf,
            bookings,setBookings, getBookingsWU,
            fetchbooking, setFetchBooking, fetchpassenger,setFetchPassenger,
            getPassengers, searchflights, setSearchFlights, updateSearchFlights,
            primarypassenger, setPrimarypassenger, pwcd,setPwcd,
            historyobject,setHistoryobject
        }
    }>
        {props.children}
    </flightContent.Provider>
  )
}

export default FlightState
