import styles from "./NewEntry.module.css"
import useScrollReveal from "@/app/hooks/useScrollReveal";
import Sidebar from "./sidebar/Sidebar";
import { useState } from "react";
import Date from "./date/Date";
import DropDownList from "./dropDownList/DropDownList";
import Project from "./project/Project";
import Activity from "./activity/Activity";
import workProjects from "../../experience/workProjects/workProjects";
import { addAbortListener } from "events";
import { playSound, playSoundAt } from "@/app/lib/SoundManager";
import { createExperience, getExperienceById, updateExperience } from "@/app/services/ExperienceService";
import FormSubmit from "./formSubmit/FormSubmit";
import { CommonValidation, WorkExperienceValidation } from "@/app/data/validation/inputValidation";
import Input, { InputLarge } from "./input/Input";
import { ExperiencePayload, WorkActivity, WorkProject } from "@/app/types/FormPayload";
import { isFormValid } from "@/app/services/CommonService";
import { WorkExperienceResponse } from "@/app/types/Dashboard";

type Props = {
    section: string
    switchSection: (section: string) => void;
    setNewEntry: (entry: string) => void;
    existingId: number;
    setExistingId: (id: number) => void;
}
export default function NewEntry({ section, switchSection, setNewEntry, existingId, setExistingId }: Props) {
    useScrollReveal("offscreenRight", "easeIn", false);
    const tagList = ["landscape", "potriate"];
    const [loading, setLoading] = useState("false");
    const [fadeOut, setFadeOut] = useState(false);

    const [jobTitle, setJobTitle] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setdStartDate] = useState("");
    const [endDate, seteEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState<string[]>([]);
    const [projects, setProjects] = useState<WorkProject[]>([]);
    const [projectValidation, setProjectValidation] = useState<WorkProject[]>([]);
    const [activities, setActivities] = useState<WorkActivity[]>([]);
    const [activityValidation, setActivityValidation] = useState<WorkActivity[]>([]);

    const [jobExperience, setJobExperience] = useState<ExperiencePayload>({
        job_title: "", company_name: "", description: "", location: "", start_date: "", end_date: "", projects: [],
        activities: activities, skills: skills
    });
    const [cStartDate, setCStartDate] = useState("");
    const [cEndDate, setCEndDate] = useState("");

    const [validation, setValidation] = useState({
        jobTitle: WorkExperienceValidation.jobTitleBlank,
        companyName: WorkExperienceValidation.companyNameBlank,
        location: WorkExperienceValidation.locationBlank,
        startDate: CommonValidation.dateInvalidFormat,
        endDate: CommonValidation.dateInvalidFormat,
        description: WorkExperienceValidation.descriptionBlank
    });

    const transferInfo = async (id: number) => {
        const existingExperience: WorkExperienceResponse = await getExperienceById(id);
        setJobExperience({
            job_title: existingExperience.job_title,
            company_name: existingExperience.company_name,
            description: existingExperience.description,
            location: existingExperience.location,
            start_date: existingExperience.start_date,
            end_date: existingExperience.end_date,
            projects: [],
            activities: [],
            skills: existingExperience.skills
        })
        setCStartDate(existingExperience.start_date);
        setCEndDate(existingExperience.end_date);
        setProjects(existingExperience.projects);
        setActivities(existingExperience.activities);
        setValidation({jobTitle: "", companyName: "", location: "", startDate: "", endDate: "", description: ""})
    }
    const [oneTimeRun, setOneTimeRun] = useState(true);
    if (oneTimeRun === true && existingId !== 0) {
        transferInfo(existingId);
        setOneTimeRun(false);
    }

    const handleInputValidation = (name: string, value: string) => {
        if (name === "job title") {
            jobExperience.job_title = value;
            setJobTitle(value);
            if (value.length < 1) {
                validation.jobTitle = WorkExperienceValidation.jobTitleBlank;
            } else if (value.length > 30) {
                validation.jobTitle = WorkExperienceValidation.jobTitleMaxLimit;
            } else {
                validation.jobTitle = ""
            }
        }
        if (name === "company name") {
            jobExperience.company_name = value;
            setCompanyName(value);
            if (value.length < 1) {
                validation.companyName = WorkExperienceValidation.companyNameBlank;
            } else if (value.length > 30) {
                validation.companyName = WorkExperienceValidation.companyNameMaxLimit;
            } else {
                validation.companyName = "";
            }
        }
        if (name === "location") {
            jobExperience.location = value;
            setLocation(value);
            if (value.length < 1) {
                validation.location = WorkExperienceValidation.locationBlank;
            } else if (value.length > 30) {
                validation.location = WorkExperienceValidation.locationMaxLimit;
            } else {
                validation.location = "";
            }
        }
        if (name === "description") {
            jobExperience.description = value;
            setDescription(value);
            if (value.length < 1) {
                validation.description = WorkExperienceValidation.descriptionBlank;
            } else {
                validation.description = "";
            }
        }
        console.log(jobExperience)

    }
    const setStartDate = (value: string, dateValidation: string) => {
        jobExperience.start_date = value;
        validation.startDate = dateValidation;
    }
    const setEndDate = (value: string, dateValidation: string) => {
        jobExperience.end_date = value;
        validation.endDate = dateValidation;
    }

    const handleCreate = async () => {

        console.log(validation)
        if (!isFormValid(validation)
            || (projectValidation.length > 0 && !isValid(projectValidation))
            || (activityValidation.length > 0 && !isValid(activityValidation))) {
            playSound("error");
            setLoading("error")
            setTimeout(() => { setLoading("false") }, 5000);
            return;
        }
        if (projectValidation.length > 0 && !isValid(projectValidation)) {
            console.log("project invalid")
            return;
        }
        if (activityValidation.length > 0 && !isValid(activityValidation)) {
            console.log("activity invalid")
            return;
        }
        try {
            setLoading("true");
            jobExperience.activities = activities
            jobExperience.projects = projects
            jobExperience.skills = skills

            if (existingId !== 0) {
                const update = await updateExperience(existingId, jobExperience);
                console.log("Create: " + update);
            }
            else {
                const saved = await createExperience(jobExperience);
                console.log("Create: " + saved);
            }

            

            setTimeout(() => { setLoading("completed"); playSoundAt("granted2", .2); }, 1000);
            setTimeout(() => { switchSection(""); setNewEntry(""); setLoading("false"); reset();}, 3000);

            
        }
        catch (error) {
            console.error(error);
            playSound("error");
            return
        }
    }


    const isValid = (array: WorkActivity[] | WorkProject[]) => array.every(activity =>
        Object.values(activity).every(value => value === "")
    );
    const reset = () => {
        setExistingId(0);
        setOneTimeRun(true);
        setNewEntry("");
    }
    return (
        <div className={`${styles.container} ${section !== "new" ? styles.condenseContainer : ""} ${fadeOut ? styles.fadeOut : ""} ${loading === "error" ? styles.shake : ""}`}>
            <Sidebar heading={existingId === 0 ? "add experience " : `edit experience ${existingId}`} handleCreate={handleCreate} switchSection={switchSection} setFadeOut={setFadeOut} loading={loading} handleBackButton={reset} />

            <div className={`${styles.formContainer} offscreenRight`}>
                <Input inputType="job title" value={jobExperience.job_title} required validationMessage={validation.jobTitle} handleValidation={handleInputValidation} />
                <Input inputType="company name" value={jobExperience.company_name} required validationMessage={validation.companyName} handleValidation={handleInputValidation} />
                <Input inputType="location" value={jobExperience.location} required validationMessage={validation.location} handleValidation={handleInputValidation} />
                <Date heading={'date started'} preSetDate={cStartDate} setDate={setStartDate} />
                <Date heading={'end date'} preSetDate={cEndDate} setDate={setEndDate} />
                <InputLarge inputType="description" value={jobExperience.description} required validationMessage={validation.description} handleValidation={handleInputValidation} />
                <DropDownList heading={"skills learned"} validationMessage={"optional - add skills learned from experience"} values={tagList} onChange={setSkills} required={true} preSetValues={jobExperience.skills} />
                <Project data={projects} setData={setProjects} setValidationIssue={setProjectValidation} />
                <Activity data={activities} setData={setActivities} setValidationIssue={setActivityValidation} />
            </div>

            <FormSubmit submitType={loading} />
        </div>
    )
}