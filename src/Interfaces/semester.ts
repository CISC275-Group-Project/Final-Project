//interface for creating a semester
import { Course } from "./course";

export interface Semester {
    type: string[];
    year: number;
    totalCredits: number;
    courseList: Course[];
}
