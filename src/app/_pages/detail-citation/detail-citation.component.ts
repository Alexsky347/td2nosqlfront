import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CitationService} from '../../_services';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail-citation',
  templateUrl: './detail-citation.component.html',
  styleUrls: ['./detail-citation.component.css']
})
export class DetailCitationComponent implements OnInit, AfterViewInit
{
  citation: any;

  constructor(private citationService: CitationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
      this.citationService.getCitation(params.get('id')).subscribe(c => {
        console.log(c);
        this.citation = c;
      });
    });
  }
  ngAfterViewInit(): void {
  }

}
