'use client';

// import axios from "axios";
// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";

// type 선언
// type Todo = {
//     todoChk : string
// };


export default function Test(){

    const [todoChk , setTodoChk] = useState("");

    useEffect(() => {
        setTodoChk("test page ppark !!");
    },[]);


    // useEffect(() => {

    //     setTodoChk("chk ppark 1 : ");

    //     const plusStr: Todo = { todoChk : "ppark test 1 : [" } ;
        
    //     const postData = async() => {
    //         try {
    //             const res = await axios.post<string>(
    //                 'http://localhost:8888/api/helloA',
    //                 plusStr,
    //                 {
    //                     headers : {
    //                         'Content-Type': 'application/json',
    //                     }
    //                 }
    //             )

    //             console.log("ppark chk0 : " + res.data);

    //             setTodoChk(todoChk + res.data);
    //         } catch (error) {
    //             console.log("ppark chk1 : " + error);
    //         }
    //     };

    //     postData();


    // },[]);

    const subTitle = {
        main:{
            display: "block",
            // width: "60%",
            // height: "70px",
            // textAlign: "center",
            // border: "1px solid #999999",
            // verticalAlign: "middle"
            // justifyContent: "center",
            // alignItems: "center",
            margin: "25px 0 0 50px"
        } as React.CSSProperties,
        sub:{
            fontSize: "25px",
            fontWeight : "bold",
        }as React.CSSProperties,
    }

    return (
        <>
            <div style={subTitle.main}>
                <div style={subTitle.sub}>1. ppark test page</div>
                <div>
                    {"기본 useState : " + todoChk}
                </div>
            </div>
        </>
    );
}