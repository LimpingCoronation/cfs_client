<template>
    <div>
        <CenterComponent>
            <div class="flex justify-between items-center">
                <h1 class="font-medium text-3xl">Загрузите Файл</h1>
                <router-link to="/">Обратно</router-link>
            </div>
            <div class="mt-4">
                <div v-if="error" class="text-red-900 text-lg">{{ error }}</div>
                <div v-if="successMessage" class="text-green-700 text-lg">{{ successMessage }}</div>
                <label class="text-xl mt-4">Файл</label>
                <div class="mt-4">
                    <input type="file" @change="handleFileUpload($event)">
                </div>
                <button class="mt-8 px-4 py-2 bg-green-400 outline-none rounded-lg flex gap-[10px] items-center" @click="submit">
                    <p>Отправить</p>
                    <IndicatorComponent v-if="isFileUploading" />
                </button>
            </div>
        </CenterComponent>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'; 
    import CenterComponent from '@/components/CenterComponent.vue';
    import IndicatorComponent from '@/components/IndicatorComponent.vue';

    export default {
        components: {
            CenterComponent,
            IndicatorComponent,
        },
        data() {
            return {
                file: '',
                error: '',
                successMessage: '',
            }
        },
        computed: {
            ...mapState({
                isFileUploading: state => state.isFileUploading,
            })
        },
        methods: {
            ...mapActions({
                uploadFile: 'uploadFile',
            }),
            handleFileUpload(event) {
                this.file = event.target.files[0];
            },
            submit() {
                if (this.file == '') {
                    this.error = "Вы не загрузили файл";
                    this.successMessage = '';
                    return '';
                }
                this.uploadFile(this.file);
                this.file = '';
                this.error = '';
                this.successMessage = 'Вы успешно загрузили файл!';
            },

        }
    }
</script>

<style>

</style>