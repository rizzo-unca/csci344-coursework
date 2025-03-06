// ignore this function for now. We'll go over it
// on Wednesday: 
async function fetchCourses() {
    const url = `https://meteor.unca.edu/registrar/class-schedules/api/v1/courses/2023/spring/`;
    courseList = await fetch(url).then(response => response.json());
    displayResults(courseList);
} 

function displayResults(courses) {
    
    console.log(courses);
    const container = document.querySelector("#results");
    for (const course of courses) {
        if (course.Department === "CSCI") {
            // goal: add the title of all the csci courses to the DOM:
            console.log(course.Title);
            const htmlSnippet =
                <div>
                    <h2></h2>
                </div>
        }
    }
}