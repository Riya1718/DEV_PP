let filterCodes = {
    "red":"#e74c3c",
    "blue":"#3498db",
    "green":"#2ecc71",
    "black":"#34495e"
}

let selectedFilter = "black";

let allFilters = document.querySelectorAll(".filter");
let openModalBtn = document.querySelector(".open-modal");
let ticketContainer = document.querySelector(".tickets-container");

openModalBtn.addEventListener("click" , handleOpenModal);

function handleOpenModal(e){
    let modal = document.querySelector(".modal");
    if(modal){
      return;
    }

    let modalDiv = createModal();
    
    modalDiv
     .querySelector(".modal-textbox")
     .addEventListener("click" , clearModalTextbox);

    modalDiv
     .querySelector(".modal-textbox")
     .addEventListener("keypress" , addTicket);

     let allModalFilters = modalDiv.querySelectorAll(".modal-filter")

     for(let i=0;i<allModalFilters.length;i++){
       allModalFilters[i].addEventListener("click" , chooseModalFilter);
     }

    ticketContainer.append(modalDiv);
}

function createModal(e){
    let modalDiv = document.createElement("div");
    modalDiv.classList.add("modal");

    modalDiv.innerHTML = `<div class="modal-textbox" data-typed="false" contenteditable="true">
    Enter your task here
   </div>
  <div class="modal-filter-options">
    <div class="modal-filter red"></div>
    <div class="modal-filter blue"></div>
    <div class="modal-filter green"></div>
    <div class="modal-filter black active-filter"></div>
  </div>`;
    return modalDiv;
}

function clearModalTextbox(e){
   if(e.target.getAttribute("data-typed")=="true"){
     return;
   }
   e.target.innerHTML="";
   e.target.setAttribute("data-typed","true");
}

function chooseModalFilter(e){
  let selectedModalFilter = e.target.classList[1];
  
  if(selectedModalFilter == selectedFilter){
    return;
  }
   selectedFilter = selectedModalFilter;
   document.querySelector(".active-filter").classList.remove("active-filter");
   e.target.classList.add("active-filter");
}

function addTicket(e){
  if(e.key=="Enter"){
    let ticket = document.querySelector(".ticket");
    let ticketDiv =document.createElement("div");

    ticketDiv.classList.add("ticket");

    let modalText = e.target.textContent;

    ticketDiv.innerHTML = `<div class="ticket-filter ${selectedFilter}"></div>
    <div class="ticket-id">#ExampleId</div>
    <div class="ticket-content">${modalText}</div>`

    ticketContainer.append(ticketDiv);

    e.target.parentNode.remove();

    selectedFilter = "black";
  }
}


// [ <div></div> ,<div></div> ,<div></div> ,<div></div>  ];

for (let i = 0; i < allFilters.length; i++) {
  allFilters[i].addEventListener("click", chooseFilter);
}

function chooseFilter(e) {
  let filter = e.target.classList[1];
  let filterCode = filterCodes[filter];
  ticketContainer.style.background = filterCode;
}