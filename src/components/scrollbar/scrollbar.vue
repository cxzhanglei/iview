<template>
    <div class="scrollbar-wrapper"
        :class="classes" ref="wrapper"
        :style="styles">
        <div class="scrollbar-area"
            ref="area"
            @wheel="scroll"
            @touchstart="startDrag"
            @touchmove="onDrag"
            @touchend="stopDrag"
            :class="(dragging ? '' : 'scrollbar-transition')"
            :style="{ 'margin-top': this.top * -1 +'px', 'margin-left': this.left * -1 +'px' }">
            <slot></slot>
        </div>
        <vertical-scrollbar
            v-if="ready"
            :area="scrollAreaHeight"
            :wrapper="scrollWrapperHeight"
            :moving="vMovement"
            :dragging-from-parent="dragging">
        </vertical-scrollbar>
        <horizontal-scrollbar
            v-if="ready"
            :area="scrollAreaWidth"
            :wrapper="scrollWrapperWidth"
            :moving="hMovement"
            :dragging-from-parent="dragging">
        </horizontal-scrollbar>
    </div>
</template>
<script>
    import verticalScrollbar from './vertical-scrollbar.vue';
    import horizontalScrollbar from './horizontal-scrollbar.vue';
    export default {
        name: 'ScrollBar',
        components: { verticalScrollbar, horizontalScrollbar },
        props: {
            classes: {
                type: String,
                default: ''
            },
            speed: {
                type: Object,
                default () {
                    return { y:53, x:53 };
                }
            },
            width: {
                type: Number,
                default: 0
            },
            height: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                ready: false,
                scrollY: 0,
                scrollX: 0,
                scrollAreaHeight: 0,
                scrollAreaWidth: 0,
                scrollWrapperHeight: 0,
                scrollWrapperWidth: 0,
                vMovement: 0,
                hMovement: 0,
                top: 0,
                left: 0,
                dragging: false,
                start: { y: 0, x: 0 }
            };
        },
        computed: {
            styles () {
                let style = {};
                if(this.width > 0) style.width = this.width +'px';
                if(this.height > 0) style.height = this.height +'px';

                return style;
            }
        },
        methods: {
            scroll (e) {
                e.preventDefault();
                const speedY = this.speed.y;
                const speedX = this.speed.x;
                const shifted = e.shiftKey;

                this.scrollY = e.deltaY > 0 ? speedY : -(speedY);
                this.scrollX = e.deltaX > 0 ? speedX : -(speedX);

                if(shifted && e.deltaX === 0) {
                    this.scrollX = e.deltaY > 0 ? speedY : -(speedY);

                }
                const canScrollY = this.scrollAreaHeight > this.scrollWrapperHeight;
                const canScrollX = this.scrollAreaWidth > this.scrollWrapperWidth;

                if(canScrollY && !shifted) {
                    let nextY = this.top + this.scrollY;
                    this.normalizeVertical(nextY);
                    this.vMovement = this.top;
                }

                if(canScrollX && shifted) {
                    let nextX = this.left + this.scrollX;
                    this.normalizeHorizontal(nextX);
                    this.hMovement = this.left;
                }
            },
            startDrag (e) {
                // e.preventDefault();
                e.stopPropagation();
                e = e.changedTouches ? e.changedTouches[0] : e;

                this.dragging = true;
                this.start.y = e.pageY;
                this.start.x = e.pageX;
            },
            onDrag (e) {
                // e.preventDefault();
                e = e.changedTouches ? e.changedTouches[0] : e;
                if(this.dragging){
                    let yMovement = this.start.y - e.pageY;
                    let xMovement = this.start.x - e.pageX;
                    this.start.y = e.pageY;
                    this.start.x = e.pageX;
                    let nextY = this.top + yMovement;
                    let nextX = this.left + xMovement;
                    this.normalizeVertical(nextY);
                    this.normalizeHorizontal(nextX);
                    this.vMovement = this.top;
                    this.hMovement = this.left;
                }
            },
            stopDrag () {
                this.dragging = false;
            },
            normalizeVertical (next) {
                let lowerEnd = this.scrollAreaHeight - this.scrollWrapperHeight;
                if(next > lowerEnd) {
                    next = lowerEnd;
                }else if(next < 0) {
                    next = 0;
                }
                this.top = next;
                this.triggerScroll();
            },
            normalizeHorizontal (next) {
                let lowerEnd = this.scrollAreaWidth - this.scrollWrapperWidth;
                if(next > lowerEnd) {
                    next = lowerEnd;
                }else if(next < 0) {
                    next = 0;
                }
                this.left = next;
                this.triggerScroll();
            },
            handlePostionChange (scrollbar, orientation) {
                if(orientation === 'vertical') {
                    let nextY = scrollbar / 100 * this.scrollAreaHeight;
                    this.top = nextY;
                }else{
                    let nextX = scrollbar / 100 * this.scrollAreaWidth;
                    this.left = nextX;
                }
            },
            calculateSize () {
                const $scrollArea = this.$refs.area;
                const $scrollWrapper = this.$refs.wrapper;

                const scrollWrapperStyle = window.getComputedStyle($scrollWrapper, null);

                this.scrollAreaHeight = $scrollArea.children[0].clientHeight;
                this.scrollAreaWidth = $scrollArea.children[0].clientWidth;

                this.scrollWrapperHeight = parseFloat(scrollWrapperStyle.height);
                this.scrollWrapperWidth = parseFloat(scrollWrapperStyle.width);

                this.ready = true;
            },
            triggerScroll () {
                let e = document.createEvent('Events');
                e.initEvent('scroll', true, true);
                document.dispatchEvent(e);
            }
        },
        watch: {
            height (val) {
                this.scrollWrapperHeight = val;
            },
            width (val) {
                this.scrollWrapperWidth = val;
            }
        },
        mounted () {
            this.calculateSize();
            window.addEventListener('resize', this.calculateSize);
        },
        beforeDestroy () {
            window.removeEventListener('resize', this.calculateSize);
        }
    };
</script>
