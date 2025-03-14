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

// JavaScript to toggle the dropdown menu
const dropdown = document.querySelector('.dropdown');

document.querySelector('.dropbtn').addEventListener('click', function() {
  dropdown.classList.toggle('show');
});


const backToTopButton = document.getElementById("back-to-top");

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "auto",
  });
});

// document.addEventListener('DOMContentLoaded', function() {
//     var hiddenElements = document.querySelectorAll('.hidden');
  
//     function fadeIn() {
//       hiddenElements.forEach(function(element) {
//         if (isElementInViewport(element)) {
//           element.classList.add('fade-in');
//         }
//       });
//     }
  
//     function isElementInViewport(el) {
//         var rect = el.getBoundingClientRect();
//         return (
//           rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
//           rect.bottom >= 0 &&
//           rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
//           rect.right >= 0
//         );
//     }
    
//     window.addEventListener('scroll', fadeIn);
//     window.addEventListener('resize', fadeIn); // For responsiveness
// });

function handleLabelClick(id, num, component, card, section) {
    var tab = document.getElementById(id);
    var glider = document.querySelector(`#${component} .glider`);
    var projectList = document.querySelectorAll(`#${component} .${card}`);

    glider.style.transform = 'translateX(' + 100 * num + '%)';

    if(id == "all"){
        projectList.forEach(function(project) {
            project.style.display = '';
        });

        var parentElement = document.getElementById(component);

        var middleGradient = document.createElement("div");
        middleGradient.classList.add("middle-gradient");

        var endGradient = document.createElement("div");
        endGradient.classList.add("end-gradient");

        if (parentElement.getElementsByClassName("middle-gradient")[0] === undefined) {
            parentElement.appendChild(middleGradient);
        }
        if (parentElement.getElementsByClassName("end-gradient")[0] === undefined) {
            parentElement.appendChild(endGradient);
        }
    } else {
        projectList.forEach(function(project) {
            var decision = project.querySelector(`.${section}`);

            if (decision && decision.classList.contains(id)) {
                project.style.display = '';
            } else {
                project.style.display = 'none';
            }
        });

        var childElements = document.getElementById(component).children;

        for (var i = 0; i < childElements.length; i++) {
            var childElement = childElements[i];
            
            if (childElement.classList.contains("middle-gradient")) {
                childElement.classList.remove("middle-gradient");
            }
            if (childElement.classList.contains("end-gradient")) {
                childElement.classList.remove("end-gradient");
            }
        }
    }
}

// Handle Dropdown change for small screens
function handleResearchDropdownChange(event) {
    const selectedTab = event.target.value;
    const num = {
        "all": 0,
        "published": 1,
        "accepted": 2,
        "awaiting": 3
    }[selectedTab] || 0;
    
    // Trigger the tab click logic
    handleLabelClick(selectedTab, num, 'research', 'research-card', 'project-decision');
}

function handleAchievementDropdownChange(event) {
    const selectedTab = event.target.value;
    const num = {
        "all": 0,
        "competition": 1,
        "award": 2,
        "others": 3
    }[selectedTab] || 0;
    
    // Trigger the tab click logic
    handleLabelClick(selectedTab, num, 'achievement', 'achievement-card', 'achievement-type');
}

function handleWorkDropdownChange(event) {
    const selectedTab = event.target.value;
    const num = {
        "all": 0,
        "rapidapi": 1,
        "figma": 2,
        "githubcontribution": 3
    }[selectedTab] || 0;
    
    // Trigger the tab click logic
    handleLabelClick(selectedTab, num, 'work', 'work-card', 'work-type');
}