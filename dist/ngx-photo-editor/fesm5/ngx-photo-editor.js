import { Injectable, ɵɵdefineInjectable, EventEmitter, Component, ViewEncapsulation, ViewChild, Input, Output, NgModule } from '@angular/core';
import Cropper from 'cropperjs';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-photo-editor.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxPhotoEditorService = /** @class */ (function () {
    function NgxPhotoEditorService() {
    }
    NgxPhotoEditorService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NgxPhotoEditorService.ctorParameters = function () { return []; };
    /** @nocollapse */ NgxPhotoEditorService.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgxPhotoEditorService_Factory() { return new NgxPhotoEditorService(); }, token: NgxPhotoEditorService, providedIn: "root" });
    return NgxPhotoEditorService;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-photo-editor.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
function CroppedEvent() { }
if (false) {
    /** @type {?|undefined} */
    CroppedEvent.prototype.base64;
    /** @type {?|undefined} */
    CroppedEvent.prototype.file;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-photo-editor.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxPhotoEditorModule = /** @class */ (function () {
    function NgxPhotoEditorModule() {
    }
    NgxPhotoEditorModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgxPhotoEditorComponent],
                    imports: [NgbModalModule],
                    exports: [NgxPhotoEditorComponent],
                },] }
    ];
    return NgxPhotoEditorModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ngx-photo-editor.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxPhotoEditorComponent, NgxPhotoEditorModule, NgxPhotoEditorService };
//# sourceMappingURL=ngx-photo-editor.js.map
