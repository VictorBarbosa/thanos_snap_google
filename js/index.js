var Index = /** @class */ (function () {
    function Index() {
        var _this = this;
        this.snapClick = true;
        this.running = false;
        this.canvasAnimation = document.getElementById('canvasAnimation');
        this.video = document.getElementById('media');
        this.video.src = "mp3/thanos_snap_sound.mp3";
        this.video.pause();
        this.canvasAnimation.width = 80;
        this.canvasAnimation.height = 80;
        this.ctx = this.canvasAnimation.getContext('2d');
        this.img = new Image();
        this.img.onload = function () {
            _this.ctx.drawImage(_this.img, 0, 0, 80, 80, 0, 0, 80, 80);
            _this.ctx.drawImage(_this.img, 0, 0, 80, 80, 0, 0, 80, 80);
        };
        this.img.src = 'images/thanos_idle.png';
        this.canvasAnimation.onclick = function (e) { return _this.btnClickEvent(e); };
    }
    Index.prototype.SoundClick = function (url) {
        this.video.src = url;
        this.video.play();
    };
    Index.prototype.btnClickEvent = function (e) {
        if (this.snapClick) {
            this.SoundClick('mp3/thanos_snap_sound.mp3');
            this.Animation('images/thanos_snap.png');
        }
        else {
            this.SoundClick('mp3/thanos_reverse_sound.mp3');
            this.Animation('images/thanos_time.png');
        }
        this.onBtnClick();
    };
    Index.prototype.Animation = function (srcImage) {
        var _this = this;
        if (!this.running) {
            var h_1 = 80;
            var frameCount_1 = 0;
            var frameTotal_1 = 48;
            this.img = new Image();
            this.img.src = srcImage;
            var setInt_1 = setInterval(function (es) {
                _this.ctx.clearRect(0, 0, _this.canvasAnimation.width, _this.canvasAnimation.height);
                _this.ctx.drawImage(_this.img, (frameCount_1 * 80), 0, h_1, h_1, 0, 0, h_1, h_1);
                if (frameCount_1 >= (frameTotal_1 - 1)) {
                    clearInterval(setInt_1);
                    _this.running = false;
                }
                else {
                    _this.running = true;
                    frameCount_1++;
                }
            }, 50);
            this.snapClick = !this.snapClick;
        }
    };
    Index.prototype.classHas = function (base, has) {
        var arr = base.split(" ");
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === has)
                return true;
        }
    };
    Index.prototype.classReplace = function (base, replace, next) {
        return base.replace(replace, next);
    };
    Index.prototype.onBtnClick = function () {
        var block = document.getElementById("block");
        var overlay = document.getElementById("overlay");
        if (this.classHas(block.className, "div-show")) {
            block.className = this.classReplace(block.className, "div-show", "div-hidden");
            var content = block.innerHTML;
            overlay.innerHTML = "<div class=\"div-overlay div-overlay-left\">" + content + "</div>" + "<div class=\"div-overlay div-overlay-right\">" + content + "</div>";
        }
        else {
            block.className = this.classReplace(block.className, "div-hidden", "div-show");
            overlay.innerHTML = null;
        }
    };
    return Index;
}());
window.onload = function () {
    new Index();
};
