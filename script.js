const researchAddOn = document.getElementsByClassName("more")[0];

researchAddOn.addEventListener('click', () => {
    var researchCards = document.getElementsByClassName("research-card");
    for(let card of researchCards){
        if(card.style.display == "none"){
            card.style.display = "flex";
        }
    }

    researchAddOn.style.display = "none";
});