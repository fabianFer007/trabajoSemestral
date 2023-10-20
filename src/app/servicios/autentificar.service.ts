import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'


interface User {
  mail: string;
  pass: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutentificarService {

  public valido!: boolean;
  private local!: Storage;

  constructor(private storage: Storage, private route: Router) {
    this.init()
   }

   async init() {
    const storage = await this.storage.create();
    this.local = storage;

  }

  //regitrarse
  async register(mail: string, pass: string): Promise<Boolean> {
    const users = await this.local?.get('users') || [];
    const existe = users.find((us: User) => us.mail === mail && us.pass === pass);
    if (existe) {
      console.log('Existente')
      return true;
    } else {
      const nuevo: User = { mail, pass};
      users.push(nuevo);
      await this.local.set('users', users);
      console.log('Registrado')
      return false;
    }
  }

  //logearse
  async login(mail: string, pass: string): Promise<boolean> {
    const users: User[] = (await this.local.get('users')) || [];
    const user = users.find((us: User) => us.mail === mail && us.pass === pass);
    if (user) {
      this.valido = true;
      return true;
    }
    this.valido = false;
    return false;
  }

  //log out
  logout() {
    this.valido = false;
    this.route.navigate(['/home']);
  }
  
}
