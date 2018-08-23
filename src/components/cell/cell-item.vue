<template>
    <div class="sw-cell-item">
        <div class="sw-cell-icon">
            <slot name="icon"></slot>
        </div>
        <div class="sw-cell-main">
            <div class="sw-cell-title"><slot>{{ title }}</slot></div>
            <div class="sw-cell-label"><slot name="label">{{ label }}</slot></div>
        </div>
        <div class="sw-cell-footer">
            <span class="sw-cell-extra"><slot name="extra">{{ extra }}</slot></span>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            label: {
                type: String,
                default: ''
            },
            extra: {
                type: String,
                default: ''
            },
        }
    };
</script>
