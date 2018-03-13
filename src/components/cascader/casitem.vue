<template>
    <li :class="classes">
        {{ data.label }}
        <i v-if="showArrow" class="sw-icon sw-icon-ios-arrow-right"></i>
        <i v-if="showLoading" class="sw-icon sw-icon-load-c sw-load-loop"></i>
    </li>
</template>
<script>
    export default {
        name: 'Casitem',
        props: {
            data: Object,
            prefixCls: String,
            tmpItem: Object
        },
        computed: {
            classes () {
                return [
                    `${this.prefixCls}-menu-item`,
                    {
                        [`${this.prefixCls}-menu-item-active`]: this.tmpItem.value === this.data.value,
                        [`${this.prefixCls}-menu-item-disabled`]: this.data.disabled
                    }
                ];
            },
            showArrow () {
                return (this.data.children && this.data.children.length) || ('loading' in this.data && !this.data.loading);
            },
            showLoading () {
                return 'loading' in this.data && this.data.loading;
            }
        }
    };
</script>
