import React, { useState } from "react";

const Priceinput = props => {
    const [product, setproduct] = useState(props.item);
    const onChange = event => {
        const {name, value} = event.target;
        setproduct({
            ...product,
            [name]: value
        });
        props.onChange({
            ...product,
            [name]: value
        });
    }
    return (
        <div className="form-wrap">
            <div className="form-box">
                <span>브랜드</span>
                <input
                    type="text"
                    name="brand"
                    className="style-bottom"
                    onChange={onChange}/>
            </div>
            <div className="form-box">
                <span>상품명</span>
                <input
                    type="text"
                    name="pdname"
                    className="style-bottom"
                    onChange={onChange}/>
            </div>
            <div className="form-box">
                <span>판매처</span>
                <input
                    type="text"
                    name="seller"
                    className="style-bottom"
                    onChange={onChange}/>
            </div>
            <div className="form-box">
                <span>판매 날짜</span>
                <input
                    type="date"
                    name="date"
                    className="style-bottom"
                    onChange={onChange}/>
            </div>
            <div className="form-box">
                <span>판매 가격</span>
                <input
                    type="number"
                    name="price"
                    className="style-bottom"
                    onChange={onChange}/>
            </div>
            <div className="form-box">
                <span>상품권 여부</span>
                <input
                    type="checkbox"
                    name="gift"
                    onChange={onChange}/>
            </div>
        </div>
    )
}

export default Priceinput;