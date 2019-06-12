<template>
    <li class="sw-list-item" :class="classes">
        <template v-if="itemLayout === 'vertical' && $slots.extra">
            <div class="sw-list-item-main">
                <slot></slot>
                <ul class="sw-list-item-action" v-if="$slots.action">
                    <slot name="action"></slot>
                </ul>
            </div>
            <div class="sw-list-item-extra">
                <slot name="extra"></slot>
            </div>
        </template>
        <template v-else>
            <slot></slot>
            <ul class="sw-list-item-action" v-if="$slots.action">
                <slot name="action"></slot>
            </ul>
            <div class="sw-list-item-extra">
                <slot name="extra"></slot>
            </div>
        </template>
    </li>
</template>
<script>
    export default {
        name: 'ListItem',
        inject: ['ListInstance'],
        props: {

        },
        computed: {
            itemLayout () {
                return this.ListInstance.itemLayout;
            },
            isItemContainsTextNode () {
                let result;
                this.$slots.default.forEach(item => {
                    if (typeof item === 'string') {
                        result = true;
                    }
                });
                return result;
            },
            isFlexMode () {
                const extra = this.$slots.extra;

                if (this.itemLayout === 'vertical') {
                    return !!extra;
                }

                return !this.isItemContainsTextNode;
            },
            classes () {
                return [
                    {
                        'sw-list-item-no-flex': !this.isFlexMode
                    }
                ];
            }
        }
    };
</script>
