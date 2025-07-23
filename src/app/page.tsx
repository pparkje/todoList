// import Image from "next/image";
import Test from "../app/test/page";
import Todo from "../app/todo/page";

// 여기가 메인임

export default function Home() {

  const newTitle = {
    main:{
      display: "block",
      width: "100%",
      margin: "50px 0"

    }as React.CSSProperties,
    sub:{
          display: "flex",
          width: "60%",
          height: "70px",
          // textAlign: "center",
          fontSize: "30px",
          fontWeight : "bold",
          border: "1px solid #999999",
          // verticalAlign: "middle"
          justifyContent: "center",
          alignItems: "center",
          margin: "0 20%"
    } as React.CSSProperties,
    
  }

  return (
    <>
      <div style={newTitle.main}>
        <div style={newTitle.sub}>HELLO!!! PPARK !!! NEW!!! Project!!!</div>
      </div>
      <hr />
      <Test />
      <br />
      <hr />
      <Todo />
    </>
  );
}
