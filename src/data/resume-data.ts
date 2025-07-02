
export interface ContactInfo {
  name: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  linkedinHandle: string;
  github?: string; // Optional
  githubHandle?: string; // Optional
  summary: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  dates: string;
  gpa?: string;
  details?: string[];
}

export interface SkillCategory {
  name: string;
  skills: { name: string; level?: number }[]; // level 0-100 for skill bars
}

export interface Experience {
  company: string;
  role: string;
  dates: string;
  responsibilities: string[];
  logoUrl?: string;
}

export interface Project {
  name: string;
  year: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  details?: string[];
  dataAiHint?: string;
}

export interface Certification {
  name: string;
  issuer?: string;
  year?: string;
}

export interface ResumeData {
  contactInfo: ContactInfo;
  education: Education[];
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
}

export const resumeData: ResumeData = {
  contactInfo: {
    name: "Mohit Chandra Patakula",
    location: "Arlington, TX",
    email: "mohitcp05@gmail.com",
    phone: "(817) 881-9014",
    linkedin: "https://www.linkedin.com/in/mohitchandrapatakula",
    linkedinHandle: "mohitchandrapatakula",
    summary: "Detail-oriented Software Engineer with 3 years of experience in full-stack development, cloud technologies, and automation. Skilled in Java, Python, and modern web frameworks, with a strong track record of designing scalable and efficient enterprise solutions. Experienced in collaborating with cross-functional teams to optimize processes and enhance system performance. Passionate about problem-solving, continuous learning, and leveraging technology to drive business success.",
  },
  education: [
    {
      institution: "University of Texas at Arlington, TX",
      degree: "M.S.",
      field: "Computer Science",
      dates: "Aug 2023 – May 2025",
      gpa: "3.2/4.0",
    },
    {
      institution: "KL University, India",
      degree: "B.Tech",
      field: "Computer Science and Engineering",
      dates: "June 2018 – April 2022",
      gpa: "7.77/10.0",
    },
  ],
  skills: [
    {
      name: "Languages",
      skills: [
        { name: "Java", level: 90 },
        { name: "Python", level: 85 },
        { name: "HTML", level: 95 },
        { name: "CSS", level: 90 },
        { name: "Bootstrap", level: 80 },
        { name: "JavaScript", level: 80 },
        { name: "C", level: 70 },
      ],
    },
    {
      name: "Technologies",
      skills: [
        { name: "GitLab", level: 80 },
        { name: "Docker", level: 75 },
        { name: "Linux", level: 75 },
        { name: "ServiceNow", level: 70 },
        { name: "Spring Boot", level: 85 }, // Corrected from Springboot
      ],
    },
    {
      name: "Cloud & Databases",
      skills: [
        { name: "AWS", level: 80 },
        { name: "MySQL", level: 85 },
        { name: "MongoDB", level: 70 },
      ],
    },
     { // Added Tools back as it was in the original data and might be useful.
      name: "Tools",
      skills: [
        { name: "Jira", level: 80 },
        { name: "Confluence", level: 75 },
        { name: "Postman", level: 85 },
        { name: "GitHub", level: 90 },
        { name: "JUnit", level: 80 },
        { name: "Mockito", level: 75 },
        { name: "SonarQube", level: 70 },
      ]
    }
  ],
  experience: [
    {
      company: "Cognizant Technology Solutions",
      role: "Programmer Analyst Trainee",
      dates: "July 2022 – May 2023",
      responsibilities: [
        "Developed and integrated new features and functionalities to meet business requirements using Spring Boot and microservices architecture.",
        "Analyzed legacy codebases to design and implement enhancements for the new project while ensuring backward compatibility.",
        "Created RESTful APIs to support seamless integration with front-end applications, leveraging modern frameworks and best practices.",
        "Collaborated with the team to resolve code quality issues flagged by SonarQube and actively contributed to CI/CD pipeline setup for automated build and deployment.",
        "Participated in peer code reviews to uphold coding standards and incorporated feedback to improve code quality, contributing to on-time project delivery.",
      ],
    },
    {
      company: "Cognizant Technology Solutions",
      role: "Java Full Stack Intern",
      dates: "Dec 2021 – June 2022",
      responsibilities: [
        "Developed a Pension Management System for the state government to automate pensioner detail provisioning, calculation, and disbursement.",
        "Contributed to the Process Pension microservice, a middleware component, as part of a team implementing three microservices.",
        "Designed and implemented operations to determine pension type (self or family), calculate pension amount post-data authentication, and display results on the web application using Java, Spring Boot, and SQL.",
        "Integrated the module with the web application interface built using Angular, Bootstrap, CSS, and HTML, ensuring seamless user interactions.",
        "Initiated the pension disbursement process based on admin confirmation and handled error codes from the disbursement module, returning appropriate messages.",
        "Deployed the microservice to AWS, ensuring scalability and reliability of the solution.",
        "Collaborated with team members to ensure proper integration of all microservices, aligning with project goals and deadlines.",
      ],
    },
    {
      company: "Unificater",
      role: "Python Developer Intern",
      dates: "June 2021 – Nov 2021",
      responsibilities: [
        "Designed a no-code ETL platform with visual drag-and-drop components for simplified data integration and transformation workflows.",
        "Developed features for data ingestion, transformation, error handling, and execution tracking across structured, unstructured, and streaming data.",
        "Contributed to the alpha version of the product using Agile methodology, enabling iterative development and on-UI documentation.",
        "Automated data cleansing and reconciliation processes to reduce manual developer effort and improve data pipeline efficiency.",
        "Utilized tools like Jira, Confluence, Postman, and GitHub for project tracking, API testing, collaboration, and version control.",
      ],
    },
    {
      company: "NIT Data",
      role: "Data Engineer Intern",
      dates: "June 2020 – June 2021",
      responsibilities: [
        "Conducted revenue and P&L analysis, providing actionable insights and identifying opportunities for financial growth.",
        "Led data reconciliation and Independent Price Verification (IPV) efforts to ensure financial data accuracy and consistency.",
        "Collaborated with finance, IT, and operations teams to streamline reporting processes and develop scalable data workflows.",
        "Built and maintained financial models and dashboards using SQL, Excel, and Tableau for senior management reporting.",
        "Documented business requirements and translated them into technical specifications to support cross-functional projects.",
      ],
    },
  ],
  projects: [
    {
      name: "Pension Management System",
      year: "2022",
      description: "Designed and developed a comprehensive portal for pension disbursement, ensuring seamless user interaction and efficient data handling.",
      technologies: ["Java", "Spring Framework", "HTML", "CSS", "Angular", "AWS", "Spring Tool Suite", "VS Code"],
      imageUrl: "/images/pension.png",
      dataAiHint: "dashboard analytics",
      details: [
        "Implemented backend functionality using Java (Spring Framework) for secure and robust operations.",
        "Developed an intuitive and responsive user interface with HTML, CSS, and Angular, enhancing the user experience.",
        "Ensured proper integration between front-end and back-end systems for smooth data flow and functionality.",
        "Utilized Spring Tool Suite and VS Code for efficient coding and debugging during the development lifecycle.",
        "Deployed the application on AWS Cloud, ensuring scalability, high availability, and performance optimization.",
        "Focused on security measures and compliance standards for handling sensitive pension-related data.",
      ]
    },
    {
      name: "Bird Species Identification from an Image",
      year: "2021",
      description: "Developed a Python-based image classification system using Convolutional Neural Networks (CNNs) to identify bird species from images.",
      technologies: ["Python", "CNNs", "Jupyter Notebook", "Image Processing APIs"],
      imageUrl: "/images/bird.png",
      dataAiHint: "bird nature",
      details: [
        "Implemented a robust backend in Python within a Jupyter Notebook environment, ensuring clean, modular, and well-documented code.",
        "Integrated image processing and external dataset APIs to support real-time classification and testing.",
        "Applied data preprocessing, augmentation, and hyperparameter tuning to enhance model accuracy and scalability.",
        "Wrote and executed unit tests to validate model performance, using metrics such as precision, recall, and accuracy for evaluation and optimization."
      ]
    },
  ],
  certifications: [
    { name: "AWS-Certified Data Engineer- Associate" },
    { name: "ServiceNow- Certified System Administrator" },
    { name: "Certiport- Microsoft Technology Associate (MTA)" },
    { name: "LinkedIn- Advanced NLP with Python for Machine Learning" },
    { name: "Coursera- Machine Learning Specialization" },
  ],
};

