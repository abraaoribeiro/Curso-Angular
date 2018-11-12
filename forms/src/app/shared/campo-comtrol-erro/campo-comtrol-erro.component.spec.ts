import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoComtrolErroComponent } from './campo-comtrol-erro.component';

describe('CampoComtrolErroComponent', () => {
  let component: CampoComtrolErroComponent;
  let fixture: ComponentFixture<CampoComtrolErroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampoComtrolErroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoComtrolErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
