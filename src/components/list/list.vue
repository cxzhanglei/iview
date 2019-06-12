<template>
    <div :class="classes">
        <div class="sw-list-header" v-if="header || $slots.header"><slot name="header">{{ header }}</slot></div>
        <div class="sw-list-container">
            <ul class="sw-list-items"><slot></slot></ul>
        </div>
        <Spin v-if="loading" fix size="large"><slot name="spin"></slot></Spin>
        <div class="sw-list-footer" v-if="footer || $slots.footer"><slot name="footer">{{ footer }}</slot></div>
    </div>
</template>
<script>
    import { oneOf } from '../../utils/assist';

    const prefixCls = 'sw-list';

    export default {
        name: 'List',
        provide () {
            return {
                ListInstance: this
            };
        },
        props: {
            border: {
                type: Boolean,
                default: false
            },
            itemLayout: {
                validator (value) {
                    return oneOf(value, ['horizontal', 'vertical']);
                },
                default: 'horizontal'
            },
            // 或 slot
            header: {
                type: String,
                default: ''
            },
            // 或 slot
            footer: {
                type: String,
                default: ''
            },
            // 含 slot: spin
            loading: {
                type: Boolean,
                default: false
            },
            size: {
                validator (value) {
                    return oneOf(value, ['small', 'large', 'default']);
                },
                default () {
                    return !this.$IVIEW || this.$IVIEW.size === '' ? 'default' : this.$IVIEW.size;
                }
            },
            split: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {

            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    `${prefixCls}-${this.size}`,
                    `${prefixCls}-${this.itemLayout}`,
                    {
                        [`${prefixCls}-bordered`]: this.border,
                        [`${prefixCls}-split`]: this.split
                    }
                ];
            },
        },
        methods: {

        }
    };
</script>
