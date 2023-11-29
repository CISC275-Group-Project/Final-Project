/* eslint-disable @typescript-eslint/no-unused-vars */
//for visualization of semesters and altering the courses within them

import React, { useState } from "react";
import "../App.css";
import { courseList, defaultCourseList } from "./course";
import "./Semester.css";
import { Course } from "../Interfaces/course";
import { Button, Form } from "react-bootstrap";
import { Semester } from "../Interfaces/semester";
import sample from "../data/AllCourseList.json";
import CourseEdit from "./CourseEdit";
import { updateCourseList, findCourse, displayCourse } from "./course";
import { DisplayFall } from "./DisplayFall";
import { DisplaySpring } from "./DisplaySpring";
import { DisplayPlan } from "./DisplayPlan";

//A variable able to use for the list of courses within the JSON file.
const COURSES_LIST = courseList;

//variable to use DEFAULT list of courses from JSON file - Malika
const DEFAULT_COURSE_LIST = defaultCourseList;

//import sample from "../data/AllCourseList.json";
import { ClearSemester } from "./clearingSemester";
import { DropAdd } from "./dropAdd";
import { Plan } from "../Interfaces/plan";
import { AI } from "./plan";
// import { courseList } from "./course";

// const COURSE_LIST = courseList; //list of all the courses
const AI_Plan = AI(); //the actual AI plan itself
const AI_Semesters = AI_Plan.semesters; //the semesters for the AI plan
const DEFAULT_COURSE = AI_Semesters[0].courseList[0].title;

