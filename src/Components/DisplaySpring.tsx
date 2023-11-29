/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Course } from "../Interfaces/course";
import { ClearSemester } from "./clearingSemester";
import { displayCourse } from "./course";
import { DropAdd } from "./dropAdd";
import { Semester } from "../Interfaces/semester";

export interface valueProps {
    semesters: Semester[];
    setSemesters: (expression: Semester[]) => void;
    targetSem: string;
    currCourse: string;
    setCurrCourse: (expression: string) => void;
    clicked: boolean;
    setClicked: (expression: boolean) => void;
    targetYear: number;
    dropClass(): void;
    addClass(): void;
    updateCurrCourse(event: React.ChangeEvent<HTMLSelectElement>): void;
    clearSemesterCourses(): void;
    handleClose(): void;
    handleShow(): void;
    index(targetYear: number, targetSem: string): number;
}

// function to display ONLY the fall semester
export function DisplaySpring({
    semesters,
    targetSem,
    currCourse,
    clicked,
    targetYear,
    dropClass,
    addClass,
    updateCurrCourse,
    clearSemesterCourses,
    handleClose,
    handleShow,
    index
}: valueProps): JSX.Element {
    // setTargetSem("Spring");
    //an array of courses in the plan's semester (ex. spring of year 1)

    targetSem = "Spring";
    const idx = index(targetYear, targetSem);

    const springCourses = semesters[idx].courseList;
    console.log("idx in Spring returned is");
    console.log(idx);

    return (
        <div className="Spring">
            <h1>Spring Year {targetYear}</h1>
            {springCourses.map(
                // eslint-disable-next-line no-extra-parens
                (course: Course): JSX.Element => (
                    <div className="Course" key={course.id}>
                        <span key={course.id}>
                            {course.title}
                            {" - "}
                            {course.name}
                            {/* {displayCourse(course)} */}
                        </span>
                    </div>
                )
            )}
            <div>
                <DropAdd
                    dropClass={dropClass}
                    addClass={addClass}
                    updateCurrCourse={updateCurrCourse}
                    currCourse={currCourse}
                    Course_List={springCourses}
                ></DropAdd>
                <ClearSemester
                    clearSemesterCourses={clearSemesterCourses}
                    show={clicked}
                    handleClose={handleClose}
                    handleShow={handleShow}
                ></ClearSemester>
            </div>
        </div>
    );
}
