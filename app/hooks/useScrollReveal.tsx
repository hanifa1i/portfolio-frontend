"use client";

import { useEffect } from "react";
import { WorkExperience } from "../types/experience";
import { WorkExperienceResponse } from "../types/Dashboard";

export default function useScrollReveal(selector: string, activeClass: string, rootMargin: boolean) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(activeClass);
          } else {
            entry.target.classList.remove(activeClass);
          }
        });
      },
      { 
        threshold: 0.1,
        ...(rootMargin === true && {
        rootMargin: "-30% 0px -50% 0px",
        }),
      } // better for Safari
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, activeClass]);
}

export function useScrollRevealExperience(selector: string, activeClass: string, rootMargin: boolean, workExperience: WorkExperienceResponse[]) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(activeClass);
          } else {
            entry.target.classList.remove(activeClass);
          }
        });
      },
      { 
        threshold: 0.1,
        ...(rootMargin === true && {
        rootMargin: "-30% 0px -50% 0px",
        }),
      } // better for Safari
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, activeClass, workExperience]);
}
