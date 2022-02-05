(function () {
  let btnAddFolder = document.querySelector("#addFolder");
  let btnAddTextFile = document.querySelector("#addTextFile");
  let divbreadcrumb = document.querySelector("#breadcrumb");
  let aRootPath = divbreadcrumb.querySelector("a[purpose='path']");

  let divContainer = document.querySelector("#container");
  let template = document.querySelector("#templates");
  btnAddFolder.addEventListener("click", addFolder);
  btnAddTextFile.addEventListener("click", addTextFile);
  aRootPath.addEventListener("click",viewFolderFromPath)

  let resources = []; 
  let cfid = -1; // initial we are at root (which has an id of -1)
  let rid = 0;

  function addFolder() {
    let rname = prompt("Enter folder's name");
    if(!rname){
      rname = rname.trim();
    }
    if(!rname){ /// empyty name validataion
      alert("empty folder name not allowed");
      return;
    }
    rname = rname.trim();// uniqueness validation
    let alreadyExists = resources.some(r=> r.rname == rname && r.pid == cfid)

    if(alreadyExists == true){
      alert(rname + "is already in use. Try some other name");
      return;
    }
    let rid = resources.length;
    let pid =  cfid
    addFolderHTML(rname, rid, pid);

    resources.push({
      rid: rid,
      rname: rname,
      rtype: "folder",
      pid: cfid
    })

    saveToStorage();

  }

  function addTextFile() {
    let textFileName = prompt("enter text file name");
    console.log(textFileName);
  }

  function deleteFolder() {
   
    let divFolder = this.parentNode;// selecting paretant tag
    // seltecting name of div folder
    
    let divName = divFolder.querySelector("[purpose='name']") 
    let fidToBeDeleted = parseInt(divFolder.getAttribute("rid"));
    let fname = divName.innerHTML;
    let sure = alert("Are you sure you want to delete"+fname);
    // if(!sure){
    //   return;
    // }
    //html delete
    divContainer.removeChild(divFolder);
    // ram
    deleteHelper(fidToBeDeleted);
    // storage
    saveToStorage();
  }

  function deleteTextFile() {
    l
  }

  function renameFolder() {
    let nrname = prompt("Enter folder's name");
    if(nrname !=null){
      nrname = nrname.trim();
    }
    if(!nrname){
      alert("Empty name is not allowed");
      return;
    }

    let divFolder = this.parentNode;
    let divName = divFolder.querySelector("[purpose=name]");
    let orname = divName.innerHTML;
    let ridOfNameToBeEdit = parseInt(divFolder.getAttribute("rid"));
    if(orname == nrname){
      alert("Please enter a new name");
      return;
    }
    let alreadyExists = resources.some(r => r.rname == nrname && r.rid == cfid)
    if(alreadyExists == true){
      alert(nrname + "already exists");
      return;
    }

    // html change 
    divName.innerHTML = nrname;
    // change in ram 
    let resource = resources.find(r => r.rid == ridOfNameToBeEdit);
    resource.rname = nrname;
    // storage change
    saveToStorage();
  }

  function renameTextFile() {}

  function viewFolder() {

    let divFolder = this.parentNode;
    let divName = divFolder.querySelector("[purpose=name]")
    let fname  = divName.innerHTML;
    let fid = parseInt(divFolder.getAttribute("rid"));
    
    let aPathTemplete = template.content.querySelector("a[purpose=path]");
    let aPath = document.importNode(aPathTemplete,true);
    
    aPath.innerHTML = fname;
    aPath.setAttribute("rid",fid);
    aPath.addEventListener("click",viewFolderFromPath);
    divbreadcrumb.appendChild(aPath);


    cfid = fid;
    divContainer.innerHTML = ""
    for(let i = 0 ;i<resources.length;i++){
      if(resources[i].pid == cfid){
        addFolderHTML(resources[i].rname,resources[i].rid,resources[i].pid);
      }
    }
  }
  
 function viewFolderFromPath(){
 let aPath = this;
 let fid = parseInt(aPath.getAttribute("rid"))
 // set the breadcrumb
 while(aPath.nextSibling){
   aPath.parentNode.removeChild(aPath.nextSibling);
 }
  // set the container
   cfid = fid;
   divContainer.innerHTML = "";
   for(let i = 0 ;i<resources.length;i++){
    if(resources[i].pid == cfid){
      addFolderHTML(resources[i].rname,resources[i].rid,resources[i].pid)
    }
  }

 }

  function viewTextFile() {}

  function addFolderHTML(rname, rid, pid ){
    let divFolderTemplate = template.content.querySelector(".folder");
    let divFolder = document.importNode(divFolderTemplate, true);

    let spanRename = divFolder.querySelector("[action=rename]");
    let spanDelete = divFolder.querySelector("[action=delete]");
    let spanView = divFolder.querySelector("[action=view]");
    let divName = divFolder.querySelector("[purpose=name]");

     spanRename.addEventListener("click",renameFolder);
     spanDelete.addEventListener("click",deleteFolder);
     spanView.addEventListener("click",viewFolder);

    divName.innerText = rname;
    divFolder.setAttribute("rid", rid);
    divFolder.setAttribute("pid",pid);

    divContainer.appendChild(divFolder);
  }

  function saveToStorage() {
   let rjson = JSON.stringify(resources);
   localStorage.setItem("data",rjson); 
  }

  function loadFromStorage(){
    let rjson = localStorage.getItem("data");
    resources = JSON.parse(rjson);
    for(let i = 0 ;i<resources.length;i++){
      if(resources[i].pid == cfid){
        addFolderHTML(resources[i].rname,resources[i].rid,resources[i].pid)
      }
      if(resources[i].rid>rid){
        rid = resources.rid;
      }
    }
    
  }

  loadFromStorage();

  function deleteHelper(fidTBD){
    let chlildren = resources.filter(r => r.pid == fidTBD);
    for(let i = 0 ;i<chlildren.length;i++){
      deleteHelper(chlildren[i].rid);
    }
    let ridx = resources.findIndex(r=> r.rid == fidTBD);
    resources.splice(ridx,1);
  }

})();
