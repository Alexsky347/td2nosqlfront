import { Component, OnInit } from '@angular/core';
import {Citation} from '../../_models/citation';
import {CitationService} from '../../_services';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-citation',
  templateUrl: './create-citation.component.html',
  styleUrls: ['./create-citation.component.css']
})
export class CreateCitationComponent implements OnInit {
  public citation: Citation;
  citationForm = this.fb.group({
    author : [''],
    title : [''],
    description : [''],
    published : [''],
    dateCitation: [''],
    user: ['']
  });
  constructor(
    private citaionService: CitationService, private router: Router,
    private toastr: ToastrService, private activeRoute: ActivatedRoute, protected fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }
  protected getCitationFromControl(): Citation {
    return {
      author: this.citationForm.get('author').value,
      title: this.citationForm.get('title').value,
      description: this.citationForm.get('description').value,
      dateCitation: this.citationForm.get('dateCitation').value,
      user: this.citationForm.get('username').value
    };
  }
  onSubmitForm(): void{
    this.validateForm();
  }
  validateForm(): void {
    this.citaionService.addCitation(this.getCitationFromControl()).subscribe(
      data => {
        this.toastr.success('Citation ajouté', 'Succès');
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 1000);
        console.log('citation ajouté:', data);
      },
      error => {
        this.toastr.error('Citation non ajouté', 'Erreur');
        console.log('erreur lors de l\'ajout', error);
      }
    );
  }
}
