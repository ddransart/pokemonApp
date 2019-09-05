
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';


import { environment } from './environments/environment';

 if (environment.production) {
   enableProdMode();
 }

// if (!/localhost/.test(document.location.host)) {
//      enableProdMode();
//    }

platformBrowserDynamic().bootstrapModule(AppModule) // On précise que notre appli est destinée au navigateur web avec AppModule comme module racine, qui lui même lancera le AppComponent
  .catch(err => console.error(err));
