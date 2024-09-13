import {
    useAddNewItemMutation,
    useDeleteItemMutation,
    useEditItemMutation,
    useGetAllItemsQuery
} from "../../features/admin/admin-api.js";
import "./admin.scss";
import {useEffect, useState} from "react";

export const Admin = () => {

    const {data} = useGetAllItemsQuery();
    const [addNewItem] = useAddNewItemMutation();
    const [editItem] = useEditItemMutation();
    const [deleteItem] = useDeleteItemMutation();
    const [items, setItems] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);
    const [search, setSearch] = useState("");
    const [newItem, setNewItem] = useState({
        id: 0,
        name: "",
        quantity: 1,
        image: "",
    });

    const onChangeHandler = (e) => {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value,
        });
    }

    const onChangeHandlerSearch = (e) => {
        setSearch(e.target.value);

        if (search.length >= 3) {
            setItems(items.filter(item => item.name.toLowerCase().includes(search.toLowerCase())));
        } else {
            setItems(data);
        }
    }

    useEffect(() => {
        if (data) {
            setItems(data);
        }
    }, [data]);

    const deleteItemHandler = async (id) => {
        try {
            await deleteItem(id);
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }

    const handleCancel = () => {
        setIsEditFormVisible(false);
        setIsFormVisible(false);
        setNewItem({
            id: 0,
            name: "",
            quantity: 1,
            image: "",
        })
    }

    const handleEditItem = async (item) => {
        try {
            await editItem(item);
            setItems(items.map((i) => (i.id === item.id ? item : i)));
            setIsEditFormVisible(false);
        } catch (error) {
            console.error('Error editing item:', error);
        }
    }

    const addNewItemHandler = async (e) => {
        e.preventDefault();
        try {
            newItem.id = items.length + 1;
            await addNewItem(newItem);
            setItems([...items, newItem]);
            setIsFormVisible(false);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    }
    return (
        <main className={"main-container"}>
            <div className={"header"}>
                <h1>Administration</h1>
            </div>
            <div className={"content"}>
                <h2>Lists des patisseries</h2>
                <div className={"search"}>
                    <input type={"text"} className={"search-input"} name={"search"}
                           onChange={(e) => onChangeHandlerSearch(e)}
                           placeholder={"Recherche un Item"}/>
                </div>
                <div className={"add-btn"}>
                    {isFormVisible ? (
                        <h3>Ajouter une pâtisserie</h3>
                    ) : (
                        <button onClick={() => setIsFormVisible(true)}>Ajouter une pâtisserie</button>
                    )}

                </div>
                {(isFormVisible || isEditFormVisible) && (
                    <div className={"form"}>
                        <form>
                            <label htmlFor="name">Nom</label>
                            <input type="text" onChange={(e) => onChangeHandler(e)}
                                   value={newItem.name}
                                   id="name" name="name"/>
                            <label htmlFor="quantity">Quantité</label>
                            <input type="number"
                                   onChange={(e) => onChangeHandler(e)} id="quantity" name="quantity"
                                   value={newItem.quantity}/>
                            <label htmlFor="image">Image</label>
                            <input type="file" onChange={(e) => onChangeHandler(e)} id="image" name="image"/>
                            <div>
                                <button onClick={handleCancel}>Annuler</button>
                                {isEditFormVisible ? (
                                        <button onClick={() => {
                                            handleEditItem(newItem)
                                            setIsEditFormVisible(false)
                                        }}>Modifier</button>
                                    )
                                    : (
                                        <button onClick={(e) => addNewItemHandler(e)}>Créer la pâtissirie</button>
                                    )
                                }

                            </div>
                        </form>
                    </div>
                )}
                <div>
                    <table className={"items-table"}>
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th>Nom</th>
                            <th>Quantités restantes</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items && items.map((item) => (
                            <tr key={item.id}>
                                <td><img src={`../../../public/items/${item.image}`} alt={item.name}/></td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <div className={"action-btn"}>
                                        <button onClick={() => deleteItemHandler(item.id)}>Supprimer</button>
                                        <button onClick={() => {
                                            setNewItem(item)
                                            setIsEditFormVisible(true)
                                        }}>Modifier
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}
