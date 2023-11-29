/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Semester } from "../Interfaces/semester";

export interface valueProps {
    targetYear: number;
    targetSem: string;
    displayBoth(targetYear: number, targetSem: string): JSX.Element;
}

export function DisplayPlan({
    displayBoth,
    targetSem,
    targetYear
}: valueProps): JSX.Element {
    targetYear = 1;
    const firstYear = displayBoth(targetYear, targetSem);
    targetYear = 2;
    const secondYear = displayBoth(targetYear, targetSem);
    targetYear = 3;
    const thirdYear = displayBoth(targetYear, targetSem);
    targetYear = 4;
    const fourthYear = displayBoth(targetYear, targetSem);

    return (
        <div>
            {firstYear}
            {secondYear}
            {thirdYear}
            {fourthYear}
        </div>
    );
}
