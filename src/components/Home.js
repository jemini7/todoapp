import React, {useEffect, useState} from 'react'
import { Container, Row, Col, Form, ListGroup } from "react-bootstrap";
import { FaTimes, FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import moment from 'moment';

function Home() {
    
    var list = [];

    if (localStorage.getItem('todoList')!==null) {
        list = JSON.parse(localStorage.getItem('todoList'));
    }

    const [todoList, setTodoList] = useState(list);
    const [updateList, setUpdateList] = useState(true);

    console.log(todoList);
    useEffect(()=>{
        
    },[updateList])

    const handleDelete = (id) => {
        const list = todoList;
        let index =  list.findIndex(item=>item.todo_id===id);
        list.splice(index, 1);
        setTodoList(list);
        localStorage.setItem('todoList',JSON.stringify(todoList));
        setUpdateList(!updateList);
    }

    const changeStatus = (e) =>{
        console.log(e.target.name,e.target.checked);
        const id = e.target.name;
        const list = [...todoList];
        const index = list.findIndex(l=>l.todo_id==id)
        list[index].todo_status = e.target.checked;
        console.log(list[index]);
        setTodoList(list);
        localStorage.setItem('todoList',JSON.stringify(list));
        setUpdateList(!updateList);
    }

    return (
        <Container className="mt-5 mr-auto mb-5 ml-auto w-75">
            <Row>
                <Col md={12}>
                    <h4 className="fw-bold">Todo List</h4>
                    <div>
                        <Link to={`/form/0`} variant="primary" className="bg-primary p-2 text-white text-decoration-none rounded-1 float-end">ADD</Link>
                    </div>
                </Col>
                <Col md={12}>
                    {todoList ? <ListGroup className="mt-3 text-left">
                        {todoList.map((item,index) => {
                            return (
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                    <input
                                            type="checkbox"
                                            name={item.todo_id}
                                            checked={item.todo_status}
                                            onChange={changeStatus}
                                        />

                                    </Col>
                                    <Col md={7} className="p-0">
                                        {item.todo_title}
                                    </Col>
                                    <Col md={2}>
                                        {moment(item.todo_date).format('DD MMM YYYY hh:mm a')}
                                    </Col>
                                    <Col md={1}>
                                        <Link to={`/form/${item.todo_id}`}>
                                            <FaPen className="bg-success p-1 text-white fs-5 rounded-1" />
                                        </Link>
                                    </Col>
                                    <Col md={1}>
                                        <FaTimes onClick={() => {
                                          const confirmBox = window.confirm(
                                            "Are you sure you want to delete this?"
                                          )
                                          if (confirmBox === true) {handleDelete(item.todo_id)}}} className="bg-danger p-1 text-white fs-5 rounded-1" />
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            )
                        })}
                    </ListGroup>:<div className='text-center text-danger'>No data added</div>}
                </Col>
            </Row>
        </Container>
    )
}

export default Home;