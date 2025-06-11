import { useState } from "react"


function App() {
  let courses = [
    { label: "Discrete Mathematics", point: 6, name: "math" },
    { label: "English Language - General", point: 3, name: "eng" },
    { label: "Introduction to Studies", point: 3, name: "study" },
    { label: "Introduction to Specialty", point: 3, name: "speciality" },
    { label: "Introduction to Digital Technologies", point: 6, name: "digtech" },
    { label: "Introduction to Programming (Python)", point: 3, name: "py" },
    { label: "Philosophy", point: 6, name: "philosophy" },
  ]

  let [message, updMessage] = useState(``)

  const generate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Filter courses where the name is present in formData (i.e., checkbox is checked)
    const failedCourses = courses.filter(course => data[course.name]);

    let pointSum = failedCourses.reduce((accumulator, course) => {
      return accumulator + course.point;
    }, 0)

    updMessage(`Dear ${data.studentName},

We would like to inform you about your current academic standing and remind you of the University’s policy on additional paid resits (Extra Resits) for the 2024/2025 academic year. 
 
Your Academic Status for the First Semester:

${failedCourses.map((course, index) =>
      `${index + 1} | ${course.label} | ${course.point} credits`
    ).join('\n')}

Total number of failed courses: ${failedCourses.length} 
Total number of failed credits: ${pointSum} 
 
According to University policy, only students who have failed no more than 30 credits in total per academic year (after regular resits) are eligible for extra paid resits. 
 
What This Means for You 
You have already failed ${pointSum} credits in the first semester. This means you are${pointSum == 30 ? ' NOT' : ''} allowed to fail${pointSum < 30 ? ` up to ${30 - pointSum} more credits` : ""} in the second semester and still be eligible for extra resits. 
 
If your total failed credits after the second semester exceed 30 or you fail any extra resit, you will be subject to academic dismissal or must repeat the year. 
 
Summary:
You have used up ${pointSum} / 30  credits of your failure allowance in the First Semester. 
You are${pointSum == 30 ? ' NOT' : ''} allowed to fail${pointSum < 30 ? ` up to ${30 - pointSum} more credits` : ""} in the second semester and still be eligible for extra resits. 
 
If you have any questions, please reach out at academic@itpu.uz. 
 
Sincerely, 
SSD Team 
      `)
  };
  return (
    <div className="m-10">
      <form className="p-10 border flex flex-col gap-1" method="post" onSubmit={(e) => generate(e)}>
        <input type="text" name="studentName" id="studentName" className="border px-2" placeholder="Student Name" />
        {courses.map((course, index) => (
          <label key={index} className="flex gap-2">
            <input type="checkbox" name={course.name} id={course.name} />
            {course.label} ({course.point})
          </label>
        ))}
        <input type="submit" value="Generate" className="border py-2 cursor-pointer" />
      </form>
      <textarea name="message" id="message" className="border my-5 w-full h-[400px] p-2" value={message} placeholder="Here will be generated text" disabled></textarea>
      <button className="border py-3 px-10 cursor-pointer" onClick={() => { navigator.clipboard.writeText(message); alert('Copied!') }}>Copy</button>
    </div>
  )
}

export default App