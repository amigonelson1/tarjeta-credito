import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  listCards: any[] = [
    {
      holder: 'Vegeta',
      number: '34234523452',
      expirationDate: '11/23',
      cvv: '123',
    },
    {
      holder: 'Krilin',
      number: '3789645674',
      expirationDate: '05/23',
      cvv: '456',
    },
    {
      holder: 'Piccolo',
      number: '85567838567',
      expirationDate: '11/05',
      cvv: '789',
    }
  ];

  title = 'FEtarjetaCredito';
  form!: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.form = this.fb.group({
      holder: ['', Validators.required],
      number: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      expirationDate: ['', [Validators.required]],
      cvv: [''],
    })
  }

  addCard() {
    const card: any = {
      holder: this.form.get('holder')?.value,
      number: this.form.get('number')?.value,
      expirationDate: this.form.get('expirationDate')?.value,
      cvv: this.form.get('cvv')?.value,
    }
    this.listCards.push(card);
    this.form.reset();
    this.toastr.success('Register successfull', 'Good');
  }

  deleteCard(index: number) {
    this.listCards.splice(index, 1);
    this.toastr.error('Delete successfull', 'Good');
  }

}
