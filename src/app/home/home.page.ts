import { Component,ViewChild,ElementRef} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IonAvatar,IonModal } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { AutentificarService } from '../servicios/autentificar.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  //Cosas que faltan:
  //Crear una animacion

  @ViewChild(IonModal) modal!: IonModal;

  constructor(private router: Router, private auth: AutentificarService) { }

  public mensaje = "";

  public estado: String = "";
  
  public alertButtons = ['OK'];



  user = {
    usuario: "",
    password: ""
  }
  


  enviarInformacion() {
    this.auth.login(this.user.usuario, this.user.password).then(() => {
      if (this.auth.valido) {
        let navigationExtras: NavigationExtras = {
          state: { user: this.user }
        }
        this.router.navigate(['/login'], navigationExtras);
      } else {
        this.mensaje = "Debe ingresar sus credenciales";
      }
    });
  }

  mostrarConsola() {
    console.log(this.user);
    if (this.user.usuario != "" && this.user.password != "") {
      this.mensaje = "Conectado";
    } else {
      this.mensaje = "Mail y contraseña deben tener algun valor"
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.auth.register(this.user.usuario, this.user.password).then((res) => {
      if (res) {
        this.estado = "Usuario Existente";
      } else {
        this.mensaje = "Registro Exitoso";
        this.modal.dismiss(this.user.usuario, 'confirm');
      }
    })
  }


}
