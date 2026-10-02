const API_URL = "https://au-feat.onrender.com";

const form = document.getElementById("aiSearchForm");
const input = document.getElementById("aiInput");
const responseText = document.getElementById("responseText");
const responseStatus = document.getElementById("responseStatus");
const responseActions = document.getElementById("responseActions");

const officialLinks = {
  home: "https://www.annamalaiuniversity.ac.in/",
  exams: "https://www.annamalaiuniversity.ac.in/aucoe/",
  student: "https://annamalaiuniversity.ac.in/studport/",
  hallticket: "https://coe.annamalaiuniversity.ac.in/ht_as.php"
};


// ===============================
// SHOW RESPONSE
// ===============================

function showResponse(message, status = "Ready to help", links = []) {

  responseText.textContent = message;
  responseStatus.textContent = status;

  responseActions.innerHTML = "";

  links.forEach(link => {

    const a = document.createElement("a");

    a.href = link.url;
    a.target = "_blank";
    a.rel = "noopener";

    a.textContent = link.label + " ↗";

    responseActions.appendChild(a);
  });

  document
    .getElementById("aiResponse")
    .scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
}


// ===============================
// STUDENT SEARCH
// ===============================

async function searchStudent(registerNumber) {

  showResponse(
    "Searching AU public data…",
    "Searching"
  );

  try {

    const response = await fetch(
      `${API_URL}/api/student?register_number=${encodeURIComponent(registerNumber)}`
    );

    if (!response.ok) {
      throw new Error("Backend request failed");
    }

    const data = await response.json();

    if (data.success) {

      showResponse(
        `Student Found

Name: ${data.name || "Not provided"}

Register Number: ${
          data.register_number || registerNumber
        }

Department: ${
          data.department || "Not provided"
        }`,
        "Public data found",
        [
          {
            label: "AU Student Portal",
            url: officialLinks.student
          }
        ]
      );

    } else {

      showResponse(
        `Student Search

Register Number: ${
          data.register_number || registerNumber
        }

${data.message || "No public information was returned."}`,
        "No result",
        [
          {
            label: "Open AU Student Portal",
            url: officialLinks.student
          }
        ]
      );
    }

  } catch (error) {

    console.error(error);

    showResponse(
      `Unable to connect to the AU Help AI backend right now.

Your backend URL is configured, but the student endpoint may not be available yet.`,
      "Connection issue",
      [
        {
          label: "Open AU Website",
          url: officialLinks.home
        }
      ]
    );
  }
}


// ===============================
// AI QUESTION HANDLER
// ===============================

function askAI(query) {

  const text = query
    .toLowerCase()
    .trim();

  if (!text) {

    showResponse(
      "Please ask something about Annamalai University."
    );

    return;
  }


  // -------------------------------
  // REGISTER / ROLL NUMBER
  // -------------------------------

  const numberMatch =
    query.match(/\b\d{5,15}\b/);


  if (
    numberMatch &&
    (
      text.includes("student") ||
      text.includes("roll") ||
      text.includes("register") ||
      /^\d{5,15}$/.test(text)
    )
  ) {

    searchStudent(numberMatch[0]);

    return;
  }


  // -------------------------------
  // STUDENT
  // -------------------------------

  if (
    text.includes("student") ||
    text.includes("roll") ||
    text.includes("register")
  ) {

    showResponse(
      `Enter a Roll Number or Register Number to search publicly available student information.`,
      "Student lookup",
      [
        {
          label: "AU Student Portal",
          url: officialLinks.student
        }
      ]
    );

    return;
  }


  // -------------------------------
  // DEPARTMENT / FACULTY
  // -------------------------------

  if (
    text.includes("department") ||
    text.includes("faculty") ||
    text.includes("course") ||
    text.includes("programme")
  ) {

    showResponse(
      `AU Help AI can organize Annamalai University's public faculty, department and programme information.

The official AU website currently describes the university as having 10 Faculties and 49 departments.`,
      "University information",
      [
        {
          label: "AU Website",
          url: officialLinks.home
        }
      ]
    );

    return;
  }


  // -------------------------------
  // STAFF / HOD
  // -------------------------------

  if (
    text.includes("staff") ||
    text.includes("hod") ||
    text.includes("professor")
  ) {

    showResponse(
      `Staff and HOD information will be shown only from publicly available AU sources.

Private contact details and restricted student information are not exposed.`,
      "Public staff information",
      [
        {
          label: "AU Website",
          url: officialLinks.home
        }
      ]
    );

    return;
  }


  // -------------------------------
  // RESULTS / EXAMS
  // -------------------------------

  if (
    text.includes("result") ||
    text.includes("mark") ||
    text.includes("exam") ||
    text.includes("hall ticket")
  ) {

    showResponse(
      `For examinations, AU publishes results, notifications and hall-ticket services through the Controller of Examinations.`,
      "Examinations",
      [
        {
          label: "AU Examinations",
          url: officialLinks.exams
        },
        {
          label: "Hall Ticket",
          url: officialLinks.hallticket
        }
      ]
    );

    return;
  }


  // -------------------------------
  // NOTICES
  // -------------------------------

  if (
    text.includes("notice") ||
    text.includes("notification") ||
    text.includes("circular")
  ) {

    showResponse(
      `Official AU notices and circulars are published through the university website and relevant university sections.

Always verify the date on the original notice.`,
      "Official notices",
      [
        {
          label: "AU Website",
          url: officialLinks.home
        }
      ]
    );

    return;
  }


  // -------------------------------
  // PLACEMENTS
  // -------------------------------

  if (
    text.includes("placement") ||
    text.includes("job") ||
    text.includes("career")
  ) {

    showResponse(
      `AU Help AI will use publicly published placement and career information.

Placement figures should always be shown with their source and reporting year.`,
      "Placement information",
      [
        {
          label: "AU Website",
          url: officialLinks.home
        }
      ]
    );

    return;
  }


  // -------------------------------
  // DEFAULT
  // -------------------------------

  showResponse(
    `I received your question.

Try asking about:

• Departments
• Staff / HOD
• Student lookup
• Results
• Notices
• Placements`,
    "AU Help AI"
  );
}


// ===============================
// SEARCH FORM
// ===============================

form.addEventListener(
  "submit",
  function (event) {

    event.preventDefault();

    const query = input.value.trim();

    askAI(query);
  }
);


// ===============================
// QUICK BUTTONS
// ===============================

document
  .querySelectorAll("[data-query]")
  .forEach(button => {

    button.addEventListener(
      "click",
      function () {

        const query =
          button.dataset.query;

        input.value = query;

        askAI(query);
      }
    );
  });
