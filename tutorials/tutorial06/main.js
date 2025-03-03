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


/*************************/
/* Third Function I made */
/*************************/
// Part 1.2
const dataToHTML = (course) => {
    let status;
    if (isClassFull(course)){
        status = `<i class="fa-solid fa-circle-xmark"></i>`
    } else {
        status = `<i class="fa-solid fa-circle-check"></i>` 
    };

    let  seatsAvaliable = course.EnrollmentMax - course.EnrollmentCurrent;
    if (seatsAvaliable < 0) {
        seatsAvaliable = 0;
    }

    //Day formatting
    const formatDays = (Days) => {
        if (!Days || Days.length === 0) { return "No currently scheduled days";
        } else {
        return Days.join(", ");
        }
    }

    //time formatting
    const formatTime = (StartTime) => {
        if (!StartTime) {return "No current time scheduled";
        } else {
            //some experimental formatting
            const options = { hour: 'numeric', minute: 'numeric', timeZone: 'America/New_York' };
            return new Date(StartTime).toLocaleTimeString('en-US', options);
        }
    }

    //instructor formatting
    const formatInstructors = (Instructors) => {
        if (!Instructors || Instructors.length === 0) {return "Instructor TBD";
        } else {
            const instructorName = Instructors.map(instructor => instructor.Name);
            return `Instructor: ${instructorName.join(", ")}`;
        }
    }

    //formatting class status
    const formatStatus = (course) => {
        let status = "";
        let statusTest = "";
        if(course.EnrollmentCurrent >= course.EnrollmentMax) {
            status = "closed";
            statusText = `Closed ${course.Code}. Waitlisted ${course.Waitlist}`;
        } else {
            status = "open";
            statusText = `Open ${course.Code}. Open Seats ${course.EnrollmentMax - course.EnrollmentCurrent}`;
        }
        return `<div class="status${status}"<i class="fa-circle-${status === "open" ? "check" : "xmark"}"></i>${statusText}</div>`;
    }

    return `
         <section class="course">
            <h2>${course.Code}: ${course.Title}</h2>
            <p>
                ${status}  &bull; 10174 &bull; Seats Available: 1
            </p>
            <p>
                ${course.Days} &bull; ${course.Location.FullLocation} &bull; 
            </p>
            <p><strong>${course.Instructors[0].Name}</strong></p>
        </section>
        `
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
