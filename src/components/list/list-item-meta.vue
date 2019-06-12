<template>
    <div class="sw-list-item-meta">
        <div class="sw-list-item-meta-avatar" v-if="avatar || $slots.avatar">
            <slot name="avatar">
                <Avatar :src="avatar" />
            </slot>
        </div>
        <div class="sw-list-item-meta-content">
            <div v-if="title || $slots.title" class="sw-list-item-meta-title"><slot name="title">{{ title }}</slot></div>
            <div v-if="description || $slots.description" class="sw-list-item-meta-description"><slot name="description">{{ description }}</slot></div>
        </div>
    </div>
</template>
<script>
    import Avatar from '../../components/avatar/avatar.vue';

    export default {
        name: 'ListItemMeta',
        components: { Avatar },
        props: {
            avatar: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            }
        }
    };
</script>
