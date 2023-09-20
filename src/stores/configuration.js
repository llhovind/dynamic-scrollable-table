import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useConfigurationStore = defineStore('Configuration', () => {
    const fields_config = ref({});
    const displayFields = ref([]);


    function getConfiguration() {

        return axios.get('table_configuration.json')
            .then(response => {
                fields_config.value = response.data.fields_config;
                displayFields.value = response.data.displayFields;
            })
            .catch(err => {
                console.log(err);
            })
            ;
    }

    getConfiguration(); // get configuration on load

    return { fields_config, displayFields, getConfiguration }
})
