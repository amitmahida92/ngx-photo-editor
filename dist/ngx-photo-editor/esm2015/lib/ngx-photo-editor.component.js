/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-photo-editor.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import Cropper from 'cropperjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
export class NgxPhotoEditorComponent {
    /**
     * @param {?} modalService
     */
    constructor(modalService) {
        this.modalService = modalService;
        this.prevZoom = 0;
        this.modalTitle = 'Photo Editor';
        this.aspectRatio = 1;
        this.autoCropArea = 1;
        this.autoCrop = true;
        this.mask = true;
        this.guides = true;
        this.centerIndicator = true;
        this.viewMode = 0;
        this.modalCentered = false;
        this.scalable = true;
        this.zoomable = true;
        this.cropBoxMovable = true;
        this.cropBoxResizable = true;
        this.darkTheme = true;
        this.roundCropper = false;
        this.canvasHeight = 400;
        this.imageSmoothingEnabled = true;
        this.imageSmoothingQuality = 'high';
        this.lastUpdate = Date.now();
        this.format = 'png';
        this.quality = 92;
        this.isFormatDefined = false;
        this.imageCropped = new EventEmitter();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set imageQuality(value) {
        if (value > 0 && value <= 100) {
            this.quality = value;
        }
    }
    /**
     * @param {?} type
     * @return {?}
     */
    set imageFormat(type) {
        if ((/^(gif|jpe?g|tiff|png|webp|bmp)$/i).test(type)) {
            this.format = type;
            this.isFormatDefined = true;
        }
    }
    /**
     * @param {?} url
     * @return {?}
     */
    set imageUrl(url) {
        if (url) {
            this.url = url;
            if (this.lastUpdate !== Date.now()) {
                this.open();
                this.lastUpdate = Date.now();
            }
        }
    }
    /**
     * @param {?} base64
     * @return {?}
     */
    set imageBase64(base64) {
        if (base64 && (/^data:image\/([a-zA-Z]*);base64,([^\"]*)$/).test(base64)) {
            this.imageUrl = base64;
            if (!this.isFormatDefined) {
                this.format = ((base64.split(',')[0]).split(';')[0]).split(':')[1].split('/')[1];
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    set imageChanedEvent(event) {
        if (event) {
            /** @type {?} */
            const file = event.target.files[0];
            if (file && (/\.(gif|jpe?g|tiff|png|webp|bmp)$/i).test(file.name)) {
                if (!this.isFormatDefined) {
                    this.format = event.target.files[0].type.split('/')[1];
                }
                /** @type {?} */
                const reader = new FileReader();
                reader.onload = (/**
                 * @param {?} ev
                 * @return {?}
                 */
                (ev) => {
                    this.imageUrl = ev.target.result;
                });
                reader.readAsDataURL(event.target.files[0]);
            }
        }
    }
    /**
     * @param {?} file
     * @return {?}
     */
    set imageFile(file) {
        if (file && (/\.(gif|jpe?g|tiff|png|webp|bmp)$/i).test(file.name)) {
            if (!this.isFormatDefined) {
                this.format = file.type.split('/')[1];
            }
            /** @type {?} */
            const reader = new FileReader();
            reader.onload = (/**
             * @param {?} ev
             * @return {?}
             */
            (ev) => {
                this.imageUrl = ev.target.result;
            });
            reader.readAsDataURL(file);
        }
    }
    /**
     * @param {?} image
     * @return {?}
     */
    onImageLoad(image) {
        image.addEventListener('ready', (/**
         * @return {?}
         */
        () => {
            if (this.roundCropper) {
                ((/** @type {?} */ (document.getElementsByClassName('cropper-view-box')[0]))).style.borderRadius = '50%';
                ((/** @type {?} */ (document.getElementsByClassName('cropper-face')[0]))).style.borderRadius = '50%';
            }
        }));
        this.cropper = new Cropper(image, {
            aspectRatio: this.aspectRatio,
            autoCropArea: this.autoCropArea,
            autoCrop: this.autoCrop,
            modal: this.mask,
            // black mask
            guides: this.guides,
            // grid
            center: this.centerIndicator,
            // center indicator
            viewMode: this.viewMode,
            scalable: this.scalable,
            zoomable: this.zoomable,
            cropBoxMovable: this.cropBoxMovable,
            cropBoxResizable: this.cropBoxResizable,
        });
    }
    /**
     * @return {?}
     */
    rotateRight() {
        this.cropper.rotate(45);
    }
    /**
     * @return {?}
     */
    rotateLeft() {
        this.cropper.rotate(-45);
    }
    /**
     * @return {?}
     */
    crop() {
        this.cropper.setDragMode('crop');
    }
    /**
     * @return {?}
     */
    move() {
        this.cropper.setDragMode('move');
    }
    /**
     * @param {?} event
     * @return {?}
     */
    zoom(event) {
        /** @type {?} */
        const value = Number(event.target.value);
        this.cropper.zoom(value - this.prevZoom);
        this.prevZoom = value;
    }
    /**
     * @return {?}
     */
    zoomIn() {
        this.cropper.zoom(0.1);
    }
    /**
     * @return {?}
     */
    zoomOut() {
        this.cropper.zoom(-0.1);
    }
    /**
     * @return {?}
     */
    flipH() {
        this.cropper.scaleX(-this.cropper.getImageData().scaleX);
    }
    /**
     * @return {?}
     */
    flipV() {
        this.cropper.scaleY(-this.cropper.getImageData().scaleY);
    }
    /**
     * @return {?}
     */
    reset() {
        this.cropper.reset();
    }
    /**
     * @return {?}
     */
    export() {
        /** @type {?} */
        let cropedImage;
        if (this.resizeToWidth && this.resizeToHeight) {
            cropedImage = this.cropper.getCroppedCanvas({
                width: this.resizeToWidth,
                imageSmoothingEnabled: this.imageSmoothingEnabled,
                imageSmoothingQuality: this.imageSmoothingQuality
            });
        }
        else if (this.resizeToHeight) {
            cropedImage = this.cropper.getCroppedCanvas({
                height: this.resizeToHeight,
                imageSmoothingEnabled: this.imageSmoothingEnabled,
                imageSmoothingQuality: this.imageSmoothingQuality
            });
        }
        else if (this.resizeToWidth) {
            cropedImage = this.cropper.getCroppedCanvas({
                width: this.resizeToWidth,
                imageSmoothingEnabled: this.imageSmoothingEnabled,
                imageSmoothingQuality: this.imageSmoothingQuality
            });
        }
        else {
            cropedImage = this.cropper.getCroppedCanvas({
                imageSmoothingEnabled: this.imageSmoothingEnabled,
                imageSmoothingQuality: this.imageSmoothingQuality
            });
        }
        this.outputImage = cropedImage.toDataURL('image/' + this.format, this.quality);
        cropedImage.toBlob((/**
         * @param {?} blob
         * @return {?}
         */
        blob => {
            this.imageCropped.emit({
                base64: this.outputImage,
                file: new File([blob], Date.now() + '.' + this.format, { type: 'image/' + this.format })
            });
        }), 'image/' + this.format, this.quality / 100);
    }
    /**
     * @return {?}
     */
    open() {
        this.modalService.open(this.content, { size: this.modalSize, centered: this.modalCentered, backdrop: 'static' });
    }
}
NgxPhotoEditorComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'ngx-photo-editor',
                template: "<ng-template id=\"ngx-photo-editor-modal\" #ngxPhotoEditorContent let-modal>\r\n  <div [style.backgroundColor]=\"darkTheme?'#36393F':'#D8D8D8'\" class=\"modal-body\" style=\"padding-bottom: 0\">\r\n    <h5 [style.color]=\"darkTheme?'white':'black'\" style=\"margin-bottom: 16px\">{{modalTitle}}</h5>\r\n    <div [style.height]=\"canvasHeight+'px'\" class=\"ngx-photo-editor-img-container\">\r\n      <img #image (load)=\"onImageLoad(image)\" [src]=\"url\" crossorigin id=\"ngx-photo-editor-image\">\r\n    </div>\r\n  </div>\r\n  <!--  <div style=\"padding: 5px 16px\" [style.backgroundColor]=\"darkTheme?'#36393F':'#D8D8D8'\">-->\r\n  <!--    <input type=\"range\" style=\"height: 1px; margin: 0\" class=\"custom-range\" max=\"1\" min=\"0\" value=\"0\" step=\"0.1\" id=\"customRange1\" (change)=\"zoom($event)\">-->\r\n  <!--  </div>-->\r\n  <div class=\"ngx-photo-editor-icons-container\">\r\n    <i (click)=\"crop()\" class=\"fas fa-crop-alt\"></i>\r\n    <i (click)=\"move()\" class=\"fas fa-arrows-alt\"></i>\r\n    <i (click)=\"zoomIn()\" class=\"fas fa-search-plus\"></i>\r\n    <i (click)=\"zoomOut()\" class=\"fas fa-search-minus\"></i>\r\n    <i (click)=\"flipV()\" class=\"fas fa-arrows-alt-v\"></i>\r\n    <i (click)=\"flipH()\" class=\"fas fa-arrows-alt-h\"></i>\r\n    <i (click)=\"rotateLeft()\" class=\"fas fa-undo-alt\"></i>\r\n    <i (click)=\"rotateRight()\" class=\"fas fa-redo-alt\"></i>\r\n    <i (click)=\"reset()\" class=\"fas fa-sync-alt\"></i>\r\n  </div>\r\n  <div [style.backgroundColor]=\"darkTheme?'#36393F':'#D8D8D8'\" class=\"ngx-photo-editor-custom-modal-footer\">\r\n    <button (click)=\"export(); modal.close();\" class=\"btn btn-primary\" type=\"button\">Apply</button>\r\n    <button (click)=\"modal.close()\" [class.btn-outline-dark]=\"!darkTheme\" [class.btn-outline-light]=\"darkTheme\"\r\n            class=\"btn\"\r\n            type=\"button\">Cancel\r\n    </button>\r\n  </div>\r\n</ng-template>\r\n",
                encapsulation: ViewEncapsulation.None,
                styles: ["@import url(https://use.fontawesome.com/releases/v5.8.2/css/all.css);.ngx-photo-editor-ngx-photo-editor-img-container{width:100%;float:left}#ngx-photo-editor-image{display:block;max-width:100%}.ngx-photo-editor-modal-content{border:none;border-radius:5px;overflow:hidden}.ngx-photo-editor-icons-container{background-color:#8f8f8f;color:#fff;padding:15px;text-align:center;outline:0;border:none}.ngx-photo-editor-icons-container>i{padding-right:15px;transition:color .5s;cursor:pointer}.ngx-photo-editor-icons-container>i:nth-child(even){padding-right:30px}.ngx-photo-editor-icons-container>i:last-child{padding-right:0}.ngx-photo-editor-icons-container>i:hover{color:#000}.ngx-photo-editor-custom-modal-footer{padding:16px}.ngx-photo-editor-custom-modal-footer>button{padding:5px 20px!important;font-size:12px!important;float:right;margin-left:10px}/*!\r\n * Cropper.js v1.5.7\r\n * https://fengyuanchen.github.io/cropperjs\r\n *\r\n * Copyright 2015-present Chen Fengyuan\r\n * Released under the MIT license\r\n *\r\n * Date: 2020-05-23T05:22:57.283Z\r\n */.cropper-container{direction:ltr;font-size:0;line-height:0;position:relative;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.cropper-container img{display:block;height:100%;image-orientation:0deg;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.cropper-canvas,.cropper-crop-box,.cropper-drag-box,.cropper-modal,.cropper-wrap-box{bottom:0;left:0;position:absolute;right:0;top:0}.cropper-canvas,.cropper-wrap-box{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;height:100%;outline:rgba(51,153,255,.75) solid 1px;overflow:hidden;width:100%}.cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}.cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:calc(100% / 3);left:0;top:calc(100% / 3);width:100%}.cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:calc(100% / 3);top:0;width:calc(100% / 3)}.cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}.cropper-center::after,.cropper-center::before{background-color:#eee;content:' ';display:block;position:absolute}.cropper-center::before{height:1px;left:-3px;top:0;width:7px}.cropper-center::after{height:7px;left:0;top:-3px;width:1px}.cropper-face,.cropper-line,.cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}.cropper-face{background-color:#fff;left:0;top:0}.cropper-line{background-color:#39f}.cropper-line.line-e{cursor:ew-resize;right:-3px;top:0;width:5px}.cropper-line.line-n{cursor:ns-resize;height:5px;left:0;top:-3px}.cropper-line.line-w{cursor:ew-resize;left:-3px;top:0;width:5px}.cropper-line.line-s{bottom:-3px;cursor:ns-resize;height:5px;left:0}.cropper-point{background-color:#39f;height:5px;opacity:.75;width:5px}.cropper-point.point-e{cursor:ew-resize;margin-top:-3px;right:-3px;top:50%}.cropper-point.point-n{cursor:ns-resize;left:50%;margin-left:-3px;top:-3px}.cropper-point.point-w{cursor:ew-resize;left:-3px;margin-top:-3px;top:50%}.cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}.cropper-point.point-ne{cursor:nesw-resize;right:-3px;top:-3px}.cropper-point.point-nw{cursor:nwse-resize;left:-3px;top:-3px}.cropper-point.point-sw{bottom:-3px;cursor:nesw-resize;left:-3px}.cropper-point.point-se{bottom:-3px;cursor:nwse-resize;height:20px;opacity:1;right:-3px;width:20px}@media (min-width:768px){.cropper-point.point-se{height:15px;width:15px}}@media (min-width:992px){.cropper-point.point-se{height:10px;width:10px}}@media (min-width:1200px){.cropper-point.point-se{height:5px;opacity:.75;width:5px}}.cropper-point.point-se::before{background-color:#39f;bottom:-50%;content:' ';display:block;height:200%;opacity:0;position:absolute;right:-50%;width:200%}.cropper-invisible{opacity:0}.cropper-bg{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC)}.cropper-hide{display:block;height:0;position:absolute;width:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}"]
            }] }
];
/** @nocollapse */
NgxPhotoEditorComponent.ctorParameters = () => [
    { type: NgbModal }
];
NgxPhotoEditorComponent.propDecorators = {
    content: [{ type: ViewChild, args: ['ngxPhotoEditorContent', { static: false },] }],
    modalTitle: [{ type: Input }],
    aspectRatio: [{ type: Input }],
    autoCropArea: [{ type: Input }],
    autoCrop: [{ type: Input }],
    mask: [{ type: Input }],
    guides: [{ type: Input }],
    centerIndicator: [{ type: Input }],
    viewMode: [{ type: Input }],
    modalSize: [{ type: Input }],
    modalCentered: [{ type: Input }],
    scalable: [{ type: Input }],
    zoomable: [{ type: Input }],
    cropBoxMovable: [{ type: Input }],
    cropBoxResizable: [{ type: Input }],
    darkTheme: [{ type: Input }],
    roundCropper: [{ type: Input }],
    canvasHeight: [{ type: Input }],
    resizeToWidth: [{ type: Input }],
    resizeToHeight: [{ type: Input }],
    imageSmoothingEnabled: [{ type: Input }],
    imageSmoothingQuality: [{ type: Input }],
    imageCropped: [{ type: Output }],
    imageQuality: [{ type: Input }],
    imageFormat: [{ type: Input }],
    imageUrl: [{ type: Input }],
    imageBase64: [{ type: Input }],
    imageChanedEvent: [{ type: Input }],
    imageFile: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.content;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.cropper;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.outputImage;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.prevZoom;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.modalTitle;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.aspectRatio;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.autoCropArea;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.autoCrop;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.mask;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.guides;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.centerIndicator;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.viewMode;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.modalSize;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.modalCentered;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.scalable;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.zoomable;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.cropBoxMovable;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.cropBoxResizable;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.darkTheme;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.roundCropper;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.canvasHeight;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.resizeToWidth;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.resizeToHeight;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.imageSmoothingEnabled;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.imageSmoothingQuality;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.url;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.lastUpdate;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.format;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.quality;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.isFormatDefined;
    /** @type {?} */
    NgxPhotoEditorComponent.prototype.imageCropped;
    /**
     * @type {?}
     * @private
     */
    NgxPhotoEditorComponent.prototype.modalService;
}
/**
 * @record
 */
export function CroppedEvent() { }
if (false) {
    /** @type {?|undefined} */
    CroppedEvent.prototype.base64;
    /** @type {?|undefined} */
    CroppedEvent.prototype.file;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXBob3RvLWVkaXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtcGhvdG8tZWRpdG9yLyIsInNvdXJjZXMiOlsibGliL25neC1waG90by1lZGl0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkcsT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQVVwRCxNQUFNLE9BQU8sdUJBQXVCOzs7O0lBd0NsQyxZQUFvQixZQUFzQjtRQUF0QixpQkFBWSxHQUFaLFlBQVksQ0FBVTtRQWxDMUMsYUFBUSxHQUFHLENBQUMsQ0FBQztRQUVKLGVBQVUsR0FBRyxjQUFjLENBQUM7UUFDNUIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osV0FBTSxHQUFHLElBQUksQ0FBQztRQUNkLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLGFBQVEsR0FBYSxDQUFDLENBQUM7UUFFdkIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUN4QixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsR0FBRyxDQUFDO1FBSW5CLDBCQUFxQixHQUFHLElBQUksQ0FBQztRQUM3QiwwQkFBcUIsR0FBMEIs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QUdDOzs7SUFGQyw4QkFBZ0I7O0lBQ2hCLDRCQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCBDcm9wcGVyIGZyb20gJ2Nyb3BwZXJqcyc7XHJcbmltcG9ydCB7TmdiTW9kYWx9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcclxuaW1wb3J0IFZpZXdNb2RlID0gQ3JvcHBlci5WaWV3TW9kZTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcclxuICBzZWxlY3RvcjogJ25neC1waG90by1lZGl0b3InLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtcGhvdG8tZWRpdG9yLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9uZ3gtcGhvdG8tZWRpdG9yLmNvbXBvbmVudC5jc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hQaG90b0VkaXRvckNvbXBvbmVudCB7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ25neFBob3RvRWRpdG9yQ29udGVudCcsIHtzdGF0aWM6IGZhbHNlfSkgY29udGVudDtcclxuXHJcbiAgcHVibGljIGNyb3BwZXI6IENyb3BwZXI7XHJcbiAgcHVibGljIG91dHB1dEltYWdlOiBzdHJpbmc7XHJcbiAgcHJldlpvb20gPSAwO1xyXG5cclxuICBASW5wdXQoKSBtb2RhbFRpdGxlID0gJ1Bob3RvIEVkaXRvcic7XHJcbiAgQElucHV0KCkgYXNwZWN0UmF0aW8gPSAxO1xyXG4gIEBJbnB1dCgpIGF1dG9Dcm9wQXJlYSA9IDE7XHJcbiAgQElucHV0KCkgYXV0b0Nyb3AgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIG1hc2sgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGd1aWRlcyA9IHRydWU7XHJcbiAgQElucHV0KCkgY2VudGVySW5kaWNhdG9yID0gdHJ1ZTtcclxuICBASW5wdXQoKSB2aWV3TW9kZTogVmlld01vZGUgPSAwO1xyXG4gIEBJbnB1dCgpIG1vZGFsU2l6ZTogc2l6ZTtcclxuICBASW5wdXQoKSBtb2RhbENlbnRlcmVkID0gZmFsc2U7XHJcbiAgQElucHV0KCkgc2NhbGFibGUgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHpvb21hYmxlID0gdHJ1ZTtcclxuICBASW5wdXQoKSBjcm9wQm94TW92YWJsZSA9IHRydWU7XHJcbiAgQElucHV0KCkgY3JvcEJveFJlc2l6YWJsZSA9IHRydWU7XHJcbiAgQElucHV0KCkgZGFya1RoZW1lID0gdHJ1ZTtcclxuICBASW5wdXQoKSByb3VuZENyb3BwZXIgPSBmYWxzZTtcclxuICBASW5wdXQoKSBjYW52YXNIZWlnaHQgPSA0MDA7XHJcblxyXG4gIEBJbnB1dCgpIHJlc2l6ZVRvV2lkdGg6IG51bWJlcjtcclxuICBASW5wdXQoKSByZXNpemVUb0hlaWdodDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRydWU7XHJcbiAgQElucHV0KCkgaW1hZ2VTbW9vdGhpbmdRdWFsaXR5OiBJbWFnZVNtb290aGluZ1F1YWxpdHkgPSAnaGlnaCc7XHJcbiAgdXJsOiBzdHJpbmc7XHJcbiAgbGFzdFVwZGF0ZSA9IERhdGUubm93KCk7XHJcblxyXG4gIGZvcm1hdCA9ICdwbmcnO1xyXG4gIHF1YWxpdHkgPSA5MjtcclxuXHJcbiAgaXNGb3JtYXREZWZpbmVkID0gZmFsc2U7XHJcblxyXG4gIEBPdXRwdXQoKSBpbWFnZUNyb3BwZWQgPSBuZXcgRXZlbnRFbWl0dGVyPENyb3BwZWRFdmVudD4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE5nYk1vZGFsKSB7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgaW1hZ2VRdWFsaXR5KHZhbHVlOiBudW1iZXIpIHtcclxuICAgIGlmICh2YWx1ZSA+IDAgJiYgdmFsdWUgPD0gMTAwKSB7XHJcbiAgICAgIHRoaXMucXVhbGl0eSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IGltYWdlRm9ybWF0KHR5cGU6IGltYWdlRm9ybWF0KSB7XHJcbiAgICBpZiAoKC9eKGdpZnxqcGU/Z3x0aWZmfHBuZ3x3ZWJwfGJtcCkkL2kpLnRlc3QodHlwZSkpIHtcclxuICAgICAgdGhpcy5mb3JtYXQgPSB0eXBlO1xyXG4gICAgICB0aGlzLmlzRm9ybWF0RGVmaW5lZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgaW1hZ2VVcmwodXJsOiBzdHJpbmcpIHtcclxuICAgIGlmICh1cmwpIHtcclxuICAgICAgdGhpcy51cmwgPSB1cmw7XHJcbiAgICAgIGlmICh0aGlzLmxhc3RVcGRhdGUgIT09IERhdGUubm93KCkpIHtcclxuICAgICAgICB0aGlzLm9wZW4oKTtcclxuICAgICAgICB0aGlzLmxhc3RVcGRhdGUgPSBEYXRlLm5vdygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgaW1hZ2VCYXNlNjQoYmFzZTY0OiBzdHJpbmcpIHtcclxuICAgIGlmIChiYXNlNjQgJiYgKC9eZGF0YTppbWFnZVxcLyhbYS16QS1aXSopO2Jhc2U2NCwoW15cXFwiXSopJC8pLnRlc3QoYmFzZTY0KSkge1xyXG4gICAgICB0aGlzLmltYWdlVXJsID0gYmFzZTY0O1xyXG4gICAgICBpZiAoIXRoaXMuaXNGb3JtYXREZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5mb3JtYXQgPSAoKGJhc2U2NC5zcGxpdCgnLCcpWzBdKS5zcGxpdCgnOycpWzBdKS5zcGxpdCgnOicpWzFdLnNwbGl0KCcvJylbMV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCBpbWFnZUNoYW5lZEV2ZW50KGV2ZW50OiBhbnkpIHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBjb25zdCBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzWzBdO1xyXG4gICAgICBpZiAoZmlsZSAmJiAoL1xcLihnaWZ8anBlP2d8dGlmZnxwbmd8d2VicHxibXApJC9pKS50ZXN0KGZpbGUubmFtZSkpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNGb3JtYXREZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLmZvcm1hdCA9IGV2ZW50LnRhcmdldC5maWxlc1swXS50eXBlLnNwbGl0KCcvJylbMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IChldjogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmltYWdlVXJsID0gZXYudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGV2ZW50LnRhcmdldC5maWxlc1swXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCBpbWFnZUZpbGUoZmlsZTogRmlsZSkge1xyXG4gICAgaWYgKGZpbGUgJiYgKC9cXC4oZ2lmfGpwZT9nfHRpZmZ8cG5nfHdlYnB8Ym1wKSQvaSkudGVzdChmaWxlLm5hbWUpKSB7XHJcbiAgICAgIGlmICghdGhpcy5pc0Zvcm1hdERlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmZvcm1hdCA9IGZpbGUudHlwZS5zcGxpdCgnLycpWzFdO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgIHJlYWRlci5vbmxvYWQgPSAoZXY6IGFueSkgPT4ge1xyXG4gICAgICAgIHRoaXMuaW1hZ2VVcmwgPSBldi50YXJnZXQucmVzdWx0O1xyXG4gICAgICB9O1xyXG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uSW1hZ2VMb2FkKGltYWdlKSB7XHJcblxyXG4gICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHknLCAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnJvdW5kQ3JvcHBlcikge1xyXG4gICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjcm9wcGVyLXZpZXctYm94JylbMF0gYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc1MCUnO1xyXG4gICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjcm9wcGVyLWZhY2UnKVswXSBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzUwJSc7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY3JvcHBlciA9IG5ldyBDcm9wcGVyKGltYWdlLCB7XHJcbiAgICAgIGFzcGVjdFJhdGlvOiB0aGlzLmFzcGVjdFJhdGlvLFxyXG4gICAgICBhdXRvQ3JvcEFyZWE6IHRoaXMuYXV0b0Nyb3BBcmVhLFxyXG4gICAgICBhdXRvQ3JvcDogdGhpcy5hdXRvQ3JvcCxcclxuICAgICAgbW9kYWw6IHRoaXMubWFzaywgLy8gYmxhY2sgbWFza1xyXG4gICAgICBndWlkZXM6IHRoaXMuZ3VpZGVzLCAvLyBncmlkXHJcbiAgICAgIGNlbnRlcjogdGhpcy5jZW50ZXJJbmRpY2F0b3IsIC8vIGNlbnRlciBpbmRpY2F0b3JcclxuICAgICAgdmlld01vZGU6IHRoaXMudmlld01vZGUsXHJcbiAgICAgIHNjYWxhYmxlOiB0aGlzLnNjYWxhYmxlLFxyXG4gICAgICB6b29tYWJsZTogdGhpcy56b29tYWJsZSxcclxuICAgICAgY3JvcEJveE1vdmFibGU6IHRoaXMuY3JvcEJveE1vdmFibGUsXHJcbiAgICAgIGNyb3BCb3hSZXNpemFibGU6IHRoaXMuY3JvcEJveFJlc2l6YWJsZSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcm90YXRlUmlnaHQoKSB7XHJcbiAgICB0aGlzLmNyb3BwZXIucm90YXRlKDQ1KTtcclxuICB9XHJcblxyXG4gIHJvdGF0ZUxlZnQoKSB7XHJcbiAgICB0aGlzLmNyb3BwZXIucm90YXRlKC00NSk7XHJcbiAgfVxyXG5cclxuICBjcm9wKCkge1xyXG4gICAgdGhpcy5jcm9wcGVyLnNldERyYWdNb2RlKCdjcm9wJyk7XHJcbiAgfVxyXG5cclxuICBtb3ZlKCkge1xyXG4gICAgdGhpcy5jcm9wcGVyLnNldERyYWdNb2RlKCdtb3ZlJyk7XHJcbiAgfVxyXG5cclxuICB6b29tKGV2ZW50KSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IE51bWJlcihldmVudC50YXJnZXQudmFsdWUpO1xyXG4gICAgdGhpcy5jcm9wcGVyLnpvb20odmFsdWUgLSB0aGlzLnByZXZab29tKTtcclxuICAgIHRoaXMucHJldlpvb20gPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHpvb21JbigpIHtcclxuICAgIHRoaXMuY3JvcHBlci56b29tKDAuMSk7XHJcbiAgfVxyXG5cclxuICB6b29tT3V0KCkge1xyXG4gICAgdGhpcy5jcm9wcGVyLnpvb20oLTAuMSk7XHJcbiAgfVxyXG5cclxuICBmbGlwSCgpIHtcclxuICAgIHRoaXMuY3JvcHBlci5zY2FsZVgoLXRoaXMuY3JvcHBlci5nZXRJbWFnZURhdGEoKS5zY2FsZVgpO1xyXG4gIH1cclxuXHJcbiAgZmxpcFYoKSB7XHJcbiAgICB0aGlzLmNyb3BwZXIuc2NhbGVZKC10aGlzLmNyb3BwZXIuZ2V0SW1hZ2VEYXRhKCkuc2NhbGVZKTtcclxuICB9XHJcblxyXG4gIHJlc2V0KCkge1xyXG4gICAgdGhpcy5jcm9wcGVyLnJlc2V0KCk7XHJcbiAgfVxyXG5cclxuICBleHBvcnQoKSB7XHJcbiAgICBsZXQgY3JvcGVkSW1hZ2U7XHJcbiAgICBpZiAodGhpcy5yZXNpemVUb1dpZHRoICYmIHRoaXMucmVzaXplVG9IZWlnaHQpIHtcclxuICAgICAgY3JvcGVkSW1hZ2UgPSB0aGlzLmNyb3BwZXIuZ2V0Q3JvcHBlZENhbnZhcyh7XHJcbiAgICAgICAgd2lkdGg6IHRoaXMucmVzaXplVG9XaWR0aCxcclxuICAgICAgICBpbWFnZVNtb290aGluZ0VuYWJsZWQ6IHRoaXMuaW1hZ2VTbW9vdGhpbmdFbmFibGVkLFxyXG4gICAgICAgIGltYWdlU21vb3RoaW5nUXVhbGl0eTogdGhpcy5pbWFnZVNtb290aGluZ1F1YWxpdHlcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucmVzaXplVG9IZWlnaHQpIHtcclxuICAgICAgY3JvcGVkSW1hZ2UgPSB0aGlzLmNyb3BwZXIuZ2V0Q3JvcHBlZENhbnZhcyh7XHJcbiAgICAgICAgaGVpZ2h0OiB0aGlzLnJlc2l6ZVRvSGVpZ2h0LFxyXG4gICAgICAgIGltYWdlU21vb3RoaW5nRW5hYmxlZDogdGhpcy5pbWFnZVNtb290aGluZ0VuYWJsZWQsXHJcbiAgICAgICAgaW1hZ2VTbW9vdGhpbmdRdWFsaXR5OiB0aGlzLmltYWdlU21vb3RoaW5nUXVhbGl0eVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5yZXNpemVUb1dpZHRoKSB7XHJcbiAgICAgIGNyb3BlZEltYWdlID0gdGhpcy5jcm9wcGVyLmdldENyb3BwZWRDYW52YXMoe1xyXG4gICAgICAgIHdpZHRoOiB0aGlzLnJlc2l6ZVRvV2lkdGgsXHJcbiAgICAgICAgaW1hZ2VTbW9vdGhpbmdFbmFibGVkOiB0aGlzLmltYWdlU21vb3RoaW5nRW5hYmxlZCxcclxuICAgICAgICBpbWFnZVNtb290aGluZ1F1YWxpdHk6IHRoaXMuaW1hZ2VTbW9vdGhpbmdRdWFsaXR5XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY3JvcGVkSW1hZ2UgPSB0aGlzLmNyb3BwZXIuZ2V0Q3JvcHBlZENhbnZhcyh7XHJcbiAgICAgICAgaW1hZ2VTbW9vdGhpbmdFbmFibGVkOiB0aGlzLmltYWdlU21vb3RoaW5nRW5hYmxlZCxcclxuICAgICAgICBpbWFnZVNtb290aGluZ1F1YWxpdHk6IHRoaXMuaW1hZ2VTbW9vdGhpbmdRdWFsaXR5XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vdXRwdXRJbWFnZSA9IGNyb3BlZEltYWdlLnRvRGF0YVVSTCgnaW1hZ2UvJyArIHRoaXMuZm9ybWF0LCB0aGlzLnF1YWxpdHkpO1xyXG4gICAgY3JvcGVkSW1hZ2UudG9CbG9iKGJsb2IgPT4ge1xyXG4gICAgICB0aGlzLmltYWdlQ3JvcHBlZC5lbWl0KHtcclxuICAgICAgICBiYXNlNjQ6IHRoaXMub3V0cHV0SW1hZ2UsXHJcbiAgICAgICAgZmlsZTogbmV3IEZpbGUoW2Jsb2JdLCBEYXRlLm5vdygpICsgJy4nICsgdGhpcy5mb3JtYXQsIHt0eXBlOiAnaW1hZ2UvJyArIHRoaXMuZm9ybWF0fSlcclxuICAgICAgfSk7XHJcbiAgICB9LCAnaW1hZ2UvJyArIHRoaXMuZm9ybWF0LCB0aGlzLnF1YWxpdHkgLyAxMDApO1xyXG4gIH1cclxuXHJcbiAgb3BlbigpIHtcclxuICAgIHRoaXMubW9kYWxTZXJ2aWNlLm9wZW4odGhpcy5jb250ZW50LCB7c2l6ZTogdGhpcy5tb2RhbFNpemUsIGNlbnRlcmVkOiB0aGlzLm1vZGFsQ2VudGVyZWQsIGJhY2tkcm9wOiAnc3RhdGljJ30pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDcm9wcGVkRXZlbnQge1xyXG4gIGJhc2U2ND86IHN0cmluZztcclxuICBmaWxlPzogRmlsZTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgaW1hZ2VGb3JtYXQgPSAnZ2lmJyB8ICdqcGVnJyB8ICd0aWZmJyB8ICdwbmcnIHwgJ3dlYnAnIHwgJ2JtcCc7XHJcblxyXG5leHBvcnQgdHlwZSBzaXplID0gJ3NtJyB8ICdsZycgfCAneGwnIHwgc3RyaW5nO1xyXG4iXX0=