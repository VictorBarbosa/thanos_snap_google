class Index {
    canvasAnimation: HTMLCanvasElement

    ctx: CanvasRenderingContext2D;
    img: CanvasImageSource;
    snapClick: boolean = true;
    running: boolean = false;
    video: HTMLVideoElement;

    constructor() {
        this.canvasAnimation = <HTMLCanvasElement>document.getElementById('canvasAnimation');


        this.video = <HTMLVideoElement>document.getElementById('media');
        this.video.src = "mp3/thanos_snap_sound.mp3";
        this.video.pause();
        this.canvasAnimation.width = 80
        this.canvasAnimation.height = 80
        this.ctx = this.canvasAnimation.getContext('2d');
        this.img = new Image();


        this.img.onload = () => {

            this.ctx.drawImage(this.img, 0, 0, 80, 80, 0, 0, 80, 80);
            this.ctx.drawImage(this.img, 0, 0, 80, 80, 0, 0, 80, 80);
        }
        this.img.src = 'images/thanos_idle.png'





        this.canvasAnimation.onclick = (e) => this.btnClickEvent(e)
    }

    SoundClick(url: string) {

        this.video.src = url;
        this.video.play()
    }
    btnClickEvent(e: any) {
        if (this.snapClick) {

            this.SoundClick('mp3/thanos_snap_sound.mp3')
            this.Animation('images/thanos_snap.png');
           
        } else {
            this.SoundClick('mp3/thanos_reverse_sound.mp3')
            this.Animation('images/thanos_time.png');
        }
         this.onBtnClick()
    }

    Animation(srcImage: string) {
        if (!this.running) {
            let h = 80;
            let frameCount = 0
            let frameTotal = 48
            this.img = new Image();
            this.img.src = srcImage
            const setInt = setInterval((es) => {
                this.ctx.clearRect(0, 0, this.canvasAnimation.width, this.canvasAnimation.height);
                this.ctx.drawImage(this.img, (frameCount * 80), 0, h, h, 0, 0, h, h);
                if (frameCount >= (frameTotal - 1)) {
                    clearInterval(setInt);
                    this.running = false;
                }
                else {
                    this.running = true;
                    frameCount++;
                }
            }, 50)
            this.snapClick = !this.snapClick
        }
    }



    classHas(base, has) {
        const arr = base.split(" ")
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === has)
                return true;
        }
    }

    classReplace(base, replace, next) {
        return base.replace(replace, next)
    }

    onBtnClick() {

        const block = document.getElementById("block");
        const overlay = document.getElementById("overlay");

        if (this.classHas(block.className, "div-show")) {
            block.className = this.classReplace(block.className, "div-show", "div-hidden")
            const content = block.innerHTML;
            overlay.innerHTML = "<div class=\"div-overlay div-overlay-left\">" + content + "</div>" + "<div class=\"div-overlay div-overlay-right\">" + content + "</div>";
        } else {
            block.className = this.classReplace(block.className, "div-hidden", "div-show")
            overlay.innerHTML = null;
        }
    }

}






window.onload = () => {




    new Index()
};