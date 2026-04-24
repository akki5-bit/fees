const months=[
"Jan","Feb","Mar","Apr","May","Jun",
"Jul","Aug","Sep","Oct","Nov","Dec"
];

let students=JSON.parse(localStorage.getItem("students")) || [];

function saveStudents(){
localStorage.setItem("students",JSON.stringify(students));
}

function addStudent(){

let name=document.getElementById("newName").value;
let start=document.getElementById("newStart").value;
let fees=document.getElementById("monthlyFees").value;

if(name==""||start==""||fees==""){
alert("Fill all fields");
return;
}

students.push({name,start,fees});
saveStudents();

location.reload();
}

function deleteStudent(name){

students=students.filter(s=>s.name!==name);
saveStudents();
location.reload();

}

function editStartDate(name){

let newDate=prompt("Enter new start date");

students.forEach(student=>{
if(student.name===name){
student.start=newDate;
}
});

saveStudents();
location.reload();

}

function saveCheck(key,value,name){
localStorage.setItem(key,value);
updateStatus(name);
updateTotal();
}

function saveDate(key,value){
localStorage.setItem(key,value);
}

function updateStatus(studentName){

let lastPaid="None";

for(let month of months){

if(localStorage.getItem(studentName+"_"+month+"_check")=="true"){
lastPaid=month;
}

}

let status=document.getElementById(studentName+"_status");

if(lastPaid=="None"){
status.innerHTML="❌ Fees Pending";
status.className="status pending";
}
else{
status.innerHTML="✅ Paid till "+lastPaid;
status.className="status paid";
}

}

function updateTotal(){

let total=0;

students.forEach(student=>{

months.forEach(month=>{

if(localStorage.getItem(student.name+"_"+month+"_check")=="true"){
total+=Number(student.fees);
}

});

});

document.getElementById("totalEarnings").innerText=total;

}

function createCards(){

let container=document.getElementById("students");
container.innerHTML="";

students.forEach(student=>{

let card=document.createElement("div");
card.className="card";

let html=`<h2>👨‍💻 ${student.name}
<div>Start Date: ${student.start}</div>
<div>Fees: ₹${student.fees}</div> </h2><br>`;

months.forEach(month=>{

let checkKey=student.name+"_"+month+"_check";
let dateKey=student.name+"_"+month+"_date";

let checked=localStorage.getItem(checkKey)=="true";
let savedDate=localStorage.getItem(dateKey)||"";

html+=`
<div class="month">

<label>
<input type="checkbox"
${checked?"checked":""}
onchange="saveCheck('${checkKey}',this.checked,'${student.name}')">
${month}
</label>

<div class="dateBox">
<span>Submitted on</span>
<input type="date"
value="${savedDate}"
onchange="saveDate('${dateKey}',this.value)">
</div>

</div>
`;

});

html+=`
<div class="status" id="${student.name}_status"></div>
<button class="editBtn" onclick="editStartDate('${student.name}')">Edit Start Date</button>
<button class="deleteBtn" onclick="deleteStudent('${student.name}')">Delete Student</button>
`;

card.innerHTML=html;
container.appendChild(card);

updateStatus(student.name);

});

updateTotal();

}

createCards();