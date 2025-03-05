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
    const term = searchTerm.toLowerCase();
    return (
        course.Title.toLowerCase().includes(term) ||
        course.Code.toLowerCase().includes(term) ||
        (course.Description && course.Description.toLowerCase.includes(term))
    );
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
        if (!Days) return "No currently scheduled days";
        if (typeof Days === "string") return Days.split(""); 
        if (!Array.isArray(Days) || Days.length === 0) return "No currently scheduled days";

        return Days.join(", ");
    };

    //time formatting
    const formatTime = (StartTime) => {
        if (!StartTime) return "No current time scheduled";
        let date = new Date(StartTime);
        if (isNaN(date)) return "Invalid time format"; //Handles invalid cases just incase

        const options = { hour: "numeric", minute: "numeric", timeZone: "America/New_York" };
        return date.toLocaleTimeString("en-US", options);
    };

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
        let status = course.EnrollmentCurrent >= course.EnrollmentMax ? "closed" : "open";
        let waitlistCount = course.Waitlist ? course.Waitlist : 0; // If Waitlist is undefined, set it to 0
    
        let statusText = status === "closed"
            ? `Closed ${course.Code}. Waitlisted: ${waitlistCount}`
            : `Open ${course.Code}. Open Seats: ${course.EnrollmentMax - course.EnrollmentCurrent}`;
    
        return `<div class="status ${status}">
                    <i class="fa-solid fa-circle-${status === "open" ? "check" : "xmark"}"></i> 
                    ${statusText}
                </div>`;
    };

    return `
         <section class="course">
            <h2>${course.Code}: ${course.Title}</h2>
            <p>
                ${formatStatus(course)}
            </p>
            <p>
                ${formatDays(course.Days)} &bull; ${course.Location.FullLocation}
            </p>
            <p><strong>${course.Instructors[0].Name}</strong></p>
        </section>
        `;
};

// Part 2
const showMatchingCourses = () => {
    console.log(`Search term: ${searchTerm}`);
    console.log(`Only show open classes: ${openOnly}`);
    console.log(`Course data:`, courseList);

    const container = document.querySelector(".courses");
    container.innerHTML = "";

    let matches = courseList.filter(doesTermMatch);
    
    // Apply the open class filter if checked
    if (openOnly) {
        matches = matches.filter(course => !isClassFull(course));
    }

    matches.forEach(course => {
        const snippet = dataToHTML(course);
        console.log(snippet); // Debugging
        container.insertAdjacentHTML("beforeend", snippet);
    });
};
