import { ComponentFixture, TestBed } from '@angular/core/testing';
import { cadastroEnderecoComponent } from './cadastroEndereco.component';



describe('LoginComponent', () => {
  let component: cadastroEnderecoComponent;
  let fixture: ComponentFixture<cadastroEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [cadastroEnderecoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(cadastroEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
