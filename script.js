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

    // Reset and reinitialize load more after filter change
    if (loadMoreState[component]) {
        loadMoreState[component].currentFilter = id;
        applyLoadMoreState(component, card);
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

// Store load more state for each section
const loadMoreState = {
    research: { itemsPerPage: 4, currentFilter: 'all' },
    achievement: { itemsPerPage: 6, currentFilter: 'all' },
    work: { itemsPerPage: 8, currentFilter: 'all' }
};

// Load More Functionality - Filter Aware
function initializeLoadMore(sectionId, cardClass, itemsToShow = 6) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const cards = section.querySelectorAll(`.${cardClass}`);
    const loadMoreBtn = section.querySelector('.load-more-btn');

    if (!loadMoreBtn) return;

    // Store initial items to show
    if (loadMoreState[sectionId]) {
        loadMoreState[sectionId].itemsPerPage = itemsToShow;
    }

    // Apply initial load more state
    applyLoadMoreState(sectionId, cardClass);

    // Add click handler
    loadMoreBtn.addEventListener('click', function() {
        showMoreItems(sectionId, cardClass);
    });
}

// Show more items based on current filter
function showMoreItems(sectionId, cardClass) {
    const section = document.getElementById(sectionId);
    const loadMoreBtn = section.querySelector('.load-more-btn');
    const state = loadMoreState[sectionId];

    if (!state) {
        // For sections without filters (like projects)
        const cards = section.querySelectorAll(`.${cardClass}`);
        const hiddenCards = Array.from(cards).filter(card => card.style.display === 'none');
        const itemsToShow = 4; // default
        const cardsToShow = hiddenCards.slice(0, itemsToShow);

        cardsToShow.forEach(card => {
            card.style.display = '';
        });

        const remainingHidden = hiddenCards.length - cardsToShow.length;
        if (remainingHidden <= 0) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.textContent = `Load More (${remainingHidden} remaining)`;
        }
        return;
    }

    // Get all cards
    const cards = section.querySelectorAll(`.${cardClass}`);

    // Filter cards based on current filter to get all matching cards
    let matchingCards = Array.from(cards);
    if (state.currentFilter !== 'all') {
        matchingCards = matchingCards.filter(card => {
            const filterElement = card.querySelector('.project-decision, .achievement-type, .work-type');
            return filterElement && filterElement.classList.contains(state.currentFilter);
        });
    }

    // Find currently hidden cards that match the filter
    const hiddenMatchingCards = matchingCards.filter(card => card.style.display === 'none');
    const cardsToShow = hiddenMatchingCards.slice(0, state.itemsPerPage);

    // Show the next batch
    cardsToShow.forEach(card => {
        card.style.display = '';
    });

    // Update button
    const remainingHidden = hiddenMatchingCards.length - cardsToShow.length;
    if (remainingHidden <= 0) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.textContent = `Load More (${remainingHidden} remaining)`;
    }
}

// Apply load more state after filter change
function applyLoadMoreState(sectionId, cardClass) {
    const section = document.getElementById(sectionId);
    const loadMoreBtn = section.querySelector('.load-more-btn');
    const state = loadMoreState[sectionId];

    if (!state) {
        // For sections without filters
        const cards = section.querySelectorAll(`.${cardClass}`);
        const itemsToShow = 4;
        cards.forEach((card, index) => {
            if (index >= itemsToShow) {
                card.style.display = 'none';
            }
        });

        const hiddenCount = Math.max(0, cards.length - itemsToShow);
        if (loadMoreBtn) {
            if (hiddenCount > 0) {
                loadMoreBtn.style.display = 'block';
                loadMoreBtn.textContent = `Load More (${hiddenCount} remaining)`;
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
        return;
    }

    // Get all cards
    const cards = section.querySelectorAll(`.${cardClass}`);

    // Determine which cards match the current filter
    let matchingCards = Array.from(cards);
    if (state.currentFilter !== 'all') {
        matchingCards = matchingCards.filter(card => {
            const filterElement = card.querySelector('.project-decision, .achievement-type, .work-type');
            return filterElement && filterElement.classList.contains(state.currentFilter);
        });
    }

    // Show first N matching cards, hide the rest
    matchingCards.forEach((card, index) => {
        if (index < state.itemsPerPage) {
            // Show this card (it matches filter and is within page limit)
            card.style.display = '';
        } else {
            // Hide this card (beyond page limit)
            card.style.display = 'none';
        }
    });

    // Count how many matching cards are hidden
    const hiddenCount = matchingCards.filter(card => card.style.display === 'none').length;

    // Update load more button
    if (loadMoreBtn) {
        if (hiddenCount > 0) {
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.textContent = `Load More (${hiddenCount} remaining)`;
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
}

// Special function for project section which has both odd and even cards
function initializeProjectLoadMore(itemsToShow = 4) {
    const section = document.getElementById('project');
    const oddCards = section.querySelectorAll('.project-card-odd');
    const evenCards = section.querySelectorAll('.project-card-even');
    const allCards = [...oddCards, ...evenCards];
    const loadMoreBtn = section.querySelector('.load-more-btn');

    let currentItems = itemsToShow;

    // Initially hide items beyond itemsToShow
    allCards.forEach((card, index) => {
        if (index >= itemsToShow) {
            card.style.display = 'none';
        }
    });

    // Hide button if all items are already visible
    if (allCards.length <= itemsToShow) {
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const hiddenCards = allCards.filter(card => card.style.display === 'none');
            const cardsToShow = hiddenCards.slice(0, itemsToShow);

            cardsToShow.forEach(card => {
                card.style.display = '';
            });

            currentItems += cardsToShow.length;

            // Hide button if all items are now visible
            if (currentItems >= allCards.length) {
                loadMoreBtn.style.display = 'none';
            }

            // Update button text with remaining items
            const remaining = allCards.length - currentItems;
            if (remaining > 0) {
                loadMoreBtn.textContent = `Load More (${remaining} remaining)`;
            }
        });
    }
}

// Initialize load more for all sections when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sections with filters
    initializeLoadMore('research', 'research-card', 4);
    initializeLoadMore('achievement', 'achievement-card', 6);
    initializeLoadMore('work', 'work-card', 8);

    // Initialize project section (no filters)
    initializeProjectLoadMore(4);
});