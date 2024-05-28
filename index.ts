import inquirer from "inquirer";
import chalk from "chalk";

class Student {
  static counter = 10000;
  id: number;
  name: string;
  courses:string[];
  balance:number;
  constructor(name:string){
this.id = Student.counter++;
this.name = name;
this.courses = [];
this.balance = 100
  }
  enroll_courses(course:string){
    this.courses.push(course)
  }
  view_balance(){
    console.log(chalk.blue(`Balance for ${this.name} : $${this.balance
    }`));
    }
    pay_fees(amount:number){
      this.balance -= amount;
      console.log(chalk.yellow(`$${amount} fees  paid succesfully for ${this.name}  `));
      console.log(chalk.yellowBright(`Your remaining balance is : $${this.balance}`));
      
      }
      show_status(){
       
        console.log(`ID : ${this.id}`);
        console.log(`Name : ${this.name}`);
        console.log(`Courses : ${this.courses}`);
        console.log(`Balance : ${this.balance}`);
        
      }
}

class Student_manager {
  students:Student[];
  constructor(){
    this.students = [];
  }
  add_students(name:string){
       let student = new Student(name);
       this.students.push(student);
       console.log(chalk.bgRedBright(`Student ${name} added succesfully Student:ID : ${student.id}`));
         
  }
  
  enroll_student(student_id:number,course:string){
    let student = this.students.find((std) => std.id === student_id);
    if(student){
      student.enroll_courses(course);
      console.log(chalk.greenBright(`${student.name} enrolled succesfully in ${course}`));
      
    }
  }
  
  view_student_balance(student_id:number){
    let student = this.students.find((std) => std.id === student_id);
    if(student){
   student.view_balance();
    }else{
      console.log("Student not found");
      
    }
    
  }
  pay_student_fees(student_id:number,amount:number){
    let student = this.students.find((std) => std.id === student_id);
    if(student){
      student.pay_fees(amount)
    }else{
      console.log("Student not found");
      
    }
  }
  show_student_status(student_id:number){
let student = this.students.find((std) => std.id === student_id);
if(student){
  student.show_status();
}
  }
  // find_student(student_id:number){
  //   this.students.find((std) => std.id === student_id)
  // }
}
async function main() {
  console.log("Welcome 'Code with Akram' Student managment system");
  console.log("*". repeat(60));
let student_manager = new Student_manager();

// while loop for program running
while (true) {
  let choice = await inquirer.prompt([
    {
      name: "selected",
      type: "list",
      message:"Select an option",
      choices:[
        "Add student",
        "Enroll Student",
        "View Student Balance",
        "pay Fees",
        "Show Status",
        "Exit"
      ]
    }
  ]);


  switch (choice.selected){
case "Add student":  
    let name_input = await inquirer.prompt([
    {
     name: "name",
     type: "input",
     message: "Enter a student name",
   }
  ]);
  student_manager.add_students(name_input.name);
  break;    
    case "Enroll Student":
      let course_input = await inquirer.prompt([
        {
          name:"Student_id",
          type:"number",
          message: "Enter student ID"
        },
        {
          name: "course",
          type:"input",
          message:"Enter a course name"
        }
      ]);
      student_manager.enroll_student(course_input.Student_id,course_input.course);
      break;

    case "View Student Balance":
      let check_balance = await inquirer.prompt([{
        name: "balance",
        type:"number",
        message:"Enter a Student ID"
      }]);
      student_manager.view_student_balance(check_balance.balance);
      break;

    case "pay Fees":
      let payFees_input = await inquirer.prompt([{
        name: "student_id",
        type:"number",
        message:"Enter a student Id"
      },
      {
        name: "amount",
        type: "number",
        message: "Enter a amount you pay"
      }
    ]);
      student_manager.pay_student_fees(payFees_input.student_id,payFees_input.amount);
      break;
  
  case "Show Status":
        let show_status = await inquirer.prompt([
        {
          name: "student_id",
          type:"number",
          message:"Enter a student ID"
        }
      ]);
      student_manager.show_student_status(show_status.student_id);
      break;
  case "Exit":
      console.log("Exiting....");
      process.exit();
    
        }
}

 }
  
 main();