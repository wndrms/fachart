import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, getDocs } from "@firebase/firestore";

const Analytics = () => {
    const [products, setproducts] = useState([]);
    const [kream, setkream] = useState(0);
    const [soldout, setsoldout] = useState(0);
    const [sum1, setsum1] = useState(0);
    const [sum2, setsum2] = useState(0);
    const [maxproduct, setmaxproduct] = useState();
    const [month, setmonth] = useState('08');
    const [organize, setorganize] = useState([]);
    useEffect(() => {
        const query = async () => {
            const querySnapshot = await getDocs(collection(dbService, "product"));
            var productarray = [];
            querySnapshot.forEach((doc) => {
                productarray = [...productarray, {
                    id: doc.id,
                    ...doc.data()
                }];
            });
            setproducts(productarray);
            
        }
        query();
    }, []);
    const monthly = (mon) => {
        var kreamsum = 0;
        var soldoutsum = 0;
        var kreamcount = 0;
        var soldoutcount = 0;
        var max = 0;
        var maxpd;
        var organ = [];
        products.forEach((product) => {
            if(product.status === 5){
                if(product.settledate.indexOf('-' + mon + '-') > 0){
                    if(organ.find(ob => ob.pdcode === product.pdcode)) {
                        organ.find(ob => ob.pdcode === product.pdcode).count += 1;
                        organ.find(ob => ob.pdcode === product.pdcode).sum += product.profit;
                    } else {
                        organ = [...organ, {
                            'pdcode' : product.pdcode,
                            'count' : 1,
                            'sum' : product.profit
                        }];
                    }
                    if(product.profit > max) {
                        max = product.profit;
                        maxpd = product;
                    }
                    if(product.platform === 'KREAM'){
                        kreamcount += 1;
                        kreamsum += product.profit;
                    }
                    else{
                        soldoutcount += 1;
                        soldoutsum += product.profit;
                    }
                } 
            }
        });
        organ.sort((a, b) => a.sum < b.sum ? 1 : -1);
        setmonth(mon);
        setorganize(organ);
        setsum1(kreamsum);
        setsum2(soldoutsum);
        setkream(kreamcount);
        setsoldout(soldoutcount);
        setmaxproduct(maxpd);
    }
    return(
        <div id="wrap" className="Analytics">
            <div className="form-wrap">
                <div className="form-box">
                  <span>월 선택</span>
                  <select onChange={(event) => {
                      const {value} = event.target;
                      monthly(value);
                  }}>
                    <option value='08'>8</option>
                    <option value='09'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                  </select>
                </div>
                <div className="form-box">
                    <h1>{month}월 정산</h1>
                    <span>{sum1 + sum2}</span>
                </div>
                <div className="form-box">
                    <h2>Kream 판매</h2>
                    <span>{kream}회</span>
                    <span>{sum1}원</span>
                </div>
                <div className="form-box">
                    <h2>Soldout 판매</h2>
                    <span>{soldout}회</span>
                    <span>{sum2}원</span>
                </div>
                { maxproduct !== undefined && (
                    <div className="form-box">
                        <h3>가장 높은 수익</h3>
                        <span>{maxproduct.pdcode}</span>
                        <span>{maxproduct.profit}원</span>
                        <img src={maxproduct.url} alt="" style={{width:"100px", height:"100px"}}/>
                    </div>
                )}
                {organize.map((product) => {
                    return(
                        <div className="form-box">
                            <span>{product.pdcode}</span>
                            <span>{product.count}</span>
                            <span>{product.sum}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Analytics;