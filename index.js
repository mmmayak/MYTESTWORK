const nameInput = document.querySelector('.enter-name');
const linkInput = document.querySelector('.enter-link');
const liName = document.querySelector('.list-name');
const liLink = document.querySelector('.list-link');
const form = document.querySelector('.form');

let webSites = JSON.parse(localStorage.getItem('webSites'));
//console.log(webSites);

showList();


function showList() {
   // console.log(webSites);
   
    if(webSites){
        
        for(let i = 0; i < webSites.length; i++){
            
          addContent(webSites[i]);
            
            
        }
    }
}

form.addEventListener('submit', checkElement);
//console.log(webSites);
function checkElement(e) {
    e.preventDefault();
    // console.log(e.target[0].value);
    let webSiteName = nameInput.value;
    let webSiteLink = linkInput.value;
    
    const webSiteInfo = {name: webSiteName.trim(),
                        link: webSiteLink.trim()}
                        
    
   if( webSites !== null &&  webSites.length !== 0){
    const found = webSites.find((el) => 
    el.name === webSiteName && el.link === webSiteLink);

    if(found === undefined) {
        newLink(webSiteInfo);
    }
   }else{
   
        webSites = [];
        newLink(webSiteInfo);
   }
    
   // webSites = [{name: link:}];

   
    let webSitesToString = JSON.stringify(webSites);
 
   localStorage.setItem('webSites', webSitesToString);

   //console.log(localStorage);

  
    clearInput();
   
}


function newLink(el){ 
    if(el.name !== '' && el.link !== ''){
        webSites.push(el);
    
    
              
    
    addContent(el);
   
    form.removeEventListener('click', checkElement);
}
}

function deleteItem(e) {
  //  console.log('delete item');
    const itemToDeleteName = e.target.getAttribute('data-name');
   // console.log(itemToDeleteName)
    let pos;
    webSites = webSites.filter((el, index) => {
        if(itemToDeleteName === el.name){
            pos = index;
        }
        
        
        return itemToDeleteName !== el.name;
         
    });

 
   
   let itemsListView = document.querySelectorAll('.insert');
   itemsListView[pos].remove();
   let lastItemsList = webSites;
   if(lastItemsList){
       webSites = lastItemsList;
      localStorage.setItem('webSites', JSON.stringify(webSites));
   }
 // console.log(webSites)
  if(webSites.length === 0){
    document.querySelector('.empty').style.display = 'flex';
  }
}



function saveSiteName(e){
    document.querySelector('.edit').style.background = 'none';
    document.querySelector('.edit').style.color = 'black';
    const nameToSave = e.target.getAttribute('data-name-save');
    console.log(nameToSave)
    let pos;
    webSites.forEach((el, index) => {
        if(nameToSave === el.name){
            pos = index;
        }
        return nameToSave !== el.name;
    })
    
    
    let lastName = webSites[pos].name;
   

    let itemListView = document.querySelectorAll('.insert');
    let newName = itemListView[pos].querySelector('.edit').innerHTML;
    
  


    if(lastName !== newName){
        webSites[pos].name = newName;
        localStorage.setItem('webSites', JSON.stringify(webSites));
    }
   // console.log(webSites)


}

function saveSiteLink(e){
    document.querySelector('.change').style.background = 'none';
    document.querySelector('.change').style.color = 'black';

    const linkToSave = e.target.getAttribute('data-link-save');
    
  
   
    let pos;
    webSites.forEach((el, index) => {
        if(linkToSave === el.link){
            pos = index;
        }
        return linkToSave !==el.link;
    })
    let lastLink = webSites[pos].link;
    //console.log(lastLink)
    let itemListView = document.querySelectorAll('.insert');
    let newLink = itemListView[pos].querySelector('.change').innerHTML;
    console.log(newLink)

    if(lastLink !== newLink){
        webSites[pos].link = newLink;
        document.querySelector('.change').href = `https://www.${newLink}`;  
        localStorage.setItem('webSites', JSON.stringify(webSites));
       
    }
    console.log(document.querySelector('.change'));
console.log(webSites)

    
}




function editItem(e){   
    const itemToEdit = e.target.getAttribute('data-edit');
   document.querySelector('.edit').style.background = 'grey';
   document.querySelector('.edit').style.color = 'white';
   let pos;
   webSites.forEach((el,index) => {
       if(itemToEdit === el.name){
           pos = index;
          
       }
       return itemToEdit  !== el.name;
   });
   
   // console.log(lastName)
   let itemListView = document.querySelectorAll('.insert');
  
  
  
  var checkEdit = itemListView[pos].querySelector('.edit').isContentEditable;
  console.log(checkEdit)
  
  if(!checkEdit){
    itemListView[pos].querySelector('.edit').contentEditable = true;
   
  }else if(checkEdit){
    itemListView[pos].querySelector('.edit').contentEditable = false;
  }
  console.log(webSites)
 
}
function changeLink(e){
    
    const linkToEdit = e.target.getAttribute('data-change');   
    document.querySelector('.change').style.background = 'grey';
   document.querySelector('.change').style.color = 'white';
   let pos;
  webSites.forEach((el,index) => {
       if(linkToEdit === el.link){
           pos = index;
          
       }
       return linkToEdit  !== el.link;
   });
   
  
   let itemListView = document.querySelectorAll('.insert');
   
 
  
  var checkEdit = itemListView[pos].querySelector('.change').isContentEditable;
  //console.log(checkEdit)
 
  if(!checkEdit){
    itemListView[pos].querySelector('.change').contentEditable = true;
    
  }else if(checkEdit){
    itemListView[pos].querySelector('.change').contentEditable = false;
  }
 
  
}


function clearInput(){
    nameInput.value = '';
    linkInput.value = '';
}




function addContent(el){
    document.querySelector('.empty').style.display = 'none';
    const addElement = document.querySelector('.test');
    
        let addText = `<div class="insert">
    <div class="list-group-item list-name  justify-content-center">
    <i data-edit="${el.name}" class="btn-name fas fa-edit"></i>
    <i data-name-save="${el.name}"class="fas fa-plus-square plus-name"></i>
   <p class="edit m-0">${el.name}</p>
    </div>
    <div class="list-group-item list-link">
    <i data-change="${el.link}" class="btn-linc fas fa-edit"></i>
    <i data-link-save="${el.link}" class="fas fa-plus-square plus-link"></i>
        <a href="https://www.${el.link}" class="change d-block" >${el.link}</a>
    </div>
    <button data-name="${el.name}" class="btn btn-danger btn-block mb-3">Delete</button>

    </div>
`


    addElement.insertAdjacentHTML('beforeend', addText);
    /* } */
    document.querySelectorAll('.btn-danger').forEach((element) => {
        element.addEventListener('click', deleteItem);
    });
    document.querySelectorAll('.btn-name').forEach((el)=>{
        el.addEventListener('click', editItem);
        
    })
    document.querySelectorAll('.plus-name').forEach((el)=>{
        el.addEventListener('click', saveSiteName);
        
    }) 
    
    document.querySelectorAll('.btn-linc').forEach((el) => {
        el.addEventListener('click', changeLink);
       
    })
    
    document.querySelectorAll('.plus-link').forEach((el)=>{
        el.addEventListener('click', saveSiteLink);
        
    })  
}
