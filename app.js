const tags = document.querySelectorAll(".tag");
const filter = document.querySelectorAll(".filters");
const container = document.querySelector(".tags-container");
const clearTags = document.querySelector(".clear-tags")
const profile = document.querySelectorAll(".profile");
const tagArray = [];


tags.forEach(tag =>{
    tag.addEventListener("click", ()=>{       
        
        //create filters
        const filters = document.createElement("div");
        filters.classList.add("tags");
        const tagText = document.createElement("p");
        const removeBtn = document.createElement("div");
        removeBtn.classList.add("remove-btn")
        tagText.textContent = tag.textContent;
        
        filters.appendChild(tagText);
        filters.appendChild(removeBtn);

        container.appendChild(filters);

        
            console.log(tagArray)
        

        
        
    })
})

