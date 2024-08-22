'use client'

import { useState } from 'react'

import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import DatePicker from 'react-datepicker';

export default function toDO() {

  const [task, insert] = useState('');
  const [tasks, inserts] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const addTask = () => {
    if(task.trim() === '') {
      return;
    };
    inserts([...tasks, {text: task, date: startDate}]);
    insert('');
    setStartDate(new Date());
  }

  const deleteTask = (index) => {
    inserts(tasks.filter((_, i) => i != index));
  }

  const enter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTask();
    }
  }
  
  return (
    <div style={{ backgroundColor: '#F6F6F6', height: '100vh', display: 'flex', justifyContent: 'center'}}>
      <div className="w-50 m-auto p-4" style={{ backgroundColor: 'white', height: '90vh', borderRadius: '15px'}}>
        <h6 className="mb-2" style={{ fontWeight: 'bold' }}>TO-DO</h6>

        <InputGroup className="mb-3">

          <Form.Control type="text" value={task} onChange={(e) => insert(e.target.value)}
            placeholder="Enter New Task Here..." style={{ fontSize: '12px' }} onKeyDown={enter}/>

          <DatePicker className='cus-dp form-control' selected={startDate} onChange={(date) => setStartDate(date)} />

          <Button onClick={addTask} className="cus-btn px-4"
          style={{ backgroundColor: 'lightgray', color: 'black', border: 'none', fontWeight: 'bold', fontSize: '12px' }}>
            add task
          </Button>

        </InputGroup>

        <ul style={{ padding: '0', listStyleType: 'none' }}>
          {tasks.map((items, index) => (
            <li key={index} className='mb-3' style={{ display: 'flex', alignItems: 'center' }}>
              <div className='w-100' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button onClick={() => deleteTask(index)} className='m-0 p-2 cus-btn-two'
                  style={{ backgroundColor: 'lightgray', border: 'none', fontWeight: 'bold', fontSize: '10px'}}>
                    done
                  </Button>
                  <p className='mx-2 my-0' style={{ padding: '5px', fontSize: '12px'}}>{items.text}</p>
                </div>
                
                <div>
                  <p className='mx-2 my-0' style={{ padding: '5px', fontSize: '12px'}}>{items.date.toLocaleDateString()}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}