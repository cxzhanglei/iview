<template>
    <div class="scrollbar-vertical" v-if="show" @click="jump" ref="container">
        <div class="scrollbar"
            ref="scrollbar"
            :class="dragging || draggingFromParent ? '' : 'scrollbar-transition'"
            @touchstart="startDrag"
            @mousedown="startDrag"
            :style="{ height: height+'%', top: top + '%' }">
        </div>
    </div>
</template>
<script>
    export default {
        name: 'verticalScrollbar',
        props: {
            area: {
                type: Number,
                default: 0
            },
            wrapper: {
                type: Number,
                default: 0
            },
            moving: {
                type: Number,
                default: 0
            },
            draggingFromParent: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                show: false,
                dragging: false,
                height: 0,
                top: 0,
                start: 0
            };
        },
        watch: {
            moving (newVal) {
                this.top = newVal / this.area * 100;
            },
            area (newVal, oldVal) {
                if(newVal !== oldVal) {
                    this.calculateSize();
                }
            },
            wrapper (newVal, oldVal) {
                if(newVal !== oldVal) {
                    this.calculateSize();
                }
            }
        },
        methods: {
            startDrag (e) {
                // e.preventDefault();
                e.stopPropagation();
                e = e.changedTouches ? e.changedTouches[0] : e;

                this.dragging = true;
                this.start = e.pageY;
            },
            onDrag (e) {
                // e.preventDefault();
                e.stopPropagation();
                e = e.changedTouches ? e.changedTouches[0] : e;
                if(this.dragging) {
                    let movement = e.pageY - this.start;
                    let percentage = movement / this.wrapper * 100;
                    let next = this.top + percentage;

                    this.start = e.pageY;
                    this.normalize(next);
                    this.$parent.dragging = true;
                }
            },
            stopDrag () {
                this.dragging = false;
                this.$parent.dragging = false;
            },
            jump (e) {
                const isContainer = e.target === this.$refs.container;
                if(isContainer) {
                    let position = this.$refs.scrollbar.getBoundingClientRect();
                    let movement = e.pageY - position.top;
                    let centerize = (this.height / 2);
                    let percentage = movement / this.wrapper * 100 - centerize;
                    let next = this.moving + percentage;

                    this.start = e.pageY;
                    this.normalize(next);
                }
            },
            normalize (next) {
                let lowerEnd = 100 - this.height;
                if(next <= 0){
                    next = 0;
                }else if(next > lowerEnd){
                    next = lowerEnd;
                }
                this.top = next;
                this.$parent.handlePostionChange(next, 'vertical');
            },
            calculateSize() {
                this.show = this.area > this.wrapper ? true : false;
                this.height = this.wrapper / this.area * 100;
                let next = 0;
                if(this.show) {
                    next = this.top;
                }
                this.normalize(next);
            }
        },
        mounted () {
            this.calculateSize();
            document.addEventListener('mousemove', this.onDrag);
            document.addEventListener('touchmove', this.onDrag);
            document.addEventListener('mouseup', this.stopDrag);
            document.addEventListener('touchend', this.stopDrag);
        },
        beforeDestroy () {
            document.removeEventListener('mousemove', this.onDrag);
            document.removeEventListener('touchmove', this.onDrag);
            document.removeEventListener('mouseup', this.stopDrag);
            document.removeEventListener('touchend', this.stopDrag);
        }
    };
</script>
