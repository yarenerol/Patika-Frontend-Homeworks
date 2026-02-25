const ItemsComponent = ({item, onBuy, onSell, totalMoney})=>{
return (
    <>
        <div className="product-card">
            <img src={item.img} alt="" className="item-img"/>
            <h3 className="item-name">{item.itemName}</h3>
            <p className="price">${item.price}</p>
            <div className="btn-container">
                <button className="sell-btn" onClick={()=>{onSell(item.id)}} disabled={item.count<=0} >Sell</button>
                <div className="count">{item.count}</div>
                <button className="buy-btn" onClick={()=>{onBuy(item.id)}} disabled={totalMoney < item.price} >Buy</button>
            </div>
        </div>
    
    </>
)
}

export default ItemsComponent