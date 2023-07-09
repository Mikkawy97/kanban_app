import React from 'react';



import './BoardList_styles.css'
import { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useAppDispatch } from '../../app/hooks';
import { setLists } from './BoardListSlice';
import { List } from './BoardListSlice';
import { Card } from './BoardListSlice';
import { toggleViewTask_show } from '../Modals/ModalSlice';
import { CheckList } from './BoardListSlice';
import { Checkitem } from './BoardListSlice';
import ViewTaskModal from '../Modals/ViewTaskModal';
import AddEdit_Task from '../Modals/AddEdit_Task';
import AddEdit_Board from '../Modals/AddEdit_Board';
import DeleteModal from '../Modals/DeleteModal';
import Siderbar_Modal from '../Modals/Sidebar_Modal';
import { toggleAddEditBoard_show ,editBoard_mode} from '../Modals/ModalSlice';

function BoardList() {

    const selectedBoard=useAppSelector(state=>state.sidebar.selectedBoard);
    const lists=useAppSelector(state=>state.boardList.lists);
    const theme=useAppSelector(state=>state.sidebar.theme);
    const colors:string[]=['#49C4E5','#8471F2','#67E2AE']

    const dispatch=useAppDispatch();
    function api<T>(url: string): Promise<T> {
        return fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
      
      }

      useEffect(() => {
   
          if(selectedBoard?.id!==''){
          
                api<[]>('https://api.trello.com/1/boards/'+selectedBoard?.id+'/lists?key=fc6c565b4ae5538cc27871b87f8ce28b&token=ATTAa190c19de930f11167c6f5a0d6a3594cee8db5d2a2f28a4a6c296fd715bbebdbA1D51C1A')
                  .then((data:List[]) => {
                    
                     var temp:List[]=data;
                 

                    api<[]>('https://api.trello.com/1/boards/'+selectedBoard?.id+'/cards?key=fc6c565b4ae5538cc27871b87f8ce28b&token=ATTAa190c19de930f11167c6f5a0d6a3594cee8db5d2a2f28a4a6c296fd715bbebdbA1D51C1A')
                    .then((data:Card[]) => {
                      var cards:Card[]=data;
                
                     

                      api<[]>('https://api.trello.com/1/boards/'+selectedBoard?.id+'/checklists?key=fc6c565b4ae5538cc27871b87f8ce28b&token=ATTAa190c19de930f11167c6f5a0d6a3594cee8db5d2a2f28a4a6c296fd715bbebdbA1D51C1A')
                    .then((data:CheckList[]) => {
                      var checklist:CheckList[]=data;
                      for (let i = 0; i < temp.length; i++){
                        temp[i].cards=[];
                        for (let index = 0; index < cards.length; index++) {
                          cards[index].checkitems=[];  

                          for (let j = 0; j < checklist.length; j++) {
                           
                            if(checklist[j].idCard===cards[index].id){
                            
                                  var Checkitems:Checkitem[]=checklist[j].checkItems;
                                  
                                  for (let z = 0; z < Checkitems.length; z++) {
                                 
                                    cards[index].checkitems.push(Checkitems[z]);
                                  
                                  
                              
                                  }
                                    
                            }
                          
                          
                         }



                  
                               if(cards[index].idList===temp[i].id){
                           
                                 temp[i].cards.push(cards[index]);
                               }
                            
                         
                        }
                       }
                  
                  
                     dispatch(setLists(temp));
                      
                    }).catch(error=>{
                      
                    })
                      
                    }).catch(error=>{

                    })
                    
                    
                

                  })
                  .catch(error => {
                
                  })
                
                      
                }
          }, [selectedBoard]);
          

  return (
    <div className='boardlist_container'>
    <div className="container-fluid">
  {lists.length !==0?
    <div className=' slider row m-0 '>
        {lists.map((item,index)=>{
          var colorcounter=index;
            if(colorcounter>2){
              colorcounter=0;
            }
            return (
              <div key={item.id} className='col-md-3 '>
                <div  className='list_styles'>
                  <div className='d-flex align-items-center mb-3'>
                    <div className='circle_custom' style={{backgroundColor:colors[colorcounter]}}></div>
                    <div className='list_name'>{item.name} ({item.cards.length})</div>
                    </div>

                    {lists[index].cards.map((item)=>{
                      return(
                        <div key={item.id} className={theme==='light'?'list_card bg-white':'list_card bg-darksidebar'} onClick={()=>{
                          dispatch(toggleViewTask_show(item));
                         
                        }}>
                          <div className={theme==='light'?'card_title text-black':'card_title text-white'}>{item.name}</div>
                          {item.checkitems?
                          <div className='subtask_style'>{item.checkitems?.filter((element, index) => { return element.state==="complete" })?.length} of {item.checkitems?.length} subtasks</div>

                        :
                        <div className='subtask_style'>There is no subtasks</div>
                        }
                          


                        </div>  
                      )

                    })}


                 

                
                </div> 
                
                </div>
            )
        })}
        <div className='col-md-3'>
         <button className={theme==='light'?'columnlist bg-lightlist':'columnlist bg-darklist'} onClick={()=>{
          
              dispatch(toggleAddEditBoard_show());
              dispatch(editBoard_mode());
         }} >
                      <div className='addnew_col'>+add new column</div>
                  </button> 
                  </div>
    </div>:
    <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center nolist_cont'>
        <div className='nolist_title'>This board is empty. Create a new column to get started.</div>
        <button className='addcol_btn'
        onClick={()=>{
          dispatch(toggleAddEditBoard_show());
          dispatch(editBoard_mode());
        }}
        
        >add new column</button>

    </div>  
    
    }
    </div>
    <ViewTaskModal />
    <AddEdit_Task />
    <AddEdit_Board />
    <DeleteModal />
    <Siderbar_Modal />
    
    </div>
           

  );
}

export default BoardList;
