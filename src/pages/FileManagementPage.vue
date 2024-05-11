<template>
    <CenterComponent>
        <div class="flex justify-between items-center">
            <h1 class="text-4xl font-medium">Файлы</h1>
            <div class="flex gap-[20px]">
                <router-link to="/upload">Загрузить файл</router-link>
                <a class="text-red-700 cursor-pointer" @click="logout">Выйти</a>
            </div>
        </div>
        <FileListComponent v-if="!isFilesLoading" :fileList="files" />
        <IndicatorComponent v-else />

    </CenterComponent>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    import CenterComponent from '@/components/CenterComponent.vue';
    import FileListComponent from "@/components/FileListComponent.vue";
    import IndicatorComponent from "@/components/IndicatorComponent.vue";

    export default {
        components: {
            CenterComponent, 
            FileListComponent,
            IndicatorComponent,
        },
        mounted() {
            this.fetchFiles();
        },
        computed: {
            ...mapState({
                files: state => state.files,
                isFilesLoading: state => state.isFilesLoading,
            })
        },
        methods: {
            ...mapActions({
                fetchFiles: 'fetchFiles',
                logout: 'logout',
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>