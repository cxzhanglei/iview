<template>
    <div class="sw-cell-group">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'CellGroup',
        provide () {
            return {
                cellGroup: this
            };
        },
        methods: {
            handleClick (name) {
                this.$emit('on-click', name);
            }
        }
    };
</script>
