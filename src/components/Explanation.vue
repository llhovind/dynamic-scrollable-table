<script setup>
import { ref, watch } from 'vue';
import { useConfigurationStore } from '../stores/configuration';

const config = useConfigurationStore();

let cfgObj = ref({});

function prettyCfgObj() {
    let tmp = JSON.stringify(config.fields_config);
    cfgObj.value = tmp.replaceAll('},', '},\n');
    cfgObj.value = cfgObj.value.replace('{', '{\n');
    cfgObj.value = cfgObj.value.substring(0, cfgObj.value.length - 1) + '\n}';
}

prettyCfgObj();

watch(() => config.fields_config, prettyCfgObj);
</script>

<template>
    <div>
        <p>The table is dynamic because it is rendered from a configuration object.
            This object is retrieved from an API call, or in this case a JSON file on the server.
            The benefit of this should be obvious: the table can be modified, in production, without a full SDLC.
            In addition to a default configuration being retrieved, a User specific configuration can be retrieved as well.
            This allows the table to be customized on a User by User basis. If a User makes changes these could be
            saved back to a server, just add a SaveConfiguration() to the ConfigurationStore.
        </p>
        <div class="flexRow relative">
            <div class="leftCol">
                <p>The 'fields_config' object is shown at right. In it is a property for each displayable field.
                    Each property's value is an object with properties used to control the table rendering for that field/column.</p>
                <p>"width" controls the column's width. "label" is used to override the default heading.
                    "sortable" sets whether a field/column is sortable. "class" is used to apply CSS class name(s) to the column.
                    And "format" is the name of any special formatting function to preprocess the column's output. These
                    are only a few, you can add many more features if you prefer.</p>
                <p>The configuration object is a sparse tree, any property not explicity provided is processed as a 'falsy'.
                    So not all properties have to be specified. Only those that you want to override the default behavior for.
                    This simplifies maintenance.</p>
            </div>
            <div class="rightCol">
                <span class="bold">'fields_config':</span>
                <div class="code"> {{ cfgObj }}</div>
            </div>
        </div>
        <div class="flexRow relative">
            <div class="leftCol">
                <p>The 'displayFields' array is shown at right. It serves two purposes: 1) it contains only the fields/columns
                    that will be displayed, and 2) sets the order in which those fields/columns will be displayed.</p>
                <p>Give it a try. Change the displayed fields/columns by checking/unchecking the field names.
                    Drag-n-Drop the column headers to reorder the columns. And notice how the 'displayFields' at right changes.</p>
            </div>
            <div class="rightCol">
                <span class="bold">'displayFields':</span>
                <div class="code"> {{ config.displayFields }}</div>
            </div>
        </div>
        <p class="p2">Oh, don't forget to enjoy the 'Scroll Shadows' courtesy of <a href="https://css-tricks.com/books/greatest-css-tricks/scroll-shadows/" target="_blank">CSS-Tricks</a></p>
    </div>
</template>

<style lang="scss" scoped>
.relative {
    position: relative;
}

.flexRow {
    display: flex;
    flex-direction: row;
    margin-top: 8px;
}

.flexCol {
    display: flex;
    flex-direction: column;
}

.leftCol {
    flex: 1;
    max-width: 50%;
    padding: 12px 12px 0 12px;

    p {
        text-align: justify;
        margin-bottom: 0.5rem;
    }
}

.rightCol {
    flex: 1;
    max-width: 50%;
    padding: 12px 12px 0 12px;
}

.bold {
    font-weight: bold;
}

.code {
    font-family: monospace;
    font-size: smaller;
    white-space: pre;
    padding: 0.5rem 1rem;
    background-color: lightgray;
    border-radius: 8px;
    margin-left: auto;
    overflow-x: auto;
}

.p2 {
    margin: 4px 0;
}
</style>