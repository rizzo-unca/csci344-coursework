// global variables tracking the user's preferences:
let searchTerm = "";
let openOnly = false;

const search = (ev) => {
    ev.preventDefault(); // overrides default button action

    // Set user's preferences (global variables) from the DOM:
    searchTerm = document.querySelector("#search_term").value;
    openOnly = document.querySelector("#is_open").checked;
    console.log(searchTerm, openOnly);

    // Invoke the show matching courses function
    showMatchingCourses();
};

/*************************/
/* First Function I made */
/*************************/
// Part 1.1a
const isClassFull = (course) => {
    //look at classification open: true
    return course.EnrollmentCurrent >= course.EnrollmentMax;
    /*
    if (course.EnrollmentCurrent >= course.EnrollmentMax) {
        return true;
    } else {
        return false;
    }
    */
};


/**************************/
/* Second Function I made */
/**************************/
// Part 1.1b
const doesTermMatch = (course) => {
    let match = false;
    //title check
    if (course.Title.toLowerCase().includes(searchTerm.toLowerCase())) {
        match = true;
    }
    return match;

    //could check multiple things (title matching)
};

// Part 1.2
const dataToHTML = (course) => {
    // modify this to be more detailed
    return `
        <section class="course">
            ${course.Code}
        </section>
    `;
};

// Part 2
const showMatchingCourses = () => {
    console.log(`Search term: ${searchTerm}`);
    console.log(`Only show open classes: ${openOnly}`);
    console.log(`Course data:`, courseList);

    // output all of the matching courses to the screen:
    const container = document.querySelector(".courses");
    container.innerHTML = null;
    //filtering by search term
    let matches = courseList.filter(doesTermMatch);

    matches.forEach(course =>  {
        const snippet = dataToHTML(course);
        console.log(snippet); //for debugging
        //adding HTML snippet to the DOM:
        container.insertAdjacentHTML("beforeend", snippet);
    });
};


//teacher assigned tasks
//can you make the data to HTML more robust, showing instructor, days of the week etc etc