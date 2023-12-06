// import React /*{ useState }*/ from "react";
// import "./App.css";
// import { ViewSemester } from "./Components/Semester";
// //import { Welcome } from "./Components/welcome";
// //import { Button } from "react-bootstrap";
// //import { clearSemester } from "./Components/clearingSemester";
// //import { clearCourse } from "./Components/clearingCourse";

// function App(): JSX.Element {
//     //constants for welcome message button/modal
//     //const [displayWelcomeMessage, displayWelcomeModal] = useState(true);
//     //const welcomeMessage = () => displayWelcomeModal(false);
//     //const welcomeMessageModal = () => displayWelcomeModal(true);

//     return (
//         <div className="App">
//             <header className="App-header">
//                 UD CISC275 - Degree Planner
//                 <h6>Matthew Mestre</h6>
//                 <h6>Bryant Ferguson</h6>
//                 <h6>Ava West</h6>
//                 <h6>Malika Iyer</h6>
//                 <h6>Dina Dawood</h6>
//             </header>
//             <hr></hr>
//             {/*This is the collaspe button*/}
//             <button
//                 type="button"
//                 className="btn btn-info "
//                 data-bs-toggle="collapse"
//                 data-bs-target="#welcome_message"
//             >
//                 Need Help❓
//             </button>
//             <hr></hr>
//             {/*When the button is clicked the message collapses*/}
//             <div id="welcome_message" className="collapse">
//                 <p>
//                     Welcome to your personal Degree Planner! Some basic tools
//                     have been designed to make your visit accessible to your
//                     needs; this includes creating new plans from scratch and/or
//                     compiling data from a csv file. You will be able to add,
//                     remove, edit, and save various courses/semesters in a
//                     multitude of plans. Scroll to the bottom of the page for
//                     more instructions (will enhance later by making an
//                     expandable/disposable button near the top of the page).
//                 </p>
//             </div>

//             <hr></hr>
//             <ViewSemester></ViewSemester>
//         </div>
//     );
// }

// export default App;

import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import "./App.css";

import AllCoursesList from "./data/AllCourseList.json";
import degreeList from "./data/degreeList.json";
import displaySemesters from "./data/displaySemesters.json";

import { Welcome } from "./Components/welcome";
import { CourseOrigin } from "./Components/courseOrigin";

import { AddingCourse } from "./Components/addingCourse";
import { AddingSemester } from "./Components/addingSemester";
import { AddingPlan } from "./Components/addingPlan";

import { ClearCourse } from "./Components/removingCourse";
import { ClearSemester } from "./Components/clearingSemester";
import { ClearingPlan } from "./Components/clearingPlan";

import { ViewCourses } from "./Components/ViewCourses";
import { ViewSemester } from "./Components/ViewSemester";
import { ViewPooling } from "./Components/ViewPooling";

import { EditingSemester } from "./Components/EditingSemester";
import { MultiSemester } from "./Components/multiSemester";

import { SwitchingSemesters } from "./Components/SwitchingSemesters";
import { SwitchingPlan } from "./Components/SwitchingPlan";

import { Course } from "./Interfaces/course";
import { Semester } from "./Interfaces/semester";
import { Plan } from "./Interfaces/plan";
import { PoolingObjects } from "./Interfaces/poolingObjects";

const SemesterFinal = displaySemesters.map(
    (semester): Semester => ({
        ...semester,
        courseList: semester.courseList.map(
            (course): Course => ({
                title: course.title,
                name: course.name,
                description: course.description,
                credits: course.credits,
                semester: course.semester,
                department: course.department,
                prereq: course.prereq,
                coreq: course.coreq,
                requirements: course.requirements
            })
        )
    })
);

