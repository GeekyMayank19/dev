(function () {
  let btnAddFolder = document.querySelector("#addFolder");
  let btnAddTextFile = document.querySelector("#addTextFile");
  let divbreadcrumb = document.querySelector("#breadcrumb");
  let divContainer = document.querySelector("#container");
  let template = document.querySelector("#templates");
  btnAddFolder.addEventListener("click", addFolder);
  btnAddTextFile.addEventListener("click", addTextFile);

  function addFolder() {
    let fname = prompt("Enter folder's name");
    console.log(fname);
    let divFolderTemplate = template.content.querySelector(".folder");
    let divFolder = document.importNode(divFolderTemplate, true);

    let spanRename = divFolder.querySelector("[action=rename]");
    let spanDelete = divFolder.querySelector("[action=delete]");
    let spanView = divFolder.querySelector("[action=view]");
    let divName = divFolder.querySelector("[purpose=name]");

     spanRename.addEventListener("click",renameFolder);
     spanDelete.addEventListener("click",deleteFolder);
     spanView.addEventListener("click",viewFolder);

    divName.innerText = fname;
    divContainer.appendChild(divFolder);
  }

  function addTextFile() {
    let textFileName = prompt("enter text file name");
    console.log(textFileName);
  }

  function deleteFolder() {
   
    let divFolder = this.parentNode;// selecting paretant tag
    // seltecting name of div folder
    
    let divName = divFolder.querySelector("[purpose=name]") 
    console.log(divName)
  }
  function deleteTextFile() {}
  function renameFolder() {
    console.log("in rename");
    let divFolder = this.parentNode;
    let divName = divFolder.querySelector("[purpose=name]")
    console.log(divName)
  }
  function renameTextFile() {}

  function viewFolder() {
    console.log("in viewfolder");
    let divFolder = this.parentNode;
    let divName = divFolder.querySelector("[purpose=name]")
    console.log(divName.innerText)
  }
  function viewTextFile() {}
  function saveToStorage() {}
})();
