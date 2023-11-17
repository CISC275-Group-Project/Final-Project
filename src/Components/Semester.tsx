//for visualization of semesters and altering the courses within them

import React, { useState } from "react";
import "../App.css";
import { courseList, defaultCourseList } from "./course";
import "./Semester.css";
import { Course } from "../Interfaces/course";
import { Form, Button } from "react-bootstrap";
import { Semester } from "../Interfaces/semester";
//import { Degree } from "../Interfaces/degree";
import sample from "../data/AllCourseList.json";
import CourseEdit from "./CourseEdit";
import { updateCourseList, findCourse } from "./course";

//A variable able to use for the list of courses within the JSON file.
const COURSE_LIST = courseList;

//variable to use DEFAULT list of courses from JSON file - Malika
const DEFAULT_COURSE_LIST = defaultCourseList;

//create initial semester for testing
const SEM1: Semester = {
    type: ["Fall"],
    year: 2024,
    totalCredits: 18,
    courseList: COURSE_LIST
};
const SEM2: Semester = {
    type: ["Fall"],
    year: 2024,
    totalCredits: 18,
    courseList: COURSE_LIST
};

//a default course variable; uses the first course within the JSON file.
const DEFAULT_COURSE = sample[0].title;

export function ViewSemester(): JSX.Element {
    //states as globals
    const [fallSemester, setFallSemester] = useState<Semester>({ ...SEM1 });
    const [springSemester, setSpringSemester] = useState<Semester>({ ...SEM2 });
    //(MM) NOTE: Using this state in order to create a drop down of Courses
    //and set which course the user would like to add or remove
    // updated through updateCurrCourse and drop down element
    //MERGE CONFLICT (discuss after MVP): changed course.ts's department type due to error
    const [currCourse, setCurrCourse] = useState<string>(DEFAULT_COURSE);
    //will add more semesters later
    const [SemesterType, setSemesterType] = useState<string>("Fall"); //set default to Fall for now
    const [SemCount, setSemCount] = useState<number>(1); //default shows 1 semester

    //states for editing courses - created by Malika
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedCourse, setEditedCourse] = useState<Course | null>(null);

    //NOTE FOR MICHAEL: Here is where you can add your add courses and remove courses functions
    function updateCurrCourse(event: React.ChangeEvent<HTMLSelectElement>) {
        setCurrCourse(event.target.value);
    }

    // function removes all courses!
    function clearSemsterCourses() {
        //function to clear all courses within a semester
        //checks the current semester type and semester count
        if (SemCount === 1 && SemesterType === "Fall") {
            setFallSemester({ ...fallSemester, courseList: [] });
        } else if (SemCount === 1 && SemesterType === "Spring") {
            setSpringSemester({ ...springSemester, courseList: [] });
        } else if (SemCount === 2) {
            //if both coursees are displayed empty both courses regardless.
            //setting both course list to empty
            setFallSemester({ ...fallSemester, courseList: [] });
            setSpringSemester({ ...springSemester, courseList: [] });
        }
    }

    function dropClass() {
        // looks through the course list in the current semester and filters out the
        // course with the same "Title" as the state "currCourse"
        // **refer to "currCourse" documentation for more info **
        if (SemCount === 1 && SemesterType === "Fall") {
            setFallSemester({
                ...fallSemester,
                courseList: fallSemester.courseList.filter(
                    (course: Course) => currCourse !== course.title
                )
            });
        } else if (SemCount === 1 && SemesterType !== "Spring") {
            setSpringSemester({
                ...springSemester,
                courseList: springSemester.courseList.filter(
                    (course: Course) => currCourse === course.title
                )
            });
        } else if (SemCount === 2) {
            //filtering the class from both semesters
            setFallSemester({
                ...fallSemester,
                courseList: fallSemester.courseList.filter(
                    (course: Course) => currCourse !== course.title
                )
            });
            setSpringSemester({
                ...springSemester,
                courseList: springSemester.courseList.filter(
                    (course: Course) => currCourse !== course.title
                )
            });
        }
    }

    function addClass() {
        const idea = COURSE_LIST.findIndex(
            (course: Course) => course.title === currCourse
        );
        if (SemCount === 1 && SemesterType === "Fall") {
            setFallSemester({
                ...fallSemester,
                courseList: [...fallSemester.courseList, COURSE_LIST[idea]]
            });
        } else if (SemCount === 1 && SemesterType !== "Spring") {
            setSpringSemester({
                ...springSemester,
                courseList: [...springSemester.courseList, COURSE_LIST[idea]]
            });
        } else if (SemCount === 2) {
            //filtering the class from both semesters
            setFallSemester({
                ...fallSemester,
                courseList: [...fallSemester.courseList, COURSE_LIST[idea]]
            });
            setSpringSemester({
                ...springSemester,
                courseList: [...springSemester.courseList, COURSE_LIST[idea]]
            });
        }
    }

    //function to change number of semesters shown (can be either 1 or 2 only - can add 0 or more semesters later)
    function changeSemCount(): void {
        if (SemCount == 2) {
            setSemCount(1);
        } else {
            setSemCount(2);
        }
    }

    //function to change the semester type to display
    function changeSemester(): void {
        let newSemType = "Default";
        if (SemesterType == "Fall") {
            newSemType = "Spring";
        } else {
            newSemType = "Fall";
        }
        setSemesterType(newSemType); //set the new semester type to display
        /* ADD OTHER TYPES OF SEMESTERS LATER */
    }

    //function to display ONLY the fall semester
    function displayFall(): JSX.Element {
        return (
            <div className="Fall">
                <h1>Fall</h1>
                {fallSemester.courseList.map(
                    // eslint-disable-next-line no-extra-parens
                    (course: Course): JSX.Element => (
                        <div className="Course" key={course.id}>
                            <span key={course.id}>
                                {course.title}
                                {" - "}
                                {course.name}
                            </span>
                        </div>
                    )
                )}
            </div>
        );
    }

    //function to show ONLY the spring semester
    function displaySpring(): JSX.Element {
        return (
            <div className="Spring">
                <h1>Spring</h1>
                {springSemester.courseList.map(
                    // eslint-disable-next-line no-extra-parens
                    (course: Course): JSX.Element => (
                        <div className="Course" key={course.id}>
                            <span key={course.id}>
                                {course.title}
                                {" - "}
                                {course.name}
                            </span>
                        </div>
                    )
                )}
            </div>
        );
    }

    //function to display both semesters
    function displayBoth(): JSX.Element {
        return (
            <div className="Semester">
                <div className="Fall">
                    <h1>Fall</h1>
                    {fallSemester.courseList.map(
                        // eslint-disable-next-line no-extra-parens
                        (course: Course): JSX.Element => (
                            <div className="Course" key={course.id}>
                                <span key={course.id}>
                                    {course.title}
                                    {" - "}
                                    {course.name}
                                </span>
                            </div>
                        )
                    )}
                </div>
                <div className="Spring">
                    <h1>Spring</h1>
                    {springSemester.courseList.map(
                        // eslint-disable-next-line no-extra-parens
                        (course: Course): JSX.Element => (
                            <div className="Course" key={course.id}>
                                <span key={course.id}>
                                    {course.title}
                                    {" - "}
                                    {course.name}
                                </span>
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }

    //function to handle displaying semesters
    function OneorTwo(): JSX.Element {
        if (SemCount == 1 && SemesterType == "Fall") {
            return <div className="Semester">{displayFall()}</div>;
        } else if (SemCount == 1 && SemesterType == "Spring") {
            return <div className="Semester">{displaySpring()}</div>;
        } else {
            return displayBoth();
        }
    }

    //functions to edit courses - Malika
    const handleEditShow = (course: Course | undefined) => {
        if (course) {
            setEditedCourse(course);
            setShowEditModal(true);
        } else {
            return null;
        }
    };

    const handleEditClose = () => {
        setEditedCourse(null);
        setShowEditModal(false);
    };

    const handleSaveChanges = (editedCourse: Course) => {
        //update courseList with edited values
        updateCourseList(COURSE_LIST, editedCourse);

        setEditedCourse(null);
        setCurrCourse("");
        // Close the modal
        handleEditClose();
    };

    const handleResetToDefault = (editedCourse: Course) => {
        console.log("Edited course exists");
        const defaultCourse = findCourse(DEFAULT_COURSE_LIST, editedCourse.id);
        if (defaultCourse) {
            setEditedCourse(defaultCourse);

            updateCourseList(COURSE_LIST, defaultCourse);
        }

        // Close the modal
        handleEditClose();
    };

    //actual return for the tsx file to App.tsx
    return (
        <div>
            <div>
                <Button onClick={changeSemCount}>Show One Semester</Button>
                <Button onClick={changeSemester}>
                    Show Different Semester
                </Button>
                {OneorTwo()}
            </div>
            <hr></hr>
            <div>
                <Button onClick={clearSemsterCourses}>
                    Remove All Courses
                </Button>
            </div>
            <hr></hr>
            <div>
                <Form.Group controlId="currentCourse">
                    <Form.Label>Select A Course</Form.Label>
                    <Form.Select value={currCourse} onChange={updateCurrCourse}>
                        {
                            //Needed to disable prettier here because there was an "extra parenths" error that couldn't be resolved by any means. Will need to ask the professor but we wanted to showcase the funcitonality of the dropdown for the MVP
                            // eslint-disable-next-line no-extra-parens
                            COURSE_LIST.map((courseName: Course) => (
                                <option
                                    key={courseName.title}
                                    value={courseName.title}
                                >
                                    {courseName.title}
                                </option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Button onClick={dropClass}>Remove Class</Button>
                <Button onClick={addClass}>Add Class</Button>
                <Button
                    onClick={() =>
                        handleEditShow(
                            COURSE_LIST.find(
                                (course) => course.title === currCourse
                            )
                        )
                    }
                >
                    Edit Course
                </Button>
                {/* CourseEdit modal */}
                {editedCourse && (
                    <CourseEdit
                        editedCourse={editedCourse}
                        onSaveChanges={handleSaveChanges}
                        onResetToDefault={handleResetToDefault}
                        onClose={handleEditClose}
                    />
                )}
            </div>
        </div>
    );
}
