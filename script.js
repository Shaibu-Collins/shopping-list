const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

const clearBtn = document.getElementById('clear');

const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;


function displayItems(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item =>addItemToDOM(item));
    checkUI();
}

function onAddItemsSubmit(e){
    e.preventDefault();
    const newItem = itemInput.value;

    // validate input
    if(newItem === ''){
        alert('please add an item');
        return;
    }
    // Create list item
     // const li = document.createElement('li');
     // li.appendChild(document.createTextNode(newItem))
    
    // const button = createButton('remove-item btn-link text-red')
    // li.appendChild(button)

    // Add li to the DOM
    //itemList.appendChild(li)
    //itemList.appendChild(li)

    

    // check for edit mode
    if(isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    }else{
        if (checkIfItemExists(newItem)) {
            alert('That item alraedy exists!');
            return;
        }
    }

// create item DOM element
    addItemToDOM(newItem);

    // Add item to local storage
    addItemToStorage(newItem);
     checkUI();
     itemInput.value = '';

}

// 08: Adding items to local storage
function addItemToDOM(item){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item))
    
    const button = createButton('remove-item btn-link text-red')
    li.appendChild(button)

    // Add li to the DOM
    //itemList.appendChild(li)
    itemList.appendChild(li)

}



function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;

    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon)
    return button;
}

function createIcon(classes){
    const icon = document.createElement('i')
    icon.className = classes;
    return icon;
}

function addItemToStorage(item){
    const itemsFromStorage = getItemsFromStorage();
    
    //Add new item to array
    itemsFromStorage.push(item);

    // convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage(){
    let itemsFromStorage;
    if (localStorage.getItem('items')=== null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage =JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage
}


function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }else{
        setItemToEdit(e.target);
        
    }
}

// 11: set items to edit
function setItemToEdit(item){
    isEditMode = true;

    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228B28';
    itemInput.value = item.textContent;
}

// 13: prevent duplicaate
function checkIfItemExists(item){
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
  
}
// 04:remove item
function removeItem(item){
    if(confirm('Are you sure?')){
        // Remove item from DOM
        item.remove();

        // Remove item from storage
        removeItemFromStorage(item.textContent);
        checkUI();
    }
    
};

function removeItemFromStorage() {
    const itemsFromStorage = getItemsFromStorage();
    
    // filter out items to be remove
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
    

    

    // Re-set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function clearItems(){
  //  itemList.innerHTML = ''
  while(itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
  }
  // clear from local storage
  localStorage.removeItem('items');
  checkUI();
}

// 06: filter items
function filterItems(e){
    const items = document.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if(itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        }else{
            item.style.display = 'none';
        }
    })
    
};

// 05: removing filter and clear all
function checkUI(){

    itemInput.value = '';

    const items = itemList.querySelectorAll('li');

    if(items.length === 0){
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    }else{
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';

    isEditMode = false;
}





// initialize app
function init() {
    // Event listeners
itemForm.addEventListener('submit', onAddItemsSubmit);
itemList.addEventListener('click', onClickItem);

//itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);


checkUI();
}

init();