function App(): JSX.Element {
    const [planList, settingPlanList] = useState<Plan[]>([
        {
            id: 1,
            title: "Plan #1",
            concentration: "Artificial Intelligence",
            semesters: SemesterFinal,
            credits: 0
        },
        {
            id: 2,
            title: "Plan #2",
            concentration: "Cybersecurity",
            semesters: SemesterFinal,
            credits: 0
        }
    ]);

    const [plan, settingPlan] = useState<Plan>(planList[0]);
    const [addingMod, setAddingMod] = useState(false);

    function settingSemester(newSemester: Semester) {
        const origin = plan.semesters.find(
            (semester: Semester): boolean => semester.id === newSemester.id
        );
        if (origin === undefined) {
            plan.semesters.push(newSemester);
            settingPlan(plan);
        }
    }

    function clearSemesterCourses(id: string) {
        const newPlan: Plan = {
            ...plan,
            semesters: plan.semesters.filter(
                (semester: Semester): boolean => semester.id !== id
            )
        };
        settingPlan(newPlan);
        settingPlanList(
            planList.map((p: Plan): Plan => (p.id === newPlan.id ? newPlan : p))
        );
    }

    function editingSemester(plan: Plan) {
        settingPlanList(
            planList.map((p: Plan): Plan => (p.id === plan.id ? plan : p))
        );
    }
    //constants for welcome message button/modal
    //const [displayWelcomeMessage, displayWelcome] = useState(true);
    //const welcomeMessage = () => displayWelcome(false);
    //const welcomeMessage = () => displayWelcome(true);

    type CourseRecord = Record<string, Record<string, Course>>;
    const ALLCOURSELST: CourseRecord = AllCoursesList;
    const poolingObj: PoolingObjects = {
        courses: ALLCOURSELST,
        semesters: plan.semesters
    };

    //Displaying and Closing Semester Mod Constants
    const handleAddingMod = () => setAddingMod(true);
    const handleCloseAddMod = () => setAddingMod(false);

    //Displaying and Closing AddPlan Mod Constants
    const [showingPlan, settingShowPlan] = useState(false);
    const handleShowPlan = () => settingShowPlan(true);
    const handleCloseShowPlan = () => settingShowPlan(false);

    //Displaying and Closing AddPlan Mod Constants
    const [addingPlan, settingAddPlan] = useState(false);
    const handleShowAddPlan = () => settingAddPlan(true);
    const handleCloseAddPlan = () => settingAddPlan(false);

    //Displaying and Closing ClearPlan Mod Constants
    const [clearingPlan, settingClearPlan] = useState(false);
    const handleShowClearPlan = () => settingClearPlan(true);
    const handleCloseClearPlan = () => settingClearPlan(false);

    //Displaying and Closing RemovePlan Mod Constants
    const [removingPlan, settingRemovePlan] = useState(false);
    const handleShowRemovePlan = () => settingRemovePlan(true);
    const handleCloseRemovePlan = () => settingRemovePlan(false);

    //Displaying and Closing EditPlan Mod Constants
    const [editingPlan, settingEditingPlan] = useState(false);
    const handleShowEditingPlan = () => settingEditingPlan(true);
    const handleCloseEditingPlan = () => settingEditingPlan(false);

    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 - Degree Planner
                <h6>Matthew Mestre</h6>
                <h6>Bryant Ferguson</h6>
                <h6>Ava West</h6>
                <h6>Malika Iyer</h6>
                <h6>Dina Dawood</h6>
            </header>

            <div>
                <p>
                    <Welcome></Welcome>
                </p>
            </div>

            <Row>
                <Col>
                    <header>
                        <b>{plan.title}</b>
                    </header>
                    <Button
                        onClick={handleShowAddPlan}
                        data-testid="addingPlanMod"
                    >
                        {" "}
                        Add Plan
                    </Button>
                    <AddingPlan
                        show={addingPlan}
                        handleClose={handleCloseAddPlan}
                        plans={planList}
                        settingPlan={settingPlan}
                        settingPlans={settingPlanList}
                    ></AddingPlan>

                    <Button
                        onClick={handleShowPlan}
                        data-testid="switchingBTWPlansMod"
                    >
                        Switch Plan
                    </Button>
                    <SwitchingPlan>
                        show={showingPlan}
                        handleClose={handleCloseShowPlan}
                        plan={plan}
                        settingPlan={settingPlan}
                        plans={settingPlanList}
                    </SwitchingPlan>
                    <MultiSemester
                        currentPlan={plan}
                        plans={planList}
                        settingPlan={settingPlan}
                        settingPlans={settingPlanList}
                        editingSemester={editingSemester}
                        clearSemesterCourses={clearSemesterCourses}
                    ></MultiSemester>
                    <Row>
                        <Col>
                            <Button
                                onClick={handleAddingMod}
                                data-testid="addingSemMod"
                            >
                                Add Semester
                            </Button>
                            <AddingSemester
                                show={addingMod}
                                handleClose={handleCloseAddMod}
                                settingSemester={settingSemester}
                            ></AddingSemester>

                            <Button
                                onClick={handleShowClearPlan}
                                data-testid="clearPlanMod"
                            >
                                Clear Plan
                            </Button>
                            <ClearingPlan
                                show={clearingPlan}
                                handleClose={handleCloseClearPlan}
                                plan={plan}
                                settingPlan={settingPlan}
                                plans={planList}
                                settingPlans={settingPlanList}
                            ></ClearingPlan>

                            <Button
                                onClick={handleShowRemovePlan}
                                data-testid="removingPlanMod"
                            >
                                Remove Plan
                            </Button>
                            <RemovingPlan>
                                show={removingPlan}
                                handleClose={handleCloseRemovePlan}
                                plan={plan}
                                settingPlan={settingPlan}
                                plans={planList}
                                settingPlans={settingPlanList}
                            </RemovingPlan>

                            <Button
                                onClick={handleShowEditingPlan}
                                data-testid="editingPlanMod"
                            >
                                Edit Plan
                            </Button>
                            <EditingPlan
                                show={editingPlan}
                                handleClose={handleCloseEditingPlan}
                                plan={plan}
                                settingPlan={settingPlan}
                                plans={planList}
                                settingPlans={settingPlanList}
                            ></EditingPlan>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default App;
