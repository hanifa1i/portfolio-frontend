import experience from "@/app/components/experience/experience"

export const CommonValidation = {
    
    blank: (inputType: string, maxCharactors: number) => `ⓘ   ${inputType} must be added (${maxCharactors})`,
    charactorLimit: (inputType: string, maxCharactors: number) => `ⓘ   ${inputType} must be below ${maxCharactors} characters`,
    noItemSelect: (inputType: string) => `ⓘ  at least one ${inputType} must be selected`,

    dateInvalidFormat: "ⓘ   date must be in format (example: 01 12 2005)"
}

export const ArtworkValidation = {
    titleBlank:             CommonValidation.blank("title", 30),
    titleMaxLimit:          CommonValidation.charactorLimit("title", 30), 
    descriptionBlank:       CommonValidation.blank("description", 700),
    descriptionMaxLimit:    CommonValidation.charactorLimit("description", 700),
    toolBlank:              CommonValidation.blank("tool", 15),
    toolMaxLimit:           CommonValidation.charactorLimit("tool", 15),
    tagBlank:               CommonValidation.noItemSelect("tag")
}
export const SketchbookValidation = {
    noImage:                "ⓘ   upload the page of the sketch",
    noBook:                 "ⓘ   upload the page of the sketch",
    pageNoBlank:            "optional - add page number only if the new sketch is to be placed inbetween existing sketches",
    pageNoInvalid:          "ⓘ   input must be a number",
    descriptionBlank:       CommonValidation.blank("description", 700),
    descriptionMaxLimit:    CommonValidation.charactorLimit("description", 700),
}
export const SkillValidation = {
    skillBlank:             CommonValidation.blank("skill", 30),
    skillMaxLimit:          CommonValidation.charactorLimit("skill", 30),
    descriptionBlank:       CommonValidation.blank("description", 2000),
    descriptionMaxLimit:    CommonValidation.charactorLimit("description", 2000),
    skillTypeBlank:         CommonValidation.noItemSelect("skill type"),
    skillTypeMaxLimit:      "ⓘ   only one skill type can be set",
    experienceBlank:        "ⓘ   add at least one way to learnt the skill"
}

export const QualificationValidation = {
    levelBlank:             CommonValidation.blank("level", 50),
    levelMaxLimit:          CommonValidation.charactorLimit("level", 50),
    subjectBlank:           CommonValidation.blank("subject", 50),
    subjectMaxLimit:        CommonValidation.charactorLimit("subject", 50),
    institutionBlank:       CommonValidation.blank("institution", 50),
    institutionMaxLimit:    CommonValidation.charactorLimit("institution", 50),
    gradeBlank:             CommonValidation.blank("grade", 30),
    gradeMaxLimit:          CommonValidation.charactorLimit("grade", 30),
    descriptionBlank:       CommonValidation.blank("description", 700),
    descriptionMaxLimit:    CommonValidation.charactorLimit("description", 700),
    noDocument:             "ⓘ   add at least 1 document showing qualification"
}

export const WorkExperienceValidation = {
    jobTitleBlank:          CommonValidation.blank("job title", 30),
    jobTitleMaxLimit:       CommonValidation.charactorLimit("job title", 30),
    companyNameBlank:       CommonValidation.blank("company name", 30),
    companyNameMaxLimit:    CommonValidation.charactorLimit("company name", 30),
    locationBlank:          CommonValidation.blank("location", 30),
    locationMaxLimit:       CommonValidation.charactorLimit("location", 30),
    descriptionBlank:       CommonValidation.blank("description", 1000),
}

export const ProjectValidation = {
    titleBlank:             CommonValidation.blank("project title", 30),
    titleMaxLimit:          CommonValidation.charactorLimit("project title", 30),
    descriptionBlank:       CommonValidation.blank("project description", 700),
    descriptionMaxLimit:    CommonValidation.charactorLimit("project description", 700),
}

export const ActivityValidation = {
    activityBlank:          CommonValidation.blank("activity", 30),
    activityMaxLimit:       CommonValidation.charactorLimit("activity", 30),
    descriptionBlank:       CommonValidation.blank("description", 200),
    descriptionMaxLimit:    CommonValidation.charactorLimit("description", 200),
    startTimeBlank:         "ⓘ   must include a start time (example: 10am)",
    endTimeBlank:           "ⓘ   must include a end time (example: 10am)",
    invalidTime:            "ⓘ   time must be in correct format (example: 10am)",
    dayBlank:               "ⓘ   enter day of the activity"
}
