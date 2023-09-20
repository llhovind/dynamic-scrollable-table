<script setup>
import { ref, watch } from 'vue';
import { useConfigurationStore } from '../stores/configuration';
import { useInventoryStore } from '../stores/inventory';
import { InitialCaps, fixedNum } from '../composables/utils';

const config = useConfigurationStore();
const inventory = useInventoryStore();

const fieldsList = ref(Object.keys(config.fields_config));
const displayFields = ref(config.displayFields);
let sortField = ref('');

function format(value, fmt) {

    let tmp = value;

    // if you don't like 'switch' statements,
    // you can replace this with any number of 'if' statements
    switch (fmt) {
        case 'fixedNum2':
            tmp = fixedNum(value);
            break;
        default:
    }

    return tmp
}

function onDrag(evt, fld) {
    evt.dataTransfer.setData('field', fld);
}

function onDrop(evt, destFld) {
    evt.preventDefault();
    let srcFld = evt.dataTransfer.getData('field');

    if (srcFld !== destFld) {
        let idx = displayFields.value.indexOf(srcFld);
        displayFields.value.splice(idx, 1); // remove the source field
        idx = displayFields.value.indexOf(destFld);
        displayFields.value.splice(idx, 0, srcFld); // insert source field before destination field
    }
}

function changeSort(fld) {

    if (config.fields_config[fld] && config.fields_config[fld].sortable) {
        console.log('sort change for:', fld);

        if (!sortField.value.startsWith(fld)) {
            sortField.value = fld + '.a';
        } else {
            if (sortField.value.endsWith('.a')) {
                sortField.value = fld + '.d';
            } else {
                // clear sort
                sortField.value = '';
            }
        }

        inventory.getInventory({ sort: sortField.value });
    }
}

function sortIndicator(fld) {

    if (sortField.value.startsWith(fld)) {
        if (sortField.value.endsWith('.a')) {
            return '&uarr;'
        } else {
            return '&darr;'
        }

    } else {

        return '&#8645;';
    }
}

function sortIndicatorClass(fld) {

    if (sortField.value.startsWith(fld)) {
        return { sortActive: true }
    }

    return { sortActive: false }
}

function onChangeChecked(fld) {
    let idx = displayFields.value.indexOf(fld);

    if (idx === -1) {
        // if not displayed - add to displayFields
        let tIdx = 0;
        // find field just before fld in fieldsList
        let pIdx = fieldsList.value.indexOf(fld) - 1;
        // see if field is in displayFields - if not go to prior field
        while (pIdx > -1 && displayFields.value.indexOf(fieldsList.value[pIdx]) < 0) {
            pIdx--;
        }
        if (pIdx < 0) {
            tIdx = 0;
        } else {
            // then get field idx in displayFields and add 1 to make it the next item in the array
            tIdx = displayFields.value.indexOf(fieldsList.value[pIdx]) + 1;
        }
        // insert fld after that idx
        displayFields.value.splice(tIdx, 0, fld);
    } else {
        // if displayed - remove from displayFields
        displayFields.value.splice(idx, 1);
        // remove sort if it was sorted by this fld
        if (sortField.value.startsWith(fld)) {
            sortField.value = '';
            inventory.getInventory({ sort: sortField.value });
        }
    }
}

watch(() => config.fields_config, () => { fieldsList.value = Object.keys(config.fields_config); displayFields.value = config.displayFields });
</script>

<template>
    <div class="" style="margin: auto; width: 80%;">
        <div class="flexRow">
            <div class="tableWrapper flexCol">
                <div class="count">Item count: {{ inventory.items.length }}</div>
                <table class="fixedHeader">
                    <thead>
                        <tr>
                            <th v-for="h in displayFields" :class="sortIndicatorClass(h)" :style="{ width: config.fields_config[h].width }" draggable="true" @dragstart="onDrag($event, h)" @drop="onDrop($event, h)" @dragover.prevent @dragenter.prevent @click="changeSort(h)">
                                <div class="relative">
                                    {{ config.fields_config[h].label ? config.fields_config[h].label : h }}
                                    <div v-if="config.fields_config[h].sortable" class="sortIndicator" v-html="sortIndicator(h)"></div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in inventory.items">
                            <td v-for="c in displayFields" :style="{ width: config.fields_config[c].width }" :class="config.fields_config[c].class" :title="config.fields_config[c].tooltip ? format(item[c], config.fields_config[c].format) : ''">{{ format(item[c], config.fields_config[c].format) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="fieldsFilter">
                <h3>Display Selection</h3>
                <ul>
                    <li v-for="fld in fieldsList">
                        <label><input type="checkbox" :checked="displayFields.includes(fld)" @change="onChangeChecked(fld)" />
                            &nbsp;{{ InitialCaps(fld) }}
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.relative {
    position: relative;
}

.flexRow {
    display: flex;
    flex-direction: row;
}

.flexCol {
    display: flex;
    flex-direction: column;
}

.tableFixedHead {
    overflow-y: auto;
    height: 10rem;
}

.rightAlign {
    text-align: right;
}

.ctrAlign {
    text-align: center;
}

.sortIndicator {
    display: inline-block;
    position: fixed;
    margin-left: 0.25rem;
    font-size: larger;
    line-height: 1.5rem;
    opacity: 0;
}

.pdr10 {
    padding-right: 10px !important;
}

.pdr24 {
    padding-right: 24px !important;
}

.tableWrapper {
    position: relative;
    height: 12rem;
}

table.fixedHeader {
    flex: 1;
    position: relative;
    table-layout: fixed;
    border-collapse: collapse;
    border: lightskyblue 1px solid;

    thead {
        display: inline-table;
        overflow: auto;

        tr {
            display: inline-table;
            width: 100%;
            table-layout: fixed;

            th {
                background-color: royalblue;
                color: white;
                text-transform: capitalize;
                border-left: white 1px solid;
                overflow: hidden;
                text-overflow: ellipsis;

                &:not(.sortActive):hover {
                    .sortIndicator {
                        opacity: 0.5;
                    }
                }

                &.sortActive {

                    .sortIndicator {
                        opacity: 1;
                    }
                }
            }

            th:first-child {
                border-left: none;
            }
        }
    }

    tbody {
        display: block;
        overflow: overlay;
        height: 10rem;

        background:
            /* Shadow Cover TOP */
            linear-gradient(white 30%,
                rgba(255, 255, 255, 0)) center top,

            /* Shadow Cover BOTTOM */
            linear-gradient(rgba(255, 255, 255, 0),
                white 70%) center bottom,

            /* Shadow TOP */
            radial-gradient(farthest-side at 50% 0,
                rgba(0, 0, 0, 0.25),
                rgba(0, 0, 0, 0)) center top,

            /* Shadow BOTTOM */
            radial-gradient(farthest-side at 50% 100%,
                rgba(0, 0, 0, 0.25),
                rgba(0, 0, 0, 0)) center bottom;

        background-repeat: no-repeat;
        background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;
        background-attachment: local, local, scroll, scroll;

        tr {
            display: inline-table;
            width: 100%;
            table-layout: fixed;

            td {
                padding: 4px 8px;
                border-left: lightgray 1px solid;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            td:first-child {
                border-left: none;
            }

            &:hover {
                background-color: rgba(204, 230, 255, 0.4);
            }
        }
    }

    th,
    td {
        min-width: 2rem;
    }

}

.monospace {
    font-family: monospace;
    font-size: smaller;
}

.fieldsFilter {
    margin-left: 1rem;
    white-space: nowrap;

    h3 {
        border-bottom: 2px solid grey;
    }
}
</style>