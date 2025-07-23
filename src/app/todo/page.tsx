'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import "./../components/todoStyle.css";
import dayjs from "dayjs";

// type 선언
type Todo = {
    todoChk : string
};

type TodoData ={
    no: string,
    todo: string,
    state: string,
    writeDate: string
}

// 입력받을곳 만들어야함(clear)
// 등록 누르면 list에 표현되어야함

// list 중에 삭제 버튼을 누르면 해당 번째 list만 삭제 되어야함

// list 중에 수정 버튼을 누르면 입력창이 그자리에 나오면서 입력가능하게 해야함

export default function Todo(){

    const [todoWriter , setTodoWriter] = useState("");
    const [todoData , setTodoData] = useState<TodoData[]>([]);
    const [todoPlusInput, setTodoPlusInput] = useState<string>("");
    const [todoUpdateInput, setTodoUpdateInput] = useState<{ [key : string] : string}>({});
    const [changeTodoUpdate , setChangeTodoUpdate] = useState<{ [key : string] : boolean}>({});
    
    // 최초실행
    useEffect(() => {

        setTodoWriter("통신전...");

        const plusStr: Todo = { todoChk : "관리자[" };
        
        const postData = async() => {
            try {
                const res = await axios.post<string>(
                    'http://localhost:8888/api/todoList',
                    // 'http://127.0.0.1:3000/api/todoList',
                    plusStr,
                    {
                        // responseType : 'text',
                        headers : {
                            'Content-Type': 'application/json;charset=UTF-8',
                        }
                    }
                )

                // console.log("ppark chk0 : " + res.data);

                setTodoWriter(todoWriter + res.data);
            } catch (error) {
                console.log("ppark chk1 : " + error);
            }
        };

        postData();

        axios.get('/todoListData.txt', { responseType: 'text' })
        .then((todoRes) => {
            const todoJson = JSON.parse(todoRes.data);
            setTodoWriter(todoJson.writer);
            setTodoData(todoJson.data as TodoData[]);
        })
        .catch(() =>{
            console.log("ppark failed 1");
        })
    },[]);

    // todo 추가,수정,삭제시
    useEffect(()=>{
        // console.log("ppark todo check");
        // console.log("ppark test 3 : " + todoData[5].state);

        const saveTodoList = async () => {
            try {
                await axios.post('http://localhost:8888/api/saveTodoList', {
                    writer: todoWriter,
                    data: todoData
                });
                console.log("txt 파일에 저장 완료");
            } catch (err) {
                console.error("txt 파일 저장 실패", err);
            }
        };

        if (todoData.length > 0) {
            saveTodoList();
        }

    },[todoData])

    function plusTodo() {

        // console.log("ppark 12 : " + todoData.length);
        // const noSet = todoData && todoData.length > 0 ?  String(parseInt(todoData[todoData.length - 1].no) + 1) : "1";

        if(!todoPlusInput){
            alert("ToDo 값이 빈값입니다. ToDo를 입력해주세요!");
            return;
        }

        const existingNos = todoData.map(item => parseInt(item.no)).sort((a, b) => a - b);
    
        let noSet = 1;
        for (let i = 0; i < existingNos.length; i++) {
            if (existingNos[i] !== i + 1) {
                noSet = i + 1;
                break;
            }
            noSet = existingNos.length + 1;
        }

        const plusTodoData : TodoData = {
            no : String(noSet),
            todo : todoPlusInput,
            state: "wait",
            writeDate: dayjs().format("YYYYMMDDHHmmss")
        }

        setTodoData([...todoData,plusTodoData]);
    }

    function changeTodoDiv(chkNo : string , chkBol : boolean){
        // console.log("ppark test 1 : " + chkBol);
        const targetTodo = todoData.find(item => item.no === chkNo);
        if(targetTodo){
            setTodoUpdateInput(prev => ({
                ...prev,
                [chkNo]: targetTodo.todo
            }));

            if(chkBol == true){
                setTodoData(prevData => prevData.map(
                    item => item.no === chkNo ? {
                        ...item, 
                        todo: todoUpdateInput[chkNo] ?? "",
                        writeDate: dayjs().format("YYYYMMDDHHmmss")
                    } : item));
            }

            setChangeTodoUpdate(prev =>({
                ...prev,
                [chkNo]: !prev[chkNo]
            }));
        }
    }

    function changeSelected(chkNo : string , chkVal: string){
        // console.log("ppark test 1 : " + chkNo);
        // const changeNo = String(parseInt(chkNo) - 1);
        // console.log("ppark test 2 : " + changeNo);
        const targetTodoSelected = todoData.find(item => item.no === chkNo);
        if(targetTodoSelected){
            setTodoData((prevData) => prevData.map(
                (item) => item.no === chkNo ? {...item, state : chkVal , writeDate: dayjs().format("YYYYMMDDHHmmss") } : item
            ));
        }
    }

    function deleteTodo(no : string) {
        // 새로운 배열 생성 > 주소값 변경을 위해
        const filteredData = todoData.filter(item => item.no !== no);

        // 번호 재부여 1,2,4 >>> 1,2,3
        const renumbered = filteredData.map((item, idx) => ({
            ...item,
            no: String(idx + 1),
        }));

        setTodoData(renumbered);
    }

    const contents = {
        main:{
            display: "block",
            // width: "60%",
            // height: "70px",
            // textAlign: "center",
            // border: "1px solid #999999",
            // verticalAlign: "middle"
            // justifyContent: "center",
            // alignItems: "center",
            fontSize : "25px" ,
            fontWeight : "bold",
            margin: "50px 0 0 50px"
        } as React.CSSProperties,
        sub:{
            // fontSize: "25px",
            // fontWeight : "bold",
            margin: "5px 0 0 50px"
        }as React.CSSProperties,
        cont:{
            height: "2000px",
            margin: "5px 50px 0 50px"
        }as React.CSSProperties,
        contTitle:{
            margin: "5px 0",
            fontSize: "25px",
            fontWeight: "bold"
        }as React.CSSProperties,

    }

    return (
        <>
            <div style={contents.main}>2. Todo List</div>
            <div style={contents.sub}>
                {"작성자 : " + todoWriter}
            </div>
            <br/>
            <div style={contents.cont}>
                <div style={contents.contTitle}>
                    {/* &quot; = " , &apos,&#39; = ' , 	&lt; = < , &gt = >; , &amp; = & */}
                    &apos;{todoWriter}&apos;의 TodoList
                </div>
                <div id="inputArea">
                    <input
                        type="text"
                        value={todoPlusInput}
                        onChange={(input)=> setTodoPlusInput(input.target.value)}
                    />
                    <button onClick={plusTodo}>Todo 추가</button>
                </div>
                <div id="todoContainer">
                    <ul id ="todoContent">
                        {/* 화면 상단 표시 부분 >>> 순번 , 제목 */}
                        <li id="todoTitle">
                            <ul>
                                <li>순번</li>
                                <li>TODO</li>
                                <li>실행여부</li>
                                <li>작성날짜</li>
                                <li>수정</li>
                                <li>삭제</li>
                            </ul>
                        </li>
                        {/* 실데이터 표현 부분 map 돌려야함 */}
                        {/* 폰트도 무료로 변경 */}
                        {/* 추후에 정렬기능도 있었으면 좋겠음 >>> 정렬하기(1) , 완료만 보기 이런거(2) ,그룹화도 고려(3) */}
                        {/* 오늘 작성날짜로부터 23시간 지난건 노란색으로 표시 */}
                        <li id="todoCont">

                            {todoData.map((item)=> (
                                <ul key={item.no}>
                                    <li>{item.no}</li>
                                    <li>
                                        <div id={!changeTodoUpdate[item.no] ? "" : "disNone"}>
                                            {item.todo}
                                        </div>
                                        <div id={changeTodoUpdate[item.no] ? "" : "disNone"}>
                                            <input 
                                                type="text" 
                                                id="inputText" 
                                                value={todoUpdateInput[item.no] ?? ""}
                                                onChange={(e)=> setTodoUpdateInput((prev) =>({
                                                    ...prev,
                                                    [item.no] : e.target.value
                                                }))}
                                             />
                                            <button id="uptBtn" onClick={() => changeTodoDiv(item.no,changeTodoUpdate[item.no] ?? false)}>수정완료</button>
                                        </div>
                                    </li>
                                    {/* 완료 진행중 보류 대기 , dropbox 처리 , 0.00274%(하루) >>> 이런것 처럼 문구 2개 이상으로 하자 */}
                                    {/* <li>
                                        <select 
                                            value={item.state} 
                                            onChange={(e) => changeSelected(item.no,e.target.value)}
                                        >
                                            <option value="wait">생각나는거 적어놨어(대기)</option>
                                            <option value="try">오늘도 한발짝 나아가는 중(진행중)&nbsp;&nbsp;</option>
                                            <option value="pending">살짝 쉬어가는 중(보류)</option>
                                            <option value="clear">해결! 그동안 고생했어(완료)</option>
                                        </select>
                                    </li> */}
                                    <li>
                                        <select 
                                            value={item.state} 
                                            onChange={(e) => changeSelected(item.no,e.target.value)}
                                        >
                                            <option value="wait">(대기)</option>
                                            <option value="try">(진행중)&nbsp;&nbsp;</option>
                                            <option value="pending">(보류)</option>
                                            <option value="clear">(완료)</option>
                                        </select>
                                    </li>
                                    {/* <li>{dayjs(item.writeDate,"YYYYMMDDHHmmss").format("YYYY-MM-DD HH시mm분ss초")}</li> */}
                                    <li style={{ whiteSpace : 'pre' }}>
                                        {dayjs(item.writeDate,"YYYYMMDDHHmmss").format("YYYY-MM-DD   HH:mm:ss")}
                                    </li>
                                    {/* 추후버튼처리필요 */}
                                    {/* 수정버튼 누르면 바로 focus 이동하게 만들어야함 */}
                                    <li>
                                        <button 
                                            id={!changeTodoUpdate[item.no] ? "" : "disNone"}
                                            onClick={() => changeTodoDiv(item.no,changeTodoUpdate[item.no] ?? false)}>
                                        수정
                                        </button>
                                        <button 
                                        id={changeTodoUpdate[item.no] ? "" : "disNone"}
                                        onClick={() => changeTodoDiv(item.no,changeTodoUpdate[item.no] ?? false)}>
                                        수정완료
                                        </button>
                                    </li>
                                    {/* 추후버튼처리필요 ,휴지통모양 아이콘 처리 저작권 없음 chatGPT가 만들어줌*/}
                                    <li>
                                        <button onClick={() => deleteTodo(item.no)}>
                                            <img src="/delBtn.svg"></img>
                                        </button>
                                    </li>
                                </ul>
                            ))}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}