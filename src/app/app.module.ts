import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { PlyrModule } from 'ngx-plyr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NauhaListComponent } from './nauha-list/nauha-list.component';

import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { NauhaService } from './services/nauha-service.service';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptorService } from './interceptors/loader-interceptor.service';
import { MyLoaderComponent } from './components/my-loader/my-loader.component';
import { LoginComponent } from './authorization/login/login/login.component';
import { AudioListComponent } from './authorization/admin/audio-list/audio-list.component';
import { AuthGuard } from './authorization/auth/auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { VideoListComponent } from './components/video-list/video-list.component';
import { MediaListComponent } from './authorization/admin/media-list/media-list.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'nauhas', component: NauhaListComponent },
  { path: 'nauhas/:id', component: NauhaListComponent },
  { path: 'nauhas/:id/:nid', component: NauhaListComponent },
  { path: 'upload', component: UploadFilesComponent },
  { path: 'upload/:id', component: UploadFilesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'videos', component: VideoListComponent },
  { path: 'videos/:id', component: VideoListComponent },
  { path: 'admin/audio-list', component: AudioListComponent, canActivate:[AuthGuard] },
  { path: 'admin/media-list', component: MediaListComponent, canActivate:[AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    NauhaListComponent,
    MenuComponent,
    HomeComponent,
    UploadFilesComponent,
    MyLoaderComponent,
    LoginComponent,
    AudioListComponent,
    VideoListComponent,
    MediaListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PlyrModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    NauhaService,
    LoaderService,
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
