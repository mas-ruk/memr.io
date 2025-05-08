import { format, addDays, subDays } from 'https://cdn.skypack.dev/date-fns';

document.addEventListener("DOMContentLoaded", (event) => {
    // Flag to track if animation is in progress
    let isAnimating = false;
    
    // Get the date range span element
    const dateRangeElement = document.getElementById("date-slider-range");
    
    // Setting initial range for the week
    let currentDate = new Date();
    
    // Adjust to start of week (Monday)
    currentDate = subDays(currentDate, (currentDate.getDay() + 6) % 7);
    
    // Add event listeners to the buttons
    document.querySelector("#date-right").addEventListener("click", function(e) {
        if (!isAnimating) {
            weekForward();
        }
    });
    
    document.querySelector("#date-left").addEventListener("click", function(e) {
        if (!isAnimating) {
            weekBack();
        }
    });
    
    function updateDateRange(direction) {
        const startOfWeek = currentDate;
        const endOfWeek = addDays(startOfWeek, 6); // Add 6 to get Sunday
        const formattedStart = format(startOfWeek, 'MMM dd');
        const formattedEnd = format(endOfWeek, 'MMM dd');
        const newText = `${formattedStart} - ${formattedEnd}`;
        
        // If direction is provided, animate; otherwise just update
        if (direction) {
            animateDateChange(newText, direction);
        } else {
            dateRangeElement.textContent = newText;
        }
    }
    
    function animateDateChange(newText, direction) {
        // Set flag to prevent multiple animations
        if (isAnimating) return;
        isAnimating = true;
        
        // Get the parent container
        const dateContainer = dateRangeElement.parentNode;
        
        // Create animation container if it doesn't exist
        let animContainer = document.querySelector(".date-slider-animation-container");
        if (!animContainer) {
            animContainer = document.createElement('div');
            animContainer.className = "date-slider-animation-container";
            dateContainer.appendChild(animContainer);
        } else {
            // Clear any existing animation elements
            animContainer.innerHTML = '';
        }
        
        // Create elements for animation
        const currentElement = document.createElement('div');
        currentElement.className = "date-slider-animation-element current";
        currentElement.textContent = dateRangeElement.textContent;
        
        const newElement = document.createElement('div');
        newElement.className = "date-slider-animation-element new";
        newElement.textContent = newText;
        
        // Set initial positions
        currentElement.style.transform = "translateX(0)";
        currentElement.style.opacity = "1";
        
        if (direction === 'forward') {
            newElement.style.transform = "translateX(100%)";
        } else {
            newElement.style.transform = "translateX(-100%)";
        }
        newElement.style.opacity = "0";
        
        // Add to container
        animContainer.appendChild(currentElement);
        animContainer.appendChild(newElement);
        
        // Hide the actual element during animation
        dateRangeElement.style.opacity = "0";
        
        // Force reflow
        void animContainer.offsetWidth;
        
        // Animate
        if (direction === 'forward') {
            currentElement.style.transform = "translateX(-100%)";
            newElement.style.transform = "translateX(0)";
        } else {
            currentElement.style.transform = "translateX(100%)";
            newElement.style.transform = "translateX(0)";
        }
        currentElement.style.opacity = "0";
        newElement.style.opacity = "1";
        
        // Clean up after animation
        setTimeout(() => {
            // Update the original element
            dateRangeElement.textContent = newText;
            dateRangeElement.style.opacity = "1";
            
            // Remove animation elements
            if (animContainer && animContainer.parentNode) {
                animContainer.innerHTML = '';
            }
            
            // Reset animation flag
            isAnimating = false;
        }, 400); // Allow ample time for animation to complete
    }
    
    function weekForward() {
        currentDate = addDays(currentDate, 7);
        updateDateRange('forward');
    }
    
    function weekBack() {
        currentDate = subDays(currentDate, 7);
        updateDateRange('back');
    }
    
    // Initialize with current week (no animation on initial load)
    updateDateRange();
});