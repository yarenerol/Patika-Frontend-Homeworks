import { useState } from 'react'
import ItemsComponent from './itemsComponent';
import './App.css'

function App() {
  const initialItems = [
    {id: 1, itemName: "Big Mac", price: 2, count: 0, img: "https://neal.fun/spend/images/big-mac.jpg"}, 
    {id: 2, itemName: "Flip Flops", price: 2, count: 0, img: "https://neal.fun/spend/images/flip-flops.jpg"},
    {id: 3, itemName: "Coca-Cola Pack", price: 5, count: 0, img: "https://neal.fun/spend/images/coca-cola-pack.jpg"},
    {id: 4, itemName: "Movie Ticket", price: 12, count: 0, img: "https://neal.fun/spend/images/movie-ticket.jpg"},
    {id: 5, itemName: "Book", price: 15, count: 0, img: "https://neal.fun/spend/images/book.jpg"},
    {id: 6, itemName: "Lobster Dinner", price: 45, count: 0, img: "https://neal.fun/spend/images/lobster-dinner.jpg"},
    {id: 7, itemName: "Video Gamee", price: 60, count: 0, img: "https://neal.fun/spend/images/video-game.jpg"},
    {id: 8, itemName: "Amazon Echo", price: 99, count: 0, img: "https://neal.fun/spend/images/amazon-echo.jpg"},
    {id: 9, itemName: "Year of Netflix", price: 100, count: 0, img: "https://neal.fun/spend/images/year-of-netflix.jpg"},
    {id: 10, itemName: "Air Jordans", price: 125, count: 0, img: "https://neal.fun/spend/images/air-jordans.jpg"},
    {id: 11, itemName: "AirPods", price: 199, count: 0, img: "https://neal.fun/spend/images/airpods.jpg"},
    {id: 12, itemName: "Gaming Console", price: 299, count: 0, img: "https://neal.fun/spend/images/gaming-console.jpg"},
  ];

  const [products, setProducts] = useState(initialItems);
  const [totalMoney, setTotalMoney] = useState(100000000000)

  const buyItem =(id)=>{
    const selectedItem = products.find((item)=> id === item.id);

    if (totalMoney >= selectedItem.price) {
      const newItems = products.map((item)=>{
       if (id === item.id ) {
          return {...item, count: item.count + 1};
       } return item;
     });
     setProducts(newItems);
     setTotalMoney(totalMoney - selectedItem.price);
     } 
    }
;

  const sellItem = (id)=>{
    const selectedItem = products.find((item)=> id === item.id);

    if (selectedItem.count>0) {
      const newItems = products.map((item)=>{
        if (id === item.id) {
          return {...item, count: item.count -1};
        } return item;
      });
      setProducts(newItems);
      setTotalMoney(totalMoney + selectedItem.price);
    }
  };

  return (
    <>
      <div className='app-container'>
        <div className='header-content'>
          <img src="https://neal.fun/spend/billgates.jpg" alt="Bill Gates" className='bill-gates'/>
          <h1 className='title'>Spend Bill Gates' Money</h1>
        </div>
        <div className='money-container'>
          <h2>${totalMoney.toLocaleString()}</h2>
        </div>
        <div className='item-container'>{
          products.map((item)=>(
             <ItemsComponent
              key={item.id}
              item={item}
              onBuy={buyItem}
              onSell={sellItem}
              totalMoney={totalMoney} />
            ))
          }</div>
        {products.some(item => item.count > 0) && (
          <div className='receipt-container'>
            <h2 className="receipt-title">Your Receipt</h2>
            <div className="receipt-items">
              {products
                .filter((item) => item.count > 0)
                .map((item) => (
                  <div key={item.id} className="receipt-item">
                    <span className="receipt-name">{item.itemName}</span>
                    <span className="receipt-quantity">x{item.count}</span>
                    <span className="receipt-price">
                      ${(item.price * item.count).toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
            <hr />
            <div className="receipt-total">
              <span>TOTAL</span>
              <span className="total-amount">
                ${(100000000000 - totalMoney).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
