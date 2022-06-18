import { Person } from './Person';
import { Component, OnInit } from '@angular/core';
import { PersonService } from './Person.Service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular-web';
  public persons !: Person[];
  public editPerson !: Person | null;
  public deletePerson !: Person | null;

 

  constructor(private personService: PersonService ,private fb:FormBuilder) {
  }

  infoUser = this.fb.group({
    "name" : [""],
    "age" : [""],
    "address" : [""]
  })
  
  ngOnInit() {
    this.getPersons();
  }

  public getPersons(): void {
    this.personService.getPerson().subscribe(
      (response: Person[]) => {
        this.persons = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(person: Person | null, modal: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (modal === "add") {
      console.log("add");
      button.setAttribute('data-target', '#addPersonModal')
    }
    if (modal === "edit") {
      this.editPerson = person;
      button.setAttribute('data-target', '#updatePersonModal')
    }
    if (modal === "delete") {
      this.deletePerson = person;
      button.setAttribute('data-target', '#deletePersonModal')
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddPerson(): void {
    document.getElementById('add-Person-form')?.click();
    this.personService.addPerson(this.infoUser.value).subscribe(
      (response: Person) => {
        console.log(response);
        this.getPersons();
        this.infoUser.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.infoUser.reset();
      }
    );
  }

  public onUpdatePerson(person: Person): void {
    this.personService.updateperson(person).subscribe(
      (response: Person) => {
        console.log(response);
        this.getPersons();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeletePerson(personid: number): void {
    this.personService.deleteperson(personid).subscribe(
      (response: void) => {
        console.log(response);
        this.getPersons();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchPersons(key: string): void {
    const resoult:Person[]=[];
    for(const person of this.persons){
      if(person.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      person.age.toString().indexOf(key) !== -1 ||
      person.address.toLowerCase().indexOf(key.toLowerCase()) !== -1 )
      {
        resoult.push(person);
      }
      this.persons=resoult;
    }
    if(resoult.length === 0 || !key){
      this.getPersons();
    }
  }

}
