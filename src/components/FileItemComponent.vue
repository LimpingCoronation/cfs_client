<template>
    <div class="flex justify-between items-center mt-4">
        <p class="font-normal text-lg">{{ file.file.name.split('/')[1] }}</p>
        <div class="flex gap-[20px] items-center">
            <indicator-component v-if="isFileDownloading && file.id == fileDownloadingId" />
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" class="w-8 h-8 cursor-pointer" @click="redirectToDownload">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-8 h-8 cursor-pointer" @click="deleteThisFile">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    import IndicatorComponent from './IndicatorComponent.vue';

    export default {
        props: {
            file: [Object],
        },
        components: {
            IndicatorComponent
        },
        computed: {
            ...mapState({
                baseUrl: state => state.baseUrl,
                isFileDownloading: state => state.isFileDownloading,
                fileDownloadingId: state => state.fileDownloadingId
            })
        },
        methods: {
            ...mapActions({
                downloadFile: 'downloadFile',
                deleteFile: 'deleteFile',
            }),
            redirectToDownload() {
                this.downloadFile({ id: this.file.id, label: this.file.file.name.split('/')[1] })
            },
            deleteThisFile() {
                this.deleteFile(this.file.id);
            }
        }
    }
</script>

<style>

</style>