export function ViewSemester(): JSX.Element {
    const [plan, setPlan] = useState<Plan>(AI_Plan); //The default plan (for now)
    const [semesters, setSemesters] = useState<Semester[]>(AI_Semesters); //the default semesters (for now)
    const [currCourse, setCurrCourse] = useState<string>(DEFAULT_COURSE);
    const [SemesterType, setSemesterType] = useState<string>("Fall"); //can be "Fall", "Spring" or "Both"
    const [SemCount, setSemCount] = useState<number>(1); //default shows 1 semester
    const [clicked, setClicked] = useState<boolean>(false);
    // const [targetSem, setTargetSem] = useState<string>("Fall"); //fall or spring only
    // const [targetYear, setTargetYear] = useState<number>(1);
    let targetYear = 1;
    targetYear = 0;

    let targetSem = "Spring";
    targetSem = "Fall";
    //states for editing courses - created by Malika
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedCourse, setEditedCourse] = useState<Course | null>(null);

    //NOTE FOR MICHAEL: Here is where you can add your add courses and remove courses functions
    //Here is where you can add your add courses and remove courses functions
    function updateCurrCourse(event: React.ChangeEvent<HTMLSelectElement>) {
        setCurrCourse(event.target.value);
    }

    function index(targetYear: number, targetSem: string): number {
        let idx = 0;
        if (targetYear === 1 && targetSem === "Fall") {
            if (targetSem === "Fall") {
                idx = 0;
            } else if (targetSem === "Spring") {
                idx = 1;
            }
        } else if (targetYear === 2) {
            if (targetSem === "Fall") {
                idx = 2;
            } else if (targetSem === "Spring") {
                idx = 3;
            }
        } else if (targetYear === 3) {
            if (targetSem === "Fall") {
                idx = 4;
            } else if (targetSem === "Spring") {
                idx = 5;
            }
        } else if (targetYear === 4) {
            if (targetSem === "Fall") {
                idx = 6;
            } else if (targetSem === "Spring") {
                idx = 7;
            }
        }
        return idx;
    }

    // function removes all courses!
    function clearSemesterCourses() {
        const idx = index(targetYear, targetSem);
        const newSemester = semesters;
        newSemester[idx].courseList = [];

        //function to clear all courses within a semester
        setSemesters(newSemester);
        handleClose();
    }

    //functions for visibility of the modal of clearing semesters (the warning)
    function handleClose() {
        setClicked(false);
    }

    function handleShow() {
        setClicked(true);
    }

    function dropClass() {
        const idx = index(targetYear, targetSem);
        const newSemester = semesters;
        const newClasses = newSemester[idx].courseList.filter(
            (course: Course) => currCourse !== course.title
        );
        newSemester[idx].courseList = newClasses;
        // looks through the course list in the current semester and filters out the
        // course with the same "Title" as the state "currCourse"
        // **refer to "currCourse" documentation for more info **
        setSemesters(newSemester);
    }

    function addClass() {
        const idx = index(targetYear, targetSem);
        const newSemester = semesters;
        const newClasses = newSemester[idx].courseList;
        //idea was a little connfusing for the variable name so we renamed it choiceIdx and choice is the actual course data structure
        const choiceIdx = COURSES_LIST.findIndex(
            (course: Course) => course.title === currCourse
        );
        const choice = COURSES_LIST[choiceIdx];
        //checks if it's already there
        //if exists stays as -1 then the course isn't already in the semester list and should be added otherwise nothing happens

        let exists = -1;
        exists = newClasses.findIndex(
            (course: Course) => course.id === COURSES_LIST[choiceIdx].id
        );

        if (exists !== -1) {
            newClasses.push(choice);
        }

        newSemester[idx].courseList = newClasses;
        setSemesters(newSemester);
    }

    //function to change number of semesters shown (can be either 1 or 2 only - can add 0 or more semesters later)
    function changeSemCount(): void {
        if (SemCount === 2) {
            console.log("Changing SemCount to 1");
            setSemCount(1);
            setSemesterType("Fall");
        } else {
            console.log("Changing SemCount to 2");
            setSemCount(2);
            setSemesterType("Both");
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
        targetSem = newSemType; //set the new semester type to display
        /* ADD OTHER TYPES OF SEMESTERS LATER */
    }

    //function to display both semesters
    function displayBoth(targetYear: number, targetSem: string): JSX.Element {
        //setTargetSem("Spring");
        //let idx = index();
        // //an array of courses in the plan's semester (ex. spring of year 1)
        // const springCourses = semesters[idx].courseList;

        // setTargetSem("Fall");
        // idx = index();
        // //an array of courses in the plan's semester (ex. fall of year 1)
        // const fallCourses = semesters[idx].courseList;

        return (
            <div className="Semester">
                <DisplayFall
                    semesters={semesters}
                    setSemesters={setSemesters}
                    targetSem={targetSem}
                    currCourse={currCourse}
                    setCurrCourse={setCurrCourse}
                    clicked={clicked}
                    setClicked={setClicked}
                    targetYear={targetYear}
                    dropClass={dropClass}
                    addClass={addClass}
                    updateCurrCourse={updateCurrCourse}
                    clearSemesterCourses={clearSemesterCourses}
                    handleClose={handleClose}
                    handleShow={handleShow}
                    index={(targetYear, targetSem) =>
                        index(targetYear, targetSem)
                    }
                ></DisplayFall>
                <DisplaySpring
                    semesters={semesters}
                    setSemesters={setSemesters}
                    targetSem={targetSem}
                    currCourse={currCourse}
                    setCurrCourse={setCurrCourse}
                    clicked={clicked}
                    setClicked={setClicked}
                    targetYear={targetYear}
                    dropClass={dropClass}
                    addClass={addClass}
                    updateCurrCourse={updateCurrCourse}
                    clearSemesterCourses={clearSemesterCourses}
                    handleClose={handleClose}
                    handleShow={handleShow}
                    index={(targetYear, targetSem) =>
                        index(targetYear, targetSem)
                    }
                ></DisplaySpring>
            </div>
        );
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
        updateCourseList(COURSES_LIST, editedCourse);

        setEditedCourse(null);
        setCurrCourse("");
        // Close the modal
        handleEditClose();
    };

    //resetting course info to default: Malika
    const handleResetToDefault = (editedCourse: Course) => {
        console.log("Edited course exists");
        const defaultCourse = findCourse(DEFAULT_COURSE_LIST, editedCourse.id);
        if (defaultCourse) {
            setEditedCourse(defaultCourse);

            updateCourseList(COURSES_LIST, defaultCourse);
        }

        // Close the modal
        handleEditClose();
    };

    //actual return for the tsx file to App.tsx
    return (
        <div>
            <div>
                {/*OneorTwo()*/}
                {/*SemCount !== 1 && displayBoth()*/}
                <DisplayPlan
                    targetYear={targetYear}
                    targetSem={targetSem}
                    displayBoth={displayBoth}
                ></DisplayPlan>
            </div>
            <hr></hr>
            {
                <div>
                    <Form.Group controlId="currentCourse">
                        <Form.Label>Select A Course</Form.Label>
                        <Form.Select
                            value={currCourse}
                            onChange={updateCurrCourse}
                        >
                            {
                                //Needed to disable prettier here because there was an "extra parenths" error that couldn't be resolved by any means. Will need to ask the professor but we wanted to showcase the funcitonality of the dropdown for the MVP
                                // eslint-disable-next-line no-extra-parens
                                COURSES_LIST.map((courseName: Course) => (
                                    <option
                                        key={courseName.id}
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
                                COURSES_LIST.find(
                                    (course) => course.title === currCourse
                                )
                            )
                        }
                    >
                        Edit Course
                    </Button>
                    {/* CourseEdit modal */}
                    {/* {editedCourse && (
                        <CourseEdit
                            editedCourse={editedCourse}
                            onSaveChanges={handleSaveChanges}
                            onResetToDefault={handleResetToDefault}
                            onClose={handleEditClose}
                        />
                    )} */}
                </div>
            }
        </div>
    );
}
