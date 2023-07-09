
import { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import { Card, editTask } from '../BoardLists/BoardListSlice';
import { useAppDispatch } from '../../app/hooks';
import { toggleAddEditTask_show  } from './ModalSlice';
import './Modal.css';
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTask } from '../BoardLists/BoardListSlice';



const addEditTask = z.object({
  name: z.string().min(2),
  desc: z.string().min(3),
  status:z.string()
});
type addEditTaskType = z.infer<typeof addEditTask>;
function AddEdit_Task () {
  const mode =useAppSelector(state=>state.modal.addEdit_task_flag);
  const selectedCard:Card|null =useAppSelector(state=>state.modal.selectedCard);
  const theme =useAppSelector(state=>state.sidebar.theme);
  useEffect(() => {
 
    if(mode===false){
      reset({name:'',desc:'',status:''});
    }
    else{
   
     if(selectedCard){
      reset({name:selectedCard.name,desc:selectedCard.desc,status:selectedCard.idList});
     }
     
    }
    

}, [selectedCard,mode]);
  const show:any =useAppSelector(state=>state.modal.addEdit_task_show);
  const lists =useAppSelector(state=>state.boardList.lists);
 
  const dispatch=useAppDispatch();

  const handleClose = () => dispatch(toggleAddEditTask_show(selectedCard));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<addEditTaskType>({ resolver: zodResolver(addEditTask) });
  function api<T>(url: string,obj:object): Promise<T> {
    return fetch(url,obj)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
  
  }
  const onSubmit: SubmitHandler<addEditTaskType> = (data) => {
        if(mode===false){
          api<Card>('https://api.trello.com/1/cards?idList='+data.status+'&key=fc6c565b4ae5538cc27871b87f8ce28b&token=ATTAa190c19de930f11167c6f5a0d6a3594cee8db5d2a2f28a4a6c296fd715bbebdbA1D51C1A&name='+data.name+'&desc='+data.desc+'',
          {
    
            method: 'POST',
            headers: {
              'Accept': 'application/json'
            }
          }
          
          )
          .then((data:Card) => {
       
          dispatch(addTask(data));
          dispatch(toggleAddEditTask_show(selectedCard));
      
          })
          .catch(error => {
        
          })
        }
        else{
          api<Card>('https://api.trello.com/1/cards/'+selectedCard?.id+'?key=fc6c565b4ae5538cc27871b87f8ce28b&token=ATTAa190c19de930f11167c6f5a0d6a3594cee8db5d2a2f28a4a6c296fd715bbebdbA1D51C1A&name='+data.name+'&desc='+data.desc+'&idList='+data.status+'',
          {
    
            method: 'PUT',
            headers: {
              'Accept': 'application/json'
            }
          }
          
          )
          .then((data:Card) => {
       
          dispatch(editTask(data));
          dispatch(toggleAddEditTask_show(selectedCard));
      
          })
          .catch(error => {
        
          })
        }
        }

      
      
            
  return (
    <>
  
  <Modal show={show} onHide={handleClose} centered className={theme==='light'?'light':'dark'}>
    
        <Modal.Body>
            <div className='modal_wrapper'>
            <div className='container'>
            <div className='row m-0 align-items-center'>
              <div className={theme==='light'?'title text-black p-0 mb-3':'title text-white p-0 mb-3'}>{mode===false?'Add New':'Edit'} Task</div>
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                  <div className='formgroup'>
                    <label>Title</label>
                    <input placeholder="ex:Study"  className={theme==='light'?'input text-black':'input text-white'} {...register("name")}></input>
                    {errors.name && <span>{errors.name.message}</span>}
                    </div>

                    <div className='formgroup'>
                    <label>Description</label>
                    <textarea className={theme==='light'?'textarea text-black':'textarea text-white'}  placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little." {...register("desc")} ></textarea>
                    {errors.desc && <span>{errors.desc.message}</span>}
                    </div>

                    <div className='formgroup'>
                    <label>Status</label>
                    <select className="input"  placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little." {...register("status")} >
                    {errors.status && <span>{errors.status.message}</span>}
                      {lists.map((item)=>{
                        return(
                          <option key={item.id} value={item.id}>{item.name}</option>
                        )
                      })}


                    </select>

                    </div>
                    <button type='submit' className='submitbtn'>{mode===false?'Create':'Edit'} Task</button>

                




                </form>

              
            </div>
            
            </div>  

            </div>

        </Modal.Body>
  
      </Modal>
   
 
   
    </>
  );
}

export default AddEdit_Task;