import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PhotosComponent } from './components/photos/photos.component';

const appRoutes: Routes = [
  { 
    path: 'gallery', 
    component: GalleryComponent
  },
  { 
    path: 'albums', 
    component: AlbumsComponent
  },
  { 
    path: 'photos', 
    component: PhotosComponent
  },
  { 
    path: '',   
    redirectTo: '/gallery', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    component: PageNotFoundComponent 
  }
];

@NgModule({
  declarations: [],
  imports: [
  	    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [],
  exports: [
    RouterModule
  ]

  
})
export class AppRoutingModule { }
