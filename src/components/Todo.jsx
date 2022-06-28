import React, { useState, useEffect } from 'react';
import '../App.css';

/*getting data from localstorage*/
const getLocalItems = () => {
    let list = localStorage.getItem("Lists");

    if(list){
        return JSON.parse(localStorage.getItem("Lists"))
    }else{
        return [];
    }
}

/*Adding and displaing items to the list */
const Todo = () => {
    
    const [inputList, setInputList] = useState('');
    const [Items, setItems] = useState(getLocalItems());
    const [toggleButton, setToggleButton] = useState(true);
    const [isEditItem, setisEditItem] = useState(null);

    useEffect(() => {
        localStorage.setItem("Lists", JSON.stringify(Items))
    }, [Items]);

   

    const displayItems = () =>{
        if(!inputList){
            alert("Please add an item!")
        }else if(inputList && !toggleButton){
            setItems(
                Items.map((itemsVal) =>{
                    if(itemsVal.id === isEditItem){
                        return{...itemsVal, name:inputList}
                    }
                    return itemsVal;
                })
            )
            setToggleButton(true);
            setInputList('');
            setisEditItem(null)
        }else{
            const allInputData = {id:new Date().getTime().toString(), name:inputList}
            setItems([...Items, allInputData]);
            setInputList('');
        }
       
    }

    /*Delete item from the list */
    const deleteItem = (index) =>{
        const updatedItems = Items.filter((itemsVal)=>{
            return index !== itemsVal.id;
        })
        setItems(updatedItems);
    }

    /*Edit item from the list */
    const editItem = (id) => {
        let newEditItem = Items.find((itemsVal) => {
            return itemsVal.id === id;
        });
        setToggleButton(false);
        setInputList(newEditItem.name);
        setisEditItem(id);
    }

    /*Clear all items from the list */
    const RemoveAll = () =>{
        setItems([]);
    }
  return (
    <>
        <div className="main-div">
            <div className="center-div">
                <br/>
                <h1>ToDo-List</h1>
                <br />
                <input type="text" placeholder="Add an Item" value={inputList}  onChange={(e) => setInputList (e.target.value)} />
                {
                    toggleButton ? <button className="add-btn" title="Add Item" onClick={displayItems}>+</button> : 
                    <i className="fa fa-edit add-btn"  title="Update Item" onClick={displayItems}></i>
                }
                
                <ol>
                    {
                        Items.map((itemsVal) =>{
                            return (
                            <div className="list" key={itemsVal.id}> 
                                <li>{itemsVal.name}</li>
                                <div className="btns">
                                <i className="fa fa-edit"  title="Edit Item" onClick={(e) => editItem(itemsVal.id)}></i>
                                <i className="fa fa-times"  title="Delete Item" onClick={(e) => deleteItem(itemsVal.id)}></i>
                                </div>
                            </div>
                            )
                        })
                    } 
                </ol>
                <button className="clear-button" title="Clear All" onClick={RemoveAll}>Clear All</button>
            </div>
        </div>
        </>
  )
}
export default Todo;