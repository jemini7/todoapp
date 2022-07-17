import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";

function TodoForm() {

    let { todoid } = useParams();

    const navigate = useNavigate();

    const [todoDate, setTodoDate] = useState(new Date());

    var list = [];

    if (localStorage.getItem('todoList')!==null) {
        list = JSON.parse(localStorage.getItem('todoList'));
    }
    const [todoList, setTodoList] = useState(list);

    const { register, handleSubmit, reset, getValues } = useForm({
        defaultValues: {
            todo_id: todoList?todoList.length+1:1,
            todo_title: '',
            todo_date: new Date(),
            todo_status: false
        }
    });

    useEffect(()=>{
        if (todoid>0) {
            let item = todoList.find((i)=>i.todo_id==todoid);
            reset({
                todo_id: item.todo_id,
                todo_title: item.todo_title,
                todo_date: item.todo_date,
                todo_status: item.todo_status
            });
            console.log(item.todo_date);
            setTodoDate(new Date(item.todo_date));
        }
    },[todoid])

    const handleTodoDateChange = (date) =>{
        setTodoDate(date);
        reset({...getValues(), todo_date: date});
    }

    const onSubmit = (data) => {
        console.log(data.todo_id);
        console.log(todoList);
        let index = todoList.findIndex(i=>i.todo_id==data.todo_id);

        if (index!=-1) {
            console.log('true');
            todoList[index] = data;
            setTodoList(list);
            localStorage.setItem('todoList',JSON.stringify(todoList));
        }else{
            console.log('else');
            const list = [...todoList, data];
            setTodoList(list);
            localStorage.setItem('todoList',JSON.stringify(list));            
        }
        navigate("/");
    }

    return (
        <Container className="mt-5 mr-auto mb-5 ml-auto w-50">
            <Row>
                <Col md={12} className='border border-3 border-light rounded p-5'>
                    <h4>{todoid>0?'Update':'Add'}</h4>
                    <Form onSubmit={handleSubmit(onSubmit)} className="text-center">
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Control type="text" placeholder="Enter Title" {...register("todo_title")} required/>
                        </Form.Group>
                        <DatePicker
                            placeholderText='Select date & time'
                            selected={todoDate}
                            onChange={handleTodoDateChange}
                            className="form-control"
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="dd-MM-yyyy h:mm aa"
                            timeCaption="time"
                            isClearable={true}
                        />
                        <Button variant="primary" type="submit" className='mt-3'>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default TodoForm;