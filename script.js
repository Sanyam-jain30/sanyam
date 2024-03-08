// const researchAddOn = document.getElementsByClassName("more")[0];

// researchAddOn.addEventListener('click', () => {
//     var researchCards = document.getElementsByClassName("research-card");
//     for(let card of researchCards){
//         if(card.style.display == "none"){
//             card.style.display = "flex";
//         }
//     }

//     researchAddOn.style.display = "none";
// });

function handleLabelClick(id, num, component, card, section) {
    console.log(id, num, component, card);
    var tab = document.getElementById(id);
    var glider = document.querySelector(`#${component} .glider`);
    var projectList = document.querySelectorAll(`#${component} .${card}`);
    console.log(glider, projectList);

    glider.style.transform = 'translateX(' + 100 * num + '%)';
    console.log(id, id==="all");

    if(id == "all"){
        console.log("yes");
        projectList.forEach(function(project) {
            project.style.display = '';
        });
    } else {
        projectList.forEach(function(project) {
            var decision = project.querySelector(`.${section}`);

            if (decision && decision.classList.contains(id)) {
                project.style.display = '';
            } else {
                project.style.display = 'none';
            }
        });
    }
}