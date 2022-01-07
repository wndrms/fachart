import React, { useEffect, useState } from "react";
import { dbService, storageService } from "fbase";
import { collection, addDoc, getDocs } from "@firebase/firestore";
import { getDownloadURL, ref } from "@firebase/storage";
import Priceinput from "./Priceinput";

const Pricedata = () => {
    const [product, setproduct] = useState({});
    const [whiskeys, setwhiskeys] = useState([]);
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
        }
        query();
    }, []);

    const getImgURL = (pdcode) => {
        const gsReference = ref(storageService, pdcode + '.jpg');
        return gsReference
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        const url = (await getDownloadURL(getImgURL(product.pdname)))
        let giftprice;
        if(product.gift) giftprice = product.price*0.9;
        else giftprice = product.price;
        const productObj = {
            ...product,
            giftprice: giftprice,
            url: url
        }
        console.log(productObj);
        try {
            if(!whiskeys.filter((item) => item.pdname === product.pdname)){
                const WhiskeyObj = {
                    "brand": product.brand,
                    "pdname": product.pdname
                }
                const docRef2 = await addDoc(collection(dbService, 'Whiskey'), WhiskeyObj);
                console.log("Document written with ID: ", docRef2.id);
            }
            
            const docRef = await addDoc(collection(dbService, 'pricedata'), productObj);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    return (
        <div id="wrap" className="Pricedata">
            <Priceinput item={product} onChange={(value) => {
                setproduct({
                    ...product,
                    ...value
                });
            }}/>
            <div className="form-box">
                <button onClick={onSubmit}>저장하기</button>
            </div>
        </div>
    )
}

export default Pricedata;