import React, { useState } from "react";

const InputForm = props => {
    const [product, setproduct] = useState(props.item);
    const onChange = event => {
        const {name, value} = event.target;
        if(name === "platform"){
            if (value === "SOLDOUT"){
                setproduct({
                    ...product,
                    [name]: value,
                    "bonus": 4000
                });
                props.onChange({
                    ...product,
                    [name]: value,
                    "bonus": 4000
                });
            } 
            else{
              setproduct({
                  ...product,
                  [name]: value,
                  "bonus": 0
              });
              props.onChange({
                  ...product,
                  [name]: value,
                  "bonus": 0
              });
            } 
        }
        else{
          setproduct({
              ...product,
              [name]: (["status", "price", "dollar","cashback", "INship", "sell", "ship"].includes(name)) ? parseFloat(value) : value
          });
          props.onChange({
              ...product,
              [name]: (["status", "price", "dollar", "cashback", "INship", "sell", "ship"].includes(name)) ? parseFloat(value) : value
          });
        }
    }
    const calc = () => {
      if(product.status < 4) return
      var profit = product.sell - product.price
                                  + product.cashback
                                  - product.ship
                                  + product.bonus;
      if(product.INship !== undefined) profit = profit - product.INship;
      if(product.tax !== undefined) profit = profit - product.tax;
      setproduct({
        ...product,
        'profit' : profit
      });
      props.onChange({
        ...product,
        'profit' : profit
      });
    }
    return (
        <div className="form-wrap" style={{width:"500px", height:"700px"}}>
              <div className="form-box">
                <input
                  type="radio"
                  name="status"
                  value="1"
                  checked={1 === product.status}
                  onChange={onChange}/>
                <label>??????</label>
                <input
                  type="radio"
                  name="status"
                  value="2"
                  checked={2 === product.status}
                  onChange={onChange}/>
                <label>
                  ??????
                </label>
                <input
                  type="radio"
                  name="status"
                  value="3"
                  checked={3 === product.status}
                  onChange={onChange}/>
                <label>
                  ??????
                </label>
                <input
                  type="radio"
                  name="status"
                  value="4"
                  checked={4 === product.status}
                  onChange={onChange}/>
                <label>
                  ??????
                </label>
                <input
                  type="radio"
                  name="status"
                  value="5"
                  checked={5 === product.status}
                  onChange={onChange}/>
                <label>
                  ??????
                </label>
              </div>
              <div className="form-box">
                <span>????????????</span>
                <input 
                  type="text"
                  name="pdcode"
                  value={product.pdcode}
                  className="style-bottom"
                  onChange={onChange}/>
              </div>
              <div className="form-box">
                <span>?????????</span>
                <input 
                  type="text"
                  name="size"
                  value={product.size}
                  className="style-bottom"
                  onChange={onChange}/>
              </div>
              <div className="form-box">
                <span>??????</span>
                <input 
                  type="number"
                  name="price"
                  value={product.price}
                  className="style-bottom"
                  onChange={onChange}/>
              </div>
              <div className="form-box">
                <span>?????? ??????</span>
                <input
                  type="number"
                  name="dollar"
                  value={product.dollar}
                  className="style-bottom"
                  onChange={onChange}/>
              </div>
              {product.dollar > 200 && (
                <div className="form-box">
                  <span>??????</span>
                  <input
                    type="number"
                    name="tax"
                    value={product.tax}
                    className="style-bottom"
                    onChange={onChange}/>
                </div>
              )}
              <div className="form-box">
                <span>?????????</span>
                <input 
                  type="number"
                  name="cashback"
                  value={product.cashback}
                  className="style-bottom"
                  onChange={onChange}/>
              </div>
              <div className="form-box">
                <span>?????? ??????</span>
                <input
                  type="date"
                  name="buydate"
                  value={product.buydate}
                  className="style-bottom"
                  onChange={onChange}/>        
              </div>
              <div className="form-box">
                  <span>?????? ??????</span>
                  <select name="card" value={product.card} onChange={onChange}>
                    <option value="?">??????</option>
                    <option value="TOSS">????????????</option>
                    <option value="HYUNDAE">????????????</option>
                    <option value="POST">???????????????</option>
                    <option value="WOORI">????????????</option>
                    <option value="KB">????????????</option>
                    <option value="SHINHAN">????????????</option>
                    <option value="CASH">??????</option>
                  </select>
                </div>
              { product.status > 3 && 
              <>
                <div className="form-box">
                  <span>?????? ??????</span>
                  <input
                    type="date"
                    name="selldate"
                    value={product.selldate}
                    className="style-bottom"
                    onChange={onChange}/>
                </div>
                <div className="form-box">
                  <span>?????????</span>
                  <select 
                    name="platform"
                    value={product.platform}
                    onChange={onChange}>
                    <option value="?">??????</option>
                    <option value="KREAM">KREAM</option>
                    <option value="SOLDOUT">????????????</option>
                    <option value="daangn">????????????</option>
                    <option value="everytime">???????????????</option>
                  </select>
                </div>
              </>
              }
              { product.dollar !== undefined && (
                <div className="form-box">
                  <span>???????????????</span>
                  <input 
                    type="number"
                    name="INship"
                    value={product.INship}
                    className="style-bottom"
                    onChange={onChange}/>
                </div>
              )}
              { product.status > 3 &&
              <>
                <div className="form-box">
                  <span>?????? ??????</span>
                  <input 
                    type="number"
                    name="sell"
                    value={product.sell}
                    className="style-bottom"
                    onChange={onChange}/>
                </div>
                <div className="form-box">
                  <span>?????????</span>
                  <input 
                    type="number"
                    name="ship"
                    value={product.ship}
                    className="style-bottom"
                    onChange={onChange}/>
                </div>
                <div className="form-box">
                  <span>?????????</span>
                  <input 
                    type="number"
                    name="bonus"
                    value={product.bonus}
                    className="style-bottom"
                    readOnly/>
                </div>
                
              </>
              }
              { product.status > 4 ?
              <>
                <div className="form-box">
                  <span>?????? ??????</span>
                  <input
                    type="date"
                    name="settledate"
                    value={product.settledate}
                    className="style-bottom"
                    onChange={onChange}/>
                </div>
                <div className="form-box">
                  <span>??????</span>
                  <span style={{display:"contents"}}>{product.profit}</span>
                  <span>???</span>
                </div>
              </> :
              <>
                <div className="form-box">
                  <span>?????? ??????</span>
                  <span style={{display:"contents"}}>{product.profit}</span>
                  <span>???</span>
                </div>
              </>}
              <div className="form-box">
                <button onClick={calc}>????????????</button>
              </div>
            </div>
    )
}

export default InputForm;