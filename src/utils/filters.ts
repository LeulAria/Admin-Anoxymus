import Vue from 'vue';
import { dayjsDate } from './dayjs';

Vue.filter("dayjsDate", function(value: Date | string) {
    return dayjsDate(value);
})

Vue.filter("replaceAll", function(value: string, replace: string, by: string) {
    return value.replaceAll(replace, by); 
})
