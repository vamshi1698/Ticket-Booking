import { useState } from "react"

const App = ()=>{

  const sections = [
    {name:"Royal",rows:1,seatsInRow : 7,price:250},
    {name:"Premier",rows:4,seatsInRow : 8,price:200},
    {name:"Club",rows:9,seatsInRow : 9,price:150},
  ]
  const submitData = (e)=>{
    e.preventDefault()
    alert(`selected seats : ${selectedSeats.join(",")}`)
    setSelectedSeats([])
    setPayment(0)
  }
  const [payment,setPayment] = useState(0)
  const [selectedSeats, setSelectedSeats] = useState([])
  return(
    <>
    <h1>Ticket Booking</h1>
    <form action="/">
    {
      sections.map((section)=>(
        <div className="container" key={section.name}>
        <h3 className="sectionName">{section.name} - ₹{section.price}</h3>
        {
          [...Array(section.rows)].map((_,rowIndex)=>(
            <div key={rowIndex}>
            <div className="div">
            {
              [...Array(section.seatsInRow)].map((_,columnIndex)=>{
                
                const seatNumber = `${section.name}-${rowIndex+1}${columnIndex+1}`
                const toggleSelection = ()=>{
                  setSelectedSeats(()=>{
                    if(selectedSeats.includes(seatNumber)){
                      setPayment(payment - section.price)
                      return selectedSeats.filter(seat => seat != seatNumber)
                    }
                    if(selectedSeats.length >= 5){
                      alert("Cannot book more than five seats")
                      return selectedSeats
                    }
                    setPayment(payment + section.price)
                    return [...selectedSeats,seatNumber]
                  })
                }
                return (
                  <div className={(selectedSeats.includes(seatNumber)) ? "selected" : ""} onClick={toggleSelection} key={seatNumber}>{rowIndex+1}{columnIndex+1}</div>
                )
              })
            }
            </div>
            </div>            
          ))  
        }
        </div>
        
      ))
    }
    {
      selectedSeats.length > 0 ? <button type="submit" value="confirm" className="submit" onClick={submitData} >Pay {payment}</button>:""
    }  
    </form>
    </>
  )
}
export default App