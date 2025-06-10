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

  let [message, updMessage] = useState(`Dear [Student Name], 
We would like to inform you about your current academic standing and remind you of the University’s policy on additional paid resits (Extra Resits) for the 2024/2025 academic year. 
 
Your Current Academic Status (First Semester): 
Number of failed courses: [X] 
Total number of failed credits (ECTS): [XX] 
 
According to University policy, only students who have failed no more than 30 ECTS credits in total per academic year (after regular resits) are eligible for extra paid resits. 
 
What This Means for You 
You have already failed [XX] ECTS credits in the first semester. This means you are allowed to fail up to [30 - XX] more credits in the second semester and still be eligible for extra resits. 
 
If your total failed credits after the second semester exceed 30 ECTS or you fail any extra resit, you will be subject to academic dismissal or must repeat the year. 
 
Second Semester Courses Overview 
Here is the list of your current second semester courses and their corresponding credit values: 
 
No.	Course Name	Credits (ECTS) 
1.	[Course 1 Name]	[X]
2.	[Course 2 Name]	[X] 
3.	[Course 3 Name]	[X] 
4.	[Course 4 Name]	[X] 
5.	[Course 5 Name]	[X] 
6.	[Course 6 Name]	[X] 
Total Credits	[Total] 
 
Summary 
You have used up [XX] / 30 ECTS credits of your failure allowance. 
You can fail up to [30 - XX] ECTS credits more to still be eligible for extra paid resits. 
If you exceed this limit or fail an extra resit — you will be withdrawn OR must repeat the year. 
 
If you have any questions, please reach out at academic@itpu.uz. 
 
Sincerely, 
SSD Team 
    `)

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
 
Your Current Academic Status (First Semester): 
Number of failed courses: ${failedCourses.length} 
Total number of failed credits (ECTS): ${pointSum} 
 
According to University policy, only students who have failed no more than 30 ECTS credits in total per academic year (after regular resits) are eligible for extra paid resits. 
 
What This Means for You 
You have already failed ${pointSum} ECTS credits in the first semester. This means you are allowed to fail up to ${30 - pointSum} more credits in the second semester and still be eligible for extra resits. 
 
If your total failed credits after the second semester exceed 30 ECTS or you fail any extra resit, you will be subject to academic dismissal or must repeat the year. 
 
Second Semester Courses Overview 
Here is the list of your current second semester courses and their corresponding credit values: 
 
No.	Course Name	Credits (ECTS) 
${failedCourses.map((course, index) => (
      `${index + 1}.	${course.label}	(${course.point})` // Format each line as a string
)).join('\n')}
Total Credits: ${pointSum} 
 
Summary 
You have used up ${pointSum} / 30 ECTS credits of your failure allowance. 
You can fail up to ${30 - pointSum} ECTS credits more to still be eligible for extra paid resits. 
If you exceed this limit or fail an extra resit — you will be withdrawn OR must repeat the year. 
 
If you have any questions, please reach out at academic@itpu.uz. 
 
Sincerely, 
SSD Team 
      `)
  };
  return (
    <div className="m-10">
      <form className="p-10 border flex flex-col gap-1" onSubmit={(e) => generate(e)}>
        <input type="text" name="studentName" id="studentName" className="border px-2" placeholder="Student Name" />
        {courses.map((course, index) => (
          <label key={index} className="flex gap-2">
            <input type="checkbox" name={course.name} id={course.name} />
            {course.label} ({course.point})
          </label>
        ))}
        <input type="submit" value="Generate" className="border py-2 cursor-pointer" />
      </form>
      <textarea name="message" id="message" className="border my-5 w-full h-[400px]" value={message} disabled></textarea>
      <button className="border py-3 px-10 cursor-pointer" onClick={() => {navigator.clipboard.writeText(message); alert('Copied!')}}>Copy</button>
    </div>
  )
}

export default App