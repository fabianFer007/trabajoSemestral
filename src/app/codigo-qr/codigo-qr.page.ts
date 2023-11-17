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
  

  constructor() { }

  //
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

}
