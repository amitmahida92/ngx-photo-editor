/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-photo-editor.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import Cropper from 'cropperjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
var NgxPhotoEditorComponent = /** @class */ (function () {
    function NgxPhotoEditorComponent(modalService) {
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
    Object.defineProperty(NgxPhotoEditorComponent.prototype, "imageQuality", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value > 0 && value <= 100) {
                this.quality = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxPhotoEditorComponent.prototype, "imageFormat", {
        set: /**
         * @param {?} type
         * @return {?}
         */
        function (type) {
            if ((/^(gif|jpe?g|tiff|png|webp|bmp)$/i).test(type)) {
                this.format = type;
                this.isFormatDefined = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxPhotoEditorComponent.prototype, "imageUrl", {
        set: /**
         * @param {?} url
         * @return {?}
         */
        function (url) {
            if (url) {
                this.url = url;
                if (this.lastUpdate !== Date.now()) {
                    this.open();
                    this.lastUpdate = Date.now();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxPhotoEditorComponent.prototype, "imageBase64", {
        set: /**
         * @param {?} base64
         * @return {?}
         */
        function (base64) {
            if (base64 && (/^data:image\/([a-zA-Z]*);base64,([^\"]*)$/).test(base64)) {
                this.imageUrl = base64;
                if (!this.isFormatDefined) {
                    this.format = ((base64.split(',')[0]).split(';')[0]).split(':')[1].split('/')[1];
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxPhotoEditorComponent.prototype, "imageChanedEvent", {
        set: /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var _this = this;
            if (event) {
                /** @type {?} */
                var file = event.target.files[0];
                if (file && (/\.(gif|jpe?g|tiff|png|webp|bmp)$/i).test(file.name)) {
                    if (!this.isFormatDefined) {
                        this.format = event.target.files[0].type.split('/')[1];
                    }
                    /** @type {?} */
                    var reader = new FileReader();
                    reader.onload = (/**
                     * @param {?} ev
                     * @return {?}
                     */
                    function (ev) {
                        _this.imageUrl = ev.target.result;
                    });
                    reader.readAsDataURL(event.target.files[0]);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxPhotoEditorComponent.prototype, "imageFile", {
        set: /**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            var _this = this;
            if (file && (/\.(gif|jpe?g|tiff|png|webp|bmp)$/i).test(file.name)) {
                if (!this.isFormatDefined) {
                    this.format = file.type.split('/')[1];
                }
                /** @type {?} */
                var reader = new FileReader();
                reader.onload = (/**
                 * @param {?} ev
                 * @return {?}
                 */
                function (ev) {
                    _this.imageUrl = ev.target.result;
                });
                reader.readAsDataURL(file);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} image
     * @return {?}
     */
    NgxPhotoEditorComponent.prototype.onImageLoad = /**
     * @param {?} image
     * @return {?}
     */
    function (image) {
        var _this = this;
        image.addEventListener('ready', (/**
         * @return {?}
         */
        function () {
            if (_this.roundCropper) {
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
    };
    /**
     * @return {?}
     */
    NgxPhotoEditorComponent.prototype.rotateRight = /**
     * @return {?}
     */
    function () {
        this.cropper.rotate(45);
    };
    /**
     * @return {?}
     */
    NgxPhotoEditorComponent.prototype.rotateLeft = /**
     * @return {?}
     */
    function () {
        this.cropper.rotate(-45);
    };
    /**
     * @return {?}
     */
    NgxPhotoEditorComponent.prototype.crop = /**
     * @return {?}
     */
    function () {
        this.cropper.setDragMode('crop');
    };
    /**
     * @return {?}
     */
    NgxPhotoEditorComponent.prototype.move = /**
     * @return {?}
     */
    function () {
        this.cropper.setDragMode('move');
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxPhotoEditorComponent.prototype.zoom = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var value = Number(event.target.value);
        this.cropper.zoom(value - this.prevZoom);
        this.prevZoom = value;
    };
    /**
     * @return {?}
     */
    NgxPhotoEditorComponent.prototype.zoomIn = /**
     * @return {?}
     */
    function () {
        this.cropper.zoom(0.1);
    };
    /**
     * @return {?}
     */
    NgxPhotoEditorComponent.prototype.zoomOut = /**
     * @return {?}
     */
    function () {
        this.cropper.zoom(-0.1);
    };
    /**
     * @return {?}
     */
    NgxPhotoEditorComponent.prototype.flipH = /**
     * @return {?}
     */
    function () {
        this.cropper.scaleX(-this.cropper.getImageData().scaleX);
    };
    /**
     * @return {?}
     */
    NgxPhotoEditorComponent.prototype.flipV = /**
     * @return {?}
     */
    function () {
        this.cropper.scaleY(-this.cropper.getImageData().scaleY);
    };
    /**
     * @return {?}
     */
    NgxPhotoEditorComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.cropper.reset();
    };
    /**
     * @return {?}
     */
    NgxPhotoEditorComponent.prototype.export = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var cropedImage;
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
        function (blob) {
            _this.imageCropped.emit({
                base64: _this.outputImage,
                file: new File([blob], Date.now() + '.' + _this.format, { type: 'image/' + _this.format })
            });
        }), 'image/' + this.format, this.quality / 100);
    };
    /**
     * @return {?}
     */
    NgxPhotoEditorComponent.prototype.open = /**
     * @return {?}
     */
    function () {
        this.modalService.open(this.content, { size: this.modalSize, centered: this.modalCentered, backdrop: 'static' });
    };
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
    NgxPhotoEditorComponent.ctorParameters = function () { return [
        { type: NgbModal }
    ]; };
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
    return NgxPhotoEditorComponent;
}());
export { NgxPhotoEditorComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXBob3RvLWVkaXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtcGhvdG8tZWRpdG9yLyIsInNvdXJjZXMiOlsibGliL25neC1waG90by1lZGl0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkcsT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUdwRDtJQStDRSxpQ0FBb0IsWUFBc0I7UUFBdEIsaUJBQVksR0FBWixZQUFZLENBQVU7UUFsQzFDLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFFSixlQUFVLEdBQUcsY0FBYyxDQUFDO1FBQzVCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxvQkFBZSxHQUFHLElBQUksQ0FBQztRQUN2QixhQUFRLEdBQWEsQ0FBQyxDQUFDO1FBRXZCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixxQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDeEIsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixpQkFBWSxHQUFHLEdBQUcsQ0FBQztRQUluQiwwQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDN0IsMEJBQXFCLEdBQTBCLE1BQU0sQ0FBQztRQUUvRCxlQUFV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LDJDQUF5Qjs7SUFDekIsMkNBQXlCOztJQUN6QixpREFBK0I7O0lBQy9CLG1EQUFpQzs7SUFDakMsNENBQTBCOztJQUMxQiwrQ0FBOEI7O0lBQzlCLCtDQUE0Qjs7SUFFNUIsZ0RBQStCOztJQUMvQixpREFBZ0M7O0lBQ2hDLHdEQUFzQzs7SUFDdEMsd0RBQStEOztJQUMvRCxzQ0FBWTs7SUFDWiw2Q0FBd0I7O0lBRXhCLHlDQUFlOztJQUNmLDBDQUFhOztJQUViLGtEQUF3Qjs7SUFFeEIsK0NBQTBEOzs7OztJQUU5QywrQ0FBOEI7Ozs7O0FBMEs1QyxrQ0FHQzs7O0lBRkMsOEJBQWdCOztJQUNoQiw0QkFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgQ3JvcHBlciBmcm9tICdjcm9wcGVyanMnO1xyXG5pbXBvcnQge05nYk1vZGFsfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XHJcbmltcG9ydCBWaWV3TW9kZSA9IENyb3BwZXIuVmlld01vZGU7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXHJcbiAgc2VsZWN0b3I6ICduZ3gtcGhvdG8tZWRpdG9yJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LXBob3RvLWVkaXRvci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbmd4LXBob3RvLWVkaXRvci5jb21wb25lbnQuY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4UGhvdG9FZGl0b3JDb21wb25lbnQge1xyXG5cclxuICBAVmlld0NoaWxkKCduZ3hQaG90b0VkaXRvckNvbnRlbnQnLCB7c3RhdGljOiBmYWxzZX0pIGNvbnRlbnQ7XHJcblxyXG4gIHB1YmxpYyBjcm9wcGVyOiBDcm9wcGVyO1xyXG4gIHB1YmxpYyBvdXRwdXRJbWFnZTogc3RyaW5nO1xyXG4gIHByZXZab29tID0gMDtcclxuXHJcbiAgQElucHV0KCkgbW9kYWxUaXRsZSA9ICdQaG90byBFZGl0b3InO1xyXG4gIEBJbnB1dCgpIGFzcGVjdFJhdGlvID0gMTtcclxuICBASW5wdXQoKSBhdXRvQ3JvcEFyZWEgPSAxO1xyXG4gIEBJbnB1dCgpIGF1dG9Dcm9wID0gdHJ1ZTtcclxuICBASW5wdXQoKSBtYXNrID0gdHJ1ZTtcclxuICBASW5wdXQoKSBndWlkZXMgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGNlbnRlckluZGljYXRvciA9IHRydWU7XHJcbiAgQElucHV0KCkgdmlld01vZGU6IFZpZXdNb2RlID0gMDtcclxuICBASW5wdXQoKSBtb2RhbFNpemU6IHNpemU7XHJcbiAgQElucHV0KCkgbW9kYWxDZW50ZXJlZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHNjYWxhYmxlID0gdHJ1ZTtcclxuICBASW5wdXQoKSB6b29tYWJsZSA9IHRydWU7XHJcbiAgQElucHV0KCkgY3JvcEJveE1vdmFibGUgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGNyb3BCb3hSZXNpemFibGUgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGRhcmtUaGVtZSA9IHRydWU7XHJcbiAgQElucHV0KCkgcm91bmRDcm9wcGVyID0gZmFsc2U7XHJcbiAgQElucHV0KCkgY2FudmFzSGVpZ2h0ID0gNDAwO1xyXG5cclxuICBASW5wdXQoKSByZXNpemVUb1dpZHRoOiBudW1iZXI7XHJcbiAgQElucHV0KCkgcmVzaXplVG9IZWlnaHQ6IG51bWJlcjtcclxuICBASW5wdXQoKSBpbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGltYWdlU21vb3RoaW5nUXVhbGl0eTogSW1hZ2VTbW9vdGhpbmdRdWFsaXR5ID0gJ2hpZ2gnO1xyXG4gIHVybDogc3RyaW5nO1xyXG4gIGxhc3RVcGRhdGUgPSBEYXRlLm5vdygpO1xyXG5cclxuICBmb3JtYXQgPSAncG5nJztcclxuICBxdWFsaXR5ID0gOTI7XHJcblxyXG4gIGlzRm9ybWF0RGVmaW5lZCA9IGZhbHNlO1xyXG5cclxuICBAT3V0cHV0KCkgaW1hZ2VDcm9wcGVkID0gbmV3IEV2ZW50RW1pdHRlcjxDcm9wcGVkRXZlbnQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBOZ2JNb2RhbCkge1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IGltYWdlUXVhbGl0eSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICBpZiAodmFsdWUgPiAwICYmIHZhbHVlIDw9IDEwMCkge1xyXG4gICAgICB0aGlzLnF1YWxpdHkgPSB2YWx1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCBpbWFnZUZvcm1hdCh0eXBlOiBpbWFnZUZvcm1hdCkge1xyXG4gICAgaWYgKCgvXihnaWZ8anBlP2d8dGlmZnxwbmd8d2VicHxibXApJC9pKS50ZXN0KHR5cGUpKSB7XHJcbiAgICAgIHRoaXMuZm9ybWF0ID0gdHlwZTtcclxuICAgICAgdGhpcy5pc0Zvcm1hdERlZmluZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IGltYWdlVXJsKHVybDogc3RyaW5nKSB7XHJcbiAgICBpZiAodXJsKSB7XHJcbiAgICAgIHRoaXMudXJsID0gdXJsO1xyXG4gICAgICBpZiAodGhpcy5sYXN0VXBkYXRlICE9PSBEYXRlLm5vdygpKSB7XHJcbiAgICAgICAgdGhpcy5vcGVuKCk7XHJcbiAgICAgICAgdGhpcy5sYXN0VXBkYXRlID0gRGF0ZS5ub3coKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IGltYWdlQmFzZTY0KGJhc2U2NDogc3RyaW5nKSB7XHJcbiAgICBpZiAoYmFzZTY0ICYmICgvXmRhdGE6aW1hZ2VcXC8oW2EtekEtWl0qKTtiYXNlNjQsKFteXFxcIl0qKSQvKS50ZXN0KGJhc2U2NCkpIHtcclxuICAgICAgdGhpcy5pbWFnZVVybCA9IGJhc2U2NDtcclxuICAgICAgaWYgKCF0aGlzLmlzRm9ybWF0RGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuZm9ybWF0ID0gKChiYXNlNjQuc3BsaXQoJywnKVswXSkuc3BsaXQoJzsnKVswXSkuc3BsaXQoJzonKVsxXS5zcGxpdCgnLycpWzFdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgaW1hZ2VDaGFuZWRFdmVudChldmVudDogYW55KSB7XHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgY29uc3QgZmlsZSA9IGV2ZW50LnRhcmdldC5maWxlc1swXTtcclxuICAgICAgaWYgKGZpbGUgJiYgKC9cXC4oZ2lmfGpwZT9nfHRpZmZ8cG5nfHdlYnB8Ym1wKSQvaSkudGVzdChmaWxlLm5hbWUpKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRm9ybWF0RGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5mb3JtYXQgPSBldmVudC50YXJnZXQuZmlsZXNbMF0udHlwZS5zcGxpdCgnLycpWzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSAoZXY6IGFueSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5pbWFnZVVybCA9IGV2LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChldmVudC50YXJnZXQuZmlsZXNbMF0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgaW1hZ2VGaWxlKGZpbGU6IEZpbGUpIHtcclxuICAgIGlmIChmaWxlICYmICgvXFwuKGdpZnxqcGU/Z3x0aWZmfHBuZ3x3ZWJwfGJtcCkkL2kpLnRlc3QoZmlsZS5uYW1lKSkge1xyXG4gICAgICBpZiAoIXRoaXMuaXNGb3JtYXREZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5mb3JtYXQgPSBmaWxlLnR5cGUuc3BsaXQoJy8nKVsxXTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICByZWFkZXIub25sb2FkID0gKGV2OiBhbnkpID0+IHtcclxuICAgICAgICB0aGlzLmltYWdlVXJsID0gZXYudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgfTtcclxuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkltYWdlTG9hZChpbWFnZSkge1xyXG5cclxuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5JywgKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5yb3VuZENyb3BwZXIpIHtcclxuICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY3JvcHBlci12aWV3LWJveCcpWzBdIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnNTAlJztcclxuICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY3JvcHBlci1mYWNlJylbMF0gYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc1MCUnO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmNyb3BwZXIgPSBuZXcgQ3JvcHBlcihpbWFnZSwge1xyXG4gICAgICBhc3BlY3RSYXRpbzogdGhpcy5hc3BlY3RSYXRpbyxcclxuICAgICAgYXV0b0Nyb3BBcmVhOiB0aGlzLmF1dG9Dcm9wQXJlYSxcclxuICAgICAgYXV0b0Nyb3A6IHRoaXMuYXV0b0Nyb3AsXHJcbiAgICAgIG1vZGFsOiB0aGlzLm1hc2ssIC8vIGJsYWNrIG1hc2tcclxuICAgICAgZ3VpZGVzOiB0aGlzLmd1aWRlcywgLy8gZ3JpZFxyXG4gICAgICBjZW50ZXI6IHRoaXMuY2VudGVySW5kaWNhdG9yLCAvLyBjZW50ZXIgaW5kaWNhdG9yXHJcbiAgICAgIHZpZXdNb2RlOiB0aGlzLnZpZXdNb2RlLFxyXG4gICAgICBzY2FsYWJsZTogdGhpcy5zY2FsYWJsZSxcclxuICAgICAgem9vbWFibGU6IHRoaXMuem9vbWFibGUsXHJcbiAgICAgIGNyb3BCb3hNb3ZhYmxlOiB0aGlzLmNyb3BCb3hNb3ZhYmxlLFxyXG4gICAgICBjcm9wQm94UmVzaXphYmxlOiB0aGlzLmNyb3BCb3hSZXNpemFibGUsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJvdGF0ZVJpZ2h0KCkge1xyXG4gICAgdGhpcy5jcm9wcGVyLnJvdGF0ZSg0NSk7XHJcbiAgfVxyXG5cclxuICByb3RhdGVMZWZ0KCkge1xyXG4gICAgdGhpcy5jcm9wcGVyLnJvdGF0ZSgtNDUpO1xyXG4gIH1cclxuXHJcbiAgY3JvcCgpIHtcclxuICAgIHRoaXMuY3JvcHBlci5zZXREcmFnTW9kZSgnY3JvcCcpO1xyXG4gIH1cclxuXHJcbiAgbW92ZSgpIHtcclxuICAgIHRoaXMuY3JvcHBlci5zZXREcmFnTW9kZSgnbW92ZScpO1xyXG4gIH1cclxuXHJcbiAgem9vbShldmVudCkge1xyXG4gICAgY29uc3QgdmFsdWUgPSBOdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICAgIHRoaXMuY3JvcHBlci56b29tKHZhbHVlIC0gdGhpcy5wcmV2Wm9vbSk7XHJcbiAgICB0aGlzLnByZXZab29tID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICB6b29tSW4oKSB7XHJcbiAgICB0aGlzLmNyb3BwZXIuem9vbSgwLjEpO1xyXG4gIH1cclxuXHJcbiAgem9vbU91dCgpIHtcclxuICAgIHRoaXMuY3JvcHBlci56b29tKC0wLjEpO1xyXG4gIH1cclxuXHJcbiAgZmxpcEgoKSB7XHJcbiAgICB0aGlzLmNyb3BwZXIuc2NhbGVYKC10aGlzLmNyb3BwZXIuZ2V0SW1hZ2VEYXRhKCkuc2NhbGVYKTtcclxuICB9XHJcblxyXG4gIGZsaXBWKCkge1xyXG4gICAgdGhpcy5jcm9wcGVyLnNjYWxlWSgtdGhpcy5jcm9wcGVyLmdldEltYWdlRGF0YSgpLnNjYWxlWSk7XHJcbiAgfVxyXG5cclxuICByZXNldCgpIHtcclxuICAgIHRoaXMuY3JvcHBlci5yZXNldCgpO1xyXG4gIH1cclxuXHJcbiAgZXhwb3J0KCkge1xyXG4gICAgbGV0IGNyb3BlZEltYWdlO1xyXG4gICAgaWYgKHRoaXMucmVzaXplVG9XaWR0aCAmJiB0aGlzLnJlc2l6ZVRvSGVpZ2h0KSB7XHJcbiAgICAgIGNyb3BlZEltYWdlID0gdGhpcy5jcm9wcGVyLmdldENyb3BwZWRDYW52YXMoe1xyXG4gICAgICAgIHdpZHRoOiB0aGlzLnJlc2l6ZVRvV2lkdGgsXHJcbiAgICAgICAgaW1hZ2VTbW9vdGhpbmdFbmFibGVkOiB0aGlzLmltYWdlU21vb3RoaW5nRW5hYmxlZCxcclxuICAgICAgICBpbWFnZVNtb290aGluZ1F1YWxpdHk6IHRoaXMuaW1hZ2VTbW9vdGhpbmdRdWFsaXR5XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnJlc2l6ZVRvSGVpZ2h0KSB7XHJcbiAgICAgIGNyb3BlZEltYWdlID0gdGhpcy5jcm9wcGVyLmdldENyb3BwZWRDYW52YXMoe1xyXG4gICAgICAgIGhlaWdodDogdGhpcy5yZXNpemVUb0hlaWdodCxcclxuICAgICAgICBpbWFnZVNtb290aGluZ0VuYWJsZWQ6IHRoaXMuaW1hZ2VTbW9vdGhpbmdFbmFibGVkLFxyXG4gICAgICAgIGltYWdlU21vb3RoaW5nUXVhbGl0eTogdGhpcy5pbWFnZVNtb290aGluZ1F1YWxpdHlcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucmVzaXplVG9XaWR0aCkge1xyXG4gICAgICBjcm9wZWRJbWFnZSA9IHRoaXMuY3JvcHBlci5nZXRDcm9wcGVkQ2FudmFzKHtcclxuICAgICAgICB3aWR0aDogdGhpcy5yZXNpemVUb1dpZHRoLFxyXG4gICAgICAgIGltYWdlU21vb3RoaW5nRW5hYmxlZDogdGhpcy5pbWFnZVNtb290aGluZ0VuYWJsZWQsXHJcbiAgICAgICAgaW1hZ2VTbW9vdGhpbmdRdWFsaXR5OiB0aGlzLmltYWdlU21vb3RoaW5nUXVhbGl0eVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNyb3BlZEltYWdlID0gdGhpcy5jcm9wcGVyLmdldENyb3BwZWRDYW52YXMoe1xyXG4gICAgICAgIGltYWdlU21vb3RoaW5nRW5hYmxlZDogdGhpcy5pbWFnZVNtb290aGluZ0VuYWJsZWQsXHJcbiAgICAgICAgaW1hZ2VTbW9vdGhpbmdRdWFsaXR5OiB0aGlzLmltYWdlU21vb3RoaW5nUXVhbGl0eVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMub3V0cHV0SW1hZ2UgPSBjcm9wZWRJbWFnZS50b0RhdGFVUkwoJ2ltYWdlLycgKyB0aGlzLmZvcm1hdCwgdGhpcy5xdWFsaXR5KTtcclxuICAgIGNyb3BlZEltYWdlLnRvQmxvYihibG9iID0+IHtcclxuICAgICAgdGhpcy5pbWFnZUNyb3BwZWQuZW1pdCh7XHJcbiAgICAgICAgYmFzZTY0OiB0aGlzLm91dHB1dEltYWdlLFxyXG4gICAgICAgIGZpbGU6IG5ldyBGaWxlKFtibG9iXSwgRGF0ZS5ub3coKSArICcuJyArIHRoaXMuZm9ybWF0LCB7dHlwZTogJ2ltYWdlLycgKyB0aGlzLmZvcm1hdH0pXHJcbiAgICAgIH0pO1xyXG4gICAgfSwgJ2ltYWdlLycgKyB0aGlzLmZvcm1hdCwgdGhpcy5xdWFsaXR5IC8gMTAwKTtcclxuICB9XHJcblxyXG4gIG9wZW4oKSB7XHJcbiAgICB0aGlzLm1vZGFsU2VydmljZS5vcGVuKHRoaXMuY29udGVudCwge3NpemU6IHRoaXMubW9kYWxTaXplLCBjZW50ZXJlZDogdGhpcy5tb2RhbENlbnRlcmVkLCBiYWNrZHJvcDogJ3N0YXRpYyd9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ3JvcHBlZEV2ZW50IHtcclxuICBiYXNlNjQ/OiBzdHJpbmc7XHJcbiAgZmlsZT86IEZpbGU7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIGltYWdlRm9ybWF0ID0gJ2dpZicgfCAnanBlZycgfCAndGlmZicgfCAncG5nJyB8ICd3ZWJwJyB8ICdibXAnO1xyXG5cclxuZXhwb3J0IHR5cGUgc2l6ZSA9ICdzbScgfCAnbGcnIHwgJ3hsJyB8IHN0cmluZztcclxuIl19