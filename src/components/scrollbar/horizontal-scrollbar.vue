<template>
    <div class="scrollbar-horizontal" v-if="show" @click="jump" ref="container">
        <div class="scrollbar"
            ref="scrollbar"
            :class="dragging || draggingFromParent ? '' : 'scrollbar-transition'"
            @touchstart="startDrag"
            @mousedown="startDrag"
            :style="{ width: width+'%', left: left + '%' }">
        </div>
    </div>
</template>
<script>
    export default {
        name: 'horizontalScrollbar',
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
                width: 0,
                left: 0,
                start: 0
            };
        },
        watch: {
            moving (newVal) {
                this.left = newVal / this.area * 100;
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
                this.start = e.pageX;
            },
            onDrag (e) {
                // e.preventDefault();
                e.stopPropagation();
                e = e.changedTouches ? e.changedTouches[0] : e;
                if(this.dragging) {
                    let movement = e.pageX - this.start;
                    let percentage = movement / this.wrapper * 100;
                    let next = this.left + percentage;

                    this.start = e.pageX;
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
                    let movement = e.pageX - position.left;
                    let centerize = (this.width / 2);
                    let percentage = movement / this.wrapper * 100 - centerize;
                    let next = this.moving + percentage;

                    this.start = e.pageX;
                    this.normalize(next);
                }
            },
            normalize (next) {
                let lowerEnd = 100 - this.width;
                if(next <= 0){
                    next = 0;
                }else if(next > lowerEnd){
                    next = lowerEnd;
                }
                this.left = next;
                this.$parent.handlePostionChange(next, 'horizontal');
            },
            calculateSize() {
                this.show = this.area > this.wrapper ? true : false;
                this.width = this.wrapper / this.area * 100;
                if(!this.show) {
                    this.$parent.handlePostionChange(0, 'horizontal');
                }
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
