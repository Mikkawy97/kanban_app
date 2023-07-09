import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './Modal.css';
import { useAppSelector } from '../../app/hooks';
import { useAppDispatch } from '../../app/hooks';
import { toggleViewTask_show,toggleAddEditTask_show,edittask_mode, SetTask } from './ModalSlice';

import { Card } from '../BoardLists/BoardListSlice';
import { FaEllipsisV } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import { List } from '../BoardLists/BoardListSlice';

import { editTask } from '../BoardLists/BoardListSlice';
import Dropdown from 'react-bootstrap/Dropdown';
import { toggleDelete } from './ModalSlice';

function ViewTaskModal() {
  const show:any =useAppSelector(state=>state.modal.viewTask_show);
  const selectedCard:Card|null =useAppSelector(state=>state.modal.selectedCard);
  const lists:List[]=useAppSelector(state=>state.boardList.lists);
  const dispatch=useAppDispatch();
  const theme =useAppSelector(state=>state.sidebar.theme);
  const handleClose = () => dispatch(toggleViewTask_show(selectedCard));

  function api<T>(url: string): Promise<T> {
    return fetch(url,{
    
      method: 'PUT',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
  
  }
  return (
    <>
      <Modal  
      show={show} 
      onHide={handleClose} 
      centered
      className={theme==='light'?'light':'dark'}
      >
       
        <Modal.Body>
          {selectedCard?
          <div className='modal_wrapper'>
          <div className='container'>
            <div className='row m-0 align-items-center'>
              <div className='col-md-9'>
                <div className={theme==='light'?'title text-black ':'title text-white '}>{selectedCard.name}</div>
              </div>
              <div className='col-md-3 d-flex justify-content-end'>
              <Dropdown>

              <Dropdown.Toggle className='dropdown_btn'>
              <FaEllipsisV size={20} color='#828FA3' >  </FaEllipsisV>
              </Dropdown.Toggle>
           
              <Dropdown.Menu>
               <Dropdown.Item  className='menuitem text-black'
               onClick={()=>{
                handleClose();
                dispatch(edittask_mode());
                  dispatch(toggleAddEditTask_show(selectedCard));

               }}
               
               >Edit Task</Dropdown.Item>
                <Dropdown.Item  className='menuitem text-red'
                    onClick={()=>{
                      dispatch(toggleDelete("task"));
                      dispatch(SetTask(selectedCard));
                    }}

                >Delete Task</Dropdown.Item>
              
              </Dropdown.Menu>`

            

              </Dropdown>
              </div>
              <div className='col-md-12'>
                <div className='desc  mt-24'>{selectedCard.desc}</div>
              </div>
              <div className='col-md-12'>
              <div className='subtask mt-24'>Subtasks ({selectedCard.checkitems?.filter((element, index) => { return element.state==="complete" })?.length} of {selectedCard.checkitems?.length})</div>
              {selectedCard.checkitems?.map((item)=>{
                return(
                  <div key={item.id} className='checkcard'>
                    <Form.Check className='mr-20' defaultChecked={item.state==='complete'}
                      // onChange={(e)=>{
                      //   console.log(item.name);
                      //   api<[]>('https://cors-anywhere.herokuapp.com/api.trello.com/1/checklists/'+selectedCard.idChecklists[0]+'/'+item.name+'?value=complete&key=fc6c565b4ae5538cc27871b87f8ce28b&token=ATTAa190c19de930f11167c6f5a0d6a3594cee8db5d2a2f28a4a6c296fd715bbebdbA1D51C1A')
                      //   .then((data) => {
                     
                    
                      //   })
                      //   .catch(error => {
                      
                      //   })

                      // }}  
                    
                    />
                    <div className={item.state==='complete'?'checkeditem':'uncheckeditem'}>{item.name}</div>
                  </div>

                )
              })}

            </div>
            <div className='col-md-12'>
            <div className='subtask mt-24'>Current Status</div>
            <Form.Select
            className='mt-8'
            value={selectedCard.idList}
            onChange={(e)=>{
              api<Card>('https://api.trello.com/1/cards/'+selectedCard.id+'?key=fc6c565b4ae5538cc27871b87f8ce28b&token=ATTAa190c19de930f11167c6f5a0d6a3594cee8db5d2a2f28a4a6c296fd715bbebdbA1D51C1A&idList='+e.target.value+'')
                .then((data:Card) => {
             
                dispatch(editTask(data));
            
                })
                .catch(error => {
              
                })
            }}
            >
            {lists.map((item)=>{
              return (
                <option key={item.id} value={item.id}>{item.name}</option>
              )
            })}
            </Form.Select>
            </div>
            </div>
        

            </div>
          </div>
        
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       :<></> }


        </Modal.Body>
     
      </Modal>
  
   
 
   
    </>
  );
}

export default ViewTaskModal;