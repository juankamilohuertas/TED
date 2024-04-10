const btnPdf = document.getElementById("btnPdf");
const form = document.getElementById("form");
const table = document.getElementById("table");
const actions = document.getElementById("actions");
const editDelete = document.querySelectorAll("#editDelete");

//Generate pdf
btnPdf.addEventListener("click", () => {
  form.remove();
  actions.remove();
  editRemove();
  table.className = "col-md-12";
  window.print();
  window.location.reload(true);
});

const editRemove = () => {
  for (let i = 0; i < editDelete.length; i++) {
    editDelete[i].remove();
  }
};
