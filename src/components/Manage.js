import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { collection, addDoc } from "@firebase/firestore";
import { getDownloadURL, ref } from "@firebase/storage";
import InputForm from "./InputForm";

const Manage = () => {
  const [product, setproduct] = useState({
    'status': 0,
    'profit': 0
  });

  const getImgURL = (pdcode) => {
    const gsReference = ref(storageService, pdcode + '.png');
    return gsReference
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    const url = (await getDownloadURL(getImgURL(product.pdcode))).toString();
    const productObj = {
      ...product,
      url: url
    }
    console.log(productObj);
    try{
      const docRef = await addDoc(collection(dbService, "product"), productObj);
      console.log("Document written with ID: ", docRef.id);
      setproduct({
        'status': 0,
        'profit': 0
      });
    } catch (e){
      console.error("Error adding document: ", e);
    }
  }
    return (
        <div id="wrap" className="Manage">
            <div className="chart">
            </div>
            <InputForm item={product} onChange={(value) => {
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

export default Manage;