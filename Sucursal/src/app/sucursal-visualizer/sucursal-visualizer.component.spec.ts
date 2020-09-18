import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalVisualizerComponent } from './sucursal-visualizer.component';

describe('SucursalVisualizerComponent', () => {
  let component: SucursalVisualizerComponent;
  let fixture: ComponentFixture<SucursalVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursalVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
