const cardTemplate = document.getElementById("card-template").content
const fragment = document.createDocumentFragment()
const mainCard = document.getElementById("main-card")
const filter = document.getElementById("filter")
const tag = document.querySelector(".tag")
let arrayTag = {}

const drawCardsInDOM = (data) => {
    Object.values(data).forEach(item => {
        const cloneTemplate = cardTemplate.cloneNode(true)
        cloneTemplate.querySelector(".card").setAttribute("data-lenguages", `${item.role},${item.level},${item.languages}`)
        cloneTemplate.querySelector(".card__img").src = item.logo
        cloneTemplate.querySelector(".card__title").textContent = item.company
        cloneTemplate.querySelector(".card__position").textContent = item.position
        cloneTemplate.querySelector(".postedAt").textContent = item.postedAt
        cloneTemplate.querySelector(".contract").textContent = item.contract
        cloneTemplate.querySelector(".location").textContent = item.location
        cloneTemplate.querySelector(".role").textContent = item.role
        cloneTemplate.querySelector(".role").setAttribute("data-id", Math.floor(Math.random()*1000000))
        cloneTemplate.querySelector(".level").textContent = item.level
        cloneTemplate.querySelector(".level").setAttribute("data-id", Math.floor(Math.random()*1000000))
        if(item.featured) cloneTemplate.getElementById("featured").classList.remove("disable-featured")
        if(item.new) cloneTemplate.getElementById("new").classList.remove("disable-new")
        item.languages.forEach(items =>{
            const cardFooterSpan = document.createElement("span")
            cardFooterSpan.classList.add("tag")
            cardFooterSpan.classList.add("tag--hover")
            cardFooterSpan.textContent = items
            cardFooterSpan.setAttribute("data-id", Math.floor(Math.random()*1000000))
            cloneTemplate.querySelector(".card__footer").appendChild(cardFooterSpan)
        })
        fragment.appendChild(cloneTemplate)
    })
    mainCard.appendChild(fragment)
}

const getData = async () => {
    const request = await fetch("./data/data.json")
    const data = await request.json()
    drawCardsInDOM(data)
}

mainCard.addEventListener("click", e =>{
   addFilterTag(e)
})

filter.addEventListener("click", e =>{
    clearFilter(e)
    removeTag(e)
})

const addFilterTag = (e) =>{
    
    if(e.target.classList.contains("tag")){
        filter.classList.remove("disable-filter")
        drawTag(e)
        filterCard(createArrayTagInfilter)
    }
}

const clearFilter = (e) =>{
    if(e.target.classList.contains("filter__clear")){
        filter.classList.add("disable-filter")
        arrayTag = {}
    }
}

const removeTag = (e) =>{
    if(e.target.classList.contains("tag-remove")){
        delete arrayTag[e.target.parentElement.dataset.id]
        drawTagRemove()
    }
}

const drawTag = (e) =>{
    filter.children[1].innerHTML = ""
        const arrayTagId = {
            id: e.target.dataset.id,
            text: e.target.textContent
        }
        arrayTag[arrayTagId.id] = arrayTagId
     createTag()
}

const drawTagRemove = () =>{
    
    if(filter.children[1].children.length === 1){
        filter.classList.add("disable-filter")
    }
    filter.children[1].innerHTML = ""
        createTag()
}

const tagInfilterValidation = []

const createArrayTagInfilter = () =>{
    Object.values(arrayTag).forEach(tagArray => {
        tagInfilterValidation.push(tagArray.text)
    })
    console.log(tagInfilterValidation)
}

const filterCard = () =>{
        createArrayTagInfilter()
        const card = [...mainCard.querySelectorAll(".card")]
        const tagInfilter = card.shift()
        card.forEach(item => item.classList.add("disable-filter"))
        card.forEach(cards => {
            const languages = cards.dataset.lenguages.split(",")
            const validation = tagInfilterValidation.every(language => languages.includes(language))
            validation && cards.classList.remove("disable-filter")
        })
}

const createTag = () =>{
    Object.values(arrayTag).forEach(item =>{
        const addTagSpantofilter = document.createElement("span")
        addTagSpantofilter.classList.add("tag", "tag--padding")
        addTagSpantofilter.textContent = item.text
        addTagSpantofilter.dataset.id = item.id
        const addTagRemovetofilter = document.createElement("div")
        addTagRemovetofilter.classList.add("tag-remove")
        addTagSpantofilter.appendChild(addTagRemovetofilter)
        filter.children[1].appendChild(addTagSpantofilter)
    })
}

getData()
