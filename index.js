let currentList = {};

let shoppingListName = document.getElementById("shoppingListName");
let shoppingListTitle = document.getElementById("shoppingListTitle");
let shoppingListItems = document.getElementById("shoppingListItems");
let createListDiv = document.getElementById("createListDiv");
let shoppingListDiv = document.getElementById("shoppingListDiv");
let newItemName = document.getElementById("newItemName");

const createShoppingList = () => {
    currentList.name = shoppingListName.value;
    currentList.items = [];
    console.log("List created with name:", currentList.name);
    showShoppingList();
}

const showShoppingList = () => {
    shoppingListTitle.innerHTML = currentList.name;
    createListDiv.style.display = "none";
    shoppingListDiv.style.display = "block";
    newItemName.focus();

    newItemName.addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
            addItem();
        }
    });
    console.log("Shopping list displayed with title:", currentList.name);
}

const addItem = () => {
    if (newItemName.value === '') {
        alert("Please enter an item name");
    } else {
        const newItem = {
            name: newItemName.value,
            purchased: false
        };
        currentList.items.push(newItem);
        console.log("Item added:", newItem);
        drawItems();
        newItemName.value = "";
    }
}

const drawItems = () => {
    const $list = shoppingListItems;
    $list.innerHTML = "";
    currentList.items.forEach((currentItem, i) => {
        const $li = document.createElement("li");
        $li.innerHTML = currentItem.name;
        $li.id = "item_" + i;
        $li.className = currentItem.purchased ? "item checked" : "item";

        const $deleteBtn = document.createElement("span");
        $deleteBtn.innerHTML = "X";
        $deleteBtn.className = "close";
        $deleteBtn.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevents the item from being marked as purchased when clicking delete
            deleteItem(i);
        });
        $li.appendChild($deleteBtn);

        $li.addEventListener("click", () => checkItem(i));
        $list.appendChild($li);
    });
    console.log("Items drawn:", currentList.items);
}

const deleteItem = (index) => {
    console.log("Item deleted:", currentList.items[index]);
    currentList.items.splice(index, 1);
    drawItems();
}

const checkItem = (index) => {
    currentList.items[index].purchased = !currentList.items[index].purchased;
    console.log("Item checked/unchecked:", currentList.items[index]);
    drawItems();
}
