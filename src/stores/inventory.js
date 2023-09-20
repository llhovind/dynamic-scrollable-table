import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useInventoryStore = defineStore('Inventory', () => {
    const responseItems = ref([])
    const items = ref([]);
    const fields = ref([]);

    function getInventory(options = {}) {

        return axios.get('data.json')
            .then(response => {
                responseItems.value = response.data.content;

                fields.value = Object.keys(responseItems.value[0]);

                // this simulates sorting from an API
                if (options.sort) {
                    let sortOptions = options.sort.split('.');

                    items.value = responseItems.value.sort((a, b) => {
                        let cmp =0;

                        if (a[sortOptions[0]] < b[sortOptions[0]]) {
                            cmp = -1;
                        }
                        if (a[sortOptions[0]] > b[sortOptions[0]]) {
                            cmp = 1;
                        }

                        if (sortOptions[1] == 'd') {
                            cmp = cmp * -1;
                        }

                        return cmp;
                    })

                } else {
                    
                    items.value = [...responseItems.value];
                }
            })
            .catch(err => {
                console.log(err);
            })
            ;
    }

    getInventory(); // get inventory on load
       

    return { items, fields, getInventory }
})
