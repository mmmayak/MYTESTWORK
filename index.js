const nameInput = document.querySelector('.enter-name');
const linkInput = document.querySelector('.enter-link');
const liName = document.querySelector('.list-name');
const liLink = document.querySelector('.list-link');
const form = document.querySelector('.form');

let webSites = [];

form.addEventListener('submit', (e)=>{
    e.preventDefault();
  let webSiteName = nameInput.value;
  let webSiteLink = linkInput.value;
 const webSiteInfo = {name: webSiteName,
                        link: webSiteLink}
                      
   
    newLink(webSiteInfo);
   clearContent();
   

})





function newLink(el){
    if(nameInput.value!== '' && linkInput.value!==''){
        webSites.push(el);
    }
    console.log(webSites)
     
    let btnWay;
     var addElement = document.querySelector('.test');
   if(nameInput.value && linkInput.value){
    addElement.insertAdjacentHTML('beforeend', `<div class="insert">
    <div class="list-group-item list-name">
    ${el.name} 
</div>
<div class="list-group-item list-link">
     <a href="https://www.${el.link}">${el.link}</a>
</div>
<button data-name="${el.name}" class="btn btn-danger btn-block  mb-3">Delete</button>
</div>
`)
   }
       
   
    btnWay =  document.querySelectorAll('.btn-danger');

    btnWay.forEach((element) => {
        element.addEventListener('click', deleteItem);
    })
    
}

function deleteItem(e) {
    const itemToDeleteName = e.target.getAttribute('data-name');
    let pos;
    webSites = webSites.filter((el, index) => {
        if(itemToDeleteName === el.name){
            pos = index;
        }
        
        
        return itemToDeleteName !== el.name;
         
    });
   let itemsListView = document.querySelectorAll('.insert');
   itemsListView[pos].remove();
  webSites.forEach((e) =>{
      console.log(e)
  })
  
}
   




function clearContent(){
    nameInput.value = '';
    linkInput.value = '';
}