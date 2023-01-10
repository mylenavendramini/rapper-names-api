alert("working");
document.querySelector("button").addEventListener("click", apiRequest);

async function apiRequest() {
  const rapperName = document.querySelector("input").value;
  try {
    const response = await fetch(
      `https://https://rap-names-api-0y3b.onrender.com/api/${rapperName}`
    );

    const data = await response.json();

    console.log(data);
    document.querySelector("h2").innerText = data.birthName;
  } catch (error) {
    console.log(error);
  }
}
