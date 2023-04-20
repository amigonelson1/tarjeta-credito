import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent {

  listCards: any[] = [];

  title = 'FEtarjetaCredito';
  form!: FormGroup;
  accion = 'agregar';
  id: number | undefined;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _tarjetaService: TarjetaService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      numero: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      fechaExpiracion: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.obtenertarjeta();
  }

  obtenertarjeta() {
    this._tarjetaService.getListTarjetas().subscribe({
      next: (data) => this.listCards = data,
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }

  addCard() {
    const card: any = {
      nombre: this.form.get('nombre')?.value,
      numero: this.form.get('numero')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    };
    if (this.id === undefined) {
      this._tarjetaService.saveTarjeta(card).subscribe({
        next: () => {
          this.form.reset();
          this.obtenertarjeta();
          this.toastr.success('Register successfull', 'Good');
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      })
    }
    else {
      card.id = this.id
      this._tarjetaService.updateTarjeta(this.id, card).subscribe({
        next: () => {
          this.form.reset();
          this.accion = 'agregar'
          this.obtenertarjeta();
          this.id = undefined;
          this.toastr.info('Edit card successfull', 'Good');
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      })
    }
  }

  deleteCard(id: number) {
    this._tarjetaService.deleteTarjeta(id).subscribe({
      next: () => {
        this.obtenertarjeta();
        this.toastr.error('Delete successfull', 'Good');
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }

  editarTarjeta(tarjeta: any) {
    this.accion = 'editar';
    this.id = tarjeta.id;
    this.form.patchValue({
      nombre: tarjeta.nombre,
      numero: tarjeta.numero,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv,
    })

  }
}
