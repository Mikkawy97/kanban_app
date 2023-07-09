
import { Modal } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import { Card, deleteTask } from '../BoardLists/BoardListSlice';
import { useAppDispatch } from '../../app/hooks';

import './Modal.css';
import { toggleDelete } from './ModalSlice';
import { deleteBoard } from '../Sidebar/SidebarSlice';


function DeleteModal () {
  const show:any =useAppSelector(state=>state.modal.delete_show);
const currentCard=useAppSelector(state=>state.modal.selectedCard);
const currentBoard=useAppSelector(state=>state.sidebar.selectedBoard);
const theme =useAppSelector(state=>state.sidebar.theme);

  const flag:String=useAppSelector(state=>state.modal.deleteTaskBoard_flag);
  const dispatch=useAppDispatch();
  const handleClose = () => dispatch(toggleDelete(""));
  function api<T>(url: string,obj:object): Promise<T> {
    return fetch(url,obj)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
  
  }

  return (
    <>
  
  
   
  <Modal show={show} centered onHide={handleClose} className={theme==='light'?'light':'dark'}>
    
        <Modal.Body>
            <div className='modal_wrapper'>
            <div className='container'>
            <div className='row m-0 align-items-center'>
              <div className='col-md-12'>
                <div className='delete_title'>Delete {flag==='task'?'this Task':"this board"}</div>
                <div className='delete_desc'>{flag==='board'?'Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.':'Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.'}</div>
               

              </div>
              <div className='col-md-6'>
              <button className='delete_btn'onClick={()=>{
                if(flag==='board'){
                  api<Card>('https://api.trello.com/1/boards/'+currentBoard?.id+'?key=fc6c565b4ae5538cc27871b87f8ce28b&token=ATTAa190c19de930f11167c6f5a0d6a3594cee8db5d2a2f28a4a6c296fd715bbebdbA1D51C1A',
                  {
            
                    method: 'DELETE'
                  }
                  
                  )
                  .then((data:Card) => {
               
                  dispatch(deleteBoard(currentBoard));
              
                  })
                  .catch(error => {
                
                  })


                }
                else{
                  

                  api<Card>('https://api.trello.com/1/cards/'+currentCard?.id+'?key=fc6c565b4ae5538cc27871b87f8ce28b&token=ATTAa190c19de930f11167c6f5a0d6a3594cee8db5d2a2f28a4a6c296fd715bbebdbA1D51C1A',
                  {
            
                    method: 'DELETE'
                  }
                  
                  )
                  .then((data:Card) => {
               
                    dispatch(deleteTask(currentCard));
              
                  })
                  .catch(error => {
                
                  })





                }
              }}>Delete</button>  
              </div>
              <div className='col-md-6'>
                  <button className='cancel_btn'
                  onClick={()=>{
                    handleClose();
                  }}
                  >Cancel</button>
              </div>



              
            </div>
            
            </div>  

            </div>

        </Modal.Body>
  
      </Modal>
   
    </>
  );
}

export default DeleteModal;