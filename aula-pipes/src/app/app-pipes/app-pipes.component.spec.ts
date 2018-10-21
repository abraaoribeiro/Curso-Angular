import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPipesComponent } from './app-pipes.component';

describe('AppPipesComponent', () => {
  let component: AppPipesComponent;
  let fixture: ComponentFixture<AppPipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