export const fullResumeText = `
${resumeData.contactInfo.name}
${resumeData.contactInfo.location}
${resumeData.contactInfo.email}
${resumeData.contactInfo.phone}
${resumeData.contactInfo.linkedinHandle}

${resumeData.contactInfo.summary}

Education
${resumeData.education.map(edu => `${edu.institution}\n${edu.degree} in ${edu.field}\n${edu.dates}${edu.gpa ? `\nGPA: ${edu.gpa}` : ''}`).join('\n\n')}

Skills
${resumeData.skills.map(cat => `${cat.name}: ${cat.skills.map(s => s.name).join(', ')}`).join('\n')}

Experience
${resumeData.experience.map(exp => `${exp.company}\n${exp.role}\n${exp.dates}\n${exp.responsibilities.map(res => `• ${res}`).join('\n')}`).join('\n\n')}

Projects
${resumeData.projects.map(proj => `${proj.name} (${proj.year})\n${proj.description}\nTechnologies: ${proj.technologies.join(', ')}\n${proj.details ? proj.details.map(d => `• ${d}`).join('\n') : ''}`).join('\n\n')}

Certifications
${resumeData.certifications.map(cert => `• ${cert.name}${cert.issuer ? ` (${cert.issuer})` : ''}${cert.year ? ` - ${cert.year}` : ''}`).join('\n')}
`;
