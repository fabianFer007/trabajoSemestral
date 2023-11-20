import { Component, OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.page.html',
  styleUrls: ['./codigo-qr.page.scss'],
})
export class CodigoQRPage implements OnDestroy {


  qrCodeString = 'qr code message';
  scannedResult: any;
  content_visibility = '';
  contador: number=0;
  

  constructor() { }

  
  async checkPermission(): Promise<boolean> {
    try {
        const status = await BarcodeScanner.checkPermission({ force: true });
        if (status.granted) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
        return false; // Devuelve false en caso de error
    }
  }

  //check de codigo original (no funciona)
  // async checkPermission() {
  //   try {
  //     // check or request permission
  //     const status = await BarcodeScanner.checkPermission({ force: true });
  //     if (status.granted) {
  //       // the user granted permission
  //       return true;
  //     }
  //     return false;
  //   } catch(e) {
  //     console.log(e);
  //   }
  // }


  //
  async startScan() {
    try {
      const permission = await this.checkPermission();
      if(!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      //document.querySelector('body').classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      //document.querySelector('body').classList.remove('scanner-active');
      this.content_visibility = '';
      if(result?.hasContent) {
        this.scannedResult = result.content;
        console.log(this.scannedResult);
      }
    } catch(e) {
      console.log(e);
      this.stopScan();
    }
  }

  //
  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    //document.querySelector('body').classList.remove('scanner-active');
    this.content_visibility = '';
  }



  ngOnDestroy(): void {
    this.stopScan();
  }


  acumulador(){
    this.contador++;
    console.log(this.contador);
  }


}
