let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")
// const removeButton = document.getElementById("removeBtn");

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})
/* 
<i class="fa-solid fa-trash" id="removeBtn" data-index="${i}" alt="remove button"></i>*/

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <img src="remove.png" id="removeBtn" data-index="${i}" alt="remove button">
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    location.reload()
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

document.querySelectorAll("#removeBtn").forEach(e => {
    e.addEventListener("click", () => {
        let id = e.getAttribute("data-index");
        location.reload()
        removeftn(id);
    })
});

function removeftn(i) {
    myLeads.splice(i, 1);
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads);
}
// Update the event listener for remove buttons
/* for(let i = 0; i < temp.length; i++) {
    temp[i].addEventListener("click", function(event) {
        //myLeads.splice(i, 1);
        // listItems = "";
        // for (let j = 0; j < myLeads.length; j++) {
        //     listItems += `
        //         <li>
        //             <img src="remove.png" id="removeBtn" data-index="${j}" alt="remove button">
        //             <a target='_blank' href='${myLeads[j]}'>
        //                 ${myLeads[j]}
        //             </a>
        //         </li>
        //     `;
        // }
        // ulEl.innerHTML = listItems;
        console.log(i);
        console.log(myLeads[i]);
        
        render(myLeads);
        
        console.log(myLeads);
    });
} */




//function tempFunction() {
    // 
    //     temp[i].addEventListener('click', function() {
    //         console.log(i);
    //         removeftn(i);
    //     })
    // }
    // console.log(myLeads);
//}

// tempFunction();


