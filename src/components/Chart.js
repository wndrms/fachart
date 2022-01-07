import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import { collection, getDocs } from "@firebase/firestore";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

const Chart = () => {
    const [whiskeys, setwhiskeys] = useState([]);
    const [data, setdata] = useState([]);
    const [selected, setselected] = useState([]);
    useEffect(() => {
        const query = async () => {
            const querySnapshot = await getDocs(collection(dbService, "Whiskey"));
            let tmparray = [];
            querySnapshot.forEach((doc) => {
                tmparray = [...tmparray, {
                    id: doc.id,
                    ...doc.data()
                }];
            });
            setwhiskeys(tmparray);

            const querySnapshot2 = await getDocs(collection(dbService, "pricedata"));
            let tmparray2 = [];
            querySnapshot2.forEach((doc) => {
                tmparray2 = [...tmparray2, {
                    id: doc.id,
                    ...doc.data()
                }];
            });
            setdata(tmparray2);
        }
        query();
    }, []);
    console.log(selected);
    return (
        <div id="wrap" className="Chart">
            <div className="form-wrap">
                <div className="form-box">
                    <span>제품 명</span>
                    <select onChange={(event) => {
                        const {value} = event.target;
                        let tmp = data.filter((item) => item.pdname === value).sort((a, b) => a.date > b.date ? 1 : -1);
                    }}>
                        {whiskeys.map((item) => {
                            return <option value={item.pdname}>{item.pdname}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="form-wrap">
                <div className="form-box">
                    <LineChart width={500} height={300} data={selected}>
                        <XAxis dataKey="date"/>
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                        <Line type="monotone" dataKey="price"/>
                    </LineChart>
                </div>
            </div>
        </div>
    )
}

export default Chart;