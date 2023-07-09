
import { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import { Card,setLists } from '../BoardLists/BoardListSlice';
import { useAppDispatch } from '../../app/hooks';
import { setListCopy, toggleAddEditBoard_show } from './ModalSlice';
import './Modal.css';

import { List } from '../BoardLists/BoardListSlice';
import { IoMdClose } from "react-icons/io";
import { Board } from '../Sidebar/SidebarSlice';
import { add_edit_Board,addBoard ,editBoard} from '../Sidebar/SidebarSlice';



function AddEdit_Board () {
  const mode =useAppSelector(state=>state.modal.addEdit_board_flag);

  const selectedBoard:Board|null =useAppSelector(state=>state.sidebar.selectedBoard);
  const theme =useAppSelector(state=>state.sidebar.theme);
 
  useEffect(() => {

    if(mode===false){
      var obj:Board={name:'',id:'',lists:[]}
      dispatch(setListCopy(obj))
    }
      else{
       
          if(selectedBoard !==null){
            var temp={...finallist};
            temp.lists=[...lists];

            temp.name=selectedBoard?.name;
           
             dispatch(setListCopy(temp));
       
          }
    

          // reset({name:selectedBoard?.name,lists:selectedBoard?.lists})
      }
    

}, [selectedBoard,mode]);
  const show:any =useAppSelector(state=>state.modal.addEdit_board_show);
  const lists =useAppSelector(state=>state.boardList.lists);
  const finallist =useAppSelector(state=>state.modal.listsCopy);
 
  const dispatch=useAppDispatch();

  const handleClose = () => dispatch(toggleAddEditBoard_show());

  function api<T>(url: string,obj:object): Promise<T> {
    return fetch(url,obj)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
  
  }
  const handleCreateChange= () => {

    
         
            api<Board>('https://api.trello.com/1/boards/?name='+finallist.name+'&key=fc6c565b4ae5538cc27871b87f8ce28b&token=ATTAa190c19de930f11167c6f5a0d6a3594cee8db5d2a2f28a4a6c296fd715bbebdbA1D51C1A&defaultLists=false',
            {

              method: 'POST',
        
            }
            
            )
            .then((board:Board) => {
              dispatch(addBoard(board));
              var tempboard:Board={...board};
              tempboard.lists=[];
            
             
              for (let index = 0; index < finallist.lists.length; index++) {
                api<List>('https://api.trello.com/1/boards/'+board.id+'/lists?name='+finallist.lists[index].name+'&key=fc6c565b4ae5538cc27871b87f8ce28b&token=ATTAa190c19de930f11167c6f5a0d6a3594cee8db5d2a2f28a4a6c296fd715bbebdbA1D51C1A',
                {
    
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json'
                  }
                }
                
                )
                .then((list:List) => {
                    tempboard.lists.push(list);
                  
                     dispatch(add_edit_Board(tempboard));
                      
    
                })
                .catch(error => {
              
                })
                
              }
             

            })
            .catch(error => {
          
            })
          
            dispatch(setLists(finallist.lists));
            dispatch(toggleAddEditBoard_show());
       
      }
  const handleEditChange=()=>{
    console.log(finallist);
    console.log(lists);
 
 
    var arr=finallist.lists.filter((item)=>{
      if(item.id.includes('new')){
        return true;
      }
      else{
        return false;
      }
    
    
    
    }
      
      );
   
      if(arr.length!==0){

          for (let index = 0; index < arr.length; index++) {

          api<Card>('https://api.trello.com/1/boards/'+selectedBoard?.id+'/lists?name='+arr[index].name+'&key=fc6c565b4ae5538cc27871b87f8ce28b&token=ATTAa190c19de930f11167c6f5a0d6a3594cee8db5d2a2f28a4a6c296fd715bbebdbA1D51C1A',
          {
    
            method: 'POST',
            headers: {
              'Accept': 'application/json'
            }
          }
          
          )
          .then((data:Card) => {
            
            console.log('sad')

      
          })
          .catch(error => {
        
          })
            console.log(selectedBoard?.name);
          
          }
      }
      if(finallist.name !==selectedBoard?.name){
        console.log('dad');
      api<Card>('https://api.trello.com/1/boards/'+selectedBoard?.id+'?key=fc6c565b4ae5538cc27871b87f8ce28b&token=ATTAa190c19de930f11167c6f5a0d6a3594cee8db5d2a2f28a4a6c296fd715bbebdbA1D51C1A&name='+finallist.name+'',
      {

        method: 'PUT',
      
      }
      
      )
      .then((data:Card) => {
   
        console.log('sad')

  
      })
      .catch(error => {
    
      })

   
    }
    for (let index = 0; index < finallist.lists.length; index++) {
      if(finallist.lists[index]?.name !==lists[index]?.name && finallist.lists[index]?.id ===lists[index]?.id ){
        api<Card>('https://api.trello.com/1/list/'+finallist.lists[index].id+'?key=fc6c565b4ae5538cc27871b87f8ce28b&token=ATTAa190c19de930f11167c6f5a0d6a3594cee8db5d2a2f28a4a6c296fd715bbebdbA1D51C1A&name='+finallist.lists[index].name+'',
        {
  
          method: 'PUT',
          headers: {
            'Accept': 'application/json'
          }
        
        }
        
        )
        .then((data:Card) => {
          console.log('sad')
           
       

    
        })
        .catch(error => {
      
        })
      }
    
  }
  dispatch(setLists(finallist.lists));
  dispatch(editBoard({board:finallist,id:selectedBoard.id}));
  dispatch(toggleAddEditBoard_show());
  
  }

       
            
  return (
    
    <>
  
  <Modal show={show} onHide={handleClose} centered className={theme==='light'?'light':'dark'} >
    
        <Modal.Body>
            <div className='modal_wrapper'>
            <div className='container'>
            <div className='row m-0 align-items-center'>
              <div className={theme==='light'?'title text-black p-0 mb-3':'title text-white p-0 mb-3'}>{mode===false?'Add New':'Edit'} Board</div>
                <form  className="form">
                  <div className='formgroup'>
                    <label>Name</label>
                    <input placeholder="ex:Web Design "  className={theme==='light'?'input text-black':'input text-white'} 
                      value={finallist.name}
                      onChange={(e)=>{
                        var temp={...finallist};
                        temp.name=e.target.value;
                        dispatch(setListCopy(temp));
                      }}

                    
                    ></input>
                    
                    </div>

                    <div className='formgroup'>
                    <label>Columns</label>
                        {finallist.lists.map((item,index)=>{
                                var board={...finallist}
                                var itemcopy:List={...item};
                                var temp=[...finallist.lists];
                                if(item.id==='-1'){

                                  itemcopy.id=String(index)+'new';
                                

                                  
                                 
                                  
                                
                                }
                          return(
                            <div key={index}>
                            <div className='d-flex align-items-center mb-12'>
                              <input className={theme==='light'?'subtask_input text-black':'subtask_input text-white'}
                           
                               
                               name={finallist.lists[index].id}  
                              value={finallist.lists[index].name}
                              onChange={(e)=>{
                               
                             
                                temp.map((item,i)=>{
                             
                                    if(item.id===e.target.name ){
                               
                                      var t={...itemcopy}
                                      t.name=e.target.value;
                                     
                                      temp.splice(i,1,t);
                                      
                                    }

                                   
                                      
                                    board.lists=[...temp];
                                dispatch(setListCopy(board));
                              
                                });
                              
                             
                           

                           
                            
                               
                              }}
                              />
                              <IoMdClose size={20} color='#828FA3'
                            
                                cursor='pointer'
                                onClick={()=>{
                                  var temp={...finallist};
                                  console.log(temp,"asdddddddddddddddddd")
                                  temp.lists=[...finallist.lists];
                                  temp.lists.splice(index,1);
                                
                                    dispatch(setListCopy(temp));
                                }}
                              
                              />
                              
                            </div>
                            
                           </div>
                          )
                        })}
                    </div>

                    <button  className='newColBtn'
                    type='button'
                    onClick={()=>{
                      
                        var temp={...finallist};
                        var templist=[...temp.lists];
                            templist.push({name:'',id:'-1',cards:[]})
                    
                        temp.lists=templist;
                      
                          
                        dispatch(setListCopy(temp));


                    }}
                    
                    >+Add New Column</button>
                    <button type='button'  className='submitbtn' onClick={()=>{
                        var temp={...finallist}

                      
                    
                 
                        if(mode===false){
                          dispatch(setListCopy(temp));
                          handleCreateChange();

                        }
                        else{
               
                          temp.id=selectedBoard.id;
                          dispatch(setListCopy(temp));
                          handleEditChange();
                        }
                     
                    }}>{mode===false?'Create New Board':'Save Changes'}  </button>

                




                </form>

              
            </div>
            
            </div>  

            </div>

        </Modal.Body>
  
      </Modal>
   
 
   
    </>
  );
}

export default AddEdit_Board;