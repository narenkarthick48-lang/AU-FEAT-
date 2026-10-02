const API_URL = "https://au-feat.onrender.com";

const form = document.getElementById("aiSearchForm");
const input = document.getElementById("aiInput");
const responseText = document.getElementById("responseText");
const quickButtons = document.querySelectorAll(".quick-actions button");

function showResponse(message) {
  responseText.textContent = message;
}

async function searchStudent(registerNumber) {
  showResponse("🔎 Searching AU public data...");

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
        `🎓 Student Found\n\nName: ${data.name}\nRegister Number: ${data.register_number}\nDepartment: ${data.department}`
      );
    } else {
      showResponse(
        `Student Search\n\nRegister Number: ${data.register_number}\n\n${data.message}`
      );
    }

  } catch (error) {
    console.error(error);

    showResponse(
      "❌ Unable to connect to AU Help AI backend. Please try again."
    );
  }
}


function askAI(query) {
  const text = query.toLowerCase().trim();

  if (!text) {
    showResponse("Please ask something about Annamalai University.");
    return;
  }

  // Register / Roll number detection
  const numberMatch = query.match(/\b\d{5,15}\b/);

  if (
    text.includes("student") ||
    text.includes("roll") ||
    text.includes("register") ||
    numberMatch
  ) {
    if (numberMatch) {
      searchStudent(numberMatch[0]);
    } else {
      showResponse(
        "🎓 Enter a student's Roll Number or Register Number to search."
      );
    }
    return;
  }

  if (text.includes("department") || text.includes("faculty")) {
    showResponse(
      "🏫 AU departments and faculty information will be connected to the university data source."
    );
    return;
  }

  if (
    text.includes("staff") ||
    text.includes("hod") ||
    text.includes("professor")
  ) {
    showResponse(
      "👨‍🏫 Staff and HOD information will be loaded from publicly available AU sources."
    );
    return;
  }

  if (text.includes("result") || text.includes("mark")) {
    showResponse(
      "📝 AU Results search will be connected through the backend."
    );
    return;
  }

  if (text.includes("notice") || text.includes("notification")) {
    showResponse(
      "📢 Official AU notices will be connected to AU Help AI."
    );
    return;
  }

  if (text.includes("placement") || text.includes("job")) {
    showResponse(
      "💼 Public AU placement information will be connected here."
    );
    return;
  }

  showResponse(
    "🤖 AU Help AI received your question. More university knowledge will be connected to the backend."
  );
}


form.addEventListener("submit", function (event) {
  event.preventDefault();

  const query = input.value.trim();

  askAI(query);
});


quickButtons.forEach(function (button) {
  button.addEventListener("click", function () {

    const query = button.getAttribute("data-query");

    input.value = query;

    askAI(query);
  });
});
