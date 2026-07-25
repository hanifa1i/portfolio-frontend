import { formatDistanceToNow } from "date-fns";
import { RecentActivity, TotalCount } from "../types/Dashboard";
import { ExperiencePayload, WorkActivity, WorkProject } from "../types/FormPayload";
import { ExperienceValidation } from "../types/FormValidation";

export async function getCount(){
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/count`);

    if(!response.ok) {
        throw new Error("Failed to get total count")
    }

    const data: TotalCount = await response.json();
    console.log("Recieved", data);

    return data
}

export async function getRecentActivities(){
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recent`);

    if(!response.ok) {
        throw new Error("Failed to get recent activities")
    }

    const data: RecentActivity[] = await response.json();
    console.log("Recieved", data);

    return data
}
export async function getRecentSketchActivities(){
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recent/sketch`);

    if(!response.ok) {
        throw new Error("Failed to get recent sketch activities")
    }

    const data: RecentActivity[] = await response.json();
    console.log("Recieved", data);

    return data
}
export function isValid(array: WorkActivity[] | WorkProject[]) {

    return array.every(
        activity => Object.values(activity).every(value => value === "")
    );
    
}
export function isFormValid(validation: ExperienceValidation) {

    return Object.values(validation).every(value => value === "")
    
}
export function formatDateFromDistanceToNow(date: string){
    const raw = formatDistanceToNow(new Date(date), { addSuffix: true });
            return raw
                .replace("less than a minute ago", "now")
                .replace(" minutes", "m")
                .replace(" minute", "m")
                .replace(" hours", "h")
                .replace(" hour", "h")
                .replace(" days", "d")
                .replace(" day", "d")
                .replace(" months", "mo")
                .replace(" month", "mo")
                .replace(" years", "y")
                .replace(" year", "y")
                .replace("about ", "")
}