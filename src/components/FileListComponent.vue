<template>
    <div v-if="fileList.length > 0" class="flex flex-col">
        <FileItemComponent v-for="file in fileList" :file="file" :key="file.id"/>
    </div>
    <div v-else class="mt-4">
        <h2 class="font-medium text-xl">У вас нет файлов...</h2>
    </div>
</template>

<script>
    import FileItemComponent from '@/components/FileItemComponent.vue';

    export default {
        components: {
            FileItemComponent,
        },
        props: {
            fileList: [Array]
        },
    }
</script>

<style>

</style>