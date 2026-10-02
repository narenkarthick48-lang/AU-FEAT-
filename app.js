const form = document.getElementById("aiSearchForm");
const input = document.getElementById("aiInput");
const responseText = document.getElementById("responseText");
const quickButtons = document.querySelectorAll(".quick-actions button");

function showResponse(message) {
  responseText.textContent = message;
}

function askAI(query) {
  const text = query.toLowerCase().trim();

  if (!text) {
    showResponse("Please ask something about Annamalai University.");
    return;
  }

  if (
    text.includes("student") ||
    text.includes("roll") ||
    text.includes("register")
  ) {
    showResponse(
      "Student Search selected. Roll/Register number lookup will be connected to the AU public data backend."
    );
    return;
  }

  if (
    text.includes("department") ||
    text.includes("faculty")
  ) {
    showResponse(
      "I can help you explore Annamalai University faculties and departments."
    );
    return;
  }

  if (
    text.includes("staff") ||
    text.includes("hod") ||
    text.includes("professor")
  ) {
    showResponse(
      "Staff and HOD information will be loaded from publicly available AU sources."
    );
    return;
  }

  if (
    text.includes("result") ||
    text.includes("mark")
  ) {
    showResponse(
      "Results search selected. The public AU result connector will be integrated in the backend."
    );
    return;
  }

  if (
    text.includes("notice") ||
    text.includes("notification")
  ) {
    showResponse(
      "I can help you find official Annamalai University notices and announcements."
    );
    return;
  }

  if (
    text.includes("placement") ||
    text.includes("job")
  ) {
    showResponse(
      "I can help you explore publicly available AU placement information."
    );
    return;
  }

  showResponse(
    "I understood your question. AU Help AI backend will handle detailed university data soon."
  );
}


form.addEventListener("submit", function (event) {
  event.preventDefault();

  const query = input.value;
  askAI(query);
});


quickButtons.forEach(function (button) {
  button.addEventListener("click", function () {

    const query = button.getAttribute("data-query");

    input.value = query;

    askAI(query);
  });
});
