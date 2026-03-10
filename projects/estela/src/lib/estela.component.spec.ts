import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstelaComponent } from './estela.component';

describe('EstelaComponent', () => {
  let component: EstelaComponent;
  let fixture: ComponentFixture<EstelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstelaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
