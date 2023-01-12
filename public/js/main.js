// document.querySelector("button").addEventListener("click", apiRequest);

// async function apiRequest() {
//   const rapperName = document.querySelector("input").value;
//   try {
//     const response = await fetch(
//       `https://rap-names-api-0y3b.onrender.com/api/${rapperName}`
//     );

//     const data = await response.json();

//     console.log(data);
//     document.querySelector("h2").innerText = data.birthName;
//   } catch (error) {
//     console.log(error);
//   }
// }

const deleteText = document.querySelectorAll(".fa-trash");
const thumbText = document.querySelectorAll(".fa-thumbs-up");

Array.from(deleteText).forEach((element) => {
  element.addEventListener("click", deleteRapper);
});

Array.from(thumbText).forEach((element) => {
  element.addEventListener("click", addLike);
});

async function deleteRapper() {
  const sName = this.parentNode.childNodes[1].innerText;
  const bName = this.parentNode.childNodes[3].innerText;
  try {
    const response = await fetch("deleteRapper", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stageNameS: sName,
        birthNameS: bName,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function addLike() {
  const sName = this.parentNode.childNodes[1].innerText;
  const bName = this.parentNode.childNodes[3].innerText;
  const tLikes = Number(this.parentNode.childNodes[5].innerText);
  try {
    const response = await fetch("addOneLike", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stageNameS: sName,
        birthNameS: bName,
        likesS: tLikes,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
