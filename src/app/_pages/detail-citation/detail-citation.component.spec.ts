import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCitationComponent } from './detail-citation.component';

describe('DetailCitationComponent', () => {
  let component: DetailCitationComponent;
  let fixture: ComponentFixture<DetailCitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
