import { useImmer } from 'use-immer';
import { useState } from 'react';

export default function ShoppingListWithImmer() {
    // id, name, quantity, and a nested details object with properties like category and notes
    const [shoppingList, setShoppingList] = useImmer([]);
    const [inputData, setInputData] = useState({ id: 0, name: '', quantity: '', details: { category: '', notes: '' } });
    const [count, setCount] = useState(0);
    const listProps = ["name", "quantity", "category", "notes"];


    // Create a function addItem that adds a new item to the shoppingList. Use the draft state provided by useImmer to push the new item to the list.
    const addItem = () => {
        setShoppingList(draft => {
            draft.push({
                id: count,
                name: inputData.name,
                quantity: inputData.quantity,
                details: {
                    category: inputData.details.category,
                    notes: inputData.details.notes
                }
            });
        });
        setCount((prev) => prev + 1);
    };
    
    // Handle change in add item inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "category" || name === "notes") {
            setInputData(prev => ({
                ...prev, details: { ...prev.details, [name]: value }
            }));
        } else {
            setInputData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Handle values in item to input value
    const handleValue = (item, prop) => {
        if (prop === "category" || prop === 'notes') {
            return item.details[prop];
        }
        return item[prop];
    };

    // Create a function updateItem that modifies an existing item's attributes. Locate the item by id in the draft state and update its properties directly.
    const handleUpdateItem = (e, item) => {
        const { name, value } = e.target;
        return setShoppingList(draft => {
            const updateItem = draft.find((obj) => obj.id === item.id);
            if (updateItem) {
                if (name === 'category' || name === "notes") {
                    updateItem.details[name] = value;
                } else {
                    updateItem[name] = value;
                }
            }
        });

    };

    // Create a function removeItem that removes an item from the shoppingList by id. Use the draft state to filter out the item or splice it from the array.;
    const removeItem = (id) => { 
        setShoppingList(draft => {
            return draft.filter((obj => obj.id !== id))
        }); 
    };

    return (
        <div>
            {listProps.map((prop) => {
                return <input type='text' name={prop} placeholder={prop} onChange={handleChange}  ></input>;
            })}
            <button onClick={addItem}>Add item</button>
            <pre>{JSON.stringify(shoppingList, null, 2)}</pre>
            <div>
                {shoppingList.map((item) => {
                    return ( <div key={item.id}> {listProps.map((prop) => {
                        return <input type='text' name={prop} placeholder={prop} value={handleValue(item, prop)} onChange={(e) => handleUpdateItem(e,item)} ></input>;
                    })} <button onClick={() => removeItem(item.id)}>Delete</button> </div> ) ;
                })}
            </div>
        </div>
    );
}