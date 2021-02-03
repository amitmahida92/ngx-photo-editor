import { NgModule } from '@angular/core';
import { NgxPhotoEditorComponent } from './ng-photo-editor.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [NgxPhotoEditorComponent],
  imports: [NgbModalModule],
  exports: [NgxPhotoEditorComponent],
})
export class NgxPhotoEditorModule {
}
