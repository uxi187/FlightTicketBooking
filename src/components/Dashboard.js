import React,{useState,useContext,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import flightContent from "../context/FlightContext";
import '../styles/Bookings.css'


const Dashboard = () => {
    const host = "http://localhost:4000"
    const content = useContext(flightContent)
    const {bookings, getBookingsWU, setFetchBooking,setFetchPassenger,getUsersdata} = content 
    const navigate = useNavigate()

    const [user,setUser] = useState({})
    const viewBooking = async(bid) => {
        const response = await fetch(`${host}/api/v1/auth/myflight?_id=${bid}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            }
        });
        const pbdata = await response.json()
        if(pbdata.success){
            setFetchBooking(pbdata.flights)
            const response = await fetch(`${host}/api/v1/auth/getpassofbook?_id=${bid}`,{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem('token')
                }
            })
            const bpdata = await response.json()
            console.log(bpdata)
            if(bpdata.success){
                setFetchPassenger(bpdata.passenger)
                navigate('/fetchbooking')
            }
        }
    }   

    useEffect(() => {
        getBookingsWU()
    }, [])
    useEffect(() => {
        if(localStorage.getItem('token')){
          const controller = new AbortController();
          const signal = controller.signal;
          getUsersdata(localStorage.getItem('token'),signal)
          .then((data)=>{setUser(data.user)})
          .catch(err=>{
              if(err.name === "AbortError"){
              console.log('aborted')
              }
          })
          console.log(user)
          return () => {
              controller.abort();
          }
        }
    }, [localStorage.getItem('token')])
    
  return (
    <div>
        <div className='dash-con'>
            <div className='dash-con-title'>Dashboard</div>
            <div className='dash-con-body'>
                <div>
                    <div className='prof-con'>
                        <div className='prof-con-header'>
                            <div className='prof-con-title'>Profile</div>
                            <div className='d-flex'>
                                <button className='edud-btn'>Edit</button>
                                <button className='edud-btn d-none'>Update</button>
                            </div>
                        </div>
                        <div className='prof-con-body'>
                            <div>Name:{user.firstname} {user.lastname}</div>
                            <div>Date of birth: {user.dateofbirth}</div>
                            <div>Email: {user.email}</div>
                            <div>Mobile number: {user.mobilenumber}</div>
                        </div>
                    </div>
                </div>
                <div className='bk-con'>
                        <div className='bk-con-title'>Bookings</div>
                        <div className='bk-con-body'>
                            {bookings.map((element)=>{
                                return  <div className='bk-b-item' onClick={() => viewBooking(element._id)} data-id={element._id}>
                                            <div className='dd-con'>
                                                <div>{element.departure}</div>
                                                <div>{element.triptype==='Return'?<>&#8596;</>:<>&#8594;</>}</div>
                                                <div>{element.destination}</div>
                                            </div>
                                            <div>{element.departuredate}</div>
                                        </div>
                                    }   
                                )
                            }
                        </div>
                        
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard