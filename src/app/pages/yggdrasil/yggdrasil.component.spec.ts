import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YggdrasilComponent } from './yggdrasil.component';

describe('YggdrasilComponent', () => {
  let component: YggdrasilComponent;
  let fixture: ComponentFixture<YggdrasilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YggdrasilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YggdrasilